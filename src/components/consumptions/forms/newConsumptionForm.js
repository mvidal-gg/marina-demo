import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "../../common/forms/datepicker";
import { SubmitButton } from "../../common/forms/submitButton";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPointsOfSale,
  selectAllPointsOfSale,
} from "../../../common/features/pointsOfSale/pointsOfSaleSlice";
import { useEffect, useState } from "react";
import servicesService from "../../../services/services.service";

const initialFormValues = {
  card_number: "",
  edition_date: null,
};

export const NewConsumptionForm = ({ cardNumber, setServices }) => {
  const { user } = useSelector((state) => state.auth);
  const { token: userToken } = user;
  const [selectedPOS, setSelectedPOS] = useState("");

  const pointsOfSale = useSelector(selectAllPointsOfSale);
  const pointsOfSaleStatus = useSelector((state) => state.pointsOfSale.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pointsOfSaleStatus === "idle") {
      dispatch(fetchPointsOfSale(userToken));
    }
  }, [pointsOfSaleStatus, userToken, dispatch]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    //ToDo
    const { card_number, edition_date } = values;
    alert(JSON.stringify(values));
    const services = await servicesService.getAll({
      token: userToken,
      numCard: card_number,
      dateEdition: edition_date,
    });
    setServices(services);
  };

  const handleSelectChangePOS = (event) => {
    setSelectedPOS(event.target.value);
  };

  const validationSchema = Yup.object().shape({
    card_number: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "El valor debe ser numérico")
      .min(16, "El número debe contener 16 dígitos")
      .max(16, "El número debe contener 16 dígitos"),
    edition_date: Yup.date().nullable(),
  });

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, setFieldValue, isSubmitting, values, isValid }) => (
        <Box
          component={Form}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100" },
          }}
          autoComplete="off"
        >
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="point-of-sale-label">Punto de venta</InputLabel>
            <Field
              as={Select}
              labelId="point-of-sale-label"
              id="point-of-sale"
              label="Punto de venta"
              size="small"
              value={selectedPOS}
              onChange={handleSelectChangePOS}
            >
              {pointsOfSale.map((element) => (
                <MenuItem key={element.id} value={element.id}>
                  {element.label}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <Field
            as={TextField}
            label="Número de tarjeta"
            type="text"
            name="card_number"
            onChange={handleChange}
            value={cardNumber || values.card_number}
            disabled={cardNumber ? true : false}
            fullWidth
            autoComplete="off"
            size="small"
          />
          <ErrorMessage name="card_number" component="div" />
          <DatePicker label="Fecha de edición" setFieldValue={setFieldValue} />
          <SubmitButton
            text="Continuar"
            isValid={isValid}
            isSubmitting={isSubmitting}
          ></SubmitButton>
        </Box>
      )}
    </Formik>
  );
};

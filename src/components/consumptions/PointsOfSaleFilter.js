import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPointsOfSale,
  selectAllPointsOfSale,
  setCurrent,
} from "../../common/features/pointsOfSale/pointsOfSaleSlice";

import { fetchConsumptions } from "../../common/features/consumptions/consumptionsSlice";

export const PointsOfSaleFilter = ({ pointOfSale }) => {
  const { user } = useSelector((state) => state.auth);
  const userToken = user.signInUserSession.idToken.jwtToken;

  const pointsOfSale = useSelector(selectAllPointsOfSale);
  const pointsOfSaleStatus = useSelector((state) => state.pointsOfSale.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pointsOfSaleStatus === "idle") {
      dispatch(fetchPointsOfSale(userToken));
    }
  }, [pointsOfSaleStatus, userToken, dispatch]);

  const handleSelectPointOfSale = (evt) => {
    const evtValue = evt.target.value;
    dispatch(setCurrent(evtValue));
    dispatch(fetchConsumptions({ userToken, pointOfSale: evtValue }));
  };

  return (
    <Box mb={5}>
      <Formik>
        {() => (
          <Box component={Form} autoComplete="off">
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="point-of-sale-label">Punto de venta</InputLabel>
              <Field
                as={Select}
                labelId="point-of-sale-label"
                id="point-of-sale"
                label="Punto de venta"
                value={pointOfSale}
                onChange={handleSelectPointOfSale}
                size="small"
              >
                {pointsOfSale.map((element) => (
                  <MenuItem key={element.id} value={element.id}>
                    {element.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

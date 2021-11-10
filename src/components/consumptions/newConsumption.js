import queryString from "query-string";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "../common/forms/datepicker";


const initialFormValues = {
  card_number: "",
};

export default function NewConsumption() {
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const qs = queryString.parse(search);

  useEffect(() => {
    qs.cardNumber && setCardNumber(qs.cardNumber);
    qs.error && setError(qs.error);
  }, []);

  const handleSubmit = (e) => {
    //ToDo
    e.preventDefault();
  };

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h3> NewConsumption component. Acceso privado</h3>
      {error && (
        <p>
          Ha ocurrido un error con el lector de tarjetas. Introduce el código
          manualmente.
        </p>
      )}
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        {({ isSubmitting, values, isValid }) => (
          <Form>
            <Field
              type="text"
              name="card_number"
              value={cardNumber || values.card_number}
              disabled={cardNumber ? true : false}
            />
            <ErrorMessage name="card_number" component="div" />
            <DatePicker label="Fecha de edición" value={value} onChange={handleChange}></DatePicker>
            <button type="submit" disabled={isSubmitting || !isValid}>
              Continuar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

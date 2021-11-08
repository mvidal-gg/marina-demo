import queryString from 'query-string'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const initialFormValues = {
  card_number: ""
}

export default function NewConsumption() {
  const [cardNumber, setCardNumber] = useState("");
  
  const { search } = useLocation();
  const values = queryString.parse(search)

  useEffect(()=>{
    setCardNumber(values.cardNumber)
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <h3> NewConsumption component. Acceso privado</h3>
      <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
        {({ isSubmitting, values, isValid }) => (
          <Form>
            <Field type="text" name="card_number" value={cardNumber} disabled/>
            <ErrorMessage name="card_number" component="div" />
            <button type="submit" disabled={isSubmitting || !isValid}>
              Continuar
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
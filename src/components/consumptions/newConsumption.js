import { useLocation } from "react-router-dom";

export default function NewConsumption() {
    const { search } = useLocation()
    console.log(search)

  return (
    <>
      <h3> NewConsumption component. Acceso privado</h3>
    </>
  );
}

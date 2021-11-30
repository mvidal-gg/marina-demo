const endpoint =
  "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/consumption";

export default function getConsumptions(
  token,
  pointSaleId,
  date = "25/11/2021"
) {
  return fetch(
    `${endpoint}?pointSaleId=${pointSaleId}&dateConsumption=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.body.consumptions);
}

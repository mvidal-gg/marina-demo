const endpoint =
  "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/consumption";

const getAll = ({userToken, pointOfSale, date = "25/11/2021"}) => {
  return fetch(
    `${endpoint}?pointSaleId=${pointOfSale}&dateConsumption=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.body.consumptions);
};

const consumptionsService = {
  getAll,
};

export default consumptionsService;

const endpoint =
  "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/point-of-sale?scope=internal";

const getAll = (token) => {
  return fetch(`${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => data.pointsOfSale);
}

const pointsOfSaleService = {
  getAll
}

export default pointsOfSaleService
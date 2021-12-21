import apiService from "./api.service";

const getAll = (token) => {
  return fetch(apiService.getEndpoint("POINTOFSALE"), {
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
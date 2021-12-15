const endpoint =
  "https://k1c8hx53c3.execute-api.us-east-2.amazonaws.com/beta/tarjetas-club/service";

const getAll = ({ token, numCard, dateEdition = "25/11/2021" }) => {
  return fetch(`${endpoint}?numCard=${numCard}&dateEdition=${dateEdition}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.services);
      return data.services;
    });
};

const servicesService = {
  getAll,
};

export default servicesService;

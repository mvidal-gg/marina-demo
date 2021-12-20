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

const deletebyId = ({userToken, idConsumption}) => {
  return fetch(
    `${endpoint}/${idConsumption}`,
    {
      method: "DELETE",
      headers: {
        Authorization: userToken,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.body);
};

const insert = ({userToken, consumptions}) => {
  console.log("endpoint =>" + endpoint);
  const _consumptions = {
    "consumptions" : [
      {
        "idPointSale": "1",
        "idService": "34",
        "numCard": "12345678",
        "copies": "1",
        "date": "16/12/2021 12:32:43"
      },
      {
        "idPointSale": "1",
        "idService": "12",
        "numCard": "12345678",
        "copies": "2",
        "date": "16/12/2021 12:32:43"
      },
      {
        "idPointSale": "1",
        "idService": "8",
        "numCard": "12345678",
        "copies": "1",
        "date": "16/12/2021 12:32:43"
      } 
    ]
  }
  return fetch(
    `${endpoint}`,
    {
      method: "POST",
      headers: {
        Authorization: userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_consumptions)
    }
  )
    .then((response) => response.json())
    .then((data) => data.body)

};

const consumptionsService = {
  getAll, insert, deletebyId
};

export default consumptionsService;

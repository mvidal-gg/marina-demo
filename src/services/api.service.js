import configAPI from "../config/configApi.json";
const endpoint =  configAPI.SERVER_URL +  "/" +  configAPI.STAGE +  "/" +  configAPI.API +  "/";

const getEndpoint = (resource) => {
  let _endpoint = endpoint+"configAPI.RESOURCES."+resource+".ENDPOINT";
  console.log("endpoint2 =>" + _endpoint);
  //console.log("eval endpoint =>" + eval(endpoint));
  return _endpoint;
}

const apiService = {
  getEndpoint
}

export default apiService

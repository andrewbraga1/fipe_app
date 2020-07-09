import axios from 'axios';

/* api model 
http://fipeapi.appspot.com/api/1/[tipo]/[acao]/[parametros].json */
let api_version = String(1);
const api = axios.create({
    baseURL: `http://fipeapi.appspot.com/api/${api_version}`
});

export default api;

/*Uso de Axios. Aplicación que muestra el clima de la localización que le pasamos por parámetro*/
const axios = require('axios');


const getLugarLatLng = async(dir) => { //¡UNA FUNCIÓN ASYNC REGRESA SIEMPRE UNA PROMESA!
    //Preparar dirección para que no se malinterprete y de fallo
    const encodeURL = encodeURI(dir);

    /*Instancia de la petición a la API de Axios*/
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeURL}`,
        headers: { 'X-RapidAPI-Key': '73193c40b1mshf7a87fda3df1f52p1f3674jsn251584a50039' }
    });

    /*Ejecutar la Instancia de la petición Axios */
    const resp = await instance.get();
    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    /*
    instance.get()
        .then(resp => {
            console.log(resp.data.Results[0]);
        })
        .catch(err => {
            console.log('ERROR!', err);
        });*/

    const data = resp.data.Results[0];
    const direccion = data.name; //dirección
    const lat = data.lat; //latitud
    const lng = data.lon; //longitud

    return {
        direccion,
        lat,
        lng
    }
}


module.exports = {
    getLugarLatLng
};
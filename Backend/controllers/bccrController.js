var axios = require('axios');
var querystring = require('query-string');
var DOMParser = require('xmldom').DOMParser;
var xmlJson = require('xml-js')

module.exports.get = async (req, res, next) => {







    var jsonRes;


    var todayDate = new Date();
    var BCCRurl = 'https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicosXML';
    var payload = {
        FechaInicio: todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
        FechaFinal: todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear(),
        Nombre: 'N',

        SubNiveles: 'N',
        Indicador: 317,
        CorreoElectronico: "johnpaul899@hotmail.com",
        Token: "U2ANL22FHU",
    };
    var postCompra = axios.post(BCCRurl, querystring.stringify(payload));

    payload.Indicador = 318;

    var postVenta = axios.post(BCCRurl, querystring.stringify(payload));

    jsonRes = await axios.all([postCompra, postVenta]).then(axios.spread(function (compra, venta) {
      
        var compraNode = new DOMParser().parseFromString(compra.data, 'text/xml');
        var ventaNode = new DOMParser().parseFromString(venta.data, 'text/xml');
        return {
            compra: xmlJson.xml2json(compraNode, {
                compact: true,
                spaces: 0
            }),
            venta: xmlJson.xml2json(ventaNode, {
                compact: true,
                spaces: 0
            })
        }


        try {
            //  return compraNode.getElementsByTagName('')
        } catch (error) {
            console.log(error)
        }



    }));

    
    var compra= jsonRes.compra.split("<NUM_VALOR>")[1].substr(0, 6);
    var venta= jsonRes.venta.split("<NUM_VALOR>")[1].substr(0, 6);
    jsonRes.compra = compra;
    jsonRes.venta = venta;



    res.json(jsonRes);
};
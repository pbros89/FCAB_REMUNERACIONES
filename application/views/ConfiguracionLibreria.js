/**
 * Carga de Formularios:
 * Con los globales y las tiendas ya preparados, ahora cargamos los Formularios 1 a 1 por carpeta
 *
 * Esta función deberas modificarla y agregar las carpetas donde crearas los formularios del módulo.
 * @constructor
 */

function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return myNav.indexOf("msie") != -1 ? parseInt(myNav.split("msie")[1]) : false;
}

//TODO Lo que continua, no requiere mayores modificaciones, no toques nada a menos que sepas que estás haciendo.

var loadText = "Preparando el sistema... Por favor espere :)";
body.mask(loadText, "Cargando");

var rutas = [];

rutas[0] = "Tiendas";
rutas[1] = "Globales";
rutas[2] = "Languaje";
rutas[3] = "Menus";
rutas[4] = "Formularios/Home";
rutas[5] = "Formularios/Administracion/Empresa";
rutas[6] = "Formularios/Administracion/CentroCosto";
rutas[7] = "Formularios/Administracion/Cargo";
rutas[8] = "Formularios/Administracion/Usuario";
rutas[9] = "Formularios/Administracion/Concepto";
rutas[10] = "Formularios/Administracion/Parametro";
rutas[11] = "Formularios/Gestion/ProcesoMensual";
rutas[12] = "Formularios/Gestion/IngresarPersonal";
rutas[13] = "Formularios/Gestion/CambioAFP";
rutas[14] = "Formularios/Gestion/CambioSalud";
rutas[15] = "Formularios/Gestion/CambioDeposito";
rutas[16] = "Formularios/Gestion/CambioCargoRenta";
rutas[17] = "Formularios/Gestion/CambioOtros";
rutas[18] = "Formularios/Gestion/CambioSindicato";
rutas[19] = "Formularios/Gestion/CambioBono";
rutas[20] = "Formularios/Gestion/Finiquito";
rutas[21] = "Formularios/Reporte";
rutas[22] = "Formularios/Administracion/DescuentoRRLL";
rutas[23] = "Formularios/Gestion/IngDescuentoRRLL";
rutas[24] = "Formularios/Administracion/HaberRRLL";
rutas[25] = "Formularios/Gestion/IngHaberRRLL";
rutas[26] = "Formularios/Gestion/Ausentismo";
rutas[27] = "Formularios/Administracion/Calendario";
rutas[28] = "Formularios/Gestion/Adjunto";
rutas[29] = "Formularios/Gestion/ISSA";
rutas[30] = "Formularios/WF/Desvinculacion";
rutas[31] = "Formularios/WF/ModificarFicha";
rutas[32] = "Formularios/Gestion/ContactoEmergencia";
rutas[33] = "Formularios/Gestion/Presupuesto";
rutas[34] = "Formularios/Gestion/Indicadores";
rutas[35] = "Formularios/Gestion/Indicadores/Resumen";
rutas[36] = "Formularios/Gestion/Indicadores/DistribucionEtaria";
rutas[37] = "Formularios/Gestion/Indicadores/DistribucionAntiguedad";
rutas[38] = "Formularios/Gestion/Indicadores/DistribucionPais";
rutas[39] = "Formularios/Gestion/Indicadores/DistribucionSexo";
rutas[40] = "Formularios/Gestion/Indicadores/Rotacion";
rutas[41] = "Formularios/Gestion/Indicadores/Dotacion";
rutas[42] = "Formularios/Gestion/Indicadores/CierreMensual";
rutas[43] = "Formularios/Gestion/Indicadores/Ausentismo";

//TODO: Al Final cargar la raiz del sitio.
rutas[44] = "Raiz";

Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

var clearProvider = function () {
  Ext.state.Manager.clear("session_tour_indices");
};

var promises = [
  //Estos archivos seran Syncronicos
  sortec.async.PrometoSyncArchivos(rutas[0]),
  sortec.async.PrometoSyncArchivos(rutas[1]),
  sortec.async.PrometoSyncArchivos(rutas[2]),
  sortec.async.PrometoSyncArchivos(rutas[3]),
  sortec.async.PrometoSyncArchivos(rutas[4]),
  sortec.async.PrometoSyncArchivos(rutas[5]),
  sortec.async.PrometoSyncArchivos(rutas[6]),
  sortec.async.PrometoSyncArchivos(rutas[7]),
  sortec.async.PrometoSyncArchivos(rutas[8]),
  sortec.async.PrometoSyncArchivos(rutas[9]),
  sortec.async.PrometoSyncArchivos(rutas[10]),
  sortec.async.PrometoSyncArchivos(rutas[11]),
  sortec.async.PrometoSyncArchivos(rutas[12]),
  sortec.async.PrometoSyncArchivos(rutas[13]),
  sortec.async.PrometoSyncArchivos(rutas[14]),
  sortec.async.PrometoSyncArchivos(rutas[15]),
  sortec.async.PrometoSyncArchivos(rutas[16]),
  sortec.async.PrometoSyncArchivos(rutas[17]),
  sortec.async.PrometoSyncArchivos(rutas[18]),
  sortec.async.PrometoSyncArchivos(rutas[19]),
  sortec.async.PrometoSyncArchivos(rutas[20]),
  sortec.async.PrometoSyncArchivos(rutas[21]),
  sortec.async.PrometoSyncArchivos(rutas[22]),
  sortec.async.PrometoSyncArchivos(rutas[23]),
  sortec.async.PrometoSyncArchivos(rutas[24]),
  sortec.async.PrometoSyncArchivos(rutas[25]),
  sortec.async.PrometoSyncArchivos(rutas[26]),
  sortec.async.PrometoSyncArchivos(rutas[27]),
  sortec.async.PrometoSyncArchivos(rutas[28]),
  sortec.async.PrometoSyncArchivos(rutas[29]),
  sortec.async.PrometoSyncArchivos(rutas[30]),
  sortec.async.PrometoSyncArchivos(rutas[31]),
  sortec.async.PrometoSyncArchivos(rutas[32]),
  sortec.async.PrometoSyncArchivos(rutas[33]),
  sortec.async.PrometoSyncArchivos(rutas[34]),
  sortec.async.PrometoSyncArchivos(rutas[35]),
  sortec.async.PrometoSyncArchivos(rutas[36]),
  sortec.async.PrometoSyncArchivos(rutas[37]),
  sortec.async.PrometoSyncArchivos(rutas[38]),
  sortec.async.PrometoSyncArchivos(rutas[39]),
  sortec.async.PrometoSyncArchivos(rutas[40]),
  sortec.async.PrometoSyncArchivos(rutas[41]),
  sortec.async.PrometoSyncArchivos(rutas[42]),
  sortec.async.PrometoSyncArchivos(rutas[43]),
  sortec.async.PrometoSyncArchivos(rutas[44])
];

Ext.Promise.all(promises).then(function (values) {
  var i;
  for (i = 0; i < values.length; i++) {
    for (var x = 0; x < values[i].length; x++) {
      Ext.Loader.loadScript({
        url:
          host + "loader/getRecursos?elemento=" + rutas[i] + "/" + values[i][x],
      });
    }
  }
});

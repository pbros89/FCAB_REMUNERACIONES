Ext.define("fcab.Container.WFModificarFichaDetalleResumen", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaDetalleResumen",
  itemId: "WFModificarFichaDetalleResumen",
  width: "100%",
  border: false,
  frame: false,
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    beforerender: function () {
      console.log("entro");
      cargarResumenSolicitudCambiarFichaDetalle();
    }
  },
  items: [
    {
      xtype: "form",
      itemId: "formRes",
      titleAlign: "center",
      border: false,
      frame: false,
      width: '100%',
      padding: 10,
      layout: {
        type: "column",
        align: "strech",
      },

      items: [
        {
          xtype: "fieldset",
          title: "<b>Resumen Solicitud</b>",
          style: "margin: 5px",
          columnWidth: 1,
          layout: {
            type: "column",
            align: "strech",
          },
          items: [
            {
              xtype: "label",
              itemId: "lblError",
              columnWidth: 1,
              style: "margin: 0 10px 0 0",
            },
            {
              xtype: "label",
              itemId: "lblTitulo",
              columnWidth: 1,
              style: "margin: 0 10px 0 0",
            },
            {
              xtype: "label",
              itemId: "lblTrabajador",
              columnWidth: 1,
              style: "margin: 0 10px 0 0",
            },
            {
              xtype: "label",
              itemId: "lblModificar",
              columnWidth: 1,
              style: "margin: 0 10px 0 0",
            },

            {
              xtype: "label",
              itemId: "lblTraslado",
              columnWidth: 1,
              style: "margin: 0 10px 0 0",
            },
          ],
        },
      ],
    },
  ],
});


var cargarResumenSolicitudCambiarFichaDetalle = function() {

  var param = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param2;
  var lblTitulo = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleResumen #lblTitulo"
  )[0];
  var lblTrabajador = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleResumen #lblTrabajador"
  )[0];
  var lblModificar = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleResumen #lblModificar"
  )[0];
  var lblTraslado = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleResumen #lblTraslado"
  )[0];

  var modificarCount = 0;
  var trasladoCount = 0;

  var modificarHtml = '<table width="100%">' +
                      "<tr>" +
                      "<td><b><u>Modificar Datos</u></b></td>" +
                      "</tr>" +
                      "</table><br>";

  var trasladoHtml = '<table width="100%">' +
                      "<tr>" +
                      "<td><b><u>Anexo Vinculante</u></b></td>" +
                      "</tr>" +
                      "</table><br>";

  var trabajadores = storeCargarSolicitudesCambioFichaDet.data.items;

  /****** MODIFICAR DATOS *******/

  if (param.OBSERVACION != null && param.OBSERVACION != '') {
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Observación:</b> ' + param.OBSERVACION + '</td>' +
      "</tr>" +
      "</table><br>";

    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Observación:</b> ' + param.OBSERVACION + '</td>' +
      "</tr>" +
      "</table><br>";
  }
  if (param.COD_MOTIVO != null && param.COD_MOTIVO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Motivo:</b> ' + param.NOM_MOTIVO + '</td>' +
      "</tr>" +
      "</table><br>";
  }


  if (param.SUELDO != null && param.SUELDO != '' && param.SUELDO != '0' ) {
    modificarCount++;
    textMidPoint = param.MID_POINT == '1' ? ' <b>Supera mid-point</b>': '';
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Sueldo Nuevo:</b> ' + moneyFormat(param.SUELDO) + textMidPoint +'</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_CARGO != null && param.COD_CARGO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Cargo Nuevo:</b> ' + param.NOM_CARGO + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_CC != null && param.COD_CC != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Centro de Costo Nuevo:</b> ' + param.COD_CC + " - " +  param.NOM_CC +'</td>' +
      "</tr>" +
      "<tr>" +
      "<td><b>Gerencia Nueva: </b> " + param.NOM_GERENCIA + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Departamento Nuevo: </b> " + param.NOM_DEPARTAMENTO + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Jefatura Nueva: </b> " +param.NOMBRE_JEFE + "</td>" +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_PLAZO != null && param.COD_PLAZO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Plazo Nuevo:</b> ' + param.NOM_PLAZO + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_JORNADA != null && param.COD_JORNADA != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Jornada Nueva:</b> ' + param.NOM_JORNADA + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_LUGAR != null && param.COD_LUGAR != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Lugar de Trabajo Nuevo:</b> ' +  param.NOM_LUGAR + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.COD_CONTRATO != null && param.COD_CONTRATO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Contrato Nuevo:</b> ' + param.NOM_CONTRATO + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  /*** TRASLADO ****/
  if (param.TRAS_COD_CC != null && param.TRAS_COD_CC != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>CC Propuesto:</b> '+ param.TRAS_COD_CC + '-' + param.TRAS_NOM_CC + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.TRAS_COD_CARGO != null && param.TRAS_COD_CARGO != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Cargo Propuesto:</b> ' + param.TRAS_NOM_CARGO + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.TRAS_COD_CONTRATO != null && param.TRAS_COD_CONTRATO != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Contrato Propuesto:</b> ' + param.TRAS_COD_CONTRATO + '-' + param.TRAS_NOM_CONTRATO + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (param.TRAS_INI != null && param.TRAS_INI != '' && 
  param.TRAS_FIN != null && param.TRAS_FIN != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b> ' + param.TRAS_INI + '</td>' +
      '<td width="50%"><b>Traslado Termina:</b> ' + param.TRAS_FIN + '</td>' +
      "</tr>" +
      "</table><br>";
  }


  if (param.TRAS_INI != null && param.TRAS_INI != '' && 
  param.TRAS_INDEFINIDO  == '1') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b> ' + param.TRAS_INI + '</td>' +
      '<td width="50%"><b>Traslado Termina:</b> Indefinido</td>' +
      "</tr>" +
      "</table><br>";
  }


  if(param.PERIODO != null && param.PERIODO != '') {
    lblTitulo.setHtml('<table width="100%" ><tr>' +
      "<td><b>Solicitante:</b> " +
      param.USR_CREADOR +
      "</td>" +
      '<td align="right"><b>Periodo:</b> '+param.PERIODO+'</td>' +
      "</tr><tr><td><b>Fecha Creación:</b> " +param.FECHA_CREACION+ "</td><td></td></tr></table><br>",);
  }

  if (trabajadores != null && trabajadores.length > 0) {

    var html = '<table width="100%"><tr>' +
      "<td><b><u>Trabajadores</u></b></td></tr></table><br>";
    for (let index = 0; index < trabajadores.length; index++) {
      const element = trabajadores[index].data;
      console.log(element);
      html += '<table width="100%"><tr><td style="border: 1px solid black; padding:10px">' + element.RUT + " " + element.NOMBRE + "</td></tr></table><br>";

    }
    lblTrabajador.setHtml(html);
  }

  lblModificar.setHtml(null);
  lblTraslado.setHtml(null);

  if (modificarCount > 0) {
    lblModificar.setHtml(modificarHtml);
  }

  if (trasladoCount > 0) {
    lblTraslado.setHtml(trasladoHtml);
  }

}




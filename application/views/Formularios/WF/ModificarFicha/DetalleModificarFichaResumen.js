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

      padding: 10,
      autoScroll: true,
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

var cargarResumenSolicitudCambiarFichaDetalle = function () {

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
                      "<td><b><u>Anexo Traslado Temporal / Reemplazo</u></b></td>" +
                      "</tr>" +
                      "</table><br>";


  /****** MODIFICAR DATOS *******/

  if(param.MOTIVO_CAMBIO != null && param.MOTIVO_CAMBIO != '') {
    //modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Motivo modificación: </b><br>'+param.MOTIVO_CAMBIO+'</td>' +
      "</tr></table><br>";
  }

  if(param.SUELDO != null && param.SUELDO != '' && param.SUELDO != '0' ) {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Sueldo Actual: </b><br>'+param.SUELDO_OLD+'</td>' +
      '<td width="50%"><b>Sueldo Nuevo:</b><br>'+param.SUELDO+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_SUELDO+'</td>' +
      "</tr></table><br>";
  }

  if(param.COD_CARGO != null && param.COD_CARGO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Cargo Actual: </b><br>'+param.NOM_CARGO_OLD+'</td>' +
      '<td width="50%"><b>Cargo Nuevo:</b><br>'+param.NOM_CARGO+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_CARGO+'</td>' +
      "</tr></table><br>";
  }

  if(param.COD_CC != null && param.COD_CC != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Centro de Costo Actual: </b><br>'+param.COD_CC_OLD+"-"+param.NOM_CC_OLD+'</td>' +
      '<td width="50%"><b>Centro de Costo Nuevo:</b><br>'+param.COD_CC+"-"+param.NOM_CC+'</td>' +
      "</tr>" +
      "<tr>" +
      "<td><b>Gerencia Actual: </b><br>"+param.NOM_GERENCIA_OLD+"</td>" +
      "<td><b>Gerencia Nueva: </b><br>"+param.NOM_GERENCIA+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Departamento Actual: </b><br>"+param.NOM_DEPARTAMENTO_OLD+"</td>" +
      "<td><b>Departamento Nuevo: </b><br>"+param.NOM_DEPARTAMENTO+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Jefatura Actual: </b><br>"+(param.RUT_JEFE_OLD != null ? param.RUT_JEFE_OLD+ " " + param.NOMBRE_JEFE_OLD :  '')+"</td>" +
      "<td><b>Jefatura Nueva: </b><br>"+(param.RUT_JEFE != null ? param.RUT_JEFE+ " " + param.NOMBRE_JEFE : '')+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan=2><b>Comentario: </b><br>"+param.OBS_CC+"</td>" +
      "</tr></table><br>";
  }

  if(param.COD_PLAZO  != null && param.COD_PLAZO != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Plazo Actual: </b><br>'+param.NOM_PLAZO_OLD+'</td>' +
      '<td width="50%"><b>Plazo Nuevo:</b><br>'+param.NOM_PLAZO+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_PLAZO+'</td>' +
      "</tr></table><br>";
  }

  if(param.COD_JORNADA != null && param.COD_JORNADA != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Jornada Actual: </b><br>'+param.NOM_JORNADA_OLD+'</td>' +
      '<td width="50%"><b>Jornada Nueva:</b><br>'+param.NOM_JORNADA+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_JORNADA+'</td>' +
      "</tr></table><br>";
  }

  if(param.COD_LUGAR != null && param.COD_LUGAR != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Lugar de Trabajo Actual: </b><br>'+param.NOM_LUGAR_OLD+'</td>' +
      '<td width="50%"><b>lugar de Trabajo Nuevo:</b><br>'+param.NOM_LUGAR+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_LUGAR+'</td>' +
      "</tr></table><br>";
  }

  if(param.DESC_BONOS != null && param.DESC_BONOS != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Bonos asignaciones y otras: </b><br>'+param.DESC_BONOS+'</td>' +
      "</tr></table><br>";
  }

  

  

  /*** TRASLADO ****/

  if(param.TRAS_COD_CARGO != null && param.TRAS_COD_CARGO != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Cargo Actual: </b><br>'+param.NOM_CARGO_OLD+'</td>' +
      '<td width="50%"><b>Cargo Propuesto:</b><br>'+param.TRAS_NOM_CARGO+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+param.OBS_TRAS_CARGO+'</td>' +
      "</tr></table><br>";
  }

  if(param.TRAS_INI != null && param.TRAS_INI != '' && 
  param.TRAS_FIN != null && param.TRAS_FIN != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b><br>'+param.TRAS_INI+'</td>' +
      '<td width="50%"><b>Traslado Termina:</b><br>'+param.TRAS_FIN+'</td>' +
      "</tr>" +
      "</table><br>";
  }


  if(param.TRAS_TIENE_BONO != null && param.TRAS_TIENE_BONO != '0' && 
    param.TRAS_BONO != null && param.TRAS_BONO != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Bono Reemplazo: </b><br>'+param.TRAS_BONO+'</td>' +
      "</tr>" +
      "</table><br>";
  }else if(param.TRAS_TIENE_BONO != '1' ){
    if(trasladoCount == 2)
    {
      '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
        '<td><b>Bono de Reemplazo: </b><br>Sin bono de reemplazo</td>' +
        "</tr>" +
      "</table><br>";
      trasladoCount++;
    }
  }


  if(param.PERIODO != null && param.PERIODO != '') {
    lblTitulo.setHtml('<table width="100%" ><tr>' +
      "<td><b>Solicitante:</b> " +
      param.USR_CREADOR +
      "</td>" +
      '<td align="right"><b>Periodo:</b> '+param.PERIODO+'</td>' +
      "</tr><tr><td><b>Fecha Creación:</b> " +param.FECHA_CREACION+ "</td><td></td></tr></table>",);
  }

  if(param.RUT != null && param.RUT != '') {
    lblTrabajador.setHtml('<table width="100%" ><tr>' +
    "<td><b>Trabajador:</b> "+param.RUT + " " + param.NOMBRE+"</td>" +
    "</tr></table> <br>",);
  }

  lblModificar.setHtml(null);
  lblTraslado.setHtml(null);

  if(modificarCount > 0) {
    lblModificar.setHtml(modificarHtml);
  }

  if(trasladoCount > 0) {
    lblTraslado.setHtml(trasladoHtml);
  }
  
  if(modificarCount > 0 && trasladoCount == 0 ||
    modificarCount == 0 && trasladoCount == 3 ||
    modificarCount > 0 && trasladoCount == 3) {
      return true;
    }else{
      return false;
    }

};

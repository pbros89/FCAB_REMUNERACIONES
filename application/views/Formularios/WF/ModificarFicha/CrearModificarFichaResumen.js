Ext.define("fcab.Container.WFModificarFichaCrearResumen", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearResumen",
  itemId: "WFModificarFichaCrearResumen",
  width: "100%",
  border: false,
  frame: false,
  constructor: function (config) {
    this.callParent([config]);
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
          xtype: "container",
          columnWidth: 1,
          layout: {
            type: "hbox",
            align: "bottom",
            pack: "end",
          },
          items: [
            {
              xtype: "button",
              scale: 'large',
              text: 'Crear Solicitud',
              handler: function() {
                if(cargarResumenSolicitudcambiarFicha()) {
                  //FOMULARIO CORRECTO, CREAR SOLICITUD
                  crearSolicitudModificarFicha();

                }else{
                  Ext.MessageBox.show({
                    title: 'ADVERTENCIA',
                    msg: "Ingrese almenos una modificación y/o el formulario de traslado completo.",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK
                });
                }
              }
            },
          ],
        },
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

var cargarResumenSolicitudcambiarFicha = function () {

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
  
  var formTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTraslado #formTras"
  )[0];
  
  var lblError = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearResumen #lblError"
  )[0];

  var lblTitulo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearResumen #lblTitulo"
  )[0];
  var lblTrabajador = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearResumen #lblTrabajador"
  )[0];
  var lblModificar = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearResumen #lblModificar"
  )[0];
  var lblTraslado = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearResumen #lblTraslado"
  )[0];

  var cbPeriodo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrear #cbPeriodo"
  )[0];
  var cbTrabajador = Ext.ComponentQuery.query(
    "#WFModificarFichaCrear #cbTrabajador"
  )[0];

  var txtSueldo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldo"
  )[0];
  var txtSueldoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoObs"
  )[0];
  var txtSueldoOld = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoOld"
  )[0];


  var cbCargo= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0];
  var txtCargoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoObs"
  )[0];
  var txtCargoOld = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoOld"
  )[0];

  var cbPlazo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0];
  var txtPlazoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoObs"
  )[0];
  var txtPlazoOld = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoOld"
  )[0];

  var txtBono = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtBono"
  )[0];

  var cbJornada = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0];
  var txtJornadaObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaObs"
  )[0];
  var txtJornadaOld = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaOld"
  )[0];

  var cbLugar = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0];
  var txtLugarObs= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarObs"
  )[0];
  var txtLugarOld= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarOld"
  )[0];

  var cbCC = Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0];
  var txtCCObs= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCObs"
  )[0];
  var txtCCOld = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCOld"
  )[0];

  var txtGerencia = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtGerencia')[0];
  var txtDepartamento = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtDepartamento')[0];
  var txtJefe = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtJefe')[0];
  var txtGerenciaOld = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtGerenciaOld')[0];
  var txtDepartamentoOld = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtDepartamentoOld')[0];
  var txtJefeOld = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtJefeOld')[0];
  var txtMotivo = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtMotivo')[0];
  

  var cbCargoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargoTras"
  )[0];

  /****** MODIFICAR DATOS *******/

  if(txtMotivo.getValue() != null && txtMotivo.getValue() != '') {
    //modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Motivo modificación: </b><br>'+txtMotivo.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(txtSueldo.getValue() != null && txtSueldo.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Sueldo Actual: </b><br>'+txtSueldoOld.getValue()+'</td>' +
      '<td width="50%"><b>Sueldo Nuevo:</b><br>'+txtSueldo.getValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+txtSueldoObs.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(cbCargo.getValue() != null && cbCargo.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Cargo Actual: </b><br>'+txtCargoOld.getValue()+'</td>' +
      '<td width="50%"><b>Cargo Nuevo:</b><br>'+cbCargo.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+txtCargoObs.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(cbCC.getValue() != null && cbCC.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Centro de Costo Actual: </b><br>'+txtCCOld.getValue()+'</td>' +
      '<td width="50%"><b>Centro de Costo Nuevo:</b><br>'+cbCC.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      "<td><b>Gerencia Actual: </b><br>"+txtGerenciaOld.getValue()+"</td>" +
      "<td><b>Gerencia Nueva: </b><br>"+txtGerencia.getValue()+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Departamento Actual: </b><br>"+txtDepartamentoOld.getValue()+"</td>" +
      "<td><b>Departamento Nuevo: </b><br>"+txtDepartamento.getValue()+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Jefatura Actual: </b><br>"+txtJefeOld.getValue()+"</td>" +
      "<td><b>Jefatura Nueva: </b><br>"+txtJefe.getValue()+"</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan=2><b>Comentario: </b><br>"+txtCCObs.getValue()+"</td>" +
      "</tr></table><br>";
  }

  if(cbPlazo.getValue() != null && cbPlazo.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Plazo Actual: </b><br>'+txtPlazoOld.getValue()+'</td>' +
      '<td width="50%"><b>Plazo Nuevo:</b><br>'+cbPlazo.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+txtPlazoObs.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(cbJornada.getValue() != null && cbJornada.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Jornada Actual: </b><br>'+txtJornadaOld.getValue()+'</td>' +
      '<td width="50%"><b>Jornada Nueva:</b><br>'+cbJornada.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+txtJornadaObs.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(cbLugar.getValue() != null && cbLugar.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Lugar de Trabajo Actual: </b><br>'+txtLugarOld.getValue()+'</td>' +
      '<td width="50%"><b>lugar de Trabajo Nuevo:</b><br>'+cbLugar.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+txtLugarObs.getValue()+'</td>' +
      "</tr></table><br>";
  }

  if(txtBono.getValue() != null && txtBono.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Bonos asignaciones y otras: </b><br>'+txtBono.getValue()+'</td>' +
      "</tr></table><br>";
  }

  

  

  /*** TRASLADO ****/

  var formTrasFinal = formTras.getForm();
  var valuesTras = formTrasFinal.getValues();

  console.log(valuesTras);
  if(valuesTras.cbCargoTras != null && valuesTras.cbCargoTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Cargo Actual: </b><br>'+valuesTras.txtCargoOldTras+'</td>' +
      '<td width="50%"><b>Cargo Propuesto:</b><br>'+cbCargoTras.getRawValue()+'</td>' +
      "</tr>" +
      "<tr>" +
      '<td colspan=2><b>Comentario: </b><br>'+valuesTras.txtCargoObsTras+'</td>' +
      "</tr></table><br>";
  }

  if(valuesTras.dtIniTras != null && valuesTras.dtIniTras != '' && 
  valuesTras.dtFinTras != null && valuesTras.dtFinTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b><br>'+valuesTras.dtIniTras+'</td>' +
      '<td width="50%"><b>Traslado Termina:</b><br>'+valuesTras.dtFinTras+'</td>' +
      "</tr>" +
      "</table><br>";
  }


  if(valuesTras.rbBono != null && valuesTras.rbBono != '0' && 
    valuesTras.txtMonto != null && valuesTras.txtMonto != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td><b>Bono Reemplazo: </b><br>'+valuesTras.txtMonto+'</td>' +
      "</tr>" +
      "</table><br>";
  }else if(valuesTras.rbBono != '1' ){
    if(trasladoCount == 2)
    {
      '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
        '<td><b>Bono de Reemplazo: </b><br>Sin bono de reemplazo</td>' +
        "</tr>" +
      "</table><br>";
      trasladoCount++;
    }
  }


  if(cbPeriodo.getValue() != null && cbPeriodo.getValue() != '') {
    lblTitulo.setHtml('<table width="100%" ><tr>' +
      "<td><b>Solicitante:</b> " +
      NOMBRE +
      "</td>" +
      '<td align="right"><b>Periodo:</b> '+cbPeriodo.getValue()+'</td>' +
      "</tr></table>",);
  }

  if(cbTrabajador.getValue() != null && cbTrabajador.getValue() != '') {
    lblTrabajador.setHtml('<table width="100%" ><tr>' +
    "<td><b>Trabajador:</b> "+cbTrabajador.getRawValue()+"</td>" +
    "</tr></table> <br>",);
  }

  lblError.setHtml(null)
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
      lblError.setHtml('<table width="100%" style="border: 1px solid black; padding:10px; border-color: red; color:red;"><tr>' +
      '<td><b>Ingrese almenos una modificación y/o el formulario de traslado completo.</b></td>' +
      "</tr>" +
      "</table><br>");
      return false;
    }

};


var crearSolicitudModificarFicha = function() {

  var param = Ext.getCmp('WFModificarFichaCrear').myExtraParams.param2;

  console.log(param);
  var formTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTraslado #formTras"
  )[0];
  var formTrasFinal = formTras.getForm();
  var valuesTras = formTrasFinal.getValues();

  var cbPeriodo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrear #cbPeriodo"
  )[0];
  var cbTrabajador = Ext.ComponentQuery.query(
    "#WFModificarFichaCrear #cbTrabajador"
  )[0];

  var txtSueldo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldo"
  )[0];
  var txtSueldoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoObs"
  )[0];

  var cbCargo= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0];
  var txtCargoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoObs"
  )[0];

  var cbPlazo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0];
  var txtPlazoObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoObs"
  )[0];

  var txtBono = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtBono"
  )[0];

  var cbJornada = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0];
  var txtJornadaObs = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaObs"
  )[0];

  var cbLugar = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0];
  var txtLugarObs= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarObs"
  )[0];

  var cbCC = Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0];
  var txtCCObs= Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCObs"
  )[0];

  var txtMotivo = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtMotivo')[0];
  

  var cbCargoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargoTras"
  )[0];

  Ext.MessageBox.confirm('Crear Solicitud', '¿Está seguro de crear la solicitud?<br><b>La solicitud no podra ser modificada luego de ser creada.</b>', function(btn) {
    if (btn === 'yes') {
      Ext.MessageBox.show({
        msg: 'Cambiando Etapa',
        progressText: 'Espere por favor...',
        width: 300,
        wait: {
            interval: 200
        }
      });

        storeCrearSolicitudCambioFicha.load({
          params: {
            P_COD_CARGO: cbCargo.getValue() != null ? cbCargo.getValue() : '',
            P_NOM_CARGO: cbCargo.getValue() != null ? cbCargo.selection.data.NOMBRE : '',
            P_COD_CC: cbCC.getValue() != null ? cbCC.getValue() : '', 
            P_NOM_CC: cbCC.getValue() != null ? cbCC.selection.data.NOMBRE : '',
            P_COD_PLAZO: cbPlazo.getValue() != null ? cbPlazo.getValue() : '', 
            P_NOM_PLAZO: cbPlazo.getValue() != null ? cbPlazo.selection.data.NOMBRE : '',
            P_COD_JORNADA: cbJornada.getValue() != null ? cbJornada.getValue() : '', 
            P_NOM_JORNADA: cbJornada.getValue() != null ? cbJornada.selection.data.NOMBRE : '',
            P_COD_LUGAR: cbLugar.getValue() != null ? cbLugar.getValue() : '', 
            P_NOM_LUGAR: cbLugar.getValue() != null ? cbLugar.selection.data.NOMBRE : '',
            P_DESC_BONOS: txtBono.getValue() != null ? txtBono.getValue() : '',
            P_SUELDO: txtSueldo.getValue(),
            P_OBS_CARGO: txtCargoObs.getValue(),
            P_OBS_CC: txtCCObs.getValue(),
            P_OBS_PLAZO: txtPlazoObs.getValue(),
            P_OBS_JORNADA: txtJornadaObs.getValue(),
            P_OBS_LUGAR: txtLugarObs.getValue(),
            P_OBS_SUELDO: txtSueldoObs.getValue(),
            P_TRAS_COD_CARGO: cbCargoTras.getValue(),
            P_TRAS_NOM_CARGO: cbCargoTras.getValue() != null ? cbCargoTras.selection.data.NOMBRE : '',
            P_OBS_TRAS_CARGO: valuesTras.txtCargoObsTras,
            P_TRAS_INI: valuesTras.dtIniTras,
            P_TRAS_FIN: valuesTras.dtFinTras,
            P_TRAS_TIENE_BONO: valuesTras.rbBono,
            P_TRAS_BONO: valuesTras.txtMonto,
            P_MOTIVO_CAMBIO: txtMotivo.getValue(),
            P_USUARIO: NOMBRE,
            P_COD_EMP: EMPRESA,
            P_NOM_EMP: NOM_EMPRESA,
            P_FK_PERSONAL: cbTrabajador.getValue(),
            P_ESTADO: 'ACTIVO',
            P_ROL_WF: param.PK_ROL_WF,
            P_COD_CC_SOL: cbTrabajador.selection.data.COD_CC,
            P_PERIODO: cbPeriodo.getValue()
          },
          callback: function(records, operation, success) {
            Ext.MessageBox.hide();
            if(records != null) {
                if(records[0].data.r_msg == 'OK'){
                    showToast('Solicitud creada correctamente');
                    cargarWFModificarFicha(null);
                    Ext.getCmp('WFModificarFichaCrear').destroy();
                }else{
                    Ext.MessageBox.show({
                        title: 'ADVERTENCIA',
                        msg: records[0].data.r_msg,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }
            }
            
          }
      });
    }
  });
}

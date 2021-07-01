Ext.define("fcab.Container.WFModificarFichaCrearResumen", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearResumen",
  itemId: "WFModificarFichaCrearResumen",
  width: "100%",
  border: false,
  frame: false,
  layout: 'fit',
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
      flex: 1,
      padding: 10,
      autoScroll: true,
      layout: {
        type: "vbox",
        align: "strech",
      },

      items: [
        {
          xtype: "container",
          width: '100%',
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
              handler: function () {
                if (cargarResumenSolicitudcambiarFicha()) {
                  //FOMULARIO CORRECTO, CREAR SOLICITUD
                  crearSolicitudModificarFicha();

                } else {
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
          width: '100%',
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
  var modificarMotivo = 0;
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

  var txtSueldo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldo"
  )[0];

  var checkMidPoint = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #checkMidPoint"
  )[0];

  var cbCargo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0];

  var cbPlazo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0];

  var cbJornada = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0];

  var cbLugar = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0];

  var cbContrato = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbContrato"
  )[0];

  var cbMotivo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbMotivo"
  )[0];

  var txtMotivo = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtMotivo')[0];


  var cbCC = Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0];

  var txtGerencia = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtGerencia')[0];
  var txtDepartamento = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtDepartamento')[0];
  var txtJefe = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtJefe')[0];

  var cbCargoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargoTras"
  )[0];

  var cbContratoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbContratoTras"
  )[0];

  var cbCCTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCCTras"
  )[0];

  var grid = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccionGrilla')[0];
  var storeTrabajadores = grid.getStore();
  var trabajadores = storeTrabajadores.data.items;

  /****** MODIFICAR DATOS *******/
  if (cbMotivo.getValue() != null && cbMotivo.getValue() != '') {
    modificarMotivo++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Motivo:</b> ' + cbMotivo.getRawValue() + '</td>' +
      "</tr>" +
      '<tr>' +
      '<td width="100%"><b>Observación:</b> ' + txtMotivo.getValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }


  if (txtSueldo.getValue() != null && txtSueldo.getValue() != '') {
    modificarCount++;
    textMidPoint = checkMidPoint.getValue() ? ' <b>Supera mid-point</b>': '';
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Sueldo Nuevo:</b> ' + moneyFormat(txtSueldo.getValue()) + textMidPoint + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (cbCargo.getValue() != null && cbCargo.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Cargo Nuevo:</b> ' + cbCargo.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (cbCC.getValue() != null && cbCC.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Centro de Costo Nuevo:</b> ' + cbCC.getRawValue() + '</td>' +
      "</tr>" +
      "<tr>" +
      "<td><b>Gerencia Nueva: </b> " + txtGerencia.getValue() + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Departamento Nuevo: </b> " + txtDepartamento.getValue() + "</td>" +
      "</tr>" +
      "<tr>" +
      "<td><b>Jefatura Nueva: </b> " + txtJefe.getValue() + "</td>" +
      "</tr>" +
      "</table><br>";
  }

  if (cbPlazo.getValue() != null && cbPlazo.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Plazo Nuevo:</b> ' + cbPlazo.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (cbJornada.getValue() != null && cbJornada.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Jornada Nueva:</b> ' + cbJornada.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (cbLugar.getValue() != null && cbLugar.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Lugar de Trabajo Nuevo:</b> ' + cbLugar.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (cbContrato.getValue() != null && cbContrato.getValue() != '') {
    modificarCount++;
    modificarHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Contrato Nuevo:</b> ' + cbContrato.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  /*** TRASLADO ****/

  var formTrasFinal = formTras.getForm();
  var valuesTras = formTrasFinal.getValues();

  console.log(valuesTras);
  if (valuesTras.cbCCTras != null && valuesTras.cbCCTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>CC Propuesto:</b> ' + cbCCTras.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (valuesTras.cbCargoTras != null && valuesTras.cbCargoTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Cargo Propuesto:</b> ' + cbCargoTras.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (valuesTras.cbContratoTras != null && valuesTras.cbContratoTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="100%"><b>Contrato Propuesto:</b> ' + cbContratoTras.getRawValue() + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (valuesTras.dtIniTras != null && valuesTras.dtIniTras != '' &&
    valuesTras.dtFinTras != null && valuesTras.dtFinTras != '') {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b> ' + valuesTras.dtIniTras + '</td>' +
      '<td width="50%"><b>Traslado Termina:</b> ' + valuesTras.dtFinTras + '</td>' +
      "</tr>" +
      "</table><br>";
  }

  if (valuesTras.dtIniTras != null && valuesTras.dtIniTras != '' &&
    valuesTras.checkTermino) {
    trasladoCount++;
    trasladoHtml += '<table width="100%" style="border: 1px solid black; padding:10px"><tr>' +
      '<td width="50%"><b>Traslado Inicia: </b> ' + valuesTras.dtIniTras + '</td>' +
      '<td width="50%"><b>Traslado Termina:</b> Indefinido </td>' +
      "</tr>" +
      "</table><br>";
  }


  if (cbPeriodo.getValue() != null && cbPeriodo.getValue() != '') {
    lblTitulo.setHtml('<table width="100%" ><tr>' +
      "<td><b>Solicitante:</b> " +
      NOMBRE +
      "</td>" +
      '<td align="right"><b>Periodo:</b> ' + cbPeriodo.getValue() + '</td>' +
      "</tr></table><br>");
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

  lblError.setHtml(null)
  lblModificar.setHtml(null);
  lblTraslado.setHtml(null);

  if (modificarCount > 0) {
    lblModificar.setHtml(modificarHtml);
  }

  if (trasladoCount > 0) {
    lblTraslado.setHtml(trasladoHtml);
  }

  if (trabajadores.length > 0) {
    if (modificarMotivo > 0 && modificarCount > 0 && trasladoCount == 0 ||
      modificarCount == 0 && trasladoCount == 4 ||
      modificarCount > 0 && trasladoCount == 4) {
      return true;
    } else {
      lblError.setHtml('<table width="100%" style="border: 1px solid black; padding:10px; border-color: red; color:red;"><tr>' +
        '<td><b>Ingrese almenos una modificación o el formulario de traslado completo.</b></td>' +
        "</tr>" +
        "</table><br>");
      return false;
    }
  }else {
    lblError.setHtml('<table width="100%" style="border: 1px solid black; padding:10px; border-color: red; color:red;"><tr>' +
        '<td><b>Debe seleccionar al menos un trabajador.</b></td>' +
        "</tr>" +
        "</table><br>");
      return false;
  }

};


var crearSolicitudModificarFicha = function () {

  var param = Ext.getCmp('WFModificarFichaCrear').myExtraParams.param2;
  var grid = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccionGrilla')[0];
  var storeTrabajadores = grid.getStore();
  var trabajadores = storeTrabajadores.data.items;

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

  var checkMidPoint = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #checkMidPoint"
  )[0];

  var cbCargo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0];

  var cbPlazo = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0];

  var cbJornada = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0];

  var cbLugar = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0];


  var cbCC = Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0];


  var txtMotivo = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #txtMotivo')[0];

  var cbMotivo = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #cbMotivo')[0];

  var cbTipoForm = Ext.ComponentQuery.query('#WFModificarFichaCrear #cbTipoForm')[0];

  var cbContrato = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #cbContrato')[0];



  var cbCargoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargoTras"
  )[0];

  var cbCCTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCCTras"
  )[0];

  var cbContratoTras = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbContratoTras"
  )[0];

  var checkTermino = Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #checkTermino"
  )[0];

  Ext.MessageBox.confirm('Crear Solicitud', '¿Está seguro de crear la solicitud?<br><b>La solicitud no podra ser modificada luego de ser creada.</b>', function (btn) {
    if (btn === 'yes') {
      Ext.MessageBox.show({
        msg: 'Creando Solicitud',
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
          P_SUELDO: txtSueldo.getValue(),
          P_TRAS_COD_CARGO: cbCargoTras.getValue(),
          P_TRAS_NOM_CARGO: cbCargoTras.getValue() != null ? cbCargoTras.selection.data.NOMBRE : '',
          P_TRAS_INI: valuesTras.dtIniTras,
          P_TRAS_FIN: valuesTras.dtFinTras,
          P_TRAS_TIENE_BONO: "0",
          P_TRAS_BONO: "0",//valuesTras.txtMonto,
          P_USUARIO: NOMBRE,
          P_COD_EMP: EMPRESA,
          P_NOM_EMP: NOM_EMPRESA,
          P_ESTADO: 'ACTIVO',
          P_ROL_WF: param.PK_ROL_WF,
          P_COD_CC_SOL: cbTrabajador.selection.data.COD_CC,
          P_PERIODO: cbPeriodo.getValue(),
          P_OBSERVACION: cbTipoForm.getValue() == "MODIFICAR" ? txtMotivo.getValue() : valuesTras.txtCargoObsTras,
          P_COD_CONTRATO: cbContrato.getValue() != null ? cbContrato.getValue() : '',
          P_NOM_CONTRATO: cbContrato.getValue() != null ? cbContrato.selection.data.INFO : '',
          P_TIPO: cbTipoForm.getValue(),
          P_COD_MOTIVO: cbMotivo.getValue() != null ? cbMotivo.getValue() : '',
          P_NOM_MOTIVO: cbMotivo.getValue() != null ? cbMotivo.getRawValue() : '',
          P_TRAS_COD_CC: cbCCTras.getValue(),
          P_TRAS_NOM_CC: cbCCTras.getValue() != null ? cbCCTras.selection.data.NOMBRE : '',
          P_TRAS_COD_CONTRATO: cbContratoTras.getValue(),
          P_TRAS_NOM_CONTRATO: cbContratoTras.getValue() != null ? cbContratoTras.selection.data.INFO : '',
          P_TRAS_INDEFINIDO: checkTermino.getValue() ? '1' : '0',
          P_MID_POINT: checkMidPoint.getValue() ? '1' : '0',
        },
        callback: function (records, operation, success) {
          if (records != null) {
            if (records[0].data.r_msg == 'OK') {
              console.log(records);
              const item = records[0].data;

              crearSolicitudModificarFichaDet(
                records[0].data,
                trabajadores,
                0
              );
              //console.log(item);
              /*storeEnviarCorreoCambioEtapaWFCambioFicha.load({
                params: {
                  P_ID: item.r_id,
                  P_ROL_WF: item.r_rol,
                  P_COD_EMP: EMPRESA,
                  P_COD_CC: cbTrabajador.selection.data.COD_CC,
                  P_ESTADO_SOL: item.r_est_sol
                },
              });*/
              
            } else {
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


var crearSolicitudModificarFichaDet = function (item, trabajadores, index) {
  console.log(index + " " + trabajadores.length);
  console.log(item);
  var idSolicitud = item.r_id;
  var cbTrabajador = Ext.ComponentQuery.query(
    "#WFModificarFichaCrear #cbTrabajador"
  )[0];
  var idPersonal = trabajadores[index].data.PK_PERSONAL;
  index++;
  storeCrearSolicitudCambioFichaDet.load(
    {
      params: {
        P_ID_SOLICITUD: idSolicitud,
        P_ID_PERSONAL: idPersonal,
        P_USUARIO: NOMBRE
      },

      callback: function (records, operation, success) {
        if (records[0].data.r_msg == 'OK') {
          if (index < trabajadores.length) {
            crearSolicitudModificarFichaDet(item, trabajadores, index);
          }else{
            
              console.log(item);
              storeEnviarCorreoCambioEtapaWFCambioFicha.load({
                params: {
                  P_ID: item.r_id,
                  P_ROL_WF: item.r_rol,
                  P_COD_EMP: EMPRESA,
                  P_COD_CC: cbTrabajador.selection.data.COD_CC,
                  P_ESTADO_SOL: item.r_est_sol
                },
              });

              Ext.MessageBox.hide();
              cargarWFModificarFicha(null);
              showToast('Solicitud creada correctamente');
              Ext.getCmp('WFModificarFichaCrear').destroy();
          }
        }
      }

    }
  )
}

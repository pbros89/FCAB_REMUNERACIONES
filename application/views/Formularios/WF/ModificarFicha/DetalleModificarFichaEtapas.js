Ext.define("fcab.Container.WFModificarFichaDetalleEtapas", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaDetalleEtapas",
  itemId: "WFModificarFichaDetalleEtapas",
  width: "100%",
  border: false,
  frame: false,
  layout: 'fit',
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    beforerender: function () {
      cargarEtapasSolicitudCambiarFichaDetalle();
    }
  },
  items: [
    {
      xtype: "form",
      itemId: "formEtapa",
      titleAlign: "center",
      border: false,
      frame: false,
      width: '100%',
      padding: 10,
      layout: {
        type: "vbox",
        align: "strech",
      },

      items: [
        {
          xtype: "container",
          itemId: 'pnlBtn',
          width: '100%',
          layout: {
            type: "hbox",
            align: "bottom",
            pack: "end",
          },
          items: [
            {
              xtype: "button",
              text: "Aprobar",
              scale: 'large',
              style: 'background-color: green;',
              margin: '0 10 0 0',
              handler: function () {
                ventanaDinamica(
                  "WFModificarFichaDetalleEtapasObservacion",
                  "Confirmar Aprobación",
                  400,
                  "",
                  "WFModificarFichaDetalleEtapasObservacion",
                  1,
                  0,
                  'APROBADO',
                  'APROBADO'
                );
              },
            },
            {
              xtype: "button",
              text: "Rechazar",
              scale: 'large',
              style: 'background-color: crimson;',
              handler: function () {
                ventanaDinamica(
                  "WFModificarFichaDetalleEtapasObservacion",
                  "Confirmar Rechazo",
                  400,
                  "",
                  "WFModificarFichaDetalleEtapasObservacion",
                  1,
                  0,
                  'RECHAZADO',
                  'RECHAZADO'
                );

              },
            },
          ],
        },

        {
          xtype: "fieldset",
          title: "<b>Etapas Solicitud</b>",
          style: "margin: 5px",
          width: '100%',
          layout: {
            type: "vbox",
            align: "strech",
          },
          items: [
            {
              xtype: "label",
              itemId: "lblTitulo",
              style: "margin: 0 10px 10px 0",
            },
            {
              xtype: 'WFModificarFichaDetalleEtapasGrilla'
            }

          ],
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.WFModificarFichaDetalleEtapasGrilla", {
  extend: "Ext.grid.Panel",
  xtype: "WFModificarFichaDetalleEtapasGrilla",
  itemId: "WFModificarFichaDetalleEtapasGrilla",
  store: storeCargarEtapasCambiarficha,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  width: '100%',
  plugins: pluginFactory(),
  flex: 1,
  columns: [
    {
      text: "Caso",
      sortable: true,
      dataIndex: "PFK_CASO",
      hidden: true,
      flex: 1
    },
    {
      text: "Etapa",
      sortable: true,
      dataIndex: "PFK_ETAPA",
      hidden: false,
      flex: 1
    },
    {
      text: "Rol",
      sortable: true,
      dataIndex: "FK_ROL_WF",
      hidden: false,
      flex: 1
    },
    {
      text: "Usuario",
      sortable: true,
      dataIndex: "USR_APROB",
      hidden: false,
      flex: 1
    },
    {
      text: "Fecha",
      sortable: true,
      dataIndex: "FECHA_APROB",
      hidden: false,
      flex: 1
    },
    {
      text: "Observación",
      sortable: true,
      dataIndex: "OBSERVACION",
      hidden: false,
      flex: 1
    },
    {
      text: "Estado",
      sortable: true,
      dataIndex: "ESTADO",
      flex: 1,
      renderer: function (value, meta) {
        switch (value) {
          case "EN ESPERA":
            meta.style = "color:orange;";
            break;

          case "RECHAZADO":
            meta.style = "color:red;";
            break;

          case "APROBADO":
            meta.style = "color:green;";
            break;

          default:
            meta.style = "color:blue;";
            break;
        }

        return value;
      },
    },
  ],
});


Ext.define("fcab.Container.WFModificarFichaDetalleEtapasObservacion", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaDetalleEtapasObservacion",
  itemId: "WFModificarFichaDetalleEtapasObservacion",
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
      titleAlign: "center",
      border: false,
      frame: false,
      width: '100%',

      layout: {
        type: "vbox",
        align: "strech",
      },

      items: [{
        xtype: "textareafield",
        name: "txtObservacion",
        itemId: "txtObservacion",
        labelAlign: "top",
        fieldLabel: 'Observación',
        width: "100%",
        margin: 10,
        typeAhead: true,
        maxLength: 1000,
        allowBlank: true,
        readOnly: false,
      },
      ],
      buttons: [{
        text: "Cancelar",
        handler: function () {
          Ext.getCmp('WFModificarFichaDetalleEtapasObservacion').destroy();
        }
      },
      {
        text: "Confirmar",
        handler: function () {
          var param = Ext.getCmp('WFModificarFichaDetalleEtapasObservacion').myExtraParams.param1;
          var form = this.up('form').getForm();
          if (!ValidarFormulario(form)) return;
          var values = form.getValues();
          cambiarEstadoEtapaSolCambioFicha(param, values.txtObservacion);
          Ext.getCmp('WFModificarFichaDetalleEtapasObservacion').destroy();
        }
      }]
    },
  ],
});


var cargarEtapasSolicitudCambiarFichaDetalle = function () {

  console.log("entro 1");
  var rol = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param1;
  var obj = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param2;
  var lblTitulo = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleEtapas #lblTitulo"
  )[0];
  var pnlBtn = Ext.ComponentQuery.query(
    "#WFModificarFichaDetalleEtapas #pnlBtn"
  )[0];

  pnlBtn.hide();
  lblTitulo.setHtml(null);

  storeCargarEtapasCambiarficha.load({
    params: {
      'p_id': obj.PK_ID
    },
    callback: function (records, operation, success) {
      if (records != null && records.length > 0) {
        var countEs = 0;
        var countRe = 0;
        for (var i = 0; i < records.length; i++) {
          console.log("entro 3");
          var item = records[i].data;


          if (item.ESTADO == 'EN ESPERA') {
            if (countEs == 0 && countRe == 0) {
              lblTitulo.setHtml(
                '<table width="100%" >' +
                '<tr><td><b>Mi Rol:</b> ' + rol.NOMBRE + ' (' + rol.PK_ROL_WF + ')</td></tr>' +
                "<tr><td><b>Caso:</b> " + item.PFK_CASO + "</td></tr> " +
                "<tr><td><b>Etapa Actual:</b> " + item.PFK_ETAPA + "</td></tr>" +
                "<tr><td><b>Rol Actual:</b> " + item.FK_ROL_WF + "</td></tr> " +
                "</table>");
            }

            countEs++;
          }

          //console.log(i + " " +item.FK_ROL_WF + " " + rol.PK_ROL_WF + " " + obj.ESTADO + " " + countEs);

          if (obj.ESTADO == 'ACTIVO' &&
            item.FK_ROL_WF == rol.PK_ROL_WF &&
            countEs == 1) {

            console.log("entro 2");
            pnlBtn.show();
          }

          if (item.ESTADO == 'RECHAZADO') {
            countRe++;
          }

        }

        if (countRe > 0 || countEs == 0) {
          console.log("entro  mal");
          pnlBtn.hide();
          lblTitulo.setHtml(null);
        }

      } else {
        pnlBtn.hide();
        lblTitulo.setHtml(null);
      }
    }
  });

};

var cambiarEstadoEtapaSolCambioFicha = function (estado, observacion) {
  var rol = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param1;
  var obj = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param2;

  Ext.MessageBox.confirm('Etapa', '¿Está seguro de pasar la etapa a estado ' + estado + '?', function (btn) {
    if (btn === 'yes') {

      Ext.MessageBox.show({
        msg: 'Cambiando Etapa',
        progressText: 'Espere por favor...',
        width: 300,
        wait: {
          interval: 200
        }
      });

      storeCambiarEstadoEtapaSolCambioFicha.proxy.setTimeout(300000);
      storeCambiarEstadoEtapaSolCambioFicha.load({
        params: {
          P_ID: obj.PK_ID,
          P_ROL_WF: rol.PK_ROL_WF,
          P_USUARIO: NOMBRE,
          P_ESTADO: estado,
          P_OBSERVACION: observacion
        },
        callback: function (records, operation, success) {
          Ext.MessageBox.hide();
          console.log(records);
          if (records != null) {
            if (records[0].data.r_msg == 'OK') {

              var item = records[0].data;
              //console.log(item);
              storeEnviarCorreoCambioEtapaWFCambioFicha.load({
                params: {
                  P_ID: item.r_id,
                  P_ROL_WF: item.r_rol,
                  P_COD_EMP: EMPRESA,
                  P_COD_CC: obj.COD_CC_SOL,
                  P_ESTADO_SOL: item.r_est_sol
                },
              });
              cargarWFModificarFicha(null);
              cargarEtapasSolicitudCambiarFichaDetalle();
              showToast('Etapa cambiada correctamente');
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

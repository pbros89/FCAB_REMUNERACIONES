Ext.define("fcab.Container.MainProcesoMensual.Crear", {
  extend: "Ext.container.Container",
  xtype: "MainProcesoMensualCrear",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  layout: "anchor",
  scrollable: true,
  listeners: {
    beforerender: function () {
      var cbAnho = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #cbAnho"
      )[0];
      var cbMes = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #cbMes"
      )[0];
      var dtFec1 = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #dtFec1"
      )[0];
      var dtFec2 = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #dtFec2"
      )[0];
      var dtHH1 = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #dtHH1"
      )[0];
      var dtHH2 = Ext.ComponentQuery.query(
        "#MainProcesoMensualCrear #dtHH2"
      )[0];

      var date = new Date();
      var yearIni = 2019;
      var year = date.getFullYear();
      var month = date.getMonth();
      var years = [];
      while (yearIni <= year) {
        years.push({
          VALOR: yearIni,
        });
        yearIni++;
      }

      cbAnho.getStore().loadData(years);
      cbAnho.setValue(year);
      cbMes.setValue(cbMes.getStore().getAt(month));
      dtFec1.setValue(date);
      dtFec2.setValue(date);
      dtHH1.setValue("00:00");
      dtHH2.setValue("00:00");
    },
  },
  items: [
    {
      xtype: "form",
      titleAlign: "center",
      border: false,
      frame: true,
      bodyPadding: 10,
      layout: {
        type: "column",
        align: "strech",
      },
      items: [
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combobox",
              labelAlign: "left",
              fieldLabel: "Tipo",
              displayField: "NOMBRE",
              valueField: "VALOR",
              anchor: "50%",
              name: "cbTipo",
              itemId: "cbTipo",
              editable: true,
              readOnly: false,
              triggerAction: "all",
              typeAhead: true,
              queryMode: "local",
              forceSelection: true,
              selectOnFocus: true,
              allowBlank: false,
              value: "PROCESO",
              store: Ext.create("Ext.data.Store", {
                data: [
                  {
                    NOMBRE: "PROCESO",
                    VALOR: "PROCESO",
                  },
                  {
                    NOMBRE: "RRHH",
                    VALOR: "RRHH",
                  },
                  {
                    NOMBRE: "REPROCESO",
                    VALOR: "REPROCESO",
                  },
                ],
              }),
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combo",
              name: "cbAnho",
              itemId: "cbAnho",
              fieldLabel: "Año",
              labelAlign: "left",
              queryMode: "local",
              triggerAction: "all",
              displayField: "VALOR",
              valueField: "VALOR",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "50%",
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combo",
              name: "cbMes",
              itemId: "cbMes",
              displayField: "NOMBRE",
              valueField: "VALOR",
              store: storeExtras_cargarMeses,
              fieldLabel: "Mes",
              labelAlign: "left",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "50%",
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "hbox",
          style: "margin-bottom: 15px",
          items: [
            {
              xtype: "datefield",
              name: "dtFec1",
              labelAlign: "left",
              fieldLabel: "Inicio",
              itemId: "dtFec1",
              emptyText: "yyyy/mm/dd",
              submitFormat: "Y/m/d",
              format: "Y/m/d",
              editable: true,
              allowBlank: false,
              width: "60%",
              margin: "0 10 0 0",
            },
            {
              xtype: "timefield",
              format: "H:i",
              increment: 1,
              name: "dtHH1",
              scrollable: true,
              itemId: "dtHH1",
              editable: true,
              allowBlank: false,
              //value: Ext.Date.format(new Date(), 'H:i'),
              width: "30%",
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "hbox",
          style: "margin-bottom: 10px",
          items: [
            {
              xtype: "datefield",
              name: "dtFec2",
              labelAlign: "left",
              fieldLabel: "Termino",
              itemId: "dtFec2",
              emptyText: "yyyy/mm/dd",
              submitFormat: "Y/m/d",
              format: "Y/m/d",
              editable: true,
              allowBlank: false,
              margin: "0 10 0 0",
              width: "60%",
            },
            {
              xtype: "timefield",
              format: "H:i",
              increment: 1,
              name: "dtHH2",
              scrollable: true,
              itemId: "dtHH2",
              editable: true,
              allowBlank: false,
              //value: Ext.Date.format(new Date(), 'H:i'),
              width: "30%",
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 15px",
          items: [
            {
              xtype: "textareafield",
              fieldLabel: "Observación",
              labelAlign: "top",
              name: "txtObservacion",
              itemId: "txtObservacion",
              typeAhead: true,
              anchor: "100%",
              maxLength: 1000,
              allowBlank: true,
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Iniciar",
          handler: function () {
            var form = this.up("form").getForm();
            if (!ValidarFormulario(form)) return;

            var ewin = Ext.WindowManager.getActive();
            if (ewin) {
              var values = form.getValues();

              /*if (EMPRESA == "097") {
                storeValidarPeriodoAsisSolProc.load({
                  params: {
                    periodo: values.cbAnho + values.cbMes,
                  },
                  callback: function (records, operation, success) {
                    if (records != null && records.length > 0) {
                      if (records[0].data.OBSERVACION == "OK") {
                        iniciarProcesoMensual(values);
                      } else {
                        Ext.MessageBox.confirm(
                          "ADVERTENCIA",
                          "<b>Los calculos de asistencia (ISSA) no han sido cargados en el proceso anterior.</b><br>¿Desea continuar iniciando el proceso mensual?",
                          function (btn) {
                            if (btn === "yes") {
                              iniciarProcesoMensual(values);
                            }
                          }
                        );
                      }
                    } else {
                      Ext.MessageBox.confirm(
                        "ADVERTENCIA",
                        "<b>Los calculos de asistencia (ISSA) no han sido cargados en el proceso anterior.</b><br>¿Desea continuar iniciando el proceso mensual?",
                        function (btn) {
                          if (btn === "yes") {
                            iniciarProcesoMensual(values);
                          }
                        }
                      );
                    }
                  },
                });
              } else {*/
                iniciarProcesoMensual(values);
              //}
            }
          },
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.MainProcesoMensual.GrillaValidacion", {
  extend: "Ext.grid.Panel",
  xtype: "MainProcesoMensualGrillaValidacion",
  itemId: "MainProcesoMensualGrillaValidacion",
  store: storeCargarValidacionCC,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  listeners: {
    afterrender: function () {
      var params = Ext.getCmp("MainProcesoMensualGrillaValidacion")
        .myExtraParams.param2;
      var mensaje = Ext.getCmp("MainProcesoMensualGrillaValidacion")
        .myExtraParams.param1;
      if (mensaje == "CORRECTO") {
        Ext.ComponentQuery.query(
          "#MainProcesoMensualGrillaValidacion #txtValidacion"
        )[0].setHtml('<span style="color:green"><b>CORRECTO</b></span>');
      } else {
        Ext.ComponentQuery.query(
          "#MainProcesoMensualGrillaValidacion #txtValidacion"
        )[0].setHtml('<span style="color:red"><b>' + mensaje + "</b></span>");
      }

      console.log(params);
      storeCargarValidacionCC.load({
        params: params,
      });
    },
  },
  columns: [
    {
      text: "COD_CC",
      sortable: true,
      dataIndex: "COD_CC",
      //align: 'center',
      flex: 1,
    },
    {
      text: "NOM_CC",
      sortable: true,
      dataIndex: "NOM_CC",
      //align: 'center',
      flex: 2,
    },
    {
      text: "CONCEPTOS",
      sortable: true,
      dataIndex: "CANTIDAD_CONCEPTOS",
      //align: 'center',
      flex: 1,
    },
    {
      text: "PERSONAS",
      sortable: true,
      dataIndex: "CANTIDAD_PERSONAS",
      //align: 'center',
      flex: 1,
    },
    {
      text: "ESTADO",
      sortable: true,
      dataIndex: "ESTADO",
      //align: 'center',
      flex: 1,
      renderer: function (value, meta) {
        if (value === "A") {
          meta.style = "color:green;";
          return "ACTIVO";
        } else {
          meta.style = "color:red;";
          if (value === "I") {
            return "INACTIVO";
          }
        }
        return value;
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "VALIDACION_PROCESO_" + NOM_EMPRESA,
              fileName:
                "VALIDACION_PROCESO_" +
                NOM_EMPRESA +
                " " +
                new Date().getTime() +
                ".xls",
            });
          },
        },
        {
          xtype: "panel",
          itemId: "txtValidacion",
          border: false,
          html: '<span style="color:green"><b>CORRECTO</b></span>',
        },
      ],
    },
  ],
  height: 480,
  width: "100%",
});

var iniciarProcesoMensual = function (values) {
  Ext.MessageBox.show({
    msg: "Creando Proceso Mensual",
    progressText: "Espere por favor...",
    width: 300,
    wait: {
      interval: 200,
    },
  });

  //console.log(values);

  storeCrearProcesoMensual.load({
    params: {
      p_cod_emp: EMPRESA,
      p_anho: values.cbAnho,
      p_mes: values.cbMes,
      p_tipo: values.cbTipo,
      p_inicio: values.dtFec1 + " " + values.dtHH1,
      p_termino: values.dtFec2 + " " + values.dtHH2,
      p_observacion: values.txtObservacion,
      p_usuario: NOMBRE,
    },
    callback: function (records, operation, success) {
      Ext.MessageBox.hide();
      var param = {
        p_proceso: values.cbAnho + "/" + values.cbMes,
        p_cod_emp: EMPRESA,
      };
      if (records != null) {
        if (records[0].data.r_msg == "OK") {
          showToast("Proceso mensual creado correctamente.");
          cargarMainProcesoMensual(null);
          Ext.getCmp("MainProcesoMensualCrear").destroy();
          ventanaDinamica(
            "MainProcesoMensualGrillaValidacion",
            "Detalle Validación Proceso",
            "800",
            "",
            "MainProcesoMensualGrillaValidacion",
            1,
            0,
            "CORRECTO",
            param
          );
        } else {
          if (records[0].data.r_est != "-2") {
            Ext.MessageBox.show({
              title: "ADVERTENCIA",
              msg: records[0].data.r_msg,
              icon: Ext.MessageBox.WARNING,
              buttons: Ext.Msg.OK,
            });
          } else {
            ventanaDinamica(
              "MainProcesoMensualGrillaValidacion",
              "Detalle Validación Proceso",
              "800",
              "",
              "MainProcesoMensualGrillaValidacion",
              1,
              0,
              records[0].data.r_msg,
              param
            );
          }
        }
      }
    },
  });
};

Ext.define("fcab.Container.IndCierreMensual", {
  extend: "Ext.container.Container",
  xtype: "IndCierreMensual",
  itemId: "IndCierreMensual",
  border: false,
  frame: false,
  listeners: {
    afterrender: function () {
      var cbAnho1 = Ext.ComponentQuery.query("#IndCierreMensual #cbAnho1")[0];
      var cbMes1 = Ext.ComponentQuery.query("#IndCierreMensual #cbMes1")[0];
      var cbAnho2 = Ext.ComponentQuery.query("#IndCierreMensual #cbAnho2")[0];
      var cbMes2 = Ext.ComponentQuery.query("#IndCierreMensual #cbMes2")[0];

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

      cbAnho1.getStore().loadData(years);
      cbAnho1.setValue(year);
      cbAnho2.getStore().loadData(years);
      cbAnho2.setValue(year);
      cbMes1.setValue(cbMes1.getStore().getAt(month));
      cbMes2.setValue(cbMes2.getStore().getAt(month));

      storeCargarCierresMensual.load();
    },
  },
  items: [
    {
      xtype: "panel",
      width: "100%",
      border: false,
      layout: {
        type: "hbox",
        //align: "middle",
        //pack: "center",
      },
      items: [
        {
          xtype: "IndCierreMensualGrid",
          width: "40%",
          height: Ext.getBody().getViewSize().height - 200,
        },
        {
          xtype: "panel",
          width: "59%",
          border: false,
          layout: {
            type: "vbox",
          },
          items: [
            {
              xtype: "panel",
              width: "100%",
              margin: "10",
              title: "Exportar Archivo",
              border: true,
              layout: {
                type: "vbox",
                align: "middle",
                pack: "center",
              },
              items: [
                {
                  border: false,
                  margin: "10 10 0 10",
                  html:
                    "<h4><b><i>Genera el archivo XLS para la carga de HH trabajadas con todos los trabajadores del cierre seleccionado.</i></b></h4>",
                },
                {
                  xtype: "container",
                  columnWidth: 1,
                  layout: "hbox",
                  margin: "10 10 0 10",
                  width: "100%",
                  items: [
                    {
                      xtype: "combo",
                      name: "cbAnho1",
                      itemId: "cbAnho1",
                      fieldLabel: "Periodo",
                      labelAlign: "left",
                      queryMode: "local",
                      triggerAction: "all",
                      displayField: "VALOR",
                      valueField: "VALOR",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      width: "200",
                      allowBlank: false,
                      margin: "0 10 0 0",
                    },
                    {
                      xtype: "combo",
                      name: "cbMes1",
                      itemId: "cbMes1",
                      displayField: "NOMBRE",
                      valueField: "VALOR",
                      store: storeExtras_cargarMeses,
                      //fieldLabel: "Mes",
                      labelAlign: "right",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      width: "150",
                      allowBlank: false,
                    },
                  ],
                },
                {
                  xtype: "button",
                  text: "Exportar",
                  tooltip: "Exporta Archivo",
                  scale: "large",
                  margin: "10",
                  handler: function () {
                    var anho = Ext.ComponentQuery.query(
                      "#IndCierreMensual #cbAnho1"
                    )[0].value;
                    var mes = Ext.ComponentQuery.query(
                      "#IndCierreMensual #cbMes1"
                    )[0].value;

                    if (anho && mes) {
                      Ext.create("Ext.form.Panel", {
                        renderTo: Ext.getBody(),
                        standardSubmit: true,
                        url:
                          host +
                          "indicador/IndicadorController/exportarDiasTrabajados",
                        timeout: 300000,
                      }).submit({
                        timeout: 300000,
                        params: {
                          p_anho: anho,
                          p_mes: mes,
                        },
                        target: "Exportar" + "-form-iframe",
                      });
                    } else {
                      Ext.MessageBox.show({
                        title: "Exportar Archivo",
                        msg: "Seleccione año y mes",
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK,
                      });
                    }
                  },
                },
              ],
            },
            {
              xtype: "form",
              width: "100%",
              margin: "10",
              title: "Importar Archivo",
              border: true,
              layout: {
                type: "vbox",
                align: "middle",
                pack: "center",
              },
              items: [
                {
                  border: false,
                  margin: "10 10 0 10",
                  html:
                    "<h4><b><i>Carga del archivo XLS de HH trabajadas del cierre seleccionado.</i></b></h4>",
                },
                {
                  xtype: "container",
                  columnWidth: 1,
                  layout: "hbox",
                  margin: "10 10 0 10",
                  width: "100%",
                  items: [
                    {
                      xtype: "combo",
                      name: "cbAnho2",
                      itemId: "cbAnho2",
                      fieldLabel: "Periodo",
                      labelAlign: "left",
                      queryMode: "local",
                      triggerAction: "all",
                      displayField: "VALOR",
                      valueField: "VALOR",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      width: "200",
                      allowBlank: false,
                      margin: "0 10 0 0",
                    },
                    {
                      xtype: "combo",
                      name: "cbMes2",
                      itemId: "cbMes2",
                      displayField: "NOMBRE",
                      valueField: "VALOR",
                      store: storeExtras_cargarMeses,
                      //fieldLabel: "Mes",
                      labelAlign: "right",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      width: "150",
                      allowBlank: false,
                    },
                  ],
                },
                {
                  xtype: "filefield",
                  accept: ".xls",
                  margin: "10 10 0 10",
                  name: "file",
                  fieldLabel: "Archivo XLS",
                  msgTarget: "side",
                  allowBlank: false,
                  width: "100%",
                  buttonText: "Seleccionar Archivo",
                },
                {
                  xtype: "button",
                  margin: "10",
                  text: "Importar",
                  tooltip: "Importar Archivo",
                  scale: "large",
                  handler: function () {
                    var anho = Ext.ComponentQuery.query(
                      "#IndCierreMensual #cbAnho2"
                    )[0].value;
                    var mes = Ext.ComponentQuery.query(
                      "#IndCierreMensual #cbMes2"
                    )[0].value;
                    
                    var form = this.up("form").getForm();
                    if (form.isValid()) {
                      //console.log(form.getValues());
                      form.submit({
                        url:
                          host +
                          "indicador/IndicadorController/importarDiasTrabajados",
                        waitMsg: "Importando archivo...",
                        params: {
                          p_anho: anho,
                          p_mes: mes
                        },
                        timeout: 300000,
                        success: function (f, a) {
                          if (
                            a.result.items.r_msg != null &&
                            a.result.items.r_msg == "OK"
                          ) {
 
                            ventanaDinamica(
                              "DetalleImportarDiasTrabajados",
                              "Detalle Importación",
                              "1000",
                              "",
                              "DetalleImportarDiasTrabajados",
                              1,
                              0,
                              null,
                              {p_anho: anho, p_mes: mes}
                            );
                          } else {
                            Ext.MessageBox.show({
                              title: "Importación fallida",
                              msg: "Problemas al cargar documento",
                              icon: Ext.MessageBox.ERROR,
                              buttons: Ext.Msg.OK,
                            });
                          }
                        },
                        failure: function (f, a) {
                          console.log("failure");
                          console.log(a);
                          Ext.MessageBox.show({
                            title: "Importación fallida",
                            msg: "Problemas al cargar documento",
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK,
                          });
                        },
                      });
                    }
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.IndCierreMensual.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndCierreMensualGrid",
  itemId: "IndCierreMensualGrid",
  store: storeCargarCierresMensual,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  margin: 10,
  title: "Historial de cierres mensuales",
  plugins: pluginFactory(),
  columns: [
    {
      text: "AÑO",
      sortable: true,
      dataIndex: "PK_ANHO",
      hidden: false,
      width: 80,
    },
    {
      text: "MES",
      sortable: true,
      dataIndex: "PK_MES",
      hidden: false,
      width: 50,
    },
    {
      text: "CREADOR",
      sortable: true,
      dataIndex: "USR_CREADOR",
      //align: 'center',
      width: 100,
    },
    {
      text: "FECHA CREACION",
      sortable: true,
      dataIndex: "FECHA_CREACION",
      //align: 'center',
      width: 150,
    },

    {
      text: "IMPORTADOR",
      sortable: true,
      dataIndex: "USR_IMPORT",
      //align: 'center',
      width: 100,
    },
    {
      text: "FECHA IMPORT",
      sortable: true,
      dataIndex: "FECHA_IMPORT",
      //align: 'center',
      width: 150,
    },
  ],
});

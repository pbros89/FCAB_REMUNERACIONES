/**
 * Contenedor
 **/
Ext.define("fcab.Container.PersonasProcesoMensual", {
  extend: "Ext.container.Container",
  xtype: "PersonasProcesoMensual",
  itemId: "PersonasProcesoMensual",
  id: "PersonasProcesoMensual",
  layout: {
    type: "fit",
    align: "stretch",
    pack: "center",
  },
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  constructor: function (config) {
    this.callParent([config]);
    initPersonasProcesoMensual();
  },
  items: [
    {
      layout: {
        type: "vbox",
        align: "stretch",
        pack: "center",
      },
      border: false,
      items: [
        {
          xtype: "panel",
          layout: "hbox",
          padding: "10",
          border: false,
          defaults: { margin: "0 10 0 0" },
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Periodo",
              labelAlign: "top",
              name: "txtProceso",
              itemId: "txtProceso",
              typeAhead: true,
              anchor: "100%",
              readOnly: true,
              maxLength: 1000,
              allowBlank: true,
            },
            {
              xtype: "textfield",
              fieldLabel: "Tipo",
              labelAlign: "top",
              name: "txtTipo",
              itemId: "txtTipo",
              typeAhead: true,
              anchor: "100%",
              readOnly: true,
              maxLength: 1000,
              allowBlank: true,
            },
            {
              xtype: "textfield",
              fieldLabel: "Inicio",
              labelAlign: "top",
              name: "txtInicio",
              itemId: "txtInicio",
              typeAhead: true,
              anchor: "100%",
              readOnly: true,
              maxLength: 1000,
              allowBlank: true,
            },
            {
              xtype: "textfield",
              fieldLabel: "Termino",
              labelAlign: "top",
              name: "txtTermino",
              itemId: "txtTermino",
              typeAhead: true,
              anchor: "100%",
              readOnly: true,
              maxLength: 1000,
              allowBlank: true,
            },
            {
              xtype: "textfield",
              fieldLabel: "Estado",
              labelAlign: "top",
              name: "txtEstado",
              itemId: "txtEstado",
              typeAhead: true,
              anchor: "100%",
              readOnly: true,
              maxLength: 1000,
              allowBlank: true,
            },
          ],
        },
        {
          xtype: "PersonasProcesoMensualGrilla",
          flex: 1,
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.PersonasProcesoMensual.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "PersonasProcesoMensualGrilla",
  itemId: "PersonasProcesoMensualGrilla",
  store: storeCargarPersonasProcesoMensualPorUsuario,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  border: false,
  height: Ext.getBody().getViewSize().height - 210,
  width: "100%",
  plugins: pluginFactory(),
  listeners: {
    itemdblclick: function (view, rec, node, index, e, options) {
      clickConceptosPersonasProcesoMensual(view.grid, index);
    },
  },
  columns: [
    {
      text: "ID Empresa",
      sortable: true,
      dataIndex: "PFK_COD_EMP",
      //align: 'center',
      hidden: true,
      flex: 1,
    },
    {
      text: "Proceso",
      sortable: true,
      dataIndex: "PFK_PROCESO",
      //align: 'center',
      flex: 1,
      hidden: true,
    },
    {
      text: "Tipo",
      sortable: true,
      dataIndex: "PFK_TIPO",
      //align: 'center',
      flex: 1,
      hidden: true,
    },

    {
      text: "ID CC",
      sortable: true,
      dataIndex: "PFK_COD_CC",
      flex: 1,
    },

    {
      text: "Nombre CC",
      sortable: true,
      dataIndex: "NOM_CC",
      flex: 2,
    },
    {
      text: "Rut Trabajador",
      sortable: true,
      dataIndex: "PK_RUT",
      flex: 1,
      //hidden: true
    },
    {
      text: "Nombre Trabajador",
      sortable: true,
      dataIndex: "NOMBRE",
      flex: 2,
    },
    {
      text: "ID Cargo",
      sortable: true,
      dataIndex: "COD_CARGO",
      flex: 1,
      hidden: true,
    },
    {
      text: "Nombre Cargo",
      sortable: true,
      dataIndex: "NOM_CARGO",
      flex: 2,
    },
    {
      text: "Estado",
      sortable: true,
      dataIndex: "ESTADO",
      flex: 1,
      renderer: function (value, meta) {
        if (value === "EN ESPERA") {
          meta.style = "color:red;";
          return "EN ESPERA";
        } else if (value === "TERMINADO") {
          meta.style = "color:green;";
          return "TERMINADO";
        } else {
          return value;
        }
      },
    },
    {
      xtype: "actioncolumn",
      text: "",
      width: 30,
      items: [
        {
          iconCls: "icon-form-edit",
          tooltip: "Ingresar valores a persona",
          handler: function (grid, rowIndex) {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              clickConceptosPersonasProcesoMensual(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea Editar",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
      ],
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      padding: "10",
      layout: {
        align: "bottom",
        //pack: 'bottom'
      },
      items: [
        {
          xtype: "combo",
          name: "cbCc",
          itemId: "cbCc",
          displayField: "DESC_CC",
          valueField: "PK_COD_CC",
          store: storeCargarCCProcesoMensualPorUsuario,
          fieldLabel: "Centro de Costo",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          width: "500",
          allowBlank: true,
          readOnly: false,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeCargarPersonasProcesoMensualPorUsuario.loadData([], false);
              if (newValue != null) {
                var txtDesc = Ext.ComponentQuery.query(
                  "#PersonasProcesoMensual #txtDesc"
                )[0].value;
                var cbEstado = Ext.ComponentQuery.query(
                  "#PersonasProcesoMensual #cbEstado"
                )[0].value;

                storeCargarPersonasProcesoMensualPorUsuario.load({
                  params: {
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE,
                    p_rol: ROL,
                    p_cod_cc: newValue,
                    p_desc: txtDesc,
                    p_estado: cbEstado,
                  },
                });
              }
            },
          },
        },
        {
          xtype: "textfield",
          fieldLabel: "Filtro Rut o Nombre",
          labelAlign: "top",
          name: "txtDesc",
          itemId: "txtDesc",
          typeAhead: true,
          maxLength: 20,
          allowBlank: true,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeCargarPersonasProcesoMensualPorUsuario.loadData([], false);

              var cc = Ext.ComponentQuery.query(
                "#PersonasProcesoMensual #cbCc"
              )[0].value;
              var cbEstado = Ext.ComponentQuery.query(
                "#PersonasProcesoMensual #cbEstado"
              )[0].value;

              storeCargarPersonasProcesoMensualPorUsuario.load({
                params: {
                  p_cod_emp: EMPRESA,
                  p_usuario: NOMBRE,
                  p_rol: ROL,
                  p_cod_cc: cc,
                  p_desc: newValue,
                  p_estado: cbEstado,
                },
              });
            },
          },
        },
        {
          xtype: "combobox",
          labelAlign: "top",
          fieldLabel: "Filtro Estado",
          displayField: "NOMBRE",
          valueField: "VALOR",
          name: "cbEstado",
          itemId: "cbEstado",
          editable: true,
          readOnly: false,
          triggerAction: "all",
          typeAhead: true,
          queryMode: "local",
          forceSelection: true,
          selectOnFocus: true,
          allowBlank: false,
          value: "",
          store: Ext.create("Ext.data.Store", {
            data: [
              {
                NOMBRE: "TODOS",
                VALOR: "",
              },
              {
                NOMBRE: "EN ESPERA",
                VALOR: "EN ESPERA",
              },
              {
                NOMBRE: "TERMINADO",
                VALOR: "TERMINADO",
              },
            ],
          }),
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeCargarPersonasProcesoMensualPorUsuario.loadData([], false);
              if (newValue != null) {
                var txtDesc = Ext.ComponentQuery.query(
                  "#PersonasProcesoMensual #txtDesc"
                )[0].value;
                var cbCc = Ext.ComponentQuery.query(
                  "#PersonasProcesoMensual #cbCc"
                )[0].value;

                storeCargarPersonasProcesoMensualPorUsuario.load({
                  params: {
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE,
                    p_rol: ROL,
                    p_cod_cc: cbCc,
                    p_desc: txtDesc,
                    p_estado: newValue,
                  },
                });
              }
            },
          },
        },
        {
          text: "Documento",
          tooltip: "Exportar e Importar Documentos",
          iconCls: "icon-form-detail",
          scale: "medium",
          handler: function () {
            var rec = storeCargarProcesosMensualPersonas.getAt(0);
            ventanaDinamica(
              "ImportarExportarPersonasProcesoMensual",
              "Administrar Documentos",
              "1000",
              "600",
              "ImportarExportarPersonasProcesoMensual",
              1,
              0,
              null,
              rec
            );
          },
        },
        {
          text: "Terminar CC",
          tooltip: "El centro de costo pasa a estado TERMINADO.",
          iconCls: "icon-form-ok",
          scale: "medium",
          handler: function () {
            Ext.MessageBox.confirm(
              "Terminar Centro de Costo",
              "¿Esta seguro de terminar el centro de costo? <br><b>Los trabajadores pasaran a estado TERMINADO y no podran ser modificados.</b>",
              function (btn) {
                if (btn === "yes") {
                  var rec = storeCargarProcesosMensualPersonas.getAt(0);
                  var cc = Ext.ComponentQuery.query(
                    "#PersonasProcesoMensual #cbCc"
                  )[0].value;
                  if (cc != null && cc != "") {
                    storeModificarEstadoProcMensualCC.load({
                      params: {
                        p_proceso: rec.data.PK_PROCESO,
                        p_cod_emp: EMPRESA,
                        p_tipo: rec.data.PK_TIPO,
                        p_cod_cc: cc,
                        p_estado: "TERMINADO",
                        p_usuario: NOMBRE,
                      },
                      callback: function (records, operation, success) {
                        if (records != null) {
                          if (records[0].data.r_msg == "OK") {
                            Ext.ComponentQuery.query(
                              "#PersonasProcesoMensual #cbCc"
                            )[0].setValue(null);
                            showToast(
                              "Centro de Costo terminado correctamente."
                            );
                            if (Ext.getCmp("PersonasProcesoMensual") != null) {
                              initPersonasProcesoMensual();
                              Ext.ComponentQuery.query(
                                "#PersonasProcesoMensual #cbCc"
                              )[0].value = cc;
                            }
                          } else {
                            Ext.MessageBox.show({
                              title: "ADVERTENCIA",
                              msg: records[0].data.r_msg,
                              icon: Ext.MessageBox.WARNING,
                              buttons: Ext.Msg.OK,
                            });
                          }
                        }
                      },
                    });
                  } else {
                    Ext.MessageBox.show({
                      title: "ADVERTENCIA",
                      msg: "Seleccione un centro de costo",
                      icon: Ext.MessageBox.WARNING,
                      buttons: Ext.Msg.OK,
                    });
                  }
                }
              }
            );
          },
        },
      ],
    },
  ],
  //title: 'Conceptos de Trabajadores ('+NOM_EMPRESA+')',
});

var clickImportarPlanillaPersonasProcesoMensual = function () {
  ventanaDinamica(
    "MainProcesoMensualDetalleImportarExportar",
    "Administración de Documento",
    "1000",
    "600",
    "MainProcesoMensualDetalleImportarExportar",
    1,
    0,
    rec,
    recRow
  );
};

var clickConceptosPersonasProcesoMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  ventanaDinamica(
    "ConceptosPersonaProcesoMensual",
    "Conceptos (" + recRow.data.NOMBRE + ")",
    "800",
    "",
    "ConceptosPersonaProcesoMensual",
    1,
    0,
    rec,
    recRow
  );
};

var cargarCCPersonasProcesoMensual = function () {
  var cc = Ext.ComponentQuery.query("#PersonasProcesoMensual #cbCc")[0].value;
  var txtDesc = Ext.ComponentQuery.query("#PersonasProcesoMensual #txtDesc")[0]
    .value;
  var cbEstado = Ext.ComponentQuery.query(
    "#PersonasProcesoMensual #cbEstado"
  )[0].value;

  storeCargarPersonasProcesoMensualPorUsuario.removeAll();
  if (cc != null && cc != "") {
    storeCargarPersonasProcesoMensualPorUsuario.load({
      params: {
        p_cod_emp: EMPRESA,
        p_usuario: NOMBRE,
        p_rol: ROL,
        p_cod_cc: cc,
        p_desc: txtDesc,
        p_estado: cbEstado,
      },
      callback: function (records, operation, success) {
        if (records == null) {
          Ext.MessageBox.show({
            title: "ADVERTENCIA",
            msg: "No se encontro personal del centro de costo",
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.Msg.OK,
          });
        }
      },
    });
  }
};

var initPersonasProcesoMensual = function () {
  storeCargarPersonasProcesoMensualPorUsuario.loadData([], false);
  storeCargarProcesosMensualPersonas.load({
    params: {
      p_cod_emp: EMPRESA,
      p_estado: "EN ESPERA",
      p_no_tipo: "RRHH",
    },
    callback: function (records, operation, success) {
      console.log(records);
      if (records !== null && records.length > 0) {
        Ext.ComponentQuery.query(
          "#PersonasProcesoMensual #txtProceso"
        )[0].setValue(records[0].data.PK_PROCESO);
        Ext.ComponentQuery.query(
          "#PersonasProcesoMensual #txtTipo"
        )[0].setValue(records[0].data.PK_TIPO);
        Ext.ComponentQuery.query(
          "#PersonasProcesoMensual #txtInicio"
        )[0].setValue(records[0].data.INICIO);
        Ext.ComponentQuery.query(
          "#PersonasProcesoMensual #txtTermino"
        )[0].setValue(records[0].data.TERMINO);
        Ext.ComponentQuery.query(
          "#PersonasProcesoMensual #txtEstado"
        )[0].setValue(records[0].data.ESTADO);

        if (records[0].data.ESTADO == "EN ESPERA") {
          Ext.ComponentQuery.query(
            "#PersonasProcesoMensual #txtEstado"
          )[0].setFieldStyle(
            "background-color: " +
              rojo +
              " background-image: none; color: white; font-weight: bold;"
          );
        } else {
          Ext.ComponentQuery.query(
            "#PersonasProcesoMensual #txtEstado"
          )[0].setFieldStyle(
            "background-color: " +
              verde +
              "; background-image: none; color: white; font-weight: bold;"
          );
        }

        storeCargarCCProcesoMensualPorUsuario.load({
          params: {
            p_cod_emp: EMPRESA,
            p_usuario: NOMBRE,
            p_rol: ROL,
          },
        });
      } else {
        Ext.MessageBox.show({
          title: "ADVERTENCIA",
          msg: "No hay procesos mensuales en estado EN ESPERA",
          icon: Ext.MessageBox.WARNING,
          buttons: Ext.Msg.OK,
        });
        Ext.ComponentQuery.query("#PersonasProcesoMensual")[0].setDisabled(
          true
        );
      }
    },
  });
};

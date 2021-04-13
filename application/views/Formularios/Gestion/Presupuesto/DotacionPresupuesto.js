/**
 * Contenedor
 **/
Ext.define("fcab.Container.DotacionPresupuesto", {
  extend: "Ext.container.Container",
  xtype: "DotacionPresupuesto",
  itemId: "DotacionPresupuesto",
  id: "DotacionPresupuesto",
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

    ROL_ACCIONES.forEach((accion) => {
      var estado = accion.ESTADO;
      var acc = accion.PFK_ACCION;
      var pantalla = accion.PFK_PANTALLA;

      if (pantalla == "PRESUPUESTO_DOTACION" && estado == "A") {
        switch (acc) {
          case "AGREGAR_CARGO":
            Ext.ComponentQuery.query(
              "#DotacionPresupuestoGrilla #btnIngresar"
            )[0].setHidden(false);
            break;
          case "TERMINAR_CC":
            Ext.ComponentQuery.query(
              "#DotacionPresupuestoGrilla #btnTerminar"
            )[0].setHidden(false);
            break;
        }
      }
    });
    initDotacionPresupuesto();
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
              fieldLabel: "Año",
              labelAlign: "top",
              name: "txtAnho",
              itemId: "txtAnho",
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
          xtype: "DotacionPresupuestoGrilla",
          flex: 1,
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.DotacionPresupuesto.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "DotacionPresupuestoGrilla",
  itemId: "DotacionPresupuestoGrilla",
  store: storeCargarDotacionesPresup2,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  border: false,
  width: "100%",
  plugins: pluginFactory(),
  columns: [
    {
      xtype: "actioncolumn",
      text: "",
      width: 30,
      items: [
        {
          iconCls: "icon-form-delete",
          tooltip: "Borrar cargo",
          handler: function (grid, rowIndex) {
            var rec = grid.getStore().getAt(rowIndex);

            Ext.MessageBox.confirm(
              "Cargo en 0",
              "¿Esta seguro de dejar los valores mensuales en 0?",
              function (btn) {
                if (btn === "yes") {
                  storeModificarPresupDotacion.load({
                    params: {
                      p_anho: rec.data.PFK_ANHO,
                      p_tipo: rec.data.PFK_TIPO,
                      p_cod_emp: EMPRESA,
                      p_cod_cc: rec.data.PFK_COD_CC,
                      p_cod_cargo: rec.data.PK_COD_CARGO,
                      p_dotacion: rec.data.DOTACION,
                      p_ene: 0,
                      p_feb: 0,
                      p_mar: 0,
                      p_abr: 0,
                      p_may: 0,
                      p_jun: 0,
                      p_jul: 0,
                      p_ago: 0,
                      p_sep: 0,
                      p_oct: 0,
                      p_nov: 0,
                      p_dic: 0,
                      p_observacion: rec.data.OBSERVACION,
                      p_usuario: NOMBRE,
                    },
                    callback: function (records, operation, success) {
                      if (records != null) {
                        if (records[0].data.r_msg == "OK") {
                          showToast("Cargo eliminado corretamente.");
                          if (Ext.getCmp("MainPresupuestoDetalle") != null) {
                            cargarDetallePresupuesto();
                            cargarCCDotacionPresupuestoDetalle();
                          }
                          if (Ext.getCmp("DotacionPresupuesto") != null) {
                            cargarCCDotacionPresupuesto();
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
                }
              }
            );
          },
        },
      ],
    },
    {
      text: "ID Empresa",
      sortable: true,
      dataIndex: "PFK_COD_EMP",
      //align: 'center',
      hidden: true,
      with: 100,
    },
    {
      text: "Año",
      sortable: true,
      dataIndex: "PFK_ANHO",
      //align: 'center',
      with: 100,
      hidden: true,
    },
    {
      text: "Tipo",
      sortable: true,
      dataIndex: "PFK_TIPO",
      //align: 'center',
      with: 100,
      hidden: true,
    },

    {
      text: "ID CC",
      sortable: true,
      dataIndex: "PFK_COD_CC",
      width: 100,
    },
    {
      text: "ID Cargo",
      sortable: true,
      dataIndex: "PK_COD_CARGO",
      width: 100,
      //hidden: true
    },
    {
      text: "Nombre Cargo",
      sortable: true,
      dataIndex: "NOM_CARGO",
      width: 250,
    },
    {
      text: "Real",
      sortable: true,
      dataIndex: "DOTACION",
      width: 80,
    },

    {
      text: "ENE",
      sortable: true,
      dataIndex: "ENE",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: newValue,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "FEB",
      sortable: true,
      dataIndex: "FEB",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: newValue,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "MAR",
      sortable: true,
      dataIndex: "MAR",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: newValue,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "ABR",
      sortable: true,
      dataIndex: "ABR",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: newValue,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "MAY",
      sortable: true,
      dataIndex: "MAY",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: newValue,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "JUN",
      sortable: true,
      dataIndex: "JUN",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: newValue,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "JUL",
      sortable: true,
      dataIndex: "JUL",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: newValue,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "AGO",
      sortable: true,
      dataIndex: "AGO",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: newValue,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "SEP",
      sortable: true,
      dataIndex: "SEP",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: newValue,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "OCT",
      sortable: true,
      dataIndex: "OCT",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: newValue,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "NOV",
      sortable: true,
      dataIndex: "NOV",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: newValue,
                  p_dic: record.data.DIC,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "DIC",
      sortable: true,
      dataIndex: "DIC",
      width: 80,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "thousandnumber";

        return {
          xtype: fieldType,
          maxValue: 1000000,
          minValue: 0,
          allowBlank: false,
          decimalPrecision: 0,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: newValue,
                  p_observacion: record.data.OBSERVACION,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
    },

    {
      text: "Observación",
      sortable: true,
      dataIndex: "OBSERVACION",
      width: 250,
      editable: true,
      getEditor: function (record) {
        var cc = Ext.ComponentQuery.query(
          "#DotacionPresupuestoGrilla #cbCc"
        )[0];

        var grid = this.up("grid"),
          cellediting = grid.findPlugin("cellediting"),
          editors = cellediting.editors,
          editor = editors.getByKey(this.id),
          fieldType;

        if (editor) {
          // Do this to avoid memory leaks
          editors.remove(editor);
        }

        if (cc.selection.data.ESTADO === "TERMINADO") {
          return null;
        }

        fieldType = "textfield";

        return {
          xtype: fieldType,
          typeAhead: true,
          maxLength: 1000,
          allowBlank: false,
          listeners: {
            change: function (obj, newValue, oldValue) {
              storeModificarPresupDotacion.load({
                params: {
                  p_anho: record.data.PFK_ANHO,
                  p_tipo: record.data.PFK_TIPO,
                  p_cod_emp: EMPRESA,
                  p_cod_cc: record.data.PFK_COD_CC,
                  p_cod_cargo: record.data.PK_COD_CARGO,
                  p_dotacion: record.data.DOTACION,
                  p_ene: record.data.ENE,
                  p_feb: record.data.FEB,
                  p_mar: record.data.MAR,
                  p_abr: record.data.ABR,
                  p_may: record.data.MAY,
                  p_jun: record.data.JUN,
                  p_jul: record.data.JUL,
                  p_ago: record.data.AGO,
                  p_sep: record.data.SEP,
                  p_oct: record.data.OCT,
                  p_nov: record.data.NOV,
                  p_dic: record.data.DIC,
                  p_observacion: newValue,
                  p_usuario: NOMBRE,
                },
              });
            },
          },
        };
      },
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
          store: storeCargarCCPresupPorUsuario,
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
              cargarCCDotacionPresupuesto();
            },
          },
        },
        {
          text: "Agregar Cargo",
          itemId: "btnIngresar",
          tooltip: "Agregar nuevo cargo",
          iconCls: "icon-form-add",
          scale: "medium",
          hidden: true,
          handler: function () {
            var param = storeCargarPresupuestos2.getAt(0);
            console.log(param);
            ventanaDinamica(
              "CrearDotacionPresupuesto",
              "Agregar Cargo",
              "500",
              "",
              "CrearDotacionPresupuesto",
              1,
              0,
              0,
              param
            );
          },
        },
        {
          text: "Terminar CC",
          itemId: "btnTerminar",
          tooltip: "El centro de costo pasa a estado TERMINADO.",
          iconCls: "icon-form-ok",
          scale: "medium",
          hidden: true,
          handler: function () {
            Ext.MessageBox.confirm(
              "Terminar Centro de Costo",
              "¿Esta seguro de terminar el centro de costo?",
              function (btn) {
                if (btn === "yes") {
                  var cc = Ext.ComponentQuery.query(
                    "#DotacionPresupuestoGrilla #cbCc"
                  )[0].value;

                  var obj = storeCargarPresupuestos2.getAt(0);

                  if (cc != null && cc != "") {
                    storeModificarEstadoPresupuestoCC.load({
                      params: {
                        p_anho: obj.data.PK_ANHO,
                        p_cod_emp: obj.data.PFK_COD_EMP,
                        p_tipo: obj.data.PK_TIPO,
                        p_cod_cc: cc,
                        p_estado: "TERMINADO",
                        p_usuario: NOMBRE,
                      },
                      callback: function (records, operation, success) {
                        if (records != null) {
                          if (records[0].data.r_msg == "OK") {
                            Ext.ComponentQuery.query(
                              "#DotacionPresupuestoGrilla #cbCc"
                            )[0].setValue(null);
                            showToast(
                              "Centro de Costo terminado correctamente."
                            );
                            if (Ext.getCmp("DotacionPresupuesto") != null) {
                              initDotacionPresupuesto();
                              Ext.ComponentQuery.query(
                                "#DotacionPresupuestoGrilla #cbCc"
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
        {
          xtype: "label",
          html:
            "<b>Nota: Las columnas mensuales y la observación son editables.</b>",
        },
      ],
    },
  ],
  //title: 'Conceptos de Trabajadores ('+NOM_EMPRESA+')',
});

var initDotacionPresupuesto = function () {
  storeCargarDotacionesPresup2.loadData([], false);
  storeCargarPresupuestos2.load({
    params: {
      p_cod_emp: EMPRESA,
      p_estado: "EN ESPERA",
    },
    callback: function (records, operation, success) {
      console.log(records);
      if (records !== null && records.length > 0) {
        Ext.ComponentQuery.query("#DotacionPresupuesto #txtAnho")[0].setValue(
          records[0].data.PK_ANHO
        );
        Ext.ComponentQuery.query("#DotacionPresupuesto #txtTipo")[0].setValue(
          records[0].data.PK_TIPO
        );
        Ext.ComponentQuery.query("#DotacionPresupuesto #txtInicio")[0].setValue(
          records[0].data.INICIO
        );
        Ext.ComponentQuery.query(
          "#DotacionPresupuesto #txtTermino"
        )[0].setValue(records[0].data.TERMINO);
        Ext.ComponentQuery.query("#DotacionPresupuesto #txtEstado")[0].setValue(
          records[0].data.ESTADO
        );

        if (records[0].data.ESTADO == "EN ESPERA") {
          Ext.ComponentQuery.query(
            "#DotacionPresupuesto #txtEstado"
          )[0].setFieldStyle(
            "background-color: " +
              rojo +
              " background-image: none; color: white; font-weight: bold;"
          );
        } else {
          Ext.ComponentQuery.query(
            "#DotacionPresupuesto #txtEstado"
          )[0].setFieldStyle(
            "background-color: " +
              verde +
              "; background-image: none; color: white; font-weight: bold;"
          );
        }

        storeCargarCCPresupPorUsuario.load({
          params: {
            p_cod_emp: EMPRESA,
            p_usuario: NOMBRE,
            p_rol: ROL,
          },
        });
      } else {
        Ext.MessageBox.show({
          title: "ADVERTENCIA",
          msg: "No hay presupuesto en estado EN ESPERA",
          icon: Ext.MessageBox.WARNING,
          buttons: Ext.Msg.OK,
        });
        Ext.ComponentQuery.query("#DotacionPresupuesto")[0].setDisabled(true);
      }
    },
  });
};

var cargarCCDotacionPresupuesto = function () {
  storeCargarDotacionesPresup2.loadData([], false);
  var cc = Ext.ComponentQuery.query("#DotacionPresupuestoGrilla #cbCc")[0]
    .value;

  var obj = storeCargarPresupuestos2.getAt(0);

  if (cc != null && cc != "") {
    storeCargarDotacionesPresup2.load({
      params: {
        p_cod_emp: obj.data.PFK_COD_EMP,
        p_anho: obj.data.PK_ANHO,
        p_tipo: obj.data.PK_TIPO,
        p_cod_cc: cc,
      },
    });
  }
};

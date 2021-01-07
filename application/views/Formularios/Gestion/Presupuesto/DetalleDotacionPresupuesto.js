Ext.define("fcab.Container.MainPresupuesto.DetalleDotacion", {
  extend: "Ext.container.Container",
  xtype: "MainPresupuestoDetalleDotacion",
  itemId: "MainPresupuestoDetalleDotacion",
  id: "MainPresupuestoDetalleDotacion",
  border: false,
  frame: false,
  items: [
    {
      xtype: "panel",
      width: "100%",
      layout: {
        type: "vbox",
        align: "middle",
        pack: "center",
      },
      items: [
        {
          margin: 10,
          xtype: "combo",
          name: "cbCc",
          itemId: "cbCc",
          displayField: "DESC_CC",
          valueField: "PK_COD_CC",
          store: storeCargarCCPresup2,
          fieldLabel: "Buscar por CC",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          allowBlank: true,
          readOnly: false,
          width: 500,
          listeners: {
            change: function (cb, nuevoValor) {
              if (nuevoValor != null) {
                cargarCCDotacionPresupuestoDetalle();
              }
            },
          },
        },
        {
          xtype: "MainPresupuestoDetalleDotacionGrilla",
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.MainPresupuesto.DetalleDotacionGrilla", {
  extend: "Ext.grid.Panel",
  xtype: "MainPresupuestoDetalleDotacionGrilla",
  itemId: "MainPresupuestoDetalleDotacionGrilla",
  store: storeCargarDotacionesPresup,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
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
                  var ewin = Ext.WindowManager.getActive();
                  if (ewin) {
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
                            showToast("Valores mensuales dejados en 0.");
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
      width: 150,
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
          "#MainPresupuestoDetalleDotacion #cbCc"
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
      items: [
        {
          text: "Agregar Cargo",
          itemId: "btnIngresar",
          tooltip: "Agregar nuevo cargo",
          iconCls: "icon-form-add",
          handler: function () {
            var param = Ext.getCmp("MainPresupuestoDetalle").myExtraParams
              .param2;
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
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "Dotacion",
              fileName: "DOT_PRESUPUESTO_" + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
  width: "100%",
});

var cargarCCDotacionPresupuestoDetalle = function () {
  var param = Ext.getCmp("MainPresupuestoDetalle").myExtraParams.param2.data;
  var cc = Ext.ComponentQuery.query("#MainPresupuestoDetalleDotacion #cbCc")[0]
    .value;

  if (cc != null && cc != "") {
    storeCargarDotacionesPresup.load({
      params: {
        p_cod_emp: EMPRESA,
        p_anho: param.PK_ANHO,
        p_tipo: param.PK_TIPO,
        p_cod_cc: cc,
      },
    });
  }
};

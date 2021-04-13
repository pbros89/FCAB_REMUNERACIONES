Ext.define("fcab.Container.IndAusentismo.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndAusentismoGrid",
  itemId: "IndAusentismoGrid",
  store: storeCargarConteoAusentismoMensualDinamic,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  margin: 10,
  plugins: pluginFactory(),
  columns: [
    {
      text: "AÑO",
      sortable: true,
      dataIndex: "ANHO",
      hidden: false,
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "MES",
      sortable: true,
      dataIndex: "MES_TEXT",
      hidden: false,
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      itemId: "colEmp",
      text: "EMPRESA",
      sortable: true,
      dataIndex: "NOM_EMP",
      hidden: true,
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      itemId: "colGer",
      text: "GERENCIA",
      sortable: true,
      dataIndex: "COD_GERENCIA",
      hidden: true,
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      itemId: "colRol",
      text: "ROL",
      sortable: true,
      dataIndex: "ROL",
      hidden: true,
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "DIAS_TOTALES",
      sortable: true,
      dataIndex: "TOTAL",
      //align: 'center',
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "DIAS_TRABAJADOS",
      sortable: true,
      dataIndex: "DIAS_TRABAJADOS",
      //align: 'center',
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "VACACIONES",
      sortable: true,
      dataIndex: "VACACIONES",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "LICENCIAS",
      sortable: true,
      dataIndex: "LICENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "AUSENCIAS",
      sortable: true,
      dataIndex: "AUSENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "% VACACIONES",
      sortable: true,
      dataIndex: "VACACIONES",
      width: 100,
      renderer: function (value, meta, record) {
        var valor =
          record.data.TOTAL > 0
            ? (record.data.VACACIONES * 100) / record.data.TOTAL
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
      },
    },
    {
      text: "% LICENCIAS",
      sortable: true,
      dataIndex: "LICENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        var valor =
          record.data.TOTAL > 0
            ? (record.data.LICENCIAS * 100) / record.data.TOTAL
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
      },
    },
    {
      text: "% AUSENCIAS",
      sortable: true,
      dataIndex: "AUSENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        var valor =
          record.data.TOTAL > 0
            ? (record.data.AUSENCIAS * 100) / record.data.TOTAL
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
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
              title: "Ausentismo ",
              fileName: "Ausentismo_" + new Date().getTime() + ".xls",
            });
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Empresa",
          itemId: "checkEmp",
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query(
                "#IndAusentismoGrid #colEmp"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndAusentismoGrid();
            },
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Gerencia",
          itemId: "checkGer",
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query(
                "#IndAusentismoGrid #colGer"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndAusentismoGrid();
            },
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Rol",
          itemId: "checkRol",
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query(
                "#IndAusentismoGrid #colRol"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndAusentismoGrid();
            },
          },
        },
      ],
    },
  ],
});

var cargarIndAusentismoGrid = function () {
  var checkEmp = Ext.ComponentQuery.query("#IndAusentismoGrid #checkEmp")[0];
  var checkGer = Ext.ComponentQuery.query("#IndAusentismoGrid #checkGer")[0];
  var checkRol = Ext.ComponentQuery.query("#IndAusentismoGrid #checkRol")[0];
  var grid = Ext.ComponentQuery.query("#IndAusentismoGrid")[0];
  var params = null;
  if (grid.filtros != null) {
    grid.filtros.p_is_emp = checkEmp.checked ? "1" : "";
    grid.filtros.p_is_ger = checkGer.checked ? "1" : "";
    grid.filtros.p_is_rol = checkRol.checked ? "1" : "";
    params = grid.filtros;
  } else {
    var date = new Date();
    var year = date.getFullYear();
    params = {
      p_anho: year,
      p_cod_emp: EMPRESA,
      p_cod_ger: "",
      p_cod_dep: "",
      p_cod_cc: "",
      p_rol_cargo: "",
      p_is_emp: checkEmp.checked ? "1" : "",
      p_is_ger: checkGer.checked ? "1" : "",
      p_is_rol: checkRol.checked ? "1" : "",
    };
  }

  storeCargarConteoAusentismoMensualDinamic.load({
    params: params,
    callback: function (records, operation, success) {
      if (records != null) {
        var itemTotal = {};
        itemTotal.MES_TEXT = "TOTAL";
        itemTotal.TOTAL = 0;
        itemTotal.DIAS_TRABAJADOS = 0;
        itemTotal.VACACIONES = 0;
        itemTotal.LICENCIAS = 0;
        itemTotal.AUSENCIAS = 0;

        for (var i = 0; i < records.length; i++) {
          itemTotal.TOTAL += parseInt(records[i].data.TOTAL);
          itemTotal.DIAS_TRABAJADOS += parseInt(
            records[i].data.DIAS_TRABAJADOS
          );
          itemTotal.VACACIONES += parseInt(records[i].data.VACACIONES);
          itemTotal.LICENCIAS += parseInt(records[i].data.LICENCIAS);
          itemTotal.AUSENCIAS += parseInt(records[i].data.AUSENCIAS);
        }
        storeCargarConteoAusentismoMensualDinamic.add(itemTotal);
      }
    },
  });
};

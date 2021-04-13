Ext.define("fcab.Container.IndRotacion.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndRotacionGrid",
  itemId: "IndRotacionGrid",
  store: storeCargarConteoRotacionMensualDinamic, //Ext.create('Ext.data.Store'),
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
      text: "DOTACION",
      sortable: true,
      dataIndex: "DOTACION",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "ROTACION TOTAL",
      sortable: true,
      dataIndex: "ROTACION_TOTAL",
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "ROTACION VOLUNTARIA",
      sortable: true,
      dataIndex: "ROTACION_VOLUNTARIA",
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "% ROTACION TOTAL",
      sortable: true,
      dataIndex: "% ROTACION TOTAL",
      width: 150,
      renderer: function (value, meta, record) {
        var valor =
          record.data.ROTACION_TOTAL > 0
            ? (record.data.ROTACION_TOTAL * 100) / record.data.DOTACION
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
      },
    },

    {
      text: "% ROTACION VOLUNTARIA",
      sortable: true,
      dataIndex: "% ROTACION VOLUNTARIA",
      width: 150,
      renderer: function (value, meta, record) {
        var valor =
          record.data.ROTACION_VOLUNTARIA > 0
            ? (record.data.ROTACION_VOLUNTARIA * 100) / record.data.DOTACION
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
              title: "Rotacion",
              fileName: "Rotacion_" + new Date().getTime() + ".xls",
            });
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Empresa",
          
          itemId: "checkEmp",
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query("#IndRotacionGrid #colEmp")[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndRotacionGrid();
            },
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Gerencia",
          
          itemId: "checkGer",
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query("#IndRotacionGrid #colGer")[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndRotacionGrid();
            },
          },
        },
        {
          xtype: "checkboxfield",
          boxLabel: "Rol",
          itemId: "checkRol",
          
          listeners: {
            change: function (checkbox, newValue, oldValue, eOpts) {
              var col = Ext.ComponentQuery.query("#IndRotacionGrid #colRol")[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndRotacionGrid();
            },
          },
        },
      ],
    },
  ],
});

var cargarIndRotacionGrid = function () {
  var checkEmp = Ext.ComponentQuery.query("#IndRotacionGrid #checkEmp")[0];
  var checkGer = Ext.ComponentQuery.query("#IndRotacionGrid #checkGer")[0];
  var checkRol = Ext.ComponentQuery.query("#IndRotacionGrid #checkRol")[0];
  var grid = Ext.ComponentQuery.query("#IndRotacion #IndRotacionGrid")[0];
  var params = null;
  console.log(grid);
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
      p_causal: "",
      p_is_emp: checkEmp.checked ? "1" : "",
      p_is_ger: checkGer.checked ? "1" : "",
      p_is_rol: checkRol.checked ? "1" : "",
    };
  }

  storeCargarConteoRotacionMensualDinamic.load({
    params: params,
  });
};

Ext.define("fcab.Container.IndDistribucionAntiguedad.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndDistribucionAntiguedadGrid",
  itemId: "IndDistribucionAntiguedadGrid",
  store: storeCargarConteoDotacionAntiguedadMensualDinamic,
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
    },
    {
      text: "MES",
      sortable: true,
      dataIndex: "MES_TEXT",
      hidden: false,
      width: 100,
    },
    {
      itemId: "colEmp",
      text: "EMPRESA",
      sortable: true,
      dataIndex: "NOM_EMP",
      hidden: true,
      width: 150,
    },
    {
      itemId: "colGer",
      text: "GERENCIA",
      sortable: true,
      dataIndex: "COD_GERENCIA",
      hidden: true,
      width: 150,
    },
    {
      itemId: "colRol",
      text: "ROL",
      sortable: true,
      dataIndex: "ROL",
      hidden: true,
      width: 150,
    },
    //"< 1", ">= 1 & <= 5", "> 5 & <= 10", "> 10 & <= 20", "> 20"
    {
      text: "< 1",
      sortable: true,
      dataIndex: "< 1",
      //align: 'center',
      width: 100,
    },
    {
      text: ">= 1 & <= 5",
      sortable: true,
      dataIndex: ">= 1 & <= 5",
      width: 100,
      //hidden: true
    },
    {
      text: "> 5 & <= 10",
      sortable: true,
      dataIndex: "> 5 & <= 10",
      width: 100,
      //hidden: true
    },
    {
      text: "> 10 & <= 20",
      sortable: true,
      dataIndex: "> 10 & <= 20",
      width: 100,
    },

    {
      text: "> 20",
      sortable: true,
      dataIndex: "> 20",
      width: 100,
    },
    {
      text: "TOTAL",
      sortable: true,
      dataIndex: "TOTAL",
      width: 100,
    },
    {
      text: "PROMEDIO",
      sortable: true,
      dataIndex: "PROMEDIO",
      width: 100,
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
              title: "Dotación Antiguedad ",
              fileName: "Antiguedad_" + new Date().getTime() + ".xls",
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
                "#IndDistribucionAntiguedadGrid #colEmp"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionAntiguedadGrid();
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
                "#IndDistribucionAntiguedadGrid #colGer"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionAntiguedadGrid();
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
                "#IndDistribucionAntiguedadGrid #colRol"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionAntiguedadGrid();
            },
          },
        },
      ],
    },
  ],
});

var cargarIndDistribuscionAntiguedadGrid = function () {
  var checkEmp = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedadGrid #checkEmp"
  )[0];
  var checkGer = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedadGrid #checkGer"
  )[0];
  var checkRol = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedadGrid #checkRol"
  )[0];
  var grid = Ext.ComponentQuery.query("#IndDistribucionAntiguedadGrid")[0];
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

  storeCargarConteoDotacionAntiguedadMensualDinamic.load({
    params: params,
  });
};

Ext.define("fcab.Container.IndDistribucionPais.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndDistribucionPaisGrid",
  itemId: "IndDistribucionPaisGrid",
  store: storeCargarConteoDotacionRolPaisMensualDinamic,
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
    {
      text: "NACIONAL",
      sortable: true,
      dataIndex: "NACIONAL",
      //align: 'center',
      width: 100,
    },
    {
      text: "EXTRANJERO",
      sortable: true,
      dataIndex: "EXTRANJERO",
      width: 100,
      //hidden: true
    },
    {
      text: "TOTAL",
      sortable: true,
      dataIndex: "TOTAL",
      width: 100,
      //hidden: true
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
              title: "Dotación Pais ",
              fileName: "Pais_" + new Date().getTime() + ".xls",
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
                "#IndDistribucionPaisGrid #colEmp"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionPaisGrid();
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
                "#IndDistribucionPaisGrid #colGer"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionPaisGrid();
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
                "#IndDistribucionPaisGrid #colRol"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionPaisGrid();
            },
          },
        },
      ],
    },
  ],
});

var cargarIndDistribuscionPaisGrid = function () {
  var checkEmp = Ext.ComponentQuery.query(
    "#IndDistribucionPaisGrid #checkEmp"
  )[0];
  var checkGer = Ext.ComponentQuery.query(
    "#IndDistribucionPaisGrid #checkGer"
  )[0];
  var checkRol = Ext.ComponentQuery.query(
    "#IndDistribucionPaisGrid #checkRol"
  )[0];
  var grid = Ext.ComponentQuery.query("#IndDistribucionPaisGrid")[0];
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

  storeCargarConteoDotacionRolPaisMensualDinamic.load({
    params: params,
  });
};

Ext.define("fcab.Container.IndDistribucionSexo.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndDistribucionSexoGrid",
  itemId: "IndDistribucionSexoGrid",
  store: storeCargarConteoDotacionSexoMensualDinamic,
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
      text: "M",
      sortable: true,
      dataIndex: "M",
      //align: 'center',
      width: 100,
    },
    {
      text: "F",
      sortable: true,
      dataIndex: "F",
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
              title: "Dotación Sexo ",
              fileName: "Sexo_" + new Date().getTime() + ".xls",
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
                "#IndDistribucionSexoGrid #colEmp"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionSexoGrid();
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
                "#IndDistribucionSexoGrid #colGer"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionSexoGrid();
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
                "#IndDistribucionSexoGrid #colRol"
              )[0];
              if (newValue) {
                col.show();
              } else {
                col.hide();
              }
              cargarIndDistribuscionSexoGrid();
            },
          },
        },
      ],
    },
  ],
});

var cargarIndDistribuscionSexoGrid = function () {
  var checkEmp = Ext.ComponentQuery.query(
    "#IndDistribucionSexoGrid #checkEmp"
  )[0];
  var checkGer = Ext.ComponentQuery.query(
    "#IndDistribucionSexoGrid #checkGer"
  )[0];
  var checkRol = Ext.ComponentQuery.query(
    "#IndDistribucionSexoGrid #checkRol"
  )[0];
  var grid = Ext.ComponentQuery.query(
    "#IndDistribucionSexo #IndDistribucionSexoGrid"
  )[0];
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

  storeCargarConteoDotacionSexoMensualDinamic.load({
    params: params,
  });
};

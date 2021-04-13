Ext.define("fcab.Container.IndDistribucionPais", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionPais",
  itemId: "IndDistribucionPais",
  border: false,
  frame: false,
  autoScroll: true,
  padding: 10,
  constructor: function (config) {
    this.callParent([config]);
    
  },
  listeners: {
    afterrender: function () {
      cargarIndDistribuscionPais(null, true);
    },
  },
  items: [
    {
      layout: {
        type: "vbox",
        pack: "center",
        align: "center",
      },
      width: "100%",
      border: false,
      items: [
        {
          xtype: "panel",
          layout: "hbox",
          width: "100%",
          padding: 10,
          frame: false,
          border: false,
          items: [
            {
              xtype: "panel",
              border: false,
              itemId: "IndDistribucionPaisChartTitle",
              width: "90%",
            },
            {
              xtype: "button",
              text: "Filtrar",
              itemId: "btnFiltrar",
              margin: 5,
              handler: function () {
                var grid = Ext.ComponentQuery.query('#IndDistribucionPais #IndDistribucionPaisGrid')[0];
                var filtros = grid.filtros;
                ventanaDinamica("IndDistribucionPaisFiltro", "Filtrar", "800", "", "IndDistribucionPaisFiltro", 1, 0, grid, filtros);
                
              },
            },
          ],
        },
        {
          xtype: "panel",
          layout: "hbox",
          width: "100%",
          frame: false,
          border: false,
          items: [
            {
              xtype: "IndDistribucionPaisChart",
              width: "70%",
              height: 300,
            },
            {
              xtype: "IndDistribucionPaisChartDet",
              width: "30%",
              height: 300,
            },
          ],
        },
        {
          xtype: "IndDistribucionPaisGrid",
          width: "100%",
          height: 500,
        },
      ],
    },
  ],
});


var cargarIndDistribuscionPais = function (filtros, init) {
  var pnlChart = Ext.ComponentQuery.query(
    "#IndDistribucionPais #IndDistribucionPaisChart"
  )[0];

  var pnlChart2 = Ext.ComponentQuery.query(
    "#IndDistribucionPais #IndDistribucionPaisChartDet"
  )[0];

  var pnlTitle = Ext.ComponentQuery.query(
    "#IndDistribucionPais #IndDistribucionPaisChartTitle"
  )[0];
  var params = null;
  Ext.getCmp("MainIndicadores").disable();
  pnlChart.removeAll();
  pnlChart2.removeAll();
  pnlChart2.params = null;

  if (filtros != null) {
    params = filtros;
  } else {
    var date = new Date();
    var year = date.getFullYear();
    params = {
      p_anho: year,
      p_cod_emp: "",
      p_cod_ger: "",
      p_cod_dep: "",
      p_cod_cc: "",
      p_rol_cargo: "",
      p_cod_emp_nom: "",
      p_cod_ger_nom: "",
      p_cod_dep_nom: "",
      p_cod_cc_nom: "",
      p_rol_cargo_nom: ""
    };
  }

  if(init) {
    params.p_cod_emp=EMPRESA;
    params.p_cod_emp_nom = NOM_EMPRESA;
  }

  storeCargarConteoDotacionRolPaisMensual.load({
    params: params,
    callback: function () {
      Ext.getCmp("MainIndicadores").enable();
      var html =
        "<h2>Distribución Nacionalidad Mensual</h2>" +
        "<p><b>Filtros = Año:" +
        (params.p_anho != "" && params.p_anho != null ? params.p_anho : "TODOS") +
        " / Empresa:" +
        (params.p_cod_emp_nom != "" && params.p_cod_emp_nom != null? params.p_cod_emp_nom : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger_nom != "" && params.p_cod_ger_nom != null ? params.p_cod_ger_nom : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep_nom != "" && params.p_cod_dep_nom != null ? params.p_cod_dep_nom : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc_nom != "" && params.p_cod_cc_nom != null? params.p_cod_cc_nom : "TODOS") +
        " / Rol Cargo:" +
        (params.p_rol_cargo_nom != "" && params.p_rol_cargo_nom != null? params.p_rol_cargo_nom : "TODOS") +
        " </b></p>";
  
      pnlTitle.setHtml(html);
      pnlChart.add(getChartDistribucionPais());
      cargarIndDistribuscionPaisGrid();
    },
  });
};

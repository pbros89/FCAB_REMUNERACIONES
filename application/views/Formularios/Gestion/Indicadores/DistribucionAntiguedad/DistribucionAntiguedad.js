Ext.define("fcab.Container.IndDistribucionAntiguedad", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionAntiguedad",
  itemId: "IndDistribucionAntiguedad",
  border: false,
  frame: false,
  autoScroll: true,
  padding: 10,
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    afterrender: function () {
      cargarIndDistribuscionAntiguedad(null, true);
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
              itemId: "IndDistribucionAntiguedadChartTitle",
              width: "90%",
            },
            {
              xtype: "button",
              text: "Filtrar",
              itemId: "btnFiltrar",
              margin: 5,
              handler: function () {
                var grid = Ext.ComponentQuery.query(
                  "#IndDistribucionAntiguedad #IndDistribucionAntiguedadGrid"
                )[0];
                var filtros = grid.filtros;
                ventanaDinamica(
                  "IndDistribucionAntiguedadFiltro",
                  "Filtrar",
                  "800",
                  "",
                  "IndDistribucionAntiguedadFiltro",
                  1,
                  0,
                  grid,
                  filtros
                );
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
              xtype: "IndDistribucionAntiguedadChart",
              width: "70%",
              height: 300,
            },
            {
              xtype: "IndDistribucionAntiguedadChartDet",
              width: "30%",
              height: 300,
            },
          ],
        },

        {
          xtype: "IndDistribucionAntiguedadGrid",
          width: "100%",
          height: 500,
        },
      ],
    },
  ],
});

var cargarIndDistribuscionAntiguedad = function (filtros, init) {
  var pnlChart = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedad #IndDistribucionAntiguedadChart"
  )[0];
  var pnlChart2 = Ext.ComponentQuery.query("#IndDistribucionAntiguedad #IndDistribucionAntiguedadChartDet")[0];
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedad #IndDistribucionAntiguedadChartTitle"
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
      p_cod_emp_nom: "",
      p_cod_ger_nom: "",
      p_cod_dep_nom: "",
      p_cod_cc_nom: ""
    };
  }

  if (init) {
    params.p_cod_emp = EMPRESA;
    params.p_cod_emp_nom = NOM_EMPRESA;
  }

  storeCargarConteoDotacionAntiguedadMensual.load({
    params: params,
    callback: function () {
      Ext.getCmp("MainIndicadores").enable();
      var html =
        "<h2>Distribución Antiguedad Mensual</h2>" +
        "<p><b>Filtros = Año:" +
        (params.p_anho != "" && params.p_anho != null
          ? params.p_anho
          : "TODOS") +
        " / Empresa:" +
        (params.p_cod_emp_nom != "" && params.p_cod_emp_nom != null
          ? params.p_cod_emp_nom
          : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger_nom != "" && params.p_cod_ger_nom != null
          ? params.p_cod_ger_nom
          : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep_nom != "" && params.p_cod_dep_nom != null
          ? params.p_cod_dep_nom
          : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc_nom != "" && params.p_cod_cc_nom != null
          ? params.p_cod_cc_nom
          : "TODOS") +
        " </b></p>";
      console.log(html);
      pnlTitle.setHtml(html);
      pnlChart.add(getChartDistribucionAntiguedad());
      cargarIndDistribuscionAntiguedadGrid();
    },
  });
};

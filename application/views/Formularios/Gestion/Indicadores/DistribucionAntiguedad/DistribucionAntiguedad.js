Ext.define("fcab.Container.IndDistribucionAntiguedad", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionAntiguedad",
  itemId: "IndDistribucionAntiguedad",
  border: false,
  frame: false,
  width: "100%",
  layout: "anchor",
  padding: 10,
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    afterrender: function () {
      cargarIndDistribuscionAntiguedad(null);
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
          padding: 10,
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
          height: 300,
        },
      ],
    },
  ],
});

var cargarIndDistribuscionAntiguedad = function (filtros) {
  var pnlChart = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedad #IndDistribucionAntiguedadChart"
  )[0];
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndDistribucionAntiguedad #IndDistribucionAntiguedadChartTitle"
  )[0];
  var params = null;
  Ext.getCmp("MainIndicadores").disable();
  pnlChart.removeAll();

  if (filtros != null) {
    params = filtros;
  } else {
    var date = new Date();
    var year = date.getFullYear();
    params = {
      p_anho: year,
      p_cod_emp: EMPRESA,
      p_cod_ger: "",
      p_cod_dep: "",
      p_cod_cc: "",
    };
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
        (params.p_cod_emp != "" && params.p_cod_emp != null
          ? params.p_cod_emp
          : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger != "" && params.p_cod_ger != null
          ? params.p_cod_ger
          : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep != "" && params.p_cod_dep != null
          ? params.p_cod_dep
          : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc != "" && params.p_cod_cc != null
          ? params.p_cod_cc
          : "TODOS") +
        " </b></p>";
      console.log(html);
      pnlTitle.setHtml(html);
      pnlChart.add(getChartDistribucionAntiguedad());
    },
  });
};

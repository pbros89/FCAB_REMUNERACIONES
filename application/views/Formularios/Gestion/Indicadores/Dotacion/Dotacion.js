Ext.define("fcab.Container.IndDotacion", {
  extend: "Ext.Panel",
  xtype: "IndDotacion",
  itemId: "IndDotacion",
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
      cargarIndDotacion(null);
    },
  },
  items: [
    {
      layout: {
        type: "vbox",
        pack: "center",
        align: "center",
      },
      width:'100%',
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
              itemId: "IndDotacionChartTitle",
              width: "80%",
            },
            {
              xtype: "button",
              text: "Filtrar",
              itemId: "btnFiltrar",
              margin: 5,
              handler: function () {
                var grid = Ext.ComponentQuery.query(
                  "#IndDotacion #IndDotacionGrid"
                )[0];
                var filtros = grid.filtros;
                ventanaDinamica(
                  "IndDotacionFiltro",
                  "Filtrar",
                  "800",
                  "",
                  "IndDotacionFiltro",
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
          width: '100%',
          padding: 10,
          frame: false,
          border: false,
          items: [
            {
              xtype: "IndDotacionChart",
              width: "50%",
              height: 300,
            },
            {
              xtype: "IndDotacionGerenciaChart",
              width: "50%",
              height: 300,
            },
          ],
        },
        {
          xtype: "panel",
          layout: "hbox",
          width: '100%',
          padding: 10,
          frame: false,
          border: false,
          items: [
            {
              xtype: "IndDotacionGrid",
              width:'50%',
              height: 300,
            },
            {
              xtype: "IndDotacionGerenciaGrid",
              width:'50%',
              height: 300,
            },
          ],
        },
        
      ],
    },
  ],
});

var cargarIndDotacion = function (filtros) {
  var pnlChart1 = Ext.ComponentQuery.query("#IndDotacion #IndDotacionChart")[0];
  var pnlChart2 = Ext.ComponentQuery.query("#IndDotacion #IndDotacionGerenciaChart")[0];
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndDotacion #IndDotacionChartTitle"
  )[0];
  var params = null;
  Ext.getCmp("MainIndicadores").disable();
  pnlChart1.removeAll();
  pnlChart2.removeAll();

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
      p_rol_cargo: "",
    };
  }

  storeCargarConteoDotacionMensual.load({
    params: params,
    callback: function () {
      Ext.getCmp("MainIndicadores").enable();
      var html =
        "<h2>Dotación Mensual</h2>" +
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
        " / Rol Cargo:" +
        (params.p_rol_cargo != "" && params.p_rol_cargo != null
          ? params.p_rol_cargo
          : "TODOS") +
        " </b></p>";
      console.log(html);
      pnlTitle.setHtml(html);
      pnlChart1.add(getChartDotacion());
    },
  });

};

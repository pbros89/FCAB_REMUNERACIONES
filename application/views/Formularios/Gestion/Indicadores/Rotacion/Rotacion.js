Ext.define("fcab.Container.IndRotacion", {
  extend: "Ext.Panel",
  xtype: "IndRotacion",
  itemId: "IndRotacion",
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
      cargarIndRotacion(null);
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
              itemId: "IndRotacionChartTitle",
              width: "90%",
              height:'80px',
            },
            {
              xtype: "button",
              text: "Filtrar",
              itemId: "btnFiltrar",
              margin: 5,
              handler: function () {
                var grid = Ext.ComponentQuery.query('#IndRotacion #IndRotacionGrid')[0];
                var filtros = grid.filtros;
                ventanaDinamica("IndRotacionFiltro", "Filtrar", "800", "", "IndRotacionFiltro", 1, 0, grid, filtros);
                
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
          items: [{
            xtype: "IndRotacionTotalChart",
            width: "50%",
            height: 400,
            title: 'Rotación Total'
          },{
            xtype: "IndRotacionVoluntariaChart",
            width: "50%",
            height: 400,
            title: 'Rotación Voluntaria'
          },]
        },
        

        {
          xtype: "IndRotacionGrid",
          width: "100%",
          height: 500,
        },
      ],
    },
  ],
});


var cargarIndRotacion = function (filtros) {
  var grid = Ext.ComponentQuery.query(
    "#IndRotacion #IndRotacionGrid"
  )[0];
  var storeGrid = grid.getStore();
  var pnlChartTotal = Ext.ComponentQuery.query(
    "#IndRotacion #IndRotacionTotalChart"
  )[0];
  var pnlChartVoluntaria = Ext.ComponentQuery.query(
    "#IndRotacion #IndRotacionVoluntariaChart"
  )[0];
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndRotacion #IndRotacionChartTitle"
  )[0];
  var params = null;
  Ext.getCmp("MainIndicadores").disable();
  pnlChartTotal.removeAll();
  pnlChartVoluntaria.removeAll();

  if (filtros != null) {
    params = filtros;
  } else {
    params = {
      p_cod_emp: "",
      p_cod_ger: "",
      p_cod_dep: "",
      p_cod_cc: "",
      p_rol_cargo: "",
      p_causal: ""
    };
  }

  storeCargarConteoRotacionConsolidado.load({
    params: params,
  });
  storeCargarConteoRotacionMensual.load({
    params: params,
    callback: function (records, operation, success) {

      Ext.getCmp("MainIndicadores").enable();
      var html =
        "<h2>Rotación 12 meses moviles</h2>" +
        "<p><b>Filtros = Empresa:" +
        (params.p_cod_emp != "" && params.p_cod_emp != null? params.p_cod_emp : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger != "" && params.p_cod_ger != null ? params.p_cod_ger : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep != "" && params.p_cod_dep != null ? params.p_cod_dep : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc != "" && params.p_cod_cc != null? params.p_cod_cc : "TODOS") +
        " / Rol Cargo:" +
        (params.p_rol_cargo != "" && params.p_rol_cargo != null? params.p_rol_cargo : "TODOS") +
        " / Causal:" +
        (params.p_causal != "" && params.p_causal != null? params.p_causal : "TODOS") +
        " </b></br>"+
        "<i>Nota: El último mes de cierre define el final de los 12 meses moviles.</i></p>";
      pnlTitle.setHtml(html);
      pnlChartTotal.add(getChartRotacionTotal());
      pnlChartVoluntaria.add(getChartRotacionVoluntaria());
    },
  });
};

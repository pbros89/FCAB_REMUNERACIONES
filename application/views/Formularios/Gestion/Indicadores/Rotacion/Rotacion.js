Ext.define("fcab.Container.IndRotacion", {
  extend: "Ext.Panel",
  xtype: "IndRotacion",
  itemId: "IndRotacion",
  border: false,
  frame: false,
  autoScroll: true,
  padding: 10,
  constructor: function (config) {
    this.callParent([config]);
    
  },
  listeners: {
    afterrender: function () {
      cargarIndRotacion(null, true);
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


var cargarIndRotacion = function (filtros, init) {

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
      p_causal: "",
      p_cod_emp_nom: "",
      p_cod_ger_nom: "",
      p_cod_dep_nom: "",
      p_cod_cc_nom: "",
      p_rol_cargo_nom: "",
      p_causal_nom: ""
    };
  }

  if(init) {
    params.p_cod_emp=EMPRESA;
    params.p_cod_emp_nom = NOM_EMPRESA;
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
        (params.p_cod_emp_nom != "" && params.p_cod_emp_nom != null? params.p_cod_emp_nom : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger_nom != "" && params.p_cod_ger_nom != null ? params.p_cod_ger_nom : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep_nom != "" && params.p_cod_dep_nom != null ? params.p_cod_dep_nom : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc_nom != "" && params.p_cod_cc_nom != null? params.p_cod_cc_nom : "TODOS") +
        " / Rol Cargo:" +
        (params.p_rol_cargo_nom != "" && params.p_rol_cargo_nom != null? params.p_rol_cargo_nom : "TODOS") +
        " / Causal:" +
        (params.p_causal_nom != "" && params.p_causal_nom != null? params.p_causal_nom : "TODOS") +
        " </b></br>"+
        "<i>Nota: El último mes de cierre define el final de los 12 meses moviles.</i></p>";
      pnlTitle.setHtml(html);
      pnlChartTotal.add(getChartRotacionTotal());
      pnlChartVoluntaria.add(getChartRotacionVoluntaria());
      cargarIndRotacionGrid();
    },
  });
};

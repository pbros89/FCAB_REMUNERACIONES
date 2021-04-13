Ext.define("fcab.Container.IndDotacion", {
  extend: "Ext.Panel",
  xtype: "IndDotacion",
  itemId: "IndDotacion",
  border: false,
  frame: false,
  autoScroll: true,
  padding: 10,
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    afterrender: function () {
      cargarIndDotacion(null, true);
    },
  },
  items: [
    {
      layout: {
        type: "vbox",
        pack: "center",
        align: "stretch",
      },
      flex: 1,
      border: false,
      items: [
        {
          xtype: "panel",
          layout: "hbox",
          padding: 10,
          frame: false,
          border: false,
          items: [
            {
              xtype: "panel",
              border: false,
              itemId: "IndDotacionChartTitle",
              width: "90%",
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
          frame: false,
          border: false,
          items: [
            {
              xtype: "IndDotacionChart",
              flex: 1,
              height: 300,
            },
            {
              xtype: "IndDotacionEmpresaChart",
              flex: 1,
              height: 300,
            },
            {
              xtype: "IndDotacionGerenciaChart",
              flex: 1,
              height: 300,
            },
          ],
        },
        {
          xtype: "IndDotacionGrid",
          height: 500,
        },
      
        
      ],
    },
  ],
});

var cargarIndDotacion = function (filtros, init) {
  var pnlChart1 = Ext.ComponentQuery.query("#IndDotacion #IndDotacionChart")[0];
  var pnlChart2 = Ext.ComponentQuery.query("#IndDotacion #IndDotacionGerenciaChart")[0];
  var pnlChart3 = Ext.ComponentQuery.query("#IndDotacion #IndDotacionEmpresaChart")[0];
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndDotacion #IndDotacionChartTitle"
  )[0];
  var params = null;
  Ext.getCmp("MainIndicadores").disable();
  pnlChart1.removeAll();
  pnlChart2.params = null;
  pnlChart2.removeAll();
  pnlChart3.removeAll();

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
        " / Rol Cargo:" +
        (params.p_rol_cargo_nom != "" && params.p_rol_cargo_nom != null
          ? params.p_rol_cargo_nom
          : "TODOS") +
        " </b></p>";
      pnlTitle.setHtml(html);
      pnlChart1.add(getChartDotacion());
      cargarIndDotacionGrid();
    },
  });

};

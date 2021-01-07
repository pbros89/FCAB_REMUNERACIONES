Ext.define("fcab.Container.IndAusentismo", {
  extend: "Ext.Panel",
  xtype: "IndAusentismo",
  itemId: "IndAusentismo",
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
      cargarIndAusentismo(null);
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
              itemId: "IndAusentismoChartTitle",
              width: "90%",
            },
            {
              xtype: "button",
              text: "Filtrar",
              itemId: "btnFiltrar",
              margin: 5,
              handler: function () {
                var grid = Ext.ComponentQuery.query('#IndAusentismo #IndAusentismoGrid')[0];
                var filtros = grid.filtros;
                ventanaDinamica("IndAusentismoFiltro", "Filtrar", "800", "", "IndAusentismoFiltro", 1, 0, grid, filtros);
                
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
              xtype: "IndAusentismoChart",
              width: "50%",
              height: 300,
            },
            {
              xtype: "IndAusentismoChartDet",
              width: "50%",
              height: 300,
            },
          ],
        },
        {
          xtype: "IndAusentismoGrid",
          width: "100%",
          height: 300,
        },
        {
          xtype: "IndAusentismoGridDet",
          width: "100%",
          height: 300,
        },
      ],
    },
  ],
});


var cargarIndAusentismo = function (filtros) {
  var pnlChart = Ext.ComponentQuery.query(
    "#IndAusentismo #IndAusentismoChart"
  )[0];
  var grid = Ext.ComponentQuery.query(
    "#IndAusentismo #IndAusentismoGrid"
  )[0];
  var storeGrid = grid.getStore();
  var pnlTitle = Ext.ComponentQuery.query(
    "#IndAusentismo #IndAusentismoChartTitle"
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
      p_rol_cargo: ""
    };
  }
  storeGrid.removeAll();
  storeCargarConteoAusentismoMensual.load({
    params: params,
    callback: function (records, operation, success) {

      if(records != null) {
        var itemTotal = {};
        itemTotal.MES_TEXT = 'TOTAL'
        itemTotal.TOTAL = 0;
        itemTotal.DIAS_TRABAJADOS = 0;
        itemTotal.VACACIONES = 0;
        itemTotal.LICENCIAS = 0;
        itemTotal.AUSENCIAS = 0;

        for(var i = 0; i < records.length; i++) {
          storeGrid.add(records[i].data);
          itemTotal.TOTAL += parseInt(records[i].data.TOTAL);
          itemTotal.DIAS_TRABAJADOS += parseInt(records[i].data.DIAS_TRABAJADOS);
          itemTotal.VACACIONES += parseInt(records[i].data.VACACIONES);
          itemTotal.LICENCIAS += parseInt(records[i].data.LICENCIAS);
          itemTotal.AUSENCIAS += parseInt(records[i].data.AUSENCIAS);
        }
        storeGrid.add(itemTotal);
      }

      Ext.getCmp("MainIndicadores").enable();
      
      var html =
        "<h2>Ausentismo Mensual</h2>" +
        "<p><b>Filtros = Año:" +
        (params.p_anho != "" && params.p_anho != null ? params.p_anho : "TODOS") +
        " / Empresa:" +
        (params.p_cod_emp != "" && params.p_cod_emp != null? params.p_cod_emp : "TODOS") +
        " / Gerencia:" +
        (params.p_cod_ger != "" && params.p_cod_ger != null ? params.p_cod_ger : "TODOS") +
        " / Departamento:" +
        (params.p_cod_dep != "" && params.p_cod_dep != null ? params.p_cod_dep : "TODOS") +
        " / Centro de Costo:" +
        (params.p_cod_cc != "" && params.p_cod_cc != null? params.p_cod_cc : "TODOS") +
        " / Rol Cargo:" +
        (params.p_rol_cargo != "" && params.p_rol_cargo != null? params.p_rol_cargo : "TODOS") +
        " </b></p>";
      pnlTitle.setHtml(html);
      pnlChart.add(getChartAusentismo());
    },
  });
};

Ext.define("fcab.Container.IndAusentismo.ChartDet", {
  extend: "Ext.Panel",
  xtype: "IndAusentismoChartDet",
  itemId: "IndAusentismoChartDet",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartAusentismoDet = function () {
  return {
    xtype: "cartesian",
    reference: "chart",
    legend: {
      docked: "right",
    },
    store: storeCargarConteoAusentismoGerencia,
    //insetPadding: 40,
    //innerPadding: 20,
    axes: [
      {
        type: "numeric",
        title: "Cantidades",
        position: "left",
        adjustByMajorUnit: true,
        grid: true,
        fields: ["VACACIONES", "LICENCIAS", "AUSENCIAS"],
        minimum: 0,
        label: {
          fontSize: 10,
          fontWeight: "bold",
        },
      },
      {
        type: "category",
        position: "bottom",
        title: "Gerencias",
        grid: true,
        fields: ["COD_GERENCIA"],
        label: {
          fontSize: 10,
          fontWeight: "bold",
          rotate: {
            degrees: -45,
          },
        },
      },
    ],
    series: [
      {
        type: "bar",
        title: ["VACACIONES", "LICENCIAS", "AUSENCIAS"],
        xField: "COD_GERENCIA",
        yField: ["VACACIONES", "LICENCIAS", "AUSENCIAS"],
        stacked: true,
        colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
        style: {
          opacity: 0.8,
        },
        highlight: {
          fillStyle: "yellow",
        },
        tooltip: {
          trackMouse: true,
          renderer: function (tooltip, record, item) {

            var fieldIndex = Ext.Array.indexOf(
                item.series.getYField(),
                item.field
              ),
              browser = item.series.getTitle()[fieldIndex];

            tooltip.setHtml(
              browser +
                " en " +
                record.get("MES_TEXT") +
                ": " +
                record.get(item.field)
            ); //+ '%');

            
          },
        },
      },
    ],
  };
};

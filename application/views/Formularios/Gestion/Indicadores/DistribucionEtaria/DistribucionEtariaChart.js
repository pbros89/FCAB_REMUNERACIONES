Ext.define("fcab.Container.IndDistribucionEtaria.Chart", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionEtariaChart",
  itemId: "IndDistribucionEtariaChart",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartDistribucionEtaria = function () {
  return {
    xtype: "cartesian",
    reference: "chart",
    legend: {
      docked: "right",
    },
    store: storeCargarConteoDotacionEtariaMensual,
    //insetPadding: 40,
    //innerPadding: 20,
    axes: [
      {
        type: "numeric",
        title: "Cantidades",
        position: "left",
        adjustByMajorUnit: true,
        grid: true,
        fields: [
          "< 30",
          ">= 30 a <= 45",
          "> 45 a <= 62",
          "> 62"],
        minimum: 0,
        label: {
          fontSize: 10,
          fontWeight: "bold",
        },
      },
      {
        type: "category",
        position: "bottom",
        title: "Meses",
        grid: true,
        fields: ["MES_TEXT"],
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
        title: [
          "< 30",
          ">= 30 & <= 45",
          "> 45 & <= 62",
          "> 62" ],
        xField: "MES_TEXT",
        yField: [
          "< 30",
          ">= 30 & <= 45",
          "> 45 & <= 62",
          "> 62"],
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
            var grid = Ext.ComponentQuery.query(
              "#IndDistribucionEtaria #IndDistribucionEtariaGrid"
            )[0];
            var filtros = grid.filtros;
            var pnlChart2 = Ext.ComponentQuery.query(
              "#IndDistribucionEtaria #IndDistribucionEtariaChartDet"
            )[0];
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

            if (pnlChart2.params) {
              if (
                pnlChart2.params.p_anho != record.get("ANHO") ||
                pnlChart2.params.p_mes != record.get("MES") ||
                pnlChart2.params.p_cod_emp != EMPRESA
              ) {
                //pnlChart2.removeAll();
                pnlChart2.params = {
                  p_anho: record.get("ANHO"),
                  p_mes: record.get("MES"),
                  p_cod_emp: filtros != null ? filtros.p_cod_emp : EMPRESA,
                  p_cod_ger: filtros != null ? filtros.p_cod_ger : "",
                  p_cod_dep: filtros != null ? filtros.p_cod_dep : "",
                  p_cod_cc: filtros != null ? filtros.p_cod_cc : "",
                };

                storeCargarConteoDotacionEtariaMensualDet.load({
                  params: pnlChart2.params,
                  callback: function () {
                    pnlChart2.add(getChartDistribuscionEtariaDet());
                  },
                });
              }
            } else {
              //pnlChart2.removeAll();
              pnlChart2.params = {
                p_anho: record.get("ANHO"),
                p_mes: record.get("MES"),
                p_cod_emp: filtros != null ? filtros.p_cod_emp : EMPRESA,
                p_cod_ger: filtros != null ? filtros.p_cod_ger : "",
                p_cod_dep: filtros != null ? filtros.p_cod_dep : "",
                p_cod_cc: filtros != null ? filtros.p_cod_cc : "",
              };

              storeCargarConteoDotacionEtariaMensualDet.load({
                params: pnlChart2.params,
                callback: function () {
                  pnlChart2.add(getChartDistribuscionEtariaDet());
                },
              });
            }
          },
        },
      },
    ],
  };
};

Ext.define("fcab.Container.IndDistribucionAntiguedad.Chart", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionAntiguedadChart",
  itemId: "IndDistribucionAntiguedadChart",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartDistribucionAntiguedad = function () {
  return {
    xtype: "cartesian",
    reference: "chart",
    legend: {
      docked: "right",
    },
    store: storeCargarConteoDotacionAntiguedadMensual,
    //insetPadding: 40,
    //innerPadding: 20,
    axes: [
      {
        type: "numeric",
        title: "Cantidades",
        position: "left",
        adjustByMajorUnit: true,
        grid: true,
        fields: ["< 1", ">= 1 & <= 5", "> 5 & <= 10", "> 10 & <= 20", "> 20"],
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
        title: ["< 1", ">= 1 & <= 5", "> 5 & <= 10", "> 10 & <= 20", "> 20"],
        xField: "MES_TEXT",
        yField: ["< 1", ">= 1 & <= 5", "> 5 & <= 10", "> 10 & <= 20", "> 20"],
        stacked: true,
        style: {
          opacity: 0.8,
        },
        colors: [
          "#005A8B",
          "#007C92",
          "#63CECA",
          "#EAAB00",
          "#CD202C",
          "#1E1E1E",
        ],
        highlight: {
          fillStyle: "yellow",
        },
        tooltip: {
          trackMouse: true,
          renderer: function (tooltip, record, item) {
            var grid = Ext.ComponentQuery.query(
              "#IndDistribucionAntiguedad #IndDistribucionAntiguedadGrid"
            )[0];
            var filtros = grid.filtros;
            var pnlChart2 = Ext.ComponentQuery.query(
              "#IndDistribucionAntiguedad #IndDistribucionAntiguedadChartDet"
            )[0];
            var fieldIndex = Ext.Array.indexOf(
                item.series.getYField(),
                item.field
              ),
              browser = item.series.getTitle()[fieldIndex];

            var total =
              parseInt(record.get("< 1")) +
              parseInt(record.get(">= 1 & <= 5")) +
              parseInt(record.get("> 5 & <= 10")) +
              parseInt(record.get("> 10 & <= 20")) + 
              parseInt(record.get("> 20"));

            var percent = (
              parseFloat(record.get(item.field) / total) * 100.0
            ).toFixed(2);

            tooltip.setHtml(
              "<b>Rango " +
                browser +
                " en " +
                record.get("MES_TEXT") +
                "</b></br>" +
                "Cantidad: " +
                record.get(item.field) +
                "</br>" +
                "Porcentaje: " +
                percent
            ); //+ '%');

            if (pnlChart2.params) {
              if (
                pnlChart2.params.p_anho != record.get("ANHO") ||
                pnlChart2.params.p_mes != record.get("MES")
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

                storeCargarConteoDotacionAntiguedadMensualDet.load({
                  params: pnlChart2.params,
                  callback: function () {
                    pnlChart2.add(getChartDistribucionAntiguedadDet());
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

              storeCargarConteoDotacionAntiguedadMensualDet.load({
                params: pnlChart2.params,
                callback: function () {
                  pnlChart2.add(getChartDistribucionAntiguedadDet());
                },
              });
            }
          },
        },
      },
    ],
  };
};

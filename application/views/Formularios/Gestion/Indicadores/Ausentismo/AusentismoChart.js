Ext.define("fcab.Container.IndAusentismo.Chart", {
  extend: "Ext.Panel",
  xtype: "IndAusentismoChart",
  itemId: "IndAusentismoChart",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartAusentismo = function () {
  return {
    xtype: "cartesian",
    reference: "chart",
    legend: {
      docked: "right",
    },
    store: storeCargarConteoAusentismoMensual,
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
        title: ["VACACIONES", "LICENCIAS", "AUSENCIAS"],
        xField: "MES_TEXT",
        yField: ["VACACIONES", "LICENCIAS", "AUSENCIAS"],
        stacked: true,
        colors: [
          "#005A8B",
          "#007C92",
          "#63CECA",
          "#EAAB00",
          "#CD202C",
          "#1E1E1E",
        ],
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
              "#IndAusentismo #IndAusentismoGrid"
            )[0];
            var filtros = grid.filtros;
            var pnlChart2 = Ext.ComponentQuery.query(
              "#IndAusentismo #IndAusentismoChartDet"
            )[0];
            var fieldIndex = Ext.Array.indexOf(
                item.series.getYField(),
                item.field
              ),
              browser = item.series.getTitle()[fieldIndex];

            var total =
              parseInt(record.get("VACACIONES")) +
              parseInt(record.get("LICENCIAS")) +
              parseInt(record.get("AUSENCIAS"));

            var percent = (
              parseFloat(record.get(item.field) / total) * 100.0
            ).toFixed(2);

            tooltip.setHtml(
              "<b>" +
                browser +
                " en " +
                record.get("MES_TEXT") +
                "</b></br>" +
                "Cantidad: " +
                record.get(item.field) +
                "</br>" +
                "Porcentaje: " +
                percent
            );

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
                  p_rol_cargo: filtros != null ? filtros.p_rol_cargo : "",
                };

                storeCargarConteoAusentismoGerencia.load({
                  params: pnlChart2.params,
                  callback: function () {
                    pnlChart2.add(getChartAusentismoDet());
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
                p_rol_cargo: filtros != null ? filtros.p_rol_cargo : "",
              };

              storeCargarConteoAusentismoGerencia.load({
                params: pnlChart2.params,
                callback: function () {
                  pnlChart2.add(getChartAusentismoDet());
                },
              });
            }
          },
        },
      },
    ],
  };
};

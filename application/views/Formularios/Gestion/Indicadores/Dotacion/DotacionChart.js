Ext.define("fcab.Container.IndDotacion.Chart", {
  extend: "Ext.Panel",
  xtype: "IndDotacionChart",
  itemId: "IndDotacionChart",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartDotacion = function () {
  return {
    xtype: "cartesian",
    reference: "chart",
    store: storeCargarConteoDotacionMensual,
    //insetPadding: 40,
    //innerPadding: 20,
    axes: [
      {
        type: "numeric",
        title: "Cantidades",
        position: "left",
        adjustByMajorUnit: true,
        grid: true,
        fields: ["VALOR"],
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
        title: ["VALOR"],
        xField: ["MES_TEXT"],
        yField: ["VALOR"],
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
              "#IndDotacion #IndDotacionGrid"
            )[0];
            var filtros = grid.filtros;
            var pnlChart2 = Ext.ComponentQuery.query(
              "#IndDotacion #IndDotacionGerenciaChart"
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
                  p_cod_ger : filtros != null ? filtros.p_cod_ger : '',
                  p_cod_dep : filtros != null ? filtros.p_cod_dep : '',
                  p_cod_cc: filtros != null ? filtros.p_cod_cc : '',
                  p_rol_cargo: filtros != null ? filtros.p_rol_cargo : ''
                };

                storeCargarConteoDotacionGerencia.load({
                  params: pnlChart2.params,
                  callback: function () {
                    pnlChart2.add(getChartDotacionGerencia());
                  },
                });
              }
            }else{
                //pnlChart2.removeAll();
                pnlChart2.params = {
                  p_anho: record.get("ANHO"),
                  p_mes: record.get("MES"),
                  p_cod_emp: filtros != null ? filtros.p_cod_emp : EMPRESA,
                  p_cod_ger : filtros != null ? filtros.p_cod_ger : '',
                  p_cod_dep : filtros != null ? filtros.p_cod_dep : '',
                  p_cod_cc: filtros != null ? filtros.p_cod_cc : '',
                  p_rol_cargo: filtros != null ? filtros.p_rol_cargo : ''
                };

                storeCargarConteoDotacionGerencia.load({
                  params: pnlChart2.params,
                  callback: function () {
                    pnlChart2.add(getChartDotacionGerencia());
                  },
                });
            }
          },
        },
      },
    ],
  };
};



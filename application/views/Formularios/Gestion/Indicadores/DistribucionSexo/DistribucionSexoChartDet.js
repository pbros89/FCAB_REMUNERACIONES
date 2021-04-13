Ext.define("fcab.Container.IndDistribucionSexo.ChartDet", {
  extend: "Ext.Panel",
  xtype: "IndDistribucionSexoChartDet",
  itemId: "IndDistribucionSexoChartDet",
  layout: "fit",
  width: "100%",
  padding: 10,
  items: [],
});

var getChartDistribucionSexoDet = function () {
  return {
    xtype: "polar",
    reference: "chart",
    store: storeCargarConteoDotacionRolSexoMensualDet,
    height: 300,
    insetPadding: 20,
    innerPadding: 20,
    interactions: ["rotate", "itemhighlight"],
    series: [
      {
        type: "pie",
        angleField: "CONTAR",
        colors: [
          "#005A8B",
          "#007C92",
          "#63CECA",
          "#EAAB00",
          "#CD202C",
          "#1E1E1E",
        ],
        label: {
          field: "TIPO",
          calloutLine: {
            length: 40,
            width: 3,
            // specifying 'color' is also possible here
          },
          fontSize: 10,
          fontWeight: "bold",
          renderer: function (text, sprite, config, rendererData, index) {
            var data = storeCargarConteoDotacionRolSexoMensualDet.data.items;
            var total = 0;
            data.forEach((obj) => {
              total += parseFloat(obj.get("CONTAR"));
            });
            var thisdata = data[index];
            var percent = (
              parseFloat(thisdata.get("CONTAR") / total) * 100.0
            ).toFixed(2);
            return percent + "%";
          },
        },
        highlight: true,
        tooltip: {
          trackMouse: true,
          renderer: function (tooltip, record, item) {
            var data = storeCargarConteoDotacionRolSexoMensualDet.data.items;
            var total = 0;
            data.forEach((obj) => {
              total += parseFloat(obj.get("CONTAR"));
            });
            var thisdata = record;
            var percent = (
              parseFloat(thisdata.get("CONTAR") / total) * 100.0
            ).toFixed(2);

            tooltip.setHtml(
              "<b>Sexo " +
                record.get("TIPO") + " en " +
                record.get("MES_TEXT") +
                "</b></br>" +
                "Cantidad: " +
                record.get("CONTAR") +
                "</br>" +
                "Porcentaje: " +
                percent
            );
          },
        },
      },
    ],
  };
};
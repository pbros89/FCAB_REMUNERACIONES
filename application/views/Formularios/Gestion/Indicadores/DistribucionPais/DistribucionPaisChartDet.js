Ext.define("fcab.Container.IndDistribucionPais.ChartDet", {
    extend: "Ext.Panel",
    xtype: "IndDistribucionPaisChartDet",
    itemId: 'IndDistribucionPaisChartDet',
    layout: "fit",
    width: '100%',
    padding: 10,
    items: [
    ],
  });

 

var getChartDistribucionPaisDet= function() {
    return {
            xtype: 'polar',
            reference: 'chart',
            store: storeCargarConteoDotacionRolPaisMensualDet,
            height:300,
            insetPadding: 40,
            innerPadding: 20,
            interactions: ['rotate', 'itemhighlight'],
            series: [{
                type: 'pie',
                angleField: 'CONTAR',
                colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
                label: {
                  field: 'TIPO',
                  calloutLine: {
                    length: 60,
                    width: 3
                    // specifying 'color' is also possible here
                },
                fontSize: 10,
                  fontWeight: 'bold',
                  
              },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        tooltip.setHtml(record.get('TIPO') + ': ' + record.get('CONTAR'));
                    }
                }
            }]
        };
}
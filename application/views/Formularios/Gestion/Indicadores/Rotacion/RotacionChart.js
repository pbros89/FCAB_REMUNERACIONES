Ext.define("fcab.Container.IndRotacionTotal.Chart", {
    extend: "Ext.Panel",
    xtype: "IndRotacionTotalChart",
    itemId: 'IndRotacionTotalChart',
    layout: "fit",
    width: '100%',
    padding: 10,
    items: [
    ],
  });

 

var getChartRotacionTotal= function() {
    return {
            xtype: 'polar',
            reference: 'chart',
            store: storeCargarConteoRotacionConsolidado,
            height:300,
            insetPadding: 40,
            innerPadding: 20,
            interactions: ['rotate', 'itemhighlight'],
            series: [{
                type: 'pie',
                angleField: 'PORCEN_ROTACION_TOTAL',
                colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
                label: {
                  field: 'ROL',
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
                        tooltip.setHtml('<b>' +record.get('ROL') + ': ' + record.get('PORCEN_ROTACION_TOTAL')+ '%' +'</b>');
                    }
                }
            }]
        };
}


Ext.define("fcab.Container.IndRotacionVoluntaria.Chart", {
    extend: "Ext.Panel",
    xtype: "IndRotacionVoluntariaChart",
    itemId: 'IndRotacionVoluntariaChart',
    layout: "fit",
    width: '100%',
    padding: 10,
    items: [
    ],
  });

 

var getChartRotacionVoluntaria= function() {
    return {
            xtype: 'polar',
            reference: 'chart',
            store: storeCargarConteoRotacionConsolidado,
            height:300,
            insetPadding: 40,
            innerPadding: 20,
            interactions: ['rotate', 'itemhighlight'],
            series: [{
                type: 'pie',
                angleField: 'PORCEN_ROTACION_VOLUNTARIA',
                colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
                label: {
                  field: 'ROL',
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
                        tooltip.setHtml(
                          '<b>'+record.get('ROL') + ': ' + record.get('PORCEN_ROTACION_VOLUNTARIA') + '%</b>');
                    }
                }
            }]
        };
}
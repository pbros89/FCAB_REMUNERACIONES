Ext.define("fcab.Container.IndDotacionGerencia.Chart", {
    extend: "Ext.Panel",
    xtype: "IndDotacionGerenciaChart",
    itemId: 'IndDotacionGerenciaChart',
    layout: "fit",
    width: '100%',
    padding: 10,
    items: [
    ],
  });

  var getChartDotacionGerencia = function(){
      return {
    xtype: 'cartesian',
    reference: 'chart',
    store: storeCargarConteoDotacionGerencia,
    //insetPadding: 40,
    //innerPadding: 20,
    axes: [{
        type: 'numeric',
        title: 'Cantidades',
        position: 'left',
        adjustByMajorUnit: true,
        grid: true,
        fields: ['VALOR'],
        minimum: 0,
        label: {
            fontSize: 10,
            fontWeight: 'bold'
        },
    }, {
        type: 'category',
        position: 'bottom',
        title: 'Gerencias',
        grid: true,
        fields: ['GERENCIA'],
        
        label: {
            rotate: {
                degrees: -45
            },
            fontSize: 10,
            fontWeight: 'bold'
        }
    }],
    series: [{
        type: 'bar',
        title: ['VALOR' ],
        xField: ['GERENCIA'],
        yField: ['VALOR' ],
        colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
        stacked: true,
        style: {
            opacity: 0.80
        },
        highlight: {
            fillStyle: 'yellow'
        },
        tooltip: {
            trackMouse: true,
            renderer: function(tooltip, record, item) {
                var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                    browser = item.series.getTitle()[fieldIndex];
        
                tooltip.setHtml(browser + ' en ' +
                    record.get('GERENCIA') + ': ' +
                    record.get(item.field)); //+ '%');
            },
        }
    }]
  };
}

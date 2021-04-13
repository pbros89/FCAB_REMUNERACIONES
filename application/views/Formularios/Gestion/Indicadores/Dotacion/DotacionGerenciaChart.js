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
    axes: [{
        type: 'numeric',
        title: 'Cantidades',
        position: 'left',
        adjustByMajorUnit: true,
        grid: true,
        fields: ['DOTACION'],
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
        title: ['DOTACION' ],
        xField: ['GERENCIA'],
        yField: ['DOTACION' ],
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
        
                tooltip.setHtml(
                    "<b>" +
                      "Dotación " +
                      record.get("GERENCIA") +
                      " en " +
                      record.get("MES_TEXT") +
                      "</b></br>" +
                      "Cantidad: " +
                      record.get(item.field) 
                  ); 
            },
        }
    }]
  };
}

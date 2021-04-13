Ext.define("fcab.Container.IndDotacionEmpresa.Chart", {
    extend: "Ext.Panel",
    xtype: "IndDotacionEmpresaChart",
    itemId: 'IndDotacionEmpresaChart',
    layout: "fit",
    width: '100%',
    padding: 10,
    items: [
    ],
  });

 

var getChartDotacionEmpresa= function() {
    return {
            xtype: 'polar',
            reference: 'chart',
            store: storeCargarConteoDotacionEmpresa,
            height:300,
            insetPadding: 20,
            innerPadding: 20,
            interactions: ['rotate', 'itemhighlight'],
            series: [{
                type: 'pie',
                angleField: 'DOTACION',
                colors: ['#005A8B', '#007C92',  '#63CECA', '#EAAB00',  '#CD202C', '#1E1E1E'],
                label: {
                  field: 'NOM_EMP',
                  calloutLine: {
                    length: 40,
                    width: 3
                    // specifying 'color' is also possible here
                },
                fontSize: 10,
                fontWeight: 'bold',
                renderer: function (text, sprite, config, rendererData, index) {
                  var data = storeCargarConteoDotacionEmpresa.data.items;
                  var total = 0;
                  data.forEach(obj => {
                    total += parseFloat(obj.get('DOTACION'));
                  });
                  var thisdata = data[index];
                  var percent = ((parseFloat(thisdata.get('DOTACION') / total) * 100.0).toFixed(2));                     
                  return thisdata.get('NOM_EMP') + ' ('+percent+"%)";
                }
                  
              },
                highlight: true,
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                      var data = storeCargarConteoDotacionEmpresa.data.items;
                      var total = 0;
                      data.forEach(obj => {
                        total += parseFloat(obj.get('DOTACION'));
                      });
                      var thisdata = record;
                      var percent = ((parseFloat(thisdata.get('DOTACION') / total) * 100.0).toFixed(2));      

                      tooltip.setHtml(
                        '<b>Dotación '+record.get('NOM_EMP')+ " en " +
                        record.get("MES_TEXT") +'</b></br>' + 
                        'Cantidad: ' + record.get('DOTACION') + '</br>' +
                        'Porcentaje: ' + percent
                      );
                    }
                }
            }]
        };
}
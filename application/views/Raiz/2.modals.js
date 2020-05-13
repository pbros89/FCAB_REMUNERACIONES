/**
 * ventanaDinamica
 * @param id: identificador (Debe ser unico)
 * @param nombre: Nombre de la nueva ventana
 * @param width: Ancho
 * @param height: Largo
 * @param formulario: Nombre del widget que utilizara (Debe estar definido)
 * @param modal: 1 o 0 (permite minimizar y utilizar otras ventanas o no (Opcional).
 * @param p1: Recibe una tienda enviada desde donde se creo la ventana, para utilizarla en el formulario (Opcional).
 * @param p2: ID del item que desea ser editado, creado o modificado (Opcional).
 */
var ventanaDinamica = function (id, nombre, width, height, formulario, modal, minimize, p1, p2) {
    var winWidth = parseInt(width);
    if(Ext.isEmpty(modal)) modal = 1;
    if(Ext.isEmpty(p1)) p1 = "";
    if(Ext.isEmpty(p2)) p2 = "";
    if(Ext.isEmpty(minimize)) minimize = 0;
    if (!Ext.getCmp(id)) {
        var vDinamica = new Ext.create('fcab.view.Nuevo', {
            title: nombre,
            id: id,
            width: parseInt(width),
            height: height,
            layout: 'anchor',
            modal: modal,
            border: 0,
            constrain: true,
            minimizable: minimize,
            resizable: false,
            constrainHeader: true,
            //scrollable: true,
            //autoScroll: true,
            items: [{
                xtype: formulario
            }],
            tools: [],
            listeners: {
                "show" : function(window) {
                    if(formulario === 'FormIssues') {
                        window.getEl().setOpacity(0);
                        window.getEl().fadeIn({duration: 1500});
                    }
                },
                    'hide':function(win){
                        hopscotch.endTour(true);
                    },
                "minimize": function (window, opts) {
                    window.collapse();
                    window.setWidth(150);
                    window.alignTo(Ext.getBody(), 'bl-bl')
                },
                "close": function (windows, opts) {
                    hopscotch.endTour(true);
                    if (windows.getTitle().toString() === "Pantalla de Reportes"){

                    }
                }
            }
        });
        vDinamica.myExtraParams = { param1: p1, param2: p2}; // Add additional stuff
        vDinamica.show();
        vDinamica.center();
    } else {
        var window = Ext.getCmp(id);
        window.setWidth(winWidth);
        window.expand('', false);
        window.center();
    }
};



Ext.define('fcab.view.Nuevo', {
    extend: 'Ext.window.Window',
    title: 'default',
    width: 300,
    //height: 400,
    layout: 'anchor',
    constrain: true,
    minimizable: false,
    resizable: false,
    constrainHeader: true,
    items: [{
            xtype: 'textfield'
        }]
});
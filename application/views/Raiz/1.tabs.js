/*******************************************************************************
 * Contiene El TabPanel Principal, el unico
 * no creado dinamicamente.
 *******************************************************************************/

Ext.define('fcab.view.TabPanel', {
    extend: 'Ext.tab.Panel',
    id: 'tab-default',
    plain: true,
    activeTab: 0,
    minWidth: 860,
    maxHeight: 3000,
    layout: 'anchor',
    border: false,
    defaults: {
        //border: false,
        //bodyPadding: 10
    },
    listeners: {
        'tabchange': function(tabPanel, tab){
             if(tab.id=="FormHome001")
             {
                   
             }
        }
   },
    //plugins: Ext.create('Ext.ux.TabReorderer'),
    items: [{
            title: "Inicio",
            id: "FormHome001",
            closeAction: 'destroy',
            iconCls: "icon-inicioTab",
            closable: 0, //BUG AL DESTRUIR ALGUNOS OBJETOS (CERRAR CON BOTON)
            layout: {
                type: 'anchor',
                align: 'top',
                pack: 'start',
            },
            loader: {
                loadMask: 'Cargando...'
            },
            autoScroll: true,
            items: [{
                    xtype: ROL == 'CARGA' ? "homeBasic": "homeAdmin"
                }],
            listeners: {
                close: function (tab) {

                }
            }
        }]
});
var tabs = Ext.create('fcab.view.TabPanel');

/*******************************************************************************
 * Función que Genera TabPanel Dinamicamente
 * no creado dinamicamente.
 * @param {type} id: La id del tabPanel
 * @param {type} titulo: El titulo del tabPanel
 * @param {type} icono: El iconos http://fortawesome.github.io/Font-Awesome/
 * @param {type} formulario: El iconos http://fortawesome.github.io/Font-Awesome/
 * @param {type} cerrable: El iconos http://fortawesome.github.io/Font-Awesome/
 * @returns {undefined}: Nada
 *******************************************************************************/

var addTab = function (id, titulo, icono, formulario, cerrable) {
    if (!Ext.getCmp(id)) {
        tabs.add({
            title: titulo,
            id: id,
            closeAction: 'destroy',
            iconCls: icono,
            border: false,
            autoScroll: true,
            closable: parseInt(cerrable), //BUG AL DESTRUIR ALGUNOS OBJETOS (CERRAR CON BOTON)
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            loader: {
                loadMask: 'Cargando...'
            },
            
            items: [{
                    xtype: formulario
                }],
            listeners: {
                close: function (tab) {

                }
            }
        });
        tabs.setActiveTab(id);
    } else {
        tabs.setActiveTab(id);
    }
};


Ext.define("fcab.Container.DetalleCambioBono", {

    extend: 'Ext.tab.Panel',
    xtype: 'DetalleCambioBono',
    itemId: 'DetalleCambioBono',
    activeTab: 0,
    width : '100%',

    listeners: {
        beforerender: function(){
        },
    },
    //buttonAlign: 'center',
    defaults: {
        
        scrollable: true
    },
    layout: {
        align: "stretch",
        pack: 'center'
    },
    items: [{
        title: 'Detalle',
        items:[{
            xtype: 'tabpanel',
            items: [{
                title: 'Información Personal',
                items:[{
                    xtype: 'DetalleCambioBonoInfo',
                }]
            }, {
                title: 'Bonos Actuales',
                items:[{
                    xtype: 'DetalleCambioBonoBonoActual'
                }]
            },]
        }]
    }, {
        title: 'Bonos Nuevos',
        items:[{
            xtype: 'DetalleCambioBonoBono'
        }]
    },],
});




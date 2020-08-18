Ext.define('fcab.Container.InicioDesvinculacion', {
    extend: 'Ext.form.Panel', 
    xtype: 'InicioDesvinculacion',
    id: 'idFormInicioDesvinculacion',
    border: false,
    autoScroll : true,
    defaults: {
        margin: '10 10 10 10'
    },
    listeners:{
        beforerender: function(){

            //

        }
    },
    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'left',
        },
        items: [{
            xtype: 'button',
            text: 'Nueva Solicitud',
            margin: '0 10 0 0',
            width: 300,
            handler: function(){

                ModalFormDesvinculacion();

            }
        }]
    }]
});
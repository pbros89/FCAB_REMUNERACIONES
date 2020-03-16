
var storePantallaSistema = Ext.create('Ext.data.Store', {
    proxy: {        
        type: 'ajax',
        url: JsonHost + 'querys/MenuSistema/getPantallas',
        reader: {
            type                    : 'json',
            rootProperty            : 'items',
            totalProperty           : 'total'
        }
    },
    autoLoad: false
});

var storeTiposRol = Ext.create('Ext.data.Store', {
    proxy: {        
        type: 'ajax',
        url: JsonHost + 'querys/MenuSistema/tiposRol',
        reader: {
            type                    : 'json',
            rootProperty            : 'items',
            totalProperty           : 'total'
        }
    },
    autoLoad: false
});

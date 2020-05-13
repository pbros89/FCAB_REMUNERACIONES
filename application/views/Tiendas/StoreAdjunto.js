var storeAdjuntos_cargarAdjuntos = Ext.create('Ext.data.Store', {
    fields:[
        {name:'file_name', type:'string'},
        {name:'file_size', type:'string'},
        {name:'file_type', type:'string'}
    ],
    proxy: {
    	type: 'ajax',
        url: JsonHost + 'adjunto/AdjuntoController/cargarAdjuntos',
        reader: {
            type: 'json',
            rootProperty: 'archivo',
            totalProperty: 'total'
        }
    },
    autoLoad: false
});

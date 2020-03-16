var storeTipoMantenciones = Ext.create('Ext.data.Store', {
    data : [
        {NOMBRE: 'PROGRAMADA'},
        {NOMBRE: 'NO PROGRAMADA'}
    ]
});

var storeExtras_validarFechaHora = Ext.create('Ext.data.Store', {
    fields:[
        {name:'VALOR', type:'int'}
    ],
    proxy: {
        type: 'ajax',
        url: JsonHost + 'extras/ExtrasController/validarFechaHora',
        remoteSort: true,
        reader: {
            type: 'json',
            rootProperty: 'items',
            totalProperty: 'total'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                
            }
        }
        
    },
    autoLoad: false
    
});

var storeExtras_validarFechaMayorActual = Ext.create('Ext.data.Store', {
    fields:[
        {name:'VALOR', type:'int'}
    ],
    proxy: {
        type: 'ajax',
        url: JsonHost + 'extras/ExtrasController/validarFechaMayorActual',
        remoteSort: true,
        reader: {
            type: 'json',
            rootProperty: 'items',
            totalProperty: 'total'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                
            }
        },
        
    },
    autoLoad: false
    
});

var storeExtras_validarFechaMenorActual = Ext.create('Ext.data.Store', {
    fields:[
        {name:'VALOR', type:'int'}
    ],
    proxy: {
        type: 'ajax',
        url: JsonHost + 'extras/ExtrasController/validarFechaMenorActual',
        remoteSort: true,
        reader: {
            type: 'json',
            rootProperty: 'items',
            totalProperty: 'total'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                
            }
        },
        
    },
    autoLoad: false
    
});

var storeExtras_contarMesesDiferencia = Ext.create('Ext.data.Store', {
    proxy: {
        type: 'ajax',
        url: JsonHost + 'extras/ExtrasController/contarMesesDiferencia',
        remoteSort: true,
        reader: {
            type: 'json',
            rootProperty: 'items',
            totalProperty: 'total'
        },
        listeners: {
            exception: function(proxy, response, operation){
                console.log(proxy);
                console.log(response);
                console.log(operation);
                
            }
        }
        
    },
    autoLoad: false
});


var storeExtras_cargarMeses = Ext.create('Ext.data.Store', {
     data : [
         {NOMBRE: 'Enero', VALOR: '01'},
         {NOMBRE: 'Febrero', VALOR: '02'},
         {NOMBRE: 'Marzo', VALOR: '03'},
         {NOMBRE: 'Abril', VALOR: '04'},
         {NOMBRE: 'Mayo', VALOR: '05'},
         {NOMBRE: 'Junio', VALOR: '06'},
         {NOMBRE: 'Julio', VALOR: '07'},
         {NOMBRE: 'Agosto', VALOR: '08'},
         {NOMBRE: 'Septiembre', VALOR: '09'},
         {NOMBRE: 'Octubre', VALOR: '10'},
         {NOMBRE: 'Noviembre', VALOR: '11'},
         {NOMBRE: 'Diciembre', VALOR: '12'}
         
     ]
 });

 var storeExtras_cargarMesesFiltro = Ext.create('Ext.data.Store', {
    data : [
        {NOMBRE: 'TODOS', VALOR: ''},
        {NOMBRE: 'Enero', VALOR: '01'},
        {NOMBRE: 'Febrero', VALOR: '02'},
        {NOMBRE: 'Marzo', VALOR: '03'},
        {NOMBRE: 'Abril', VALOR: '04'},
        {NOMBRE: 'Mayo', VALOR: '05'},
        {NOMBRE: 'Junio', VALOR: '06'},
        {NOMBRE: 'Julio', VALOR: '07'},
        {NOMBRE: 'Agosto', VALOR: '08'},
        {NOMBRE: 'Septiembre', VALOR: '09'},
        {NOMBRE: 'Octubre', VALOR: '10'},
        {NOMBRE: 'Noviembre', VALOR: '11'},
        {NOMBRE: 'Diciembre', VALOR: '12'}
        
    ]
});
 

 var storeVisible = Ext.create('Ext.data.Store', {
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: JsonHost + 'visible/VisibleController/cagarVisiblesEstacion',
        reader: {
            type: 'json',
            rootProperty: 'items' // your root of your data containing the array of fields for the store
        }
    }
});



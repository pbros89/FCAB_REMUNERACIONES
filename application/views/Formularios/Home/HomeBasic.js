Ext.define('fcab.Container.HomeBasic', {
    extend: 'Ext.Panel',
    xtype: 'homeBasic',
    itemId: 'homeBasic',
    border: null,
    width : '100%',
    minHeight: '550',
    padding: 30,
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    listeners: {
        beforerender: function() {
            cargarConteoMensualHomeBasic();
            refreshCargarConteoMensualHomeBasic();
        }
    },
    scrollable: false,
    items: [{
        itemId: 'pnlProcesoInactivo',
        border: false,
        layout: {
            type: 'vbox',
        },
        width: '50%',
        padding: '10',
        items: [{
            width: '100%',
            height: 100,
            padding: '0',
            style: "border: 5px solid #e74c3c; border-radius: 50px;",
            bodyStyle: 'background-color: #e74c3c;',
            html: '<h1 style="text-align: center; color:white; margin:35 0 0 0">Proceso Mensual Inactivo</h1>',
            border:false,
        }]
    
    },{
        hidden: true,
        border: false,
        itemId: 'pnlProcesoActivo',
        title: '<b>PROCESO MENSUAL<span style="margin-left: 10px; text-align:right;color:lightgreen;">ACTIVO</span></b>',
        layout: {
            type: 'vbox',
        },
        width: '50%',
        
        frame: true,
        items: [{
            padding: '20 20 10 20',
            width: '100%',
            itemId: 'pnlTipo',
            html: '',
            border: false,
        },{
            padding: '10 20',
            width: '100%',
            itemId: 'pnlPeriodo',
            html: '',
            border: false,
        },{
            padding: '10 20',
            width: '100%',
            itemId: 'pnlInicio',
            html: '',
            border: false,
        },{
            padding: '10 20',
            width: '100%',
            itemId: 'pnlTermino',
            html: '',
            border: false,
        }],
        buttons: [{
            itemId: 'btnVer',
            scale: 'large',
            text: 'VER MAS',
            hidden: true,
            handler: function() {
            
                addTab(
                    'menu_proceso_mensual_trabajador', 
                    'Conceptos Trabajadores', 
                    'icon-listaTab', 
                    'PersonasProcesoMensual', 
                    1);
            }
        }]
    
    }, ]

});

var cargarConteoMensualHomeBasic = function() {

    storeCargarProcesosMensualHome.load({
        params: {
            p_cod_emp : EMPRESA,
            p_estado : "EN ESPERA"
        },
        callback: function(records, operation, success) {
            //var pnlEstado = Ext.ComponentQuery.query('#homeBasic #pnlEstado')[0];
            var pnlTipo = Ext.ComponentQuery.query('#homeBasic #pnlTipo')[0];
            var pnlPeriodo = Ext.ComponentQuery.query('#homeBasic #pnlPeriodo')[0];
            var pnlInicio = Ext.ComponentQuery.query('#homeBasic #pnlInicio')[0];
            var pnlTermino = Ext.ComponentQuery.query('#homeBasic #pnlTermino')[0];
            var btnVer = Ext.ComponentQuery.query('#homeBasic #btnVer')[0];
            var pnlProcesoInactivo = Ext.ComponentQuery.query('#homeBasic #pnlProcesoInactivo')[0];
            var pnlProcesoActivo = Ext.ComponentQuery.query('#homeBasic #pnlProcesoActivo')[0];

            if(records != null && records.length > 0) {
                pnlTipo.setHtml('<h3 style="text-align: left">Tipo: '+records[0].data.PK_TIPO+'</h3>');
                pnlPeriodo.setHtml('<h3 style="text-align: left">Periodo: '+records[0].data.PK_PROCESO+'</h3>');
                pnlInicio.setHtml('<h3 style="text-align: left">Inicio: ' +records[0].data.INICIO + '</h3>');
                pnlTermino.setHtml('<h3 style="text-align: left">Termino: '+records[0].data.TERMINO +'</h3>');
                //pnlEstado.setHtml('<h2 style="text-align: right; color:#4cd385;">ACTIVO</h2>');
                pnlProcesoInactivo.hide();
                pnlProcesoActivo.show();
                btnVer.show();
            }else{
                //pnlEstado.setHtml('<h2 style="text-align: right; color:#e74c3c;">INACTIVO</h2>');
                pnlTipo.setHtml('');
                pnlPeriodo.setHtml('');
                pnlInicio.setHtml('');
                pnlTermino.setHtml('');
                pnlProcesoInactivo.show();
                pnlProcesoActivo.hide();
                btnVer.hide();
            }
            
        }
    })

};


var refreshCargarConteoMensualHomeBasic = function(){
    setInterval(function(){
        cargarConteoMensualHomeBasic();
    }, 60000);
};



Ext.define('fcab.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    minWidth: 940,
    listeners: {
        'beforerender': function() {
            console.log(storeMenuAdmin)
            var countAdmin = 0;
            var countGestion = 0;
            var countReporte = 0;
            var rootAdmin = Ext.getCmp('menuAdmin');
            var rootGestion = Ext.getCmp('menuGestion');
            var rootReporte = Ext.getCmp('menuReporte');

            ROL_ACCIONES.forEach(accion => {
                var estado = accion.ESTADO;
                var acc = accion.PFK_ACCION;
                if(acc == 'VER') {
                    switch(accion.PFK_PANTALLA){
                        /**************** MENUS ADMINISTRACION *******************/
                        case 'MAESTRO_USUARIO':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_usuario');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_EMPRESA':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_empresa');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_CC':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_cc');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_CARGO':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_cargo');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_CONCEPTO':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_concepto');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_PARAMETRO':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_parametro');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_DESCUENTO_RRLL':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_descuento_rrll');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;

                        case 'MAESTRO_HABER_RRLL':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_haber_rrll');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;
                        case 'CALENDARIO':
                            if(estado == 'A') {
                                var p = rootAdmin.items.items[0].store.getById('menu_calendario');
                                p.data.cls = '';
                                countAdmin++;
                            }
                            break;
                        /**************** MENUS GESTION *******************/

                        case 'PROCESO_MENSUAL':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_proceso_mensual');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CONCEPTOS_TRABAJADORES':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_proceso_mensual_trabajador');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'INGRESO_PERSONAL':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_ingreso_personal');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'FINIQUITO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_finiquito_personal');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_AFP':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_afp');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_SALUD':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_salud');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;
                        
                        case 'CAMBIO_SINDICATO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_sindicato');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_DEPOSITO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_deposito');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_CARGO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_cargo_renta');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_BONO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_bono');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'CAMBIO_OTROS':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_cambio_otros');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'INGRESO_HABER_RRLL':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_ing_haber_rrll');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;
                        
                        case 'INGRESO_DESCUENTO_RRLL':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_ing_descuento_rrll');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        case 'AUSENTISMO':
                            if(estado == 'A') {
                                var p = rootGestion.items.items[0].store.getById('menu_ausentismo');
                                p.data.cls = '';
                                countGestion++;
                            }
                            break;

                        /**************** MENUS REPORTE *******************/
                        case 'REPORT_CAMBIO_AFP':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_afp');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_PROCESO_MENSUAL':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_proceso_consolidado');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_INGRESO_PERSONAL':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_ingreso_consolidado');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_SALUD':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_salud');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_SINDICATO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_sindicato');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_DEPOSITO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_depositorem');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_CARGO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_cargorenta');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_BONO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_bono');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;
                            
                        case 'REPORT_CAMBIO_OTROS':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_cambio_otros');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_CAMBIO_FINIQUITO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_finiquito_consolidado');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_ING_HABER_RRLL':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_ing_haber_rrll');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_ING_DESCUENTO_RRLL':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_ing_descuento_rrll');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;

                        case 'REPORT_PERSONAL':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_personal');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;
                        
                        case 'REPORT_AUSENTISMO':
                            if(estado == 'A') {
                                var p = rootReporte.items.items[0].store.getById('menu_reporte_ausentismo');
                                p.data.cls = '';
                                countReporte++;
                            }
                            break;
                    }   
                }
            });

            if(countAdmin == 0) {
                rootAdmin.setHidden(true);
            }
            if(countGestion == 0) {
                rootGestion.setHidden(true);
            }
            if(countReporte == 0) {
                rootReporte.setHidden(true);
            }
        }
    } ,
    items: [{
        xtype: 'panel',
        title: 'FCAB Recursos Humanos',
        region: 'north',
        collapsible:false,
        tools: [{
            xtype: 'label',
            text : NOM_EMPRESA +" / "+ROL+" / "+NOMBRE,
            style: 'color:white;',
            margin: '0 20 0 0' 
        },{
            xtype: 'button',
            text: 'Cerrar Sesión',
            handler: function () {
                clearProvider();
                Ext.Ajax.request({
                    url: host + 'store/login/Salir',
                    noCache: false,
                    success: function (response) {
                        window.location.reload();
                    },
                    failure: function (form, action) {

                    }
                });
            }
        }]
    }, /*
     * 
     * MENU
     * 
     * */
    {
        xtype: 'panel',
        layout: 'fit',
        region: 'west',
        title: 'Menu de Navegación',
        width: 260,
        id: 'west',
        //hidden: true,
        split: true,
        autoScroll: true,
        collapsible: true,
        collapsed: true,
        //items: menuTree,
        borde: 0,
        items: [{
            region: 'center',
            xtype: 'container',
            title: '',
            layout: 'accordion',
            defaults: {
                bodyStyle: 'padding:5px'
            },
            layoutConfig: {
                titleCollapse: false,
                animate: false,
                activeOnTop: false
            },
            items: [{
                title: 'Gestión',
                scroll: 'vertical',
                autoScroll:true,
                expanded: true,
                items: menuGestion,
                //hidden: true,
                //disabled: true,
                id:'menuGestion'

            }, {
                title: 'Administración',
                scroll: 'vertical',
                autoScroll:true,
                items: menuAdmin,
                //hidden: true,
                //disabled: true,
                id:'menuAdmin'

            }, {
                title: 'Reportes',
                scroll: 'vertical',
                autoScroll:true,
                items: menuReporte,
                //hidden: true,
                //disabled: true,
                id:'menuReporte'

            },]
        }]
    }, ,{
        region: 'center',
        id: 'reg-center',
        bodyStyle: 'padding:5px;',
        layout: 'fit',
        autoScroll: true,
        items: tabs
    }]
});


var modalExterno = function () {
    Ext.define('fcab.view.MyViewport.Externo', {
        extend: 'Ext.container.Viewport',
        layout: 'border',
        autoScroll: true,
        items: [{
            region: 'center',
            id: 'reg-center',
            bodyStyle: 'padding:5px;',
            layout: 'fit',
            autoScroll: true,
            header: {},
            items: [{
                xtype: formExterno
            }]
        }]
    });

    Ext.create('fcab.view.MyViewport.Externo', {
        renderTo: body
    });
};

if (externo === 'true') {
    modalExterno();
} else {
    Ext.create('fcab.view.MyViewport', {
        renderTo: body
    });
}

body.unmask();

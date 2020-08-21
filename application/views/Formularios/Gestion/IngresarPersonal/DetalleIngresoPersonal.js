Ext.define("fcab.Container.DetalleIngresoPersonal", {

    extend: 'Ext.tab.Panel',
    xtype: 'DetalleIngresoPersonal',
    itemId: 'DetalleIngresoPersonal',
    activeTab: 0,
    width : '100%',
    height: 600,

    listeners: {
        beforerender: function(){
            storeCargarParam_SEXO.load();
            storeCargarParam_ADHERIDO.load();
            storeCargarParam_AFP.load();
            storeCargarParam_BANCO.load();
            storeCargarParam_ESTADO_CIVIL.load();
            storeCargarParam_FORMA_PAGO.load();
            storeCargarParam_INE.load();
            storeCargarParam_INSTITUCION_APV.load();
            storeCargarParam_JORNADA.load();
            storeCargarParam_NIVEL_EDUCACION.load();
            storeCargarParam_REGIMEN_APV.load();
            storeCargarParam_SALUD.load();
            storeCargarParam_SEXO.load();
            storeCargarParam_SINDICATO.load();
            storeCargarParam_TIPO_CONTRATO.load();
            storeCargarCentroCostosFiltro.load();
            storeCargarCargosFiltro.load();
            storeCargarParam_CUENTA_AHORRO2.load();
            storeCargarParam_LUGAR_TRABAJO.load();
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
                    xtype: 'DetalleIngresoPersonalInfo',
                }]
            }, {
                title: 'Cargo',
                items:[{
                    xtype: 'DetalleIngresoPersonalCargo'
                }]
            },{
                title: 'Salud',
                items:[{
                    xtype: 'DetalleIngresoPersonalSalud'
                }]
            },{
                title: 'AFP',
                items:[{
                    xtype: 'DetalleIngresoPersonalAFP'
                }]
            },{
                title: 'Salario',
                items:[{
                    xtype: 'DetalleIngresoPersonalSalario'
                }]
            }]
        }]
    }, {
        title: 'Bonos',
        items:[{
            xtype: 'DetalleIngresoPersonalBono'
        }]
    },],
});




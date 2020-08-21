Ext.define("fcab.Container.CrearIngresoPersonal", {

    extend: 'Ext.tab.Panel',
    xtype: 'CrearIngresoPersonal',
    itemId: 'CrearIngresoPersonal',
    activeTab: 0,
    width : '100%',

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
            storeExtras_cargarPeriodos.load();
            storeCargarParam_LUGAR_TRABAJO.load();
            storeCargarParam_GERENCIA.load();
            storeCargarParam_DEPARTAMENTO.load();
        },
        'tabchange': function (tabPanel, tab) {
            var tabPer = Ext.ComponentQuery.query('#CrearIngresoPersonal #tabPer')[0];
            var tabCar = Ext.ComponentQuery.query('#CrearIngresoPersonal #tabCar')[0];
            var tabSalud = Ext.ComponentQuery.query('#CrearIngresoPersonal #tabSalud')[0];
            var tabAFP = Ext.ComponentQuery.query('#CrearIngresoPersonal #tabAFP')[0];
            var tabSalario = Ext.ComponentQuery.query('#CrearIngresoPersonal #tabSalario')[0];

            switch(tab.itemId) {
                case 'tabPer': 
                    tabCar.tab.setDisabled(true);
                    tabCar.setDisabled(true);
                    tabSalud.tab.setDisabled(true);
                    tabSalud.setDisabled(true);
                    tabAFP.tab.setDisabled(true);
                    tabAFP.setDisabled(true);
                    tabSalario.tab.setDisabled(true);
                    tabSalario.setDisabled(true);
                    break;
                case 'tabCar': 
                    tabSalud.tab.setDisabled(true);
                    tabSalud.setDisabled(true);
                    tabAFP.tab.setDisabled(true);
                    tabAFP.setDisabled(true);
                    tabSalario.tab.setDisabled(true);
                    tabSalario.setDisabled(true);
                    break;
                case 'tabSalud': 
                    tabAFP.tab.setDisabled(true);
                    tabAFP.setDisabled(true);
                    tabSalario.tab.setDisabled(true);
                    tabSalario.setDisabled(true);
                    break;
                case 'tabAFP': 
                    tabSalario.tab.setDisabled(true);
                    tabSalario.setDisabled(true);
                    break;
            }
            
            
            console.log(tabPanel.itemId + ' ' + tab.itemId);
        }
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
        title: 'Información Personal',
        itemId: 'tabPer',
        items:[{
            xtype: 'CrearIngresoPersonalInfo',
        }]
    }, {
        title: 'Cargo',
        itemId: 'tabCar',
        disabled: true,
        items:[{
            xtype: 'CrearIngresoPersonalCargo'
        }]
    },{
        title: 'Salud',
        itemId: 'tabSalud',
        disabled: true,
        items:[{
            xtype: 'CrearIngresoPersonalSalud'
        }]
    },{
        title: 'AFP',
        itemId: 'tabAFP',
        disabled: true,
        items:[{
            xtype: 'CrearIngresoPersonalAFP'
        }]
    },{
        title: 'Salario',
        itemId: 'tabSalario',
        disabled: true,
        items:[{
            xtype: 'CrearIngresoPersonalSalario'
        }]
    }],
});



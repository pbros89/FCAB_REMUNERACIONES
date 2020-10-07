Ext.define("fcab.Container.EditarIngresoPersonal", {

    extend: 'Ext.tab.Panel',
    xtype: 'EditarIngresoPersonal',
    itemId: 'EditarIngresoPersonal',
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
            storeCargarParam_CIUDAD.load();
            storeCargarParam_COMUNA.load();
            storeCargarParam_NACIONALIDAD.load();
            storeCargarParam_INVALIDEZ.load();
        },
        'tabchange': function (tabPanel, tab) {
            var tabPer = Ext.ComponentQuery.query('#EditarIngresoPersonal #tabPer')[0];
            var tabCar = Ext.ComponentQuery.query('#EditarIngresoPersonal #tabCar')[0];
            var tabSalud = Ext.ComponentQuery.query('#EditarIngresoPersonal #tabSalud')[0];
            var tabAFP = Ext.ComponentQuery.query('#EditarIngresoPersonal #tabAFP')[0];
            var tabSalario = Ext.ComponentQuery.query('#EditarIngresoPersonal #tabSalario')[0];

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
            xtype: 'EditarIngresoPersonalInfo',
        }]
    }, {
        title: 'Cargo',
        itemId: 'tabCar',
        disabled: true,
        items:[{
            xtype: 'EditarIngresoPersonalCargo'
        }]
    },{
        title: 'Salud',
        itemId: 'tabSalud',
        disabled: true,
        items:[{
            xtype: 'EditarIngresoPersonalSalud'
        }]
    },{
        title: 'AFP',
        itemId: 'tabAFP',
        disabled: true,
        items:[{
            xtype: 'EditarIngresoPersonalAFP'
        }]
    },{
        title: 'Salario',
        itemId: 'tabSalario',
        disabled: true,
        items:[{
            xtype: 'EditarIngresoPersonalSalario'
        }]
    }],
});




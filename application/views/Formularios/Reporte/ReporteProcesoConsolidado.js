Ext.define("fcab.Container.ReporteProcesoConsolidado", {
    extend: 'Ext.container.Container',
    xtype: 'ReporteProcesoConsolidado',
    itemId: 'ReporteProcesoConsolidado',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);

        var cbAnho = Ext.ComponentQuery.query('#ReporteProcesoConsolidado #cbAnho')[0];
        var cbMes = Ext.ComponentQuery.query('#ReporteProcesoConsolidado #cbMes')[0];

        var date = new Date();
        var yearIni = 2019;
        var year = date.getFullYear();
        var month = date.getMonth();
        var years = [];
        while(yearIni <= year){
            years.push({
                'VALOR' : yearIni
            });
            yearIni++;
        }


        cbAnho.getStore().loadData(years);
        cbAnho.setValue(year);
        cbMes.setValue(cbMes.getStore().getAt(month));
    
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        title: 'Proceso Consolidado (' + NOM_EMPRESA +')',
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items:[{
            
            xtype: 'container',
            columnWidth: .33,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbAnho',
                itemId: 'cbAnho',
                fieldLabel: 'Año',
                labelAlign:'top',
                queryMode: 'local',
                triggerAction: 'all',
                displayField: 'VALOR',
                valueField: 'VALOR',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '100%',  
                allowBlank: false
            }]
        },{
            xtype: 'container',
            columnWidth: .33,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbMes',
                itemId: 'cbMes',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                store: storeExtras_cargarMeses,
                fieldLabel: 'Mes',
                labelAlign:'top',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '100%',  
                allowBlank: false,      
            }]
        }, {
            xtype: 'container',
            columnWidth: .33,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbAlineacion',
                itemId: 'cbAlineacion',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                store: [['HORIZONTAL', 'HORIZONTAL'], ['VERTICAL', 'VERTICAL']],
                fieldLabel: 'Alineación',
                labelAlign:'top',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '100%',   
                allowBlank: false,     
                value: 'HORIZONTAL' 
            }]
        },{
            xtype: 'fieldset',
            title: 'Tipo Proceso',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .33,
            defaultType: 'checkbox',
            defaults: {
                anchor: '100%'
            },
    
            items: [{
                boxLabel: 'PROCESO',
                name: 'tip_pro_proceso',
                inputValue: 'PROCESO',
                checked: true,
            }, {
                boxLabel: 'REPROCESO',
                name: 'tip_pro_reproceso',
                inputValue: 'REPROCESO',
                checked: true,
            }, {
                boxLabel: 'RRHH',
                name: 'tip_pro_rrhh',
                inputValue: 'RRHH',
                checked: true,
            }]
        }, {
            xtype: 'fieldset',
            title: 'Tipo Concepto',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .33,
            defaultType: 'checkbox',
            defaults: {
                anchor: '100%'
            },
    
            items: [{
                boxLabel: 'BOOLEANO',
                name: 'tip_con_booleano',
                inputValue: 'BOOLEANO',
                checked: true,
            }, {
                boxLabel: 'BOOLEANO2',
                name: 'tip_con_booleano2',
                inputValue: 'BOOLEANO2',
                checked: true,
            }, {
                boxLabel: 'CANTIDAD',
                name: 'tip_con_cantidad',
                inputValue: 'CANTIDAD',
                checked: true,
            }, {
                boxLabel: 'MONTO',
                name: 'tip_con_monto',
                inputValue: 'MONTO',
                checked: true,
            }, {
                boxLabel: 'PORCENTAJE',
                name: 'tip_con_porcentaje',
                inputValue: 'PORCENTAJE',
                checked: true,
            }, {
                boxLabel: 'RANGO',
                name: 'tip_con_rango',
                inputValue: 'RANGO',
                checked: true,
            }, {
                boxLabel: 'SELECCIONAR',
                name: 'tip_con_seleccionar',
                inputValue: 'SELECCIONAR',
                checked: true,
            }]
        }, {
            xtype: 'fieldset',
            title: 'Grupo Concepto',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .33,
            defaultType: 'checkbox',
            defaults: {
                anchor: '100%'
            },
    
            items: [{
                boxLabel: 'HABER',
                name: 'gru_con_haber',
                inputValue: 'HABER',
                checked: true,
            }, {
                boxLabel: 'BDI',
                name: 'gru_con_bdi',
                inputValue: 'BDI',
                checked: true,
            }, {
                boxLabel: 'DESCUENTO',
                name: 'gru_con_descuento',
                inputValue: 'DESCUENTO',
                checked: true,
            }]
        },],
        buttons: [{
            tooltip: 'Genera excel según filtros de consulta',
            scale: 'large',
            text: 'Exportar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                values.p_cod_emp = EMPRESA;
                values.p_usuario = NOMBRE;
                values.p_rol = ROL;
                console.log(values);
                if(form.isValid()) {
                    //console.log(form.getValues());
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                url: host + 'excelExport/ExcelExportController/cargarProcesoConsolidado',
                                timeout : 300000,
                            }).submit({
                                target: 'ReporteProcesoConsolidado' + '-form-iframe',
                                params: values,
                                timeout : 300000,
                            });
                        }
                    });
                }
            }
        }]

    }],
    

});


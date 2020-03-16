Ext.define("fcab.Container.ReporteFiniquitoConsolidado", {
    extend: 'Ext.container.Container',
    xtype: 'ReporteFiniquitoConsolidado',
    itemId: 'ReporteFiniquitoConsolidado',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
    
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        title: 'Finiquito Consolidado ('+NOM_EMPRESA+')',
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
                xtype: 'datefield',
                name: 'dtFec1',
                labelAlign: 'top',
                anchor: '100%',  
                fieldLabel: 'Desde',
                itemId: 'dtFec1',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: false,
            }]
        },{
            xtype: 'container',
            columnWidth: .33,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtFec2',
                labelAlign: 'top',
                anchor: '100%',  
                fieldLabel: 'Hasta',
                itemId: 'dtFec2',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
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
        }, {
            xtype: 'fieldset',
            title: 'Tipo Concepto',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .5,
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
            },{
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
            columnWidth: .5,
            defaultType: 'checkbox',
            defaults: {
                anchor: '100%'
            },
    
            items: [{
                boxLabel: 'HABER',
                name: 'gru_con_haber',
                inputValue: 'FINIQUITO_HABER',
                checked: true,
            }, {
                boxLabel: 'DESCUENTO',
                name: 'gru_con_descuento',
                inputValue: 'FINIQUITO_DESC',
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
                console.log(values);
                if(form.isValid()) {
                    //console.log(form.getValues());
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                timeout : 300000,
                                url: host + 'excelExport/ExcelExportController/cargarFiniquitoConsolidado'
                            }).submit({
                                params: values,
                                timeout : 300000,
                                target: 'ReporteFiniquitoConsolidado' + '-form-iframe',
                            });
                        }
                    });
                    
                    /*form.submit({
                        url: host + 'procesoMensual/ProcesoMensualController/importarProcesoMensual',
                        waitMsg: 'Importando archivo...',
                        success: function(fp, o) {
                            Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                        }
                    });*/
                }
            }
        }]

    }],
    

});


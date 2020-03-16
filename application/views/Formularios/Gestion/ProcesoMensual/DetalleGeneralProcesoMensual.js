Ext.define('fcab.Container.MainProcesoMensual.DetalleGeneral', {
    extend: 'Ext.form.Panel',
    xtype: 'MainProcesoMensualDetalleGeneral',
    itemId: 'MainProcesoMensualDetalleGeneral',
    autoScroll: true,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    border: false,
    
    listeners: {
        afterrender: function(){
            
        }
    },
    items: [{
        xtype: 'container',
        columnWidth: 1,
        layout: {
            type: 'column',
            align: "stretch",
            pack: 'center'
        },
        padding: '0 40 0 40',
        items: [{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 15px 10px 15px 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'CC En espera',
                labelAlign:'top',
                name: 'txtCCEspera',
                itemId: 'txtCCEspera',
                typeAhead: true,
                anchor: '100%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                fieldStyle: 'background-color: #e74c3c; background-image: none; color: white; font-weight: bold;',
            }]
        

    },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 15px 10px 15px 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'CC Terminados',
                labelAlign:'top',
                name: 'txtCCTerminado',
                itemId: 'txtCCTerminado',
                typeAhead: true,
                anchor: '100%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                fieldStyle: 'background-color: #4cd385; background-image: none; color: white; font-weight: bold;',
            }]
            
        
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 15px 10px 15px 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Trabajadores En Espera',
                labelAlign:'top',
                name: 'txtTrabEspera',
                itemId: 'txtTrabEspera',
                typeAhead: true,
                anchor: '100%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                fieldStyle: 'background-color: #e74c3c; background-image: none; color: white; font-weight: bold;',
            }]
            
        
        },{
            xtype: 'container',
            columnWidth: .25,
            layout: 'anchor',
            style: 'margin: 15px 0 15px 0',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Trabajadores Terminados',
                labelAlign:'top',
                name: 'txtTrabTerminado',
                itemId: 'txtTrabTerminado',
                typeAhead: true,
                anchor: '100%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                fieldStyle: 'background-color: #4cd385; background-image: none; color: white; font-weight: bold;',
            }]
        }]
        
    
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: {
            type: 'column',
            align: "stretch",
            pack: 'center'
        },
        padding: '0 40 0 40',
        items: [{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin-bottom: 5px',
            items: [{
                xtype: 'combobox',
                labelAlign:'left',
                fieldLabel: 'Tipo',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                anchor: '50%',
                name: 'cbTipo',
                itemId: 'cbTipo',
                editable: true,
                readOnly: true,
                triggerAction: 'all',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                selectOnFocus: true,
                allowBlank: false,
                value: 'PROCESO',
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                store: Ext.create('Ext.data.Store', {
                    data: [
                        {
                            "NOMBRE": "PROCESO",
                            "VALOR": "PROCESO"
                        },
                        {
                            "NOMBRE": "RRHH",
                            "VALOR": "RRHH"
                        },
                        {
                            "NOMBRE": "REPROCESO",
                            "VALOR": "REPROCESO"
                        }
                    ]
                }),
                
            }]
        }, {
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin-bottom: 5px',
            items: [{
                xtype: 'combo',
                name: 'cbAnho',
                itemId: 'cbAnho',
                fieldLabel: 'Año',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                displayField: 'VALOR',
                valueField: 'VALOR',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '50%',  
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin-bottom: 5px',
            items: [{
                xtype: 'combo',
                name: 'cbMes',
                itemId: 'cbMes',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                store: storeExtras_cargarMeses,
                fieldLabel: 'Mes',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '50%',  
                allowBlank: false,  
                readOnly: true, 
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',   
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'hbox',
            style: 'margin-bottom: 15px',
            items: [{
                    xtype: 'datefield',
                    name: 'dtFec1',
                    labelAlign: 'left',
                    fieldLabel: 'Inicio',
                    itemId: 'dtFec1',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: false,
                    width: '60%',
                    readOnly: true, 
                    margin: '0 10 0 0',
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
    
                },{
                    xtype: 'timefield',
                    format: 'H:i',
                    increment: 1,
                    name: 'dtHH1',
                    scrollable: true,
                    itemId: 'dtHH1',
                    editable: true,
                    allowBlank: false,
                    readOnly: true, 
                    //value: Ext.Date.format(new Date(), 'H:i'),
                    width: '30%',
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }
            ]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'hbox',
            style: 'margin-bottom: 10px',
            items: [{
                    xtype: 'datefield',
                    name: 'dtFec2',
                    labelAlign: 'left',
                    fieldLabel: 'Termino',
                    itemId: 'dtFec2',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: false,
                    margin: '0 10 0 0',
                    readOnly: true, 
                    width: '60%',
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
    
                },{
                    xtype: 'timefield',
                    format: 'H:i',
                    increment: 1,
                    name: 'dtHH2',
                    scrollable: true,
                    itemId: 'dtHH2',
                    editable: true,
                    allowBlank: false,
                    readOnly: true, 
                    //value: Ext.Date.format(new Date(), 'H:i'),
                    width: '30%',
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }
            ]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin-bottom: 5px',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Estado',
                labelAlign:'left',
                name: 'txtEstado',
                itemId: 'txtEstado',
                typeAhead: true,
                anchor: '50%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: false,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        
    },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin-bottom: 15px',
            items: [{
                xtype: 'textareafield',
                fieldLabel: 'Observación',
                labelAlign:'top',
                name: 'txtObservacion',
                itemId: 'txtObservacion',
                typeAhead: true,
                anchor: '100%',
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        }]
        
    }],
    //buttonAlign: 'center',
    
});

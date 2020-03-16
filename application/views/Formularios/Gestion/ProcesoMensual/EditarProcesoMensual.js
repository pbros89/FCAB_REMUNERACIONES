Ext.define('fcab.Container.MainProcesoMensual.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MainProcesoMensualEditar',
    itemId: 'MainProcesoMensualEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MainProcesoMensualEditar').myExtraParams.param2.data;
            console.log(param);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #cbTipo')[0].setValue(param.PK_TIPO);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #cbAnho')[0].setValue(param.ANHO);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #cbMes')[0].setValue(param.MES);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #dtFec1')[0].setValue(param.INICIO_DATE);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #dtFec2')[0].setValue(param.TERMINO_DATE);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #dtHH1')[0].setValue(param.INICIO_HH);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #dtHH2')[0].setValue(param.TERMINO_HH);
            Ext.ComponentQuery.query('#MainProcesoMensualEditar #txtObservacion')[0].setValue(param.OBSERVACION);
        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
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
                    margin: '0 10 0 0'
    
                },{
                    xtype: 'timefield',
                    format: 'H:i',
                    increment: 1,
                    name: 'dtHH1',
                    scrollable: true,
                    itemId: 'dtHH1',
                    editable: true,
                    allowBlank: false,
                    //value: Ext.Date.format(new Date(), 'H:i'),
                    width: '30%'
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
                    width: '60%'
    
                },{
                    xtype: 'timefield',
                    format: 'H:i',
                    increment: 1,
                    name: 'dtHH2',
                    scrollable: true,
                    itemId: 'dtHH2',
                    editable: true,
                    allowBlank: false,
                    //value: Ext.Date.format(new Date(), 'H:i'),
                    width: '30%'
                }
            ]
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
                maxLength: 1000,
                allowBlank: true
            }]
        }],
        buttons: [{
            text: 'Editar',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    var recRow = Ext.getCmp('MainProcesoMensualEditar').myExtraParams.param2;
                    //console.log(values);
                    storeModificarProcesoMensual.load({
                        params : {
                            p_cod_emp: EMPRESA,
                            p_proceso: recRow.data.PK_PROCESO,
                            p_tipo: recRow.data.PK_TIPO,
                            p_inicio: values.dtFec1 + " " + values.dtHH1,
                            p_termino: values.dtFec2 + " " + values.dtHH2,
                            p_observacion: values.txtObservacion,
                            p_usuario: NOMBRE
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Proceso mensual modificado correctamente.');
                                    cargarMainProcesoMensual(null);
                                    Ext.getCmp('MainProcesoMensualEditar').destroy();
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            
                        }
                    });
                }
            }
        }]
    }]
});

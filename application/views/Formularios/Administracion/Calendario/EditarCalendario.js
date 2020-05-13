Ext.define('fcab.Container.MasterCalendario.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterCalendarioEditar',
    itemId: 'MasterCalendarioEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterCalendarioEditar').myExtraParams.param2.data;
            console.log(param);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #cbTipo')[0].setValue(param.PK_TIPO);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #txtAnho')[0].setValue(param.PK_ANHO);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #txtMes')[0].setValue(param.PK_MES);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #txtDia')[0].setValue(param.PK_DIA);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #txtObs')[0].setValue(param.OBSERVACION);
            Ext.ComponentQuery.query('#MasterCalendarioEditar #cbEstado')[0].setValue(param.ESTADO);
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
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'combobox',
                labelAlign:'left',
                fieldLabel: 'Tipo',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                anchor: '100%',
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
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                store: Ext.create('Ext.data.Store', {
                    data: [
                        {
                            "NOMBRE": "FERIADO_ANUAL",
                            "VALOR": "FERIADO_ANUAL"
                        },
                        {
                            "NOMBRE": "FERIADO_UNICO",
                            "VALOR": "FERIADO_UNICO"
                        }
                        
                    ]
                }),
                listeners: {
                    change: function(obj, newValue, oldValue) {
                        var txtAnho = Ext.ComponentQuery.query('#MasterCalendarioEditar #txtAnho')[0];
                        console.log(newValue);
                        if(newValue == "FERIADO_UNICO"){
                            txtAnho.show();
                            txtAnho.setValue('');
                        }else if(newValue == "FERIADO_ANUAL"){
                            txtAnho.hide();
                            txtAnho.setValue('2020');
                        }
                    }
                }
                
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin:0 5 5 5',
            items: [{
                xtype: 'textfield',
                //labelWidth: 50,
                itemId: 'txtAnho',
                fieldLabel: 'Año',
                emptyText: 'Formato: YYYY',
                labelAlign:'left',
                name: 'txtAnho',
                allowBlank: false,
                readOnly: true,
                anchor: '100%',
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                maxLength: 4
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin:0 5 5 5',
            items: [{
                xtype: 'textfield',
                //labelWidth: 50,
                itemId: 'txtMes',
                fieldLabel: 'Mes',
                emptyText: 'Formato: MM',
                labelAlign:'left',
                name: 'txtMes',
                allowBlank: false,
                readOnly: true,
                anchor: '100%',
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                maxLength: 2
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin:0 5 5 5',
            items: [{
                xtype: 'textfield',
                //labelWidth: 50,
                itemId: 'txtDia',
                fieldLabel: 'Día',
                emptyText: 'Formato: DD',
                labelAlign:'left',
                name: 'txtDia',
                allowBlank: false,
                readOnly: true,
                anchor: '100%',
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                maxLength: 2
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 5 5 5',
            items: [{
                xtype: 'combobox',
                labelAlign:'left',
                fieldLabel: 'Estado',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                anchor: '100%',
                name: 'cbEstado',
                itemId: 'cbEstado',
                editable: true,
                readOnly: false,
                triggerAction: 'all',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                selectOnFocus: true,
                allowBlank: false,
                value : 'A',
                store: Ext.create('Ext.data.Store', {
                    data: [
                        {
                            "NOMBRE": "ACTIVO",
                            "VALOR": "A"
                        },
                        {
                            "NOMBRE": "INACTIVO",
                            "VALOR": "I"
                        }
                        
                    ]
                }),
                
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin:0 5 5 5',
            items: [{
                xtype: 'textareafield',
                //labelWidth: 50,
                itemId: 'txtObs',
                fieldLabel: 'Observación',
                labelAlign:'top',
                name: 'txtObs',
                allowBlank: true,
                anchor: '100%',
                maxLength: 1000
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
                    var rec = Ext.getCmp('MasterCalendarioEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterCalendarioEditar').myExtraParams.param2;
                    var values = form.getValues();

                    if(isValidDate(values.txtMes+"/"+values.txtDia+ "/"+values.txtAnho)) {
                        var dia = parseInt(values.txtDia);
                        var mes = parseInt(values.txtMes);

                        values.txtDia = dia < 10 ? '0'+dia: values.txtDia;
                        values.txtMes = mes < 10 ? '0'+mes: values.txtMes;
                        values.txtAnho = values.cbTipo == 'FERIADO_UNICO' ? values.txtAnho : '0000';
                        storeModificarCalendario.load({
                            params : {
                                P_TIPO: values.cbTipo,
                                P_ANHO: values.txtAnho,
                                P_MES: values.txtMes,
                                P_DIA: values.txtDia,
                                P_OBS: values.txtObs,
                                P_USUARIO: NOMBRE,
                                P_ESTADO: values.cbEstado
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Calendario editado correctamente.');
                                        cargarMasterCalendario(1);
                                        Ext.getCmp('MasterCalendarioEditar').destroy();
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
                    }else{
                        Ext.MessageBox.show({
                            title: 'ADVERTENCIA',
                            msg: 'Formato de fecha incorrecto',
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        }]
    }]

});

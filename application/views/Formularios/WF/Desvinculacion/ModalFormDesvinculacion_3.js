var ModalFormDesvinculacion_3= function(form1, form2){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación - parte 3',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form3 = this.down('form').getForm();

            }
        },
        items:[{
            xtype: 'form',
            titleAlign: 'center',
			layout: {
				type: 'column',
				align: 'strech'
			},
        	items: [{
                xtype: 'panel',
                width: 1000,
				bodyPadding: '10 10 10 10',
                items:  [{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'label',
                        text: 'Informe de haberes y descuentos pendientes a la fecha del finiquito del trabajador (en caso de no corresponder ingrese "0")',
                        style: 'font-weight: bold;',
                        margin: '10 0 10 0'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'Cantidad Horas Extras',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'numb_horasExtras',
                        margin: '0 10 0 0',
                        maxLength: 5,
                        enforceMaxLength: true,
                        allowBlank: false
                    },{
                        xtype: 'numberfield',
                        fieldLabel: 'Viáticos (en pesos)',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'numb_viatico',
                        margin: '0 10 0 0',
                        maxLength: 7,
                        enforceMaxLength: true,
                        allowBlank: false
                    },{
                        xtype: 'textareafield',
                        fieldLabel: 'Otros haberes (detallar)',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'txt_haberes',
                        margin: '0 10 0 0',
                        maxRows: 4,
                        maxLength: 100,
                        enforceMaxLength: true,
                        allowBlank: false
                    },{
                        xtype: 'textareafield',
                        fieldLabel: 'Descuentos (detallar)',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'txt_descuentos',
                        margin: '0 10 0 0',
                        maxRows: 4,
                        maxLength: 100,
                        enforceMaxLength: true,
                        allowBlank: false
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'label',
                        text: 'Materiales, Equipos y Elementos detrabajo que debe entregar a Jefe Directo',
                        style: 'font-weight: bold;',
                        margin: '20 0 10 0'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: 'Equipos Computacionales',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb-comp', inputValue: 1, margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb-comp', inputValue: 2, margin: '0 10 0 0',}
                        ]
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Celular',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb-celu', inputValue: 1, margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb-celu', inputValue: 2, margin: '0 10 0 0',}
                        ]
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Información, Archivos y Otros',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb-docs', inputValue: 1, margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb-docs', inputValue: 2, margin: '0 10 0 0',}
                        ]
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Caja Chica',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb-caja', inputValue: 1, margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb-caja', inputValue: 2, margin: '0 10 0 0',}
                        ]
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Vehículos u otros (Especificar)',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'txt_vehiculo',
                        margin: '0 10 0 0',
                        maxLength: 50,
                        enforceMaxLength: true
                    }]
                }]// Fin Items Panel
            }],//Fin Items Form
            buttons:[{
                xtype: 'button',
                //iconCls: 'iconMD-save',
                text: 'Crear',
                margin: '0 10 0 0',
                handler: function(){

                    var form3 = this.up('form').getForm();

                    if(!form3.isValid()){
                        alert('Debe completar los campos del formulario.');
                    }else{
                        
                    }

                }
            },{
                xtype: 'button',
                //iconCls: 'iconMD-save',
                text: 'Cancelar',
                margin: '0 10 0 0',
                handler: function(){
                    this.up('window').close();
                }
            }]
        }]//Fin Items Modal
    }).show();
};
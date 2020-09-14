var ModalNotificacionCorreo= function(rol){
    Ext.create('Ext.window.Window', {
        title: 'Notificación por correo',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form = this.down('form').getForm();

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
                        text: 'Se notificará por correo a las áreas correspondientes',
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
                        xtype: 'datefield',
                        fieldLabel: 'Fecha de notificación de correos',
                        margin: '0 10 0 0',
                        labelAlign: 'top',
                        flex: 1,
                        name: 'date_fecha',
                        format: 'd/m/Y',
                        allowBlank: false,
                        listeners:{
                            change: function(){
                                var form = this.up('form').getForm();
                            }	
                        }
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Horario en que se notificará',
                        labelAlign: 'top',
                        name:'cb_causal',
                        margin: '0 35 0 0',
                        flex: 1,
                        store: storeDesv_horarioCorreo,
                        displayField: 'HORARIO',
                        allowBlank: false,
                        listeners:{
                            afterrender: function(combo){
                                var store = combo.getStore();
                                store.load({
                                    callback: function (records){
                                        if(records!=null){
                                            var primero = records[0].data.HORARIO;
                                            combo.setValue(primero);
                                        }
                                    }
                                });
                            },
                            change: function(combo){
                                
                            }
                        }
                    }]
                }]
            }]
        }]
    }).show();
};
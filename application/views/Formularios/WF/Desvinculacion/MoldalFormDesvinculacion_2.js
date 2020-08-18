var ModalFormDesvinculacion_2= function(form1){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación - parte 2',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form2 = this.down('form').getForm();

                var causal = form1.findField('cb_causal').value;
                var campoHechos = form2.findField('txt_hechos');
                campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal+') consisten en:') ;

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
                        text: 'Detallar la causal de despido seleccionada anteriormente',
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
                        xtype: 'textareafield',
                        fieldLabel: 'Los hechos en que se funda la causal invocada ( ) consisten en',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'txt_hechos',
                        margin: '0 0 0 0',
                        maxRows: 4,
                        maxLength: 500,
                        enforceMaxLength: true,
                        allowBlank: false,
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'textareafield',
                        fieldLabel: 'Motivo real',
                        flex: 1,
                        labelAlign: 'top',
                        name: 'txt_motivo',
                        margin: '0 0 0 0',
                        maxRows: 4,
                        maxLength: 500,
                        enforceMaxLength: true,
                        allowBlank: false,
                    }]
                }]// Fin Items Panel
            }],//Fin Items Form
            buttons:[{
                xtype: 'button',
                //iconCls: 'iconMD-save',
                text: 'Siguiente',
                margin: '0 10 0 0',
                handler: function(){

                    var form2 = this.up('form').getForm();

                    if(!form2.isValid()){
                        alert('Debe completar los campos del formulario.');
                    }else{
                        ModalFormDesvinculacion_3(form1, form2);
                        this.up('window').close();
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
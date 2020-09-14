var ModalFormDesvinculacion_2= function(rol, personal, finiquito, carta, cod_causal, cod_causal2, causal, causal2){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación - parte 2',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form2 = this.down('form').getForm();

                var campoHechos = form2.findField('txt_hechos');
                
                if(causal2 != null){
                    campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal +' - ' +causal2+') consisten en:') ;
                }else{
                    campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal+') consisten en:') ;
                }
                

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

                    var form = this.up('form').getForm();

                    if(!form.isValid()){
                        showToast('Debe completar los campos del formulario.');
                    }else{
                        
                        var hechos = form.findField('txt_hechos').value;
                        var motivo = form.findField('txt_motivo').value;
                        
                        ModalFormDesvinculacion_3(rol, personal, finiquito, carta, cod_causal, cod_causal2, hechos, motivo);
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
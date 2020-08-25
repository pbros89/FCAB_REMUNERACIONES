var carta = '';

var ModalDetalleDesvinculacion= function(p_numero){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación (Nº'+p_numero+')',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form = this.down('form').getForm();
                /*
                storeDesv_datosPersonal.load({
                    params:{
                        p_id:personal
                    },
                    callback: function() {
                        func_llenarDatosPersonal(form, storeDesv_datosPersonal);
                    }
                });*/

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
                        text: 'Datos del trabajador involucrado',
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
                        xtype: 'textfield',
                        fieldLabel: 'Rut',
                        labelAlign: 'top',
                        name:'txt_rut',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Apellidos',
                        labelAlign: 'top',
                        name: 'txt_apellidos',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Nombres',
                        labelAlign: 'top',
                        name: 'txt_nombres',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Empresa',
                        labelAlign: 'top',
                        name: 'txt_empresa',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Departamento',
                        labelAlign: 'top',
                        name: 'txt_departamento',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Gerencia',
                        labelAlign: 'top',
                        name: 'txt_gerencia',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Rol',
                        labelAlign: 'top',
                        name: 'txt_rol',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'label',
                        margin: '0 10 0 0',
                        flex: 2,
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Fecha en que debe ser finiquitado',
                        labelAlign: 'top',
                        name: 'txt_fecha',
                        margin: '0 10 0 0',
                        flex: 1,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Seleccione causal de Despido',
                        labelAlign: 'top',
                        name:'txt_causal',
                        margin: '0 10 0 0',
                        flex: 2,
                        readOnly: true,
                        fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                    }]
                },{
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'left',
                    },
                    items: [{
                        xtype: 'radiogroup',
                        fieldLabel: '¿Carta aviso 30 días?',
                        labelWidth: 150,
                        readOnly: true,
                        items: [
                            {boxLabel: 'Si', name: 'rbCarta', inputValue: 'Si', margin: '0 10 0 0'},
                            {boxLabel: 'No', name: 'rbCarta', inputValue: 'No', margin: '0 10 0 0'}
                        ],
                        listeners:{
                            change: function(field, newValue, oldValue){
                                carta = newValue['rbCarta'];
                            }
                        }
                    }]
                }]// Fin Items Panel
            }],//Fin Items Form
            buttons:[{
                xtype: 'button',
                text: 'Cancelar',
                margin: '0 10 0 0',
                handler: function(){
                    this.up('window').close();
                }
            }]
        }]//Fin Items Modal
    }).show();
};

function func_llenarDatosPersonal(form, store){

    var records = store.getRange();
    form.findField('txt_apellidos').setValue(records[0].get('APELLIDOS'));
    form.findField('txt_nombres').setValue(records[0].get('NOMBRES'));
    form.findField('txt_empresa').setValue(records[0].get('EMPRESA'));
    form.findField('txt_departamento').setValue(records[0].get('DEPARTAMENTO'));
    form.findField('txt_gerencia').setValue(records[0].get('GERENCIA'));
    form.findField('txt_rol').setValue(records[0].get('ROL'));
}
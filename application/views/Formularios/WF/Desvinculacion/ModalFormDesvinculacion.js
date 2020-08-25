var carta = '';

var ModalFormDesvinculacion= function(){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación',
        modal: true,
        width: 1000,
        autoScroll : true,
        listeners:{
            afterrender: function(){

                var form = this.down('form').getForm();
                var storeRut = form.findField('cb_rut').getStore();
                var storeCausal = form.findField('cb_causal').getStore();

                storeRut.load({
                    params:{
                        cod_emp: EMPRESA
                    }
                });

                storeCausal.load({
                    params:{
                        cod_emp: EMPRESA
                    }
                });

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
                        text: 'Ingrese los datos del trabajador involucrado',
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
                        xtype: 'combo',
                        fieldLabel: 'Rut',
                        labelAlign: 'top',
                        name:'cb_rut',
                        margin: '0 10 0 0',
                        flex: 1,
                        store: storeDesv_listRutNombre,
                        queryMode: 'local',
                        displayField: 'RUTNOM',
                        valueField: 'RUT',
                        emptyText: 'Seleccione',
                        forceSelection: true,
                        allowBlank: false,
                        hideTrigger: true,
                        typeAhead: true,
                        typeAheadDelay: 100,
                        minChars: 2,
                        queryMode: 'local',
                        lastQuery: '',
                        listeners:{
                            change: function(combo){
                                
                                var seleccion = combo.getStore().find('RUTNOM',combo.getValue());
                                var personal = combo.getStore().getAt(seleccion).get('PK_PERSONAL');

                                var form = this.up('form').getForm();

                                storeDesv_datosPersonal.load({
                                    params:{
                                        p_id:personal
                                    },
                                    callback: function() {
                                        func_llenarDatosPersonal(form, storeDesv_datosPersonal);
                                    }
                                });
                            }
                        }
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
                        xtype: 'datefield',
                        fieldLabel: 'Fecha en que debe ser finiquitado',
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
                        fieldLabel: 'Seleccione causal de Despido',
                        labelAlign: 'top',
                        name:'cb_causal',
                        margin: '0 10 0 0',
                        flex: 2,
                        store: storeDesv_listCausalesDespido,
                        queryMode: 'local',
                        displayField: 'NOMBRE',
                        valueField: 'NOMBRE',
                        emptyText: 'Seleccione',
                        forceSelection: true,
                        allowBlank: false,
                        listeners:{
                            change: function(combo){
                                
                            }
                        }
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
                        allowBlank: false,
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
                //iconCls: 'iconMD-save',
                text: 'Siguiente',
                margin: '0 10 0 0',
                handler: function(){

                    var form = this.up('form').getForm();
                    
                    var combo_rut = form.findField('cb_rut');
                    var seleccion = combo_rut.getStore().find('RUTNOM',combo_rut.getValue());
                    
                    var personal = combo_rut.getStore().getAt(seleccion).get('PK_PERSONAL');
                    var combo_fecha = form.findField('date_fecha').value;
                    var finiquito = Ext.Date.format(combo_fecha,'d/m/Y');
                    var causal = form.findField('cb_causal').value;

                    if(!form.isValid()){
                        alert('Debe completar los campos del formulario.');
                    }else{
                        ModalFormDesvinculacion_2(personal, finiquito, causal, carta);
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

function func_llenarDatosPersonal(form, store){

    var records = store.getRange();
    form.findField('txt_apellidos').setValue(records[0].get('APELLIDOS'));
    form.findField('txt_nombres').setValue(records[0].get('NOMBRES'));
    form.findField('txt_empresa').setValue(records[0].get('EMPRESA'));
    form.findField('txt_departamento').setValue(records[0].get('DEPARTAMENTO'));
    form.findField('txt_gerencia').setValue(records[0].get('GERENCIA'));
    form.findField('txt_rol').setValue(records[0].get('ROL'));
}
var equipos = '';
var celu = '';
var docs = '';
var caja = '';

var ModalFormDesvinculacion_3= function(rol, personal, finiquito, carta, causal, causal2, hechos, motivo){
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
                            {boxLabel: 'Si', name: 'rb_comp', inputValue: 'Si', margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb_comp', inputValue: 'No', margin: '0 10 0 0',}
                        ],
                        listeners:{
                            change: function(field, newValue, oldValue){
                                equipos = newValue['rb_comp'];
                            }
                        }
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Celular',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb_celu', inputValue: 'Si', margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb_celu', inputValue: 'No', margin: '0 10 0 0',}
                        ],
                        listeners:{
                            change: function(field, newValue, oldValue){
                                celu = newValue['rb_celu'];
                            }
                        }
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Información, Archivos y Otros',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb_docs', inputValue: 'Si', margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb_docs', inputValue: 'No', margin: '0 10 0 0',}
                        ],
                        listeners:{
                            change: function(field, newValue, oldValue){
                                docs = newValue['rb_docs'];
                            }
                        }
                    },{
                        xtype: 'radiogroup',
                        fieldLabel: 'Caja Chica',
                        labelAlign: 'top',
                        cls: 'x-check-group-alt',
                        flex: 1,
                        allowBlank: false,
                        items: [
                            {boxLabel: 'Si', name: 'rb_caja', inputValue: 'Si', margin: '0 10 0 0',},
                            {boxLabel: 'No', name: 'rb_caja', inputValue: 'No', margin: '0 10 0 0',}
                        ],
                        listeners:{
                            change: function(field, newValue, oldValue){
                                caja = newValue['rb_caja'];
                            }
                        }
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

                    var form = this.up('form').getForm();
                    var modal = this;

                    if(!form.isValid()){
                        showToast('Debe completar los campos del formulario.');
                    }else{
                        Ext.MessageBox.confirm('GUARDAR', '¿Está seguro que desea crear la solicitud?', function (btn) {
                            if (btn === 'yes'){

                                var horasextras = form.findField('numb_horasExtras').value;
                                var viaticos = form.findField('numb_viatico').value;
                                var haberes = form.findField('txt_haberes').value;
                                var descuentos = form.findField('txt_descuentos').value;
                                var vehiculo = form.findField('txt_vehiculo').value;

                                func_guardarSolDesvinculacion(rol, personal, finiquito, carta, causal, causal2, hechos, motivo, horasextras, viaticos, haberes, descuentos, vehiculo, modal);
                            }
                        });
                    }

                }
            },{
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

function func_guardarSolDesvinculacion(rol, personal, finiquito, carta, causal, causal2, hechos, motivo, horasextras, viaticos, haberes, descuentos, vehiculo, modal){

    var array_lineas = [];

    var usuario = NOMBRE;
    var estado = 'ACTIVO';

    array_lineas.push({
        rol,
        personal,
        usuario,
        finiquito,
        carta,
        causal,
        causal2,
        hechos,
        motivo,
        horasextras,
        viaticos,
        haberes,
        descuentos,
        equipos,
        celu,
        docs,
        caja,
        vehiculo,
        estado
    });

    var arrayToJson = JSON.stringify(array_lineas);

    storeDesv_guardarSolDesvinculacion.load({
        params: {
            listado_lineas: arrayToJson
        },
        callback: function(records) {
            if(records != null){
                var estado = records[0].data.r_est;
                var mensaje = records[0].data.r_msg;
                
                if (estado == 0) {
                    showToast('Solicitud creada exitosamente.');
                    modal.up('window').close();
                    
                }else{
                    Ext.MessageBox.show({
                        title: 'ADVERTENCIA',
                        msg: mensaje,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        }
    });
}
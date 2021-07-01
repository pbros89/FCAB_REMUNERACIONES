Ext.define('fcab.Container.MasterContrato.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterContratoEditar',
    itemId: 'MasterContratoEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterContratoEditar').myExtraParams.param2.data;
            console.log(param);
            Ext.ComponentQuery.query('#MasterContratoEditar #txtId')[0].setValue(param.PK_ID);
            Ext.ComponentQuery.query('#MasterContratoEditar #txtNombre')[0].setValue(param.NOMBRE);
            Ext.ComponentQuery.query('#MasterContratoEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterContratoEditar #txtCliente')[0].setValue(param.CLIENTE);
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
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    labelAlign:'left',
                    name: 'txtId',
                    itemId: 'txtId',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 20,
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
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    labelAlign:'left',
                    name: 'txtNombre',
                    itemId: 'txtNombre',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 200,
                    allowBlank: false
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Cliente',
                    labelAlign:'left',
                    name: 'txtCliente',
                    itemId: 'txtCliente',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 200,
                    allowBlank: false
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'combo',
                    name: 'cbEstado',
                    itemId: 'cbEstado',
                    store: [['A','ACTIVO'],['I','INACTIVO']],
                    fieldLabel: 'Estado',
                    labelAlign:'left',
                    forceSelection: true,
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    anchor: '100%',  
                    allowBlank: false
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
                    var rec = Ext.getCmp('MasterContratoEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterContratoEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarContrato.load({
                        params : {
                            p_id: values.txtId,
                            p_cod_emp: EMPRESA,
                            p_nombre: values.txtNombre,
                            p_cliente: values.txtCliente,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Contrato modificado correctamente.');
                                    cargarMasterContrato(1);
                                    Ext.getCmp('MasterContratoEditar').destroy();
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

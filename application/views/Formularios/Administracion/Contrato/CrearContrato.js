Ext.define('fcab.Container.MasterContrato.Crear', {
    extend: 'Ext.container.Container',
    xtype: 'MasterContratoCrear',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
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
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,
                    value: 'A'
                }]
            }],
            buttons: [{
            text: 'Crear',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    //console.log(values);
                    
                    storeCrearContrato.load({
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
                                    showToast('Contrato creado correctamente.');
                                    cargarMasterContrato(1);
                                    Ext.getCmp('MasterContratoCrear').destroy();
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
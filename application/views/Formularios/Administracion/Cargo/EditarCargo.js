Ext.define('fcab.Container.MasterCargo.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterCargoEditar',
    itemId: 'MasterCargoEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterCargoEditar').myExtraParams.param2.data;
            console.log(param);
            Ext.ComponentQuery.query('#MasterCargoEditar #txtId')[0].setValue(param.PK_COD_CARGO);
            Ext.ComponentQuery.query('#MasterCargoEditar #txtNombre')[0].setValue(param.NOM_CARGO);
            Ext.ComponentQuery.query('#MasterCargoEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterCargoEditar #cbRol')[0].setValue(param.FK_ROL);
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
                    xtype: 'combo',
                    name: 'cbRol',
                    itemId: 'cbRol',
                    displayField: 'NOMBRE',
                    valueField: 'PK_COD_ROL',
                    store: storeCargarRolesCargo,
                    fieldLabel: 'Rol',
                    labelAlign:'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,
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
                    var rec = Ext.getCmp('MasterCargoEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterCargoEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarCargo.load({
                        params : {
                            p_cod_cargo: recRow.data.PK_COD_CARGO,
                            p_cod_emp: recRow.data.PFK_COD_EMP,
                            p_nombre: values.txtNombre,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado,
                            p_rol: values.cbRol
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Cargo modificado correctamente.');
                                    cargarMasterCargo(1);
                                    Ext.getCmp('MasterCargoEditar').destroy();
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

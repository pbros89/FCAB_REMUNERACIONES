Ext.define('fcab.Container.MasterParametro.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterParametroEditar',
    itemId: 'MasterParametroEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterParametroEditar').myExtraParams.param2.data;

            console.log(param);

            Ext.ComponentQuery.query('#MasterParametroEditar #txtId')[0].setValue(param.PK_PARAM);
            Ext.ComponentQuery.query('#MasterParametroEditar #txtNombre')[0].setValue(param.NOM_PARAM);
            Ext.ComponentQuery.query('#MasterParametroEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterParametroEditar #cbTipo')[0].setValue(param.PFK_TIPO_PARAM);
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
                    xtype: 'combo',
                    name: 'cbTipo',
                    itemId: 'cbTipo',
                    displayField: 'NOMBRE',
                    valueField: 'PK_TIPO_PARAM',
                    store: storeCargarTiposParam,
                    fieldLabel: 'Tipo',
                    labelAlign:'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
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
                console.log(ewin);
                if (ewin) {
                    var rec = Ext.getCmp('MasterParametroEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterParametroEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarParametro.load({
                        params : {
                            p_param: recRow.data.PK_PARAM,
                            p_cod_emp: recRow.data.PFK_COD_EMP,
                            p_nombre: values.txtNombre,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado,
                            p_tipo: values.cbTipo
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Parametro modificado correctamente.');
                                    cargarMasterParametro(1);
                                    //ewin.destroy();
                                    Ext.getCmp('MasterParametroEditar').destroy();
                                    //cerrarVentanas();
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

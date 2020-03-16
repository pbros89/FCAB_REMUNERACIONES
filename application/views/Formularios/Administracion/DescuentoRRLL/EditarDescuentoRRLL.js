Ext.define('fcab.Container.MasterDescuentoRRLL.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterDescuentoRRLLEditar',
    itemId: 'MasterDescuentoRRLLEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterDescuentoRRLLEditar').myExtraParams.param2.data;
            storeCargarParam_TIPO_DESCUENTO_RRLL.load();
            Ext.ComponentQuery.query('#MasterDescuentoRRLLEditar #txtId')[0].setValue(param.PK_COD);
            Ext.ComponentQuery.query('#MasterDescuentoRRLLEditar #txtNombre')[0].setValue(param.NOM_DESCUENTO);
            Ext.ComponentQuery.query('#MasterDescuentoRRLLEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterDescuentoRRLLEditar #cbTipo')[0].setValue(param.FK_TIPO);
            Ext.ComponentQuery.query('#MasterDescuentoRRLLEditar #txtObservacion')[0].setValue(param.OBSERVACION);
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
                style: 'margin: 0 0 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbTipo',
                    itemId: 'cbTipo',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_DESCUENTO_RRLL,
                    fieldLabel: 'Tipo Descuento',
                    labelAlign:'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
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
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textareafield',
                    fieldLabel: 'Observacion',
                    labelAlign:'top',
                    name: 'txtObservacion',
                    itemId: 'txtObservacion',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 1000,
                    allowBlank: true
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
                    var rec = Ext.getCmp('MasterDescuentoRRLLEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterDescuentoRRLLEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarDescuentoRRLL.load({
                        params : {
                            p_cod: recRow.data.PK_COD,
                            p_cod_emp: recRow.data.PFK_COD_EMP,
                            p_tipo: values.cbTipo,
                            p_nombre: values.txtNombre,
                            p_observacion: values.txtObservacion,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Descuento RRLL modificado correctamente.');
                                    cargarMasterDescuentoRRLL(1);
                                    Ext.getCmp('MasterDescuentoRRLLEditar').destroy();
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

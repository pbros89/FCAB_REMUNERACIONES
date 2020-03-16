Ext.define('fcab.Container.MasterHaberRRLL.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterHaberRRLLEditar',
    itemId: 'MasterHaberRRLLEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterHaberRRLLEditar').myExtraParams.param2.data;
            storeCargarParam_TIPO_HABER_RRLL.load();
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #txtId')[0].setValue(param.PK_COD);
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #txtNombre')[0].setValue(param.NOM_DESCUENTO);
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #cbUsaFecha')[0].setValue(param.USA_FECHA);
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #cbTipo')[0].setValue(param.FK_TIPO);
            Ext.ComponentQuery.query('#MasterHaberRRLLEditar #txtObservacion')[0].setValue(param.OBSERVACION);
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
                    store: storeCargarParam_TIPO_HABER_RRLL,
                    fieldLabel: 'Tipo Haber',
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
                    name: 'cbUsaFecha',
                    itemId: 'cbUsaFecha',
                    store: [['1','SI'],['0','NO']],
                    fieldLabel: 'Usa Fecha',
                    labelAlign:'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,
                    value: '1'
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
                    var rec = Ext.getCmp('MasterHaberRRLLEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterHaberRRLLEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarHaberRRLL.load({
                        params : {
                            p_cod: recRow.data.PK_COD,
                            p_cod_emp: recRow.data.PFK_COD_EMP,
                            p_tipo: values.cbTipo,
                            p_nombre: values.txtNombre,
                            p_usa_fecha: values.cbUsaFecha,
                            p_observacion: values.txtObservacion,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Haber RRLL modificado correctamente.');
                                    cargarMasterHaberRRLL(null);
                                    Ext.getCmp('MasterHaberRRLLEditar').destroy();
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

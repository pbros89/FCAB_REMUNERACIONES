Ext.define('fcab.Container.MasterCC.Editar', {
    extend: 'Ext.container.Container',
    xtype: 'MasterCCEditar',
    itemId: 'MasterCCEditar',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners:{
        afterrender: function(){
            var param = Ext.getCmp('MasterCCEditar').myExtraParams.param2.data;
            storeCargarParam_GERENCIA.load();
            storeCargarParam_DEPARTAMENTO.load();
            Ext.ComponentQuery.query('#MasterCCEditar #txtId')[0].setValue(param.PK_COD_CC);
            Ext.ComponentQuery.query('#MasterCCEditar #txtNombre')[0].setValue(param.NOM_CC);
            Ext.ComponentQuery.query('#MasterCCEditar #cbEstado')[0].setValue(param.ESTADO);
            Ext.ComponentQuery.query('#MasterCCEditar #cbGerencia')[0].setValue(param.COD_GERENCIA);
            Ext.ComponentQuery.query('#MasterCCEditar #cbDepartamento')[0].setValue(param.COD_DEPARTAMENTO);
            
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
                    name: 'cbGerencia',
                    itemId: 'cbGerencia',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_GERENCIA,
                    fieldLabel: 'Gerencia',
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
                    xtype: 'combo',
                    name: 'cbDepartamento',
                    itemId: 'cbDepartamento',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_DEPARTAMENTO,
                    fieldLabel: 'Departamento',
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
                var cbGerencia = Ext.ComponentQuery.query('#MasterCCEditar #cbGerencia')[0];
                var cbDepartamento = Ext.ComponentQuery.query('#MasterCCEditar #cbDepartamento')[0];
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var rec = Ext.getCmp('MasterCCEditar').myExtraParams.param1;
                    var recRow = Ext.getCmp('MasterCCEditar').myExtraParams.param2;
                    var values = form.getValues();

                    storeModificarCentroCosto.load({
                        params : {
                            p_cod_cc: recRow.data.PK_COD_CC,
                            p_cod_emp: recRow.data.PFK_COD_EMP,
                            p_nombre: values.txtNombre,
                            p_usuario: NOMBRE,
                            p_estado: values.cbEstado,
                            p_cod_ger: values.cbGerencia,
                            p_nom_ger: cbGerencia.getRawValue(),
                            p_cod_dep: values.cbDepartamento,
                            p_nom_dep: cbDepartamento.getRawValue(),
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Centro de costo modificado correctamente.');
                                    cargarMasterCC(1);
                                    Ext.getCmp('MasterCCEditar').destroy();
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

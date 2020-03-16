Ext.define("fcab.Container.MainIngHaberRRLL.Editar", {
    extend: 'Ext.container.Container',
    xtype: 'EditarIngHaberRRLL',
    itemId: 'EditarIngHaberRRLL',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    height: 600,
    scrollable: true,
    listeners: {
        afterrender: function(){
            var param = Ext.getCmp('EditarIngHaberRRLL').myExtraParams.param2.data;
            storeCargarHaberesRRLLFiltro.removeAll();

            console.log(param);
            var txtRut = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtRut')[0];
            var txtId = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtNombre')[0];
            var txtCC = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtCC')[0];
            var cbTipoHaber = Ext.ComponentQuery.query('#EditarIngHaberRRLL #cbTipoHaber')[0];
            var cbHaber = Ext.ComponentQuery.query('#EditarIngHaberRRLL #cbHaber')[0];
            var cbFormato = Ext.ComponentQuery.query('#EditarIngHaberRRLL #cbFormato')[0];
            var txtMonto = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtMonto')[0];
            var dtInicio = Ext.ComponentQuery.query('#EditarIngHaberRRLL #dtInicio')[0];
            var dtTermino = Ext.ComponentQuery.query('#EditarIngHaberRRLL #dtTermino')[0];
            var txtObs = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtObs')[0];

            storeCargarParam_TIPO_HABER_RRLL.load();


      
            txtRut.setValue(param.RUT);
            txtId.setValue(param.PK_COD);
            txtNombre.setValue(param.NOMBRE);
            txtCC.setValue(param.COD_CC + '-' + param.NOM_CC);
            cbTipoHaber.setValue(param.FK_TIPO);
            cbHaber.setValue(param.FK_HABER);
            txtMonto.setValue(param.MONTO);
            cbFormato.setValue(param.FORMATO_VALOR);
            txtObs.setValue(param.OBSERVACION);
            dtInicio.setValue(param.INICIO);
            dtTermino.setValue(param.TERMINO);

        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        autoScroll: true,
        height: 600, 
        layout: {
            type: 'column',
            align: 'strech'
        },
        
        items:[
            {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtId',
                    name: 'txtId',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'ID',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtNombre',
                    name: 'txtNombre',
                    labelAlign:'top',
                    fieldLabel: 'Nombre',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCC',
                    name: 'txtCC',
                    labelAlign:'top',
                    fieldLabel: 'Centro de Costo',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbTipoHaber',
                    itemId: 'cbTipoHaber',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_HABER_RRLL,
                    fieldLabel: 'Tipo Haber',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false, 
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            if(newValue != null){
                                storeCargarHaberesRRLLFiltro.load({
                                    params: {
                                        p_cod_emp: EMPRESA,
                                        p_tipo: newValue
                                    }, 
                                    callback: function(){
                                        var param = Ext.getCmp('EditarIngHaberRRLL').myExtraParams.param2.data;
                                        var cbHaber = Ext.ComponentQuery.query('#EditarIngHaberRRLL #cbHaber')[0];
                                        cbHaber.setValue(param.FK_HABER);
                                    }
                                },);
                            }else{
                                storeCargarHaberesRRLLFiltro.removeAll();
                            }
                        }
                    } 
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbHaber',
                    itemId: 'cbHaber',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarHaberesRRLLFiltro,
                    fieldLabel: 'Haber',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false, 
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            
                            var param = Ext.getCmp('EditarIngHaberRRLL').myExtraParams.param2.data;
                            var txtUsaFecha = Ext.ComponentQuery.query('#EditarIngHaberRRLL #txtUsaFecha')[0];
                            var dtInicio = Ext.ComponentQuery.query('#EditarIngHaberRRLL #dtInicio')[0];
                            var dtTermino = Ext.ComponentQuery.query('#EditarIngHaberRRLL #dtTermino')[0];
                            if(newValue != null){
                                var item = obj.selection.data;
                                if(item.USA_FECHA == '1') {
                                    dtInicio.setHidden(false);
                                    dtTermino.setHidden(false);
                                    txtUsaFecha.setHidden(false);
                                    txtUsaFecha.setValue('SI');
                                    dtInicio.setValue(param.INICIO);
                                    dtTermino.setValue(param.TERMINO);

                                }else{
                                    dtInicio.setHidden(true);
                                    dtTermino.setHidden(true);
                                    txtUsaFecha.setHidden(false);
                                    txtUsaFecha.setValue('NO');
                                    dtInicio.setValue(new Date());
                                    dtTermino.setValue(new Date());
                                }
                                
                            }else{
                                dtInicio.setHidden(true);
                                dtTermino.setHidden(true);
                                txtUsaFecha.setHidden(true);
                                txtUsaFecha.setValue('');
                            }
                        }
                    }  
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtUsaFecha',
                    name: 'txtUsaFecha',
                    labelAlign:'top',
                    fieldLabel: 'Usa Fecha',
                    anchor: '50%',
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    hidden: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtInicio',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Inicio',
                    itemId: 'dtInicio',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    hidden: true,
                    allowBlank: false,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtTermino',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'Fecha Termino',
                    itemId: 'dtTermino',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    hidden: true,
                    allowBlank: false,
    
                },]
                
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbFormato',
                    itemId: 'cbFormato',
                    store: [['UF','UF'], ['$', '$'], ['%', '%']],
                    fieldLabel: 'Formato Valores',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    width: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtMonto',
                    name: 'txtMonto',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto Total',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            
                        }
                    }
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textareafield',
                    itemId: 'txtObs',
                    name: 'txtObs',
                    labelAlign:'top',
                    fieldLabel: 'Observación',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: true,
                    maxLength: 1000,
                }]
            }],
            buttons: [{
                tooltip: 'Editar Haber RRLL',
                //scale: 'large',
                text: 'Editar',
                handler: function () {
                    
                    var cbHaber =  Ext.ComponentQuery.query('#EditarIngHaberRRLL #cbHaber')[0];
                    var param = Ext.getCmp('EditarIngHaberRRLL').myExtraParams.param2.data;
    
                    var form = this.up('form').getForm();
                    var values = form.getValues();
    
                    if(form.isValid()) {
                        var ewin = Ext.WindowManager.getActive();
                        if (ewin) {
                           
                            var values = form.getValues();
                            storeModificarIngHaberRRLL.load({
                                params : {
                                      P_COD : param.PK_COD
                                    , P_COD_EMP : EMPRESA
                                    , P_USUARIO : NOMBRE
                                    , P_COD_HABER: values.cbHaber
                                    , P_TIPO : values.cbTipoHaber
                                    , P_NOM_HABER : cbHaber.getRawValue()
                                    , P_MONTO : values.txtMonto
                                    , P_INICIO : values.dtInicio
                                    , P_TERMINO : values.dtTermino
                                    , P_USA_FECHA : values.txtUsaFecha == 'SI'? '1': '0'
                                    , P_FORMATO_VALOR : values.cbFormato
                                    , P_OBSERVACION : values.txtObs
                                },
                                callback: function(records, operation, success) {
                                    if(records != null) {
                                        if(records[0].data.r_msg == 'OK'){
                                            showToast('Haber RRLL editado correctamente.');
                                            cargarMainIngHaberRRLL(null);
                                            Ext.getCmp('EditarIngHaberRRLL').destroy();
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
                }
            }]
    }]
        
});


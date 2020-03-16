Ext.define("fcab.Container.MainIngDescuentoRRLL.Editar", {
    extend: 'Ext.container.Container',
    xtype: 'EditarIngDescuentoRRLL',
    itemId: 'EditarIngDescuentoRRLL',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    height: 600,
    scrollable: true,
    listeners: {
        afterrender: function(){
            var param = Ext.getCmp('EditarIngDescuentoRRLL').myExtraParams.param2.data;
            storeCargarDescuentosRRLLFiltro.removeAll();

            console.log(param);
            var cbAnho = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbAnho')[0];
            var txtRut = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtRut')[0];
            var txtId = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtNombre')[0];
            var txtCC = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtCC')[0];
            var cbTipoDescuento = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbTipoDescuento')[0];
            var cbDescuento = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbDescuento')[0];
            var cbFormato = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbFormato')[0];
            var txtCantidadCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtCantidadCuota')[0];
            var txtValorCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtValorCuota')[0];
            var cbMes = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbMes')[0];
            var txtObs = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtObs')[0];

            var years = [];
            var date = new Date();
            var year = date.getFullYear();

            years.push({
                'VALOR' : year
            });
            years.push({
                'VALOR' : (year+1)
            });
            cbAnho.getStore().loadData(years);

            storeCargarParam_TIPO_DESCUENTO_RRLL.load();


            //SET INPUTS
            cbAnho.setValue(param.ANHO_DESCUENTO);
            txtRut.setValue(param.RUT);
            txtId.setValue(param.PK_COD);
            txtNombre.setValue(param.NOMBRE);
            txtCC.setValue(param.COD_CC + '-' + param.NOM_CC);
            cbTipoDescuento.setValue(param.FK_TIPO);
            
            cbFormato.setValue(param.FORMATO_VALOR);
            txtCantidadCuota.setValue(param.CUOTAS);
            txtValorCuota.setValue(param.VALOR_CUOTA);
            cbMes.setValue(param.MES_DESCUENTO);
            txtObs.setValue(param.OBSERVACION);

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
                    name: 'cbTipoDescuento',
                    itemId: 'cbTipoDescuento',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_TIPO_DESCUENTO_RRLL,
                    fieldLabel: 'Tipo Descuento',
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
                                storeCargarDescuentosRRLLFiltro.load({
                                    params: {
                                        p_cod_emp: EMPRESA,
                                        p_tipo: newValue
                                    },
                                    callback: function(){
                                        var param = Ext.getCmp('EditarIngDescuentoRRLL').myExtraParams.param2.data;
                                        var cbDescuento = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbDescuento')[0];
                                        cbDescuento.setValue(param.FK_DESCUENTO);
                                    }
                                });


                            }else{
                                storeCargarDescuentosRRLLFiltro.removeAll();
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
                    name: 'cbDescuento',
                    itemId: 'cbDescuento',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarDescuentosRRLLFiltro,
                    fieldLabel: 'Descuento',
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
                }]
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
                    width: '50%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            
            },{
                xtype: 'container',
                columnWidth: 0.4,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtCantidadCuota',
                    name: 'txtCantidadCuota',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Cantidad de Cuotas',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            var txtValorCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtValorCuota')[0].value;
                            var txtCantidadCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtCantidadCuota')[0].value;
                            var txtMontoTotal = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtMontoTotal')[0];

                            if(txtCantidadCuota != null && txtValorCuota != null){
                                var cantidad = Number.parseFloat(txtCantidadCuota);
                                var valor = Number.parseFloat(txtValorCuota);
                                
                                txtMontoTotal.setValue(cantidad * valor);
                            }else{
                                txtMontoTotal.reset();
                            }
                        }
                    }
                }]
            },{
                xtype: 'container',
                columnWidth: 0.6,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'numberfield',
                    itemId: 'txtValorCuota',
                    name: 'txtValorCuota',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Valor Cuota',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            var txtValorCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtValorCuota')[0].value;
                            var txtCantidadCuota = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtCantidadCuota')[0].value;
                            var txtMontoTotal = Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #txtMontoTotal')[0];

                            if(txtCantidadCuota != null && txtValorCuota != null){
                                var cantidad = Number.parseFloat(txtCantidadCuota);
                                var valor = Number.parseFloat(txtValorCuota);
                                
                                txtMontoTotal.setValue(cantidad * valor);
                            }else{
                                txtMontoTotal.reset();
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
                    xtype: 'numberfield',
                    itemId: 'txtMontoTotal',
                    name: 'txtMontoTotal',
                    forcePrecision: true,
                    decimalPrecision: 5,
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto Total',
                    anchor: '100%',
                    allowBlank: false,
                    maxValue: 999999999,
                    minValue: 0,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            },{
                xtype: 'container',
                columnWidth: 0.4,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbAnho',
                    itemId: 'cbAnho',
                    fieldLabel: 'Año',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    displayField: 'VALOR',
                    valueField: 'VALOR',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,
                }]
            }, {
                xtype: 'container',
                columnWidth: .6,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'combo',
                    name: 'cbMes',
                    itemId: 'cbMes',
                    displayField: 'NOMBRE',
                    valueField: 'VALOR',
                    store: storeExtras_cargarMeses,
                    fieldLabel: 'Mes Inicial',
                    labelAlign:'top',
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
                tooltip: 'Editar Descuento RRLL',
                //scale: 'large',
                text: 'Editar',
                handler: function () {
                    
                    var cbDescuento =  Ext.ComponentQuery.query('#EditarIngDescuentoRRLL #cbDescuento')[0];
                    var param = Ext.getCmp('EditarIngDescuentoRRLL').myExtraParams.param2.data;
    
                    var form = this.up('form').getForm();
                    var values = form.getValues();
    
                    if(form.isValid()) {
                        var ewin = Ext.WindowManager.getActive();
                        if (ewin) {
                           
                            var values = form.getValues();
                            storeModificarIngDescuentoRRLL.load({
                                params : {
                                      P_COD : param.PK_COD
                                    , P_COD_EMP : EMPRESA
                                    , P_USUARIO : NOMBRE
                                    , P_COD_DESCUENTO: values.cbDescuento
                                    , P_TIPO : values.cbTipoDescuento
                                    , P_NOM_DESCUENTO : cbDescuento.getRawValue()
                                    , P_MONTO_TOTAL : values.txtMontoTotal
                                    , P_CUOTAS : values.txtCantidadCuota
                                    , P_VALOR_CUOTA : values.txtValorCuota
                                    , P_MES_DESCUENTO : values.cbMes
                                    , P_FORMATO_VALOR : values.cbFormato
                                    , P_OBSERVACION : values.txtObs
                                    , P_ANHO_DESCUENTO : values.cbAnho
                                },
                                callback: function(records, operation, success) {
                                    if(records != null) {
                                        if(records[0].data.r_msg == 'OK'){
                                            showToast('Descuento RRLL editado correctamente.');
                                            cargarMainIngDescuentoRRLL(null);
                                            Ext.getCmp('EditarIngDescuentoRRLL').destroy();
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


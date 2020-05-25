Ext.define("fcab.Container.CrearIngDescuentoRRLL", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngDescuentoRRLL',
    itemId: 'CrearIngDescuentoRRLL',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
        var cbAnho = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #cbAnho')[0];
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
        storeExtras_cargarPeriodos.load();
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
        
        items:[{
            
            xtype: 'fieldset',
            title: 'Trabajador',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 0.6,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: .8,
                layout: 'hbox',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtRut',
                    name: 'txtRut',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    width: '50%',
                    allowBlank: false,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    style: 'margin: 0 10px 5px 0',
                    itemId: 'txtDV',
                    name: 'txtDV',
                    labelAlign:'top',
                    fieldLabel: 'DV',
                    width: '10%',
                    typeAhead: true,
                    maxLength: 1,
                    allowBlank: false
                },{
                    xtype: 'button',
                    margin: '30 0 0 0',
                    text:'Cargar Personal',
                    handler: function() {
                        var txtRut = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtRut')[0].getValue();
                        var txtDV = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtDV')[0].getValue();

                        if(txtRut != null && txtRut != '' && 
                        txtDV != null && txtDV != '') {
                            storeCargarPersonalFiniquito.load({
                                params : {
                                    p_rut : txtRut + '-' + txtDV
                                    , p_cod_emp: EMPRESA
                                    
                                },
                                callback: function(records, operation, success) {
                                    var txtRutOld = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtRutOld')[0];
                                    var txtCC = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtCC')[0];
                                    var txtCargo = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtCargo')[0];
                                    var txtNombre = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtNombre')[0];
                                    var txtIngreso = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtIngreso')[0];

                                    if(records != null && records.length > 0) {
                                        

                                        txtRutOld.setValue(records[0].data.RUT);
                                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                                        txtCargo.setValue(records[0].data.NOM_CARGO);
                                        txtNombre.setValue(records[0].data.NOMBRE);
                                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);

                                    }else{
                                        txtRutOld.reset();
                                        txtCC.reset();
                                        txtCargo.reset();
                                        txtNombre.reset();
                                        txtIngreso.reset();
                                        
                                        Ext.MessageBox.show({
                                            title: 'ADVERTENCIA',
                                            msg: "No se encontro personal con el RUT ingresado",
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.Msg.OK
                                        });
                                        
                                    }
                                    
                                }
                            });
                        }else{
                            Ext.MessageBox.show({
                                title: 'ADVERTENCIA',
                                msg: "Los campos RUT y DV son requeridos",
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.Msg.OK
                            });
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
                    itemId: 'txtRutOld',
                    name: 'txtRutOld',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
                    anchor: '100%',
                    typeAhead: true,
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
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCC',
                    name: 'txtCC',
                    labelAlign:'top',
                    fieldLabel: 'Centro Costo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCargo',
                    name: 'txtCargo',
                    labelAlign:'top',
                    fieldLabel: 'Cargo',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }, {
                xtype: 'container',
                columnWidth: .5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtIngreso',
                    name: 'txtIngreso',
                    labelAlign:'top',
                    fieldLabel: 'Fecha Ingreso',
                    anchor: '100%',
                    typeAhead: true,
                    allowBlank: false,
                    readOnly: true,
                    fieldStyle: 'background-color: #d8d8d8; background-image: none;',
                }]
            }],
        }, {
            xtype: 'fieldset',
            title: 'Descuento RRLL',
            style: 'margin: 0 10px 5px 0',
            columnWidth: .4,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbPeriodo',
                    itemId: 'cbPeriodo',
                    displayField: 'PERIODO',
                    valueField: 'PERIODO',
                    store: storeExtras_cargarPeriodos,
                    fieldLabel: 'Periodo',
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
                    width: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            
            },{
                xtype: 'container',
                columnWidth: 0.4,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtCantidadCuota',
                    name: 'txtCantidadCuota',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Cantidad de Cuotas',
                    anchor: '100%',
                    allowBlank: false,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            var txtValorCuota = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtValorCuota')[0].value;
                            var txtCantidadCuota = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtCantidadCuota')[0].value;
                            var txtMontoTotal = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtMontoTotal')[0];

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
                    xtype: 'thousandnumber',
                    itemId: 'txtValorCuota',
                    name: 'txtValorCuota',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Valor Cuota',
                    anchor: '100%',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    listeners: {
                        change: function(obj, newValue, oldValue) {
                            var txtValorCuota = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtValorCuota')[0].value;
                            var txtCantidadCuota = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtCantidadCuota')[0].value;
                            var txtMontoTotal = Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtMontoTotal')[0];

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
                    xtype: 'thousandnumber',
                    itemId: 'txtMontoTotal',
                    name: 'txtMontoTotal',
                    allowDecimals: true,
                    labelAlign:'top',
                    fieldLabel: 'Monto Total',
                    anchor: '100%',
                    allowBlank: false,
                    decimalPrecision: 4,
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
            }]
        }],
        buttons: [{
            tooltip: 'Ingresar Descuento RRLL',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                
                var txtRutOld =  Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #txtRutOld')[0];
                var cbDescuento =  Ext.ComponentQuery.query('#CrearIngDescuentoRRLL #cbDescuento')[0];

                var form = this.up('form').getForm();
                var values = form.getValues();

                if(form.isValid()) {
                    var ewin = Ext.WindowManager.getActive();
                    if (ewin) {
                       
                        var values = form.getValues();
                        var rut = txtRutOld.getValue().substring(0, txtRutOld.getValue().indexOf("-"));
                        var dv = txtRutOld.getValue().substring(txtRutOld.getValue().indexOf("-")+1, txtRutOld.getValue().length);
                        
                        storeCrearIngDescuentoRRLL.load({
                            params : {
                                  P_RUT : rut
                                , P_DV : dv
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
                                , P_PERIODO: values.cbPeriodo
                            },
                            callback: function(records, operation, success) {
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Descuento RRLL creado correctamente.');
                                        cargarMainIngDescuentoRRLL(null);
                                        Ext.getCmp('CrearIngDescuentoRRLL').destroy();
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
                    }//console.log(form.getValues());
                }
            }
        }]
    }],
});


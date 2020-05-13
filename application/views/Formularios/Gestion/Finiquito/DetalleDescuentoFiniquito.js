Ext.define('fcab.Container.MainFiniquito.DetalleDescuento', {
    extend: 'Ext.container.Container',
    xtype: 'MainFiniquitoDetalleDescuento',
    itemId: 'MainFiniquitoDetalleDescuento',
    border: false,
    frame: false,
    scrollable: false,
    items: [{ 
        xtype: 'MainFiniquitoDetalleDescuentoGrilla'
    }]
    
});

Ext.define('fcab.Container.MainFiniquitoDetalleDescuento.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainFiniquitoDetalleDescuentoGrilla',
    itemId: 'MainFiniquitoDetalleDescuentoGrilla',
    store: storeCargarConceptosFiniquitoDesc,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    
    columns: [
        
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PFK_COD_CONCEPTO',
            flex:1
        },

        {
            text     : 'Nombre',
            sortable : true,
            dataIndex: 'NOM_CONCEPTO',
            flex:2
        },
        {
            text     : 'Observación',
            sortable : true,
            dataIndex: 'OBS_TIPO_CONCEPTO',
            flex:2,
            //hidden: true
        },
        { 
            text: 'Valor', 
            sortable : true,
            dataIndex: 'VALOR' ,
            align: 'center',
            flex: 1,
            editable: true,
            getEditor: function(record) {
                var param = Ext.getCmp('MainFiniquitoDetalle').myExtraParams.param2.data;
                var grid = this.up('grid'),
                    cellediting = grid.findPlugin('cellediting'),
                    editors = cellediting.editors,
                    editor = editors.getByKey(this.id),
                    fieldType;


                if (editor) {
                // Do this to avoid memory leaks
                    editors.remove(editor);
                }

                
                if(param.ESTADO === 'TERMINADO')
                {
                    return null;
                }

                
                
                fieldType = record.get('TIPO_CONCEPTO') === 'PORCENTAJE' ||
                            record.get('TIPO_CONCEPTO') === 'CANTIDAD' ||
                            record.get('TIPO_CONCEPTO') === 'MONTO' ||
                            record.get('TIPO_CONCEPTO') === 'RANGO' 
                    ? 'thousandnumber' : 'combobox';
                
                if(fieldType === 'combobox' && record.get('TIPO_CONCEPTO') === 'BOOLEANO')
                {
                    return {
                        xtype: fieldType,
                        allowBlank: false,
                        displayField: 'NOMBRE',
                        valueField: 'VALOR',
                        editable: true,
                        readOnly: false,
                        triggerAction: 'all',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        selectOnFocus: true,
                        listeners:{
                            change: function(obj, newValue, oldValue){
                                storeModificarFiniquitoConcepto.load({
                                    params:{
                                        p_finiquito : record.get('PFK_FINIQUITO'),
                                        p_cod_concepto: record.get('PFK_COD_CONCEPTO'),
                                        p_usuario: NOMBRE,
                                        p_valor: newValue,
                                    },
                                    callback: function(records, operation, success) {
                                        //cargarConceptosPersonaProcesoMensual();
                                    }
                                });
                            }
                        },
                        store: Ext.create('Ext.data.Store', {
                            data: [
                                {
                                    "NOMBRE": "1 = NO",
                                    "VALOR": "1"
                                },
                                {
                                    "NOMBRE": "0 = SI",
                                    "VALOR": "0"
                                }
                            ]
                        })
                    };
                }


                if(fieldType === 'combobox' && record.get('TIPO_CONCEPTO') === 'BOOLEANO2')
                {
                    return {
                        xtype: fieldType,
                        allowBlank: false,
                        displayField: 'NOMBRE',
                        valueField: 'VALOR',
                        editable: true,
                        readOnly: false,
                        triggerAction: 'all',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        selectOnFocus: true,
                        listeners:{
                            change: function(obj, newValue, oldValue){
                                storeModificarFiniquitoConcepto.load({
                                    params:{
                                        p_finiquito : record.get('PFK_FINIQUITO'),
                                        p_cod_concepto: record.get('PFK_COD_CONCEPTO'),
                                        p_usuario: NOMBRE,
                                        p_valor: newValue,
                                    },
                                    callback: function(records, operation, success) {
                                        //cargarConceptosPersonaProcesoMensual();
                                    }
                                });
                            }
                        },
                        store: Ext.create('Ext.data.Store', {
                            data: [
                                {
                                    "NOMBRE": "1 = SI",
                                    "VALOR": "1"
                                },
                                {
                                    "NOMBRE": "0 = NO",
                                    "VALOR": "0"
                                }
                            ]
                        })
                    };
                }


                if(fieldType === 'combobox' && record.get('TIPO_CONCEPTO') === 'SELECCIONAR'){
                    var store = Ext.create('Ext.data.Store', {
                        proxy: {
                            type:   'ajax',
                            url:    JsonHost + 'concepto/ConceptoController/cargarConceptoVal',
                            reader: {
                                type: 'json',
                                rootProperty: 'items'
                            },
                            listeners: {
                                exception: function(proxy, response, operation){
                                    console.log(proxy);
                                    console.log(response);
                                    console.log(operation);
                                    Ext.MessageBox.show({
                                        title: 'EXCEPCION',
                                        msg: 'Problemas al cargar valores',
                                        icon: Ext.MessageBox.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                                
                                
                            }
                        },
                        autoLoad: false
                    });

                    store.load({
                        params: {
                            p_cod_concepto: record.get('PFK_COD_CONCEPTO'),
                            p_cod_emp: EMPRESA,
                        }
                    });


                    return {
                        xtype: fieldType,
                        allowBlank: false,
                        displayField: 'VALOR',
                        valueField: 'VALOR',
                        editable: true,
                        readOnly: false,
                        triggerAction: 'all',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        selectOnFocus: true,
                        listeners:{
                            change: function(obj, newValue, oldValue){
                                
                                
                                storeModificarFiniquitoConcepto.load({
                                    params:{
                                        p_finiquito : record.get('PFK_FINIQUITO'),
                                        p_cod_concepto: record.get('PFK_COD_CONCEPTO'),
                                        p_usuario: NOMBRE,
                                        p_valor: newValue,
                                    },
                                    callback: function(records, operation, success) {
                                        //cargarConceptosPersonaProcesoMensual();
                                    }
                                });
                            }
                        },
                        store: store
                    };
                }
                
                if(fieldType === 'thousandnumber'){
                    var rangoIni = 0;
                    var rangoFin = 999999999;

                    if(record.get('TIPO_CONCEPTO') === 'RANGO'){
                        rangoIni = record.get('RANGO_INI');
                        rangoFin = record.get('RANGO_FIN');
                    }

                    if(record.get('TIPO_CONCEPTO') === 'PORCENTAJE'){
                        rangoIni = 0;
                        rangoFin = 100;
                    }

                    return {
                        xtype: fieldType,
                        maxValue: rangoFin,
                        minValue: rangoIni,
                        allowBlank: false,
                        
                        listeners:{
                            change: function(obj, newValue, oldValue){

                                if(newValue <= rangoFin && newValue >= rangoIni){

                                    storeModificarFiniquitoConcepto.load({
                                        params:{
                                            p_finiquito : record.get('PFK_FINIQUITO'),
                                            p_cod_concepto: record.get('PFK_COD_CONCEPTO'),
                                            p_usuario: NOMBRE,
                                            p_valor: newValue,
                                        },
                                        callback: function(records, operation, success) {
                                            //cargarConceptosPersonaProcesoMensual();
                                        }
                                    });
                                }else{
                                    showToast('Valor incorrecto. (Se mantendra el ultimo valor correcto)');
                                }
                            }
                        }
                    };
                }
                
            },
            renderer: Ext.util.Format.numberRenderer('0.0,0')
        },
    ],
    minHeight: 500,
    width : '100%',
});

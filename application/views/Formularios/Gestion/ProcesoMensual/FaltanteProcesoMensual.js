Ext.define('fcab.Container.MainProcesoMensual.Faltante', {
    extend: 'Ext.tab.Panel',
    xtype: 'MainProcesoMensualFaltante',
    itemId: 'MainProcesoMensualFaltante',
    activeTab: 0,
    width :'100%',
    height: 600,
    
    listeners: {
        afterrender: function(){
            cargarFaltanteProcesoMensual();
        }
    },
    items: [{
        title: 'Resumen',
        scrollable: true,
        autoScroll: true,
        items:[{
            border: false,
            margin: '20 20 0 20',
            html: "<h3>Agregar Faltantes:</h3><h3><i>Identifica los trabajadores y conceptos faltantes en el proceso mensual.</i></h3>"
        },{
            xtype: 'container',
            width: '100%',
            layout: {
                type: 'hbox',
                align: "end",
                pack: 'center'
            },
            margin: '10',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Trabajadores Faltantes',
                labelAlign:'top',
                name: 'txtTraFaltante',
                itemId: 'txtTraFaltante',
                typeAhead: true,
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                margin: '0 10 0 0',
                fieldStyle: 'background-color: '+verde+'; background-image: none; color: white; font-weight: bold;',
            },{
                xtype: 'textfield',
                fieldLabel: 'Conceptos Faltantes',
                labelAlign:'top',
                name: 'txtConFaltante',
                itemId: 'txtConFaltante',
                typeAhead: true,
                readOnly: true, 
                maxLength: 1000,
                allowBlank: true,
                value: '0',
                margin: '0 10 0 0',
                fieldStyle: 'background-color: '+verde+'; background-image: none; color: white; font-weight: bold;',
            },{
                xtype: 'button',
                text: 'Agregar Faltantes',
                scale: 'medium',
                handler: function() {
                    clickAgregarFaltantes();
                }
            },]
        
        },{
            border: false,
            margin: '40 20 0 20',
            html: "<h3>Refrescar Trabajador:</h3><h3><i>Se reinician los atributos y conceptos del trabajador en el proceso mensual. <br>NOTA: Ejecutar solamente cuando se hagan cambios de centro de costo o cargo al trabajador.</i></h3>"
        },{
            xtype: 'container',
            width: '100%',
            layout: {
                type: 'hbox',
                align: "bottom",
                pack: 'center'
            },
            margin: '10',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Rut',
                labelAlign:'top',
                name: 'txtRut',
                itemId: 'txtRut',
                typeAhead: true,
                readOnly: false, 
                maxLength: 20,
                margin: '0 10 0 0',
            },{
                xtype: 'button',
                text: 'Refrescar Trabajador',
                scale: 'medium',
                handler: function() {
                    clickRefrescarTrabajador();
                }
            },]
        }]
    }, {
        title: 'Trabajadores Faltantes',
        scrollable: true,
        autoScroll: true,
        items:[{
            xtype: 'MainProcesoMensualFaltanteGridTrabajadoresFaltantes'
        }]
    },{
        title: 'Conceptos Faltantes',
        scrollable: true,
        autoScroll: true,
        items:[{
            xtype: 'MainProcesoMensualFaltanteGridConceptosFaltante'
        }]
    }],
    
});

Ext.define('fcab.Container.MainProcesoMensual.Faltante.TrabajadoresFaltantes', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainProcesoMensualFaltanteGridTrabajadoresFaltantes',
    itemId: 'MainProcesoMensualFaltanteGridTrabajadoresFaltantes',
    store: storeCargarTrabajadoresFaltantesProcMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Trabajadores Faltantes",
                  fileName: 'Trabajadores Faltantes '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [{
            text     : 'COD_CC',
            sortable : true,
            dataIndex: 'PFK_COD_CC',
            width: 200
        },{
            text     : 'NOM_CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            width: 200
        },{
            text     : 'RUT',
            sortable : true,
            dataIndex: 'PK_RUT',
            width: 200
        },{
            text     : 'NOMBRE',
            sortable : true,
            dataIndex: 'NOMBRE',
            width: 200
        },{
            text     : 'COD_CARGO',
            sortable : true,
            dataIndex: 'COD_CARGO',
            width: 200
        },{
            text     : 'NOM_CARGO',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            width: 200
        },
    ],
    height: 530,
    width : '100%',
});



Ext.define('fcab.Container.MainProcesoMensual.Faltante.ConceptosFaltante', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainProcesoMensualFaltanteGridConceptosFaltante',
    itemId: 'MainProcesoMensualFaltanteGridConceptosFaltante',
    store: storeCargarConceptosFaltantesProcMensual,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Trabajadores Faltantes",
                  fileName: 'Trabajadores Faltantes '+ new Date().getTime() +'.xls'
                });
            }

        }]
    }],
    columns: [{
            text     : 'COD_CC',
            sortable : true,
            dataIndex: 'PFK_COD_CC',
            width: 200
        },{
            text     : 'RUT',
            sortable : true,
            dataIndex: 'PFK_RUT',
            width: 200
        },{
            text     : 'COD_CONCEPTO',
            sortable : true,
            dataIndex: 'PFK_COD_CONCEPTO',
            width: 200
        },{
            text     : 'NOM_CONCEPTO',
            sortable : true,
            dataIndex: 'NOM_CONCEPTO',
            width: 200
        },{
            text     : 'GRUPO',
            sortable : true,
            dataIndex: 'GRUPO',
            width: 200
        },{
            text     : 'TIPO',
            sortable : true,
            dataIndex: 'TIPO',
            width: 200
        },
    ],
    height: 530,
    width : '100%',
});

var cargarFaltanteProcesoMensual = function() {

    var param = Ext.getCmp('MainProcesoMensualFaltante').myExtraParams.param2.data;
    var txtTraFaltante = Ext.ComponentQuery.query('#MainProcesoMensualFaltante #txtTraFaltante')[0];
    var txtConFaltante = Ext.ComponentQuery.query('#MainProcesoMensualFaltante #txtConFaltante')[0];
    var count = 0;
    Ext.MessageBox.show({
        msg: 'Cargando Faltantes',
        progressText: 'Espere por favor...',
        width: 300,
        wait: {
            interval: 200
        }
    });
    storeCargarTrabajadoresFaltantesProcMensual.load({
        params: {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            count++;
            if(count == 2) {
                Ext.MessageBox.hide();
            }
            if(records != null) {
                if(records.length > 0) {
                    txtTraFaltante.setValue(records.length);
                    txtTraFaltante.setFieldStyle('background-color: '+rojo+'; background-image: none; color: white; font-weight: bold;');
                }else{
                    txtTraFaltante.setValue("0");
                    txtTraFaltante.setFieldStyle('background-color: '+verde+'; background-image: none; color: white; font-weight: bold;');
                }
            }
        }
    });

    storeCargarConceptosFaltantesProcMensual.load({
        params: {
            p_cod_emp: EMPRESA,
            p_proceso: param.PK_PROCESO,
            p_tipo: param.PK_TIPO,
        },
        callback: function(records, operation, success) {
            count++;
            if(count == 2) {
                Ext.MessageBox.hide();
            }
            if(records != null) {
                if(records.length > 0) {
                    txtConFaltante.setValue(records.length);
                    txtConFaltante.setFieldStyle('background-color: '+rojo+'; background-image: none; color: white; font-weight: bold;');
                }else{
                    txtConFaltante.setValue("0");
                    txtConFaltante.setFieldStyle('background-color: '+verde+'; background-image: none; color: white; font-weight: bold;');
                }
            }
        }
    });
}


var clickAgregarFaltantes = function() {
    var param = Ext.getCmp('MainProcesoMensualFaltante').myExtraParams.param2.data;
    
    Ext.MessageBox.confirm('Agregar Faltantes', '¿Esta seguro de agregar los faltantes al proceso mensual?', function(btn) {
        if (btn === 'yes') {
            Ext.MessageBox.show({
                msg: 'Cargando',
                progressText: 'Espere por favor...',
                width: 300,
                wait: {
                    interval: 200
                }
            });
            storeAgregarFaltantesProcMensual.load({
                params: {
                    p_cod_emp: EMPRESA,
                    p_proceso: param.PK_PROCESO,
                    p_tipo: param.PK_TIPO,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    Ext.MessageBox.hide();
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Faltantes cargados correctamente');
                            
                        }else{
                            Ext.MessageBox.show({
                                title: 'ADVERTENCIA',
                                msg: records[0].data.r_msg,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                    cargarFaltanteProcesoMensual();
                }
            });
        }
    });
}

var clickRefrescarTrabajador = function() {
    var param = Ext.getCmp('MainProcesoMensualFaltante').myExtraParams.param2.data;
    var txtRut = Ext.ComponentQuery.query('#MainProcesoMensualFaltante #txtRut')[0];
    console.log('RUT: ' +txtRut.getValue());
    if(txtRut.getValue() != null && txtRut.getValue() != '')
    {
        Ext.MessageBox.confirm(
            'Refrescar Trabajador', 
            '¿Esta seguro de refrescar el trabajador?<br>' 
                +'<b>Se borraran todos los valores de conceptos ingresados.</b>', function(btn) {
            if (btn === 'yes') {
                Ext.MessageBox.show({
                    msg: 'Cargando',
                    progressText: 'Espere por favor...',
                    width: 300,
                    wait: {
                        interval: 200
                    }
                });
                storeRefrescarTrabajadorProcMensual.load({
                    params: {
                        p_cod_emp: EMPRESA,
                        p_proceso: param.PK_PROCESO,
                        p_tipo: param.PK_TIPO,
                        p_usuario: NOMBRE,
                        p_rut: txtRut.value
                    },
                    callback: function(records, operation, success) {
                        Ext.MessageBox.hide();
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Faltantes cargados correctamente');
                                cargarFaltanteProcesoMensual();
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
        });
    }else{
        Ext.MessageBox.show({
            title: 'ADVERTENCIA',
            msg: 'El rut es requerido',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.Msg.OK
        });
    }
}


Ext.define('fcab.Container.PersonasProcesoMensual.ImportarExportarPersonasProcesoMensual', {
    extend: 'Ext.container.Container',
    xtype: 'ImportarExportarPersonasProcesoMensual',
    itemId: 'ImportarExportarPersonasProcesoMensual',
    border: false,
    frame: false,
    items: [{ 
        xtype: 'panel',
        width: '100%',
        margin: '10 0 10 0',
        title: "Exportar Archivo",
        border: true,
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        items: [{
            border: false,
            margin: '20 20 0 20',
            html: "<h3><b><i>Genera el archivo XLS con todos los conceptos del centro de costo seleccionado.</i></b></h3>"
        },{
            xtype: 'combo',
            name: 'cbCc',
            margin: '20 20 0 20',
            itemId: 'cbCc',
            displayField: 'DESC_CC',
            valueField: 'PK_COD_CC',
            store: storeCargarCCProcesoMensualPorUsuario,
            fieldLabel: 'Centro de Costo',
            labelAlign:'left',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            allowBlank: true,  
            readOnly: false,
            width: '100%'
        },{
            xtype:'button',
            text: 'Exportar',
            tooltip: 'Exporta Archivo',
            scale: 'large',
            margin: '20',
            columnWidth: .1,
            handler: function() {

                var param = Ext.getCmp('ImportarExportarPersonasProcesoMensual').myExtraParams.param2.data;
                var cc = Ext.ComponentQuery.query('#ImportarExportarPersonasProcesoMensual #cbCc')[0].value;
                if(cc) {
                    Ext.create('Ext.form.Panel', {
                        renderTo: Ext.getBody(),
                        standardSubmit: true,
                        url: host + 'procesoMensual/ProcesoMensualController/exportarProcesoMensualRRHH',
                        timeout : 300000,
                    }).submit({
                        timeout : 300000,
                        params: {
                            p_proceso : param.PK_PROCESO, //ESTACION,
                            p_tipo : param.PK_TIPO, 
                            p_cod_emp : EMPRESA, 
                            p_cod_cc : cc
                        },
                        target: 'Exportar' + '-form-iframe',
                    });
                }else{
                    Ext.MessageBox.show({
                        title: 'Exportar Archivo',
                        msg: 'Seleccione Centro de Costo',
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }

            }
        },]
    },{ 
        xtype: 'form',
        width: '100%',
        margin: '10 0 10 0',
        title: "Importar Archivo",
        border: true,
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        items: [{
            border: false,
            margin: '20 20 0 20',
            html: "<h3><b><i>Carga del archivo de conceptos</i></b></h3>"
        },{
            xtype: 'combo',
            name: 'cbCc2',
            margin: '20 20 0 20',
            itemId: 'cbCc2',
            displayField: 'DESC_CC',
            valueField: 'PK_COD_CC',
            store: storeCargarCCProcesoMensualPorUsuario,
            fieldLabel: 'Centro de Costo',
            labelAlign:'left',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            allowBlank: false,  
            readOnly: false,
            width: '100%'
        },{
            xtype: 'filefield',
            accept: '.xls',
            margin: '20 20 0 20',
            name: 'file',
            fieldLabel: 'Archivo XLS',
            msgTarget: 'side',
            allowBlank: false,
            width: '100%',
            buttonText: 'Seleccionar Archivo',
            
        },{
            xtype:'button',
            margin: '20',
            text: 'Importar',
            tooltip: 'Importar Archivo',
            scale: 'large',
            handler: function() {
                var param = Ext.getCmp('ImportarExportarPersonasProcesoMensual').myExtraParams.param2.data;
                var cc = Ext.ComponentQuery.query('#ImportarExportarPersonasProcesoMensual #cbCc2')[0].value;
                var form = this.up('form').getForm();
                if(form.isValid()) {
                    //console.log(form.getValues());
                    form.submit({
                        url: host + 'procesoMensual/ProcesoMensualController/importarProcesoMensual',
                        waitMsg: 'Importando archivo...',
                        timeout : 300000,
                        params: {
                            p_proceso : param.PK_PROCESO, 
                            p_tipo : param.PK_TIPO, 
                            p_cod_emp : EMPRESA, 
                            p_cod_cc : cc,
                            p_usuario : NOMBRE, 
                            
                        },
                        success: function (f, a) {

                            if(a.result.items.r_msg != null && a.result.items.r_msg == "OK") {
                                var param2 = Ext.getCmp('ImportarExportarPersonasProcesoMensual').myExtraParams.param2;
                                param2.data.p_cod_cc = cc;
                                ventanaDinamica("DetalleErroresImpotarProcesoMensual", "Detalle Importación", "1000", "", "DetalleErroresImpotarProcesoMensual", 1, 0, null, param2);
                            }else{
                                Ext.MessageBox.show({
                                    title: 'Importación fallida',
                                    msg: 'Problemas al cargar documento',
                                    icon: Ext.MessageBox.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure: function (f, a) {
                            console.log('failure');
                            console.log(a);
                            Ext.MessageBox.show({
                                title: 'Importación fallida',
                                msg: 'Problemas al cargar documento',
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                    
                    /*form.submit({
                        url: host + 'procesoMensual/ProcesoMensualController/importarProcesoMensual',
                        waitMsg: 'Importando archivo...',
                        success: function(fp, o) {
                            Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                        }
                    });*/
                }
            }
        }]
    
    }]
    
});
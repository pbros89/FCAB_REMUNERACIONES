Ext.define('fcab.Container.MainProcesoMensual.DetalleImportarExportar', {
    extend: 'Ext.container.Container',
    xtype: 'MainProcesoMensualDetalleImportarExportar',
    itemId: 'MainProcesoMensualDetalleImportarExportar',
    id: 'MainProcesoMensualDetalleImportarExportar',
    border: false,
    frame: false,
    scrollable: false,
    margin: '20',
    height: 565,
    layout:'vbox',
    items: [{ 
        xtype: 'panel',
        width: '100%',
        margin: '10 0 10 0',
        title: "Exportar Archivo",
        height: '250',
        border: true,
        layout: {
            type: 'vbox',
            align: 'middle',
            pack: 'center',
        },
        items: [{
            border: false,
            margin: '20 20 0 20',
            html: "<h3><b><i>Genera el archivo XLS con todos los conceptos que participan del proceso.</i></b></h3>"
        },{
            xtype:'button',
            text: 'Exportar',
            tooltip: 'Exporta el listado de conceptos de todas las personas',
            scale: 'large',
            margin: '20',
            columnWidth: .1,
            handler: function() {


                var param = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2.data;

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
                    },
                    target: 'Exportar' + '-form-iframe',
                });

            }
        },]
    },{ 
        xtype: 'form',
        width: '100%',
        margin: '10 0 10 0',
        title: "Importar Archivo",
        height: '250',
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
            tooltip: 'Importar planilla generada por el exportador',
            scale: 'large',
            handler: function() {
                var param = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2.data;
                var form = this.up('form').getForm();
                if(form.isValid()) {
                    //console.log(form.getValues());
                    form.submit({
                        url: host + 'procesoMensual/ProcesoMensualController/importarProcesoMensual',
                        waitMsg: 'Importando archivo...',
                        params: {
                            p_proceso : param.PK_PROCESO, 
                            p_tipo : param.PK_TIPO, 
                            p_cod_emp : EMPRESA, 
                        },
                        success: function (f, a) {

                            if(a.result.items.r_msg != null && a.result.items.r_msg == "OK") {
                                var param1 = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param1;
                                var param2 = Ext.getCmp('MainProcesoMensualDetalle').myExtraParams.param2;
                                ventanaDinamica("DetalleErroresImpotarProcesoMensual", "Detalle Importación", "1000", "", "DetalleErroresImpotarProcesoMensual", 1, 0, param1, param2);
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
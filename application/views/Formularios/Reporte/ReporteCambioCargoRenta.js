Ext.define("fcab.Container.ReporteCambioCargoRenta", {
    extend: 'Ext.container.Container',
    xtype: 'ReporteCambioCargoRenta',
    itemId: 'ReporteCambioCargoRenta',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
    
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        title: 'Cambios Cargo Renta Consolidado ('+NOM_EMPRESA+')',
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items:[{
            
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtFec1',
                labelAlign: 'left',
                anchor: '30%',  
                fieldLabel: 'Desde',
                itemId: 'dtFec1',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: false,
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtFec2',
                labelAlign: 'left',
                anchor: '30%',  
                fieldLabel: 'Hasta',
                itemId: 'dtFec2',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: false,
            }]
        }],
        buttons: [{
            tooltip: 'Genera excel según filtros de consulta',
            scale: 'large',
            text: 'Exportar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                values.p_cod_emp = EMPRESA;
                values.p_usuario = NOMBRE;
                console.log(values);
                if(form.isValid()) {
                    //console.log(form.getValues());
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                url: host + 'excelExport/ExcelExportController/cargarCambiarCargoRentaConsolidado',
                                timeout : 300000,
                            }).submit({
                                params: values,
                                target: 'ReporteCambioCargoRenta' + '-form-iframe',
                                timeout : 300000,
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

    }],
    

});


Ext.define("fcab.Container.ReporteAusentismo", {
    extend: 'Ext.container.Container',
    xtype: 'ReporteAusentismo',
    itemId: 'ReporteAusentismo',
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
        title: 'Ausentismo Consolidado ('+NOM_EMPRESA+')',
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
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            //console.log(form.getValues());
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                timeout : 300000,
                                url: host + 'excelExport/ExcelExportController/cargarAusentismoConsolidado'
                            }).submit({
                                params: values,
                                timeout : 300000,
                                target: 'ReporteAusentismo' + '-form-iframe',
                            });
                        }
                    });
                }
            }
        }]
    }],
});


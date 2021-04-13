Ext.define("fcab.Container.ReporteCierrePersonal", {
    extend: 'Ext.container.Container',
    xtype: 'ReporteCierrePersonal',
    itemId: 'ReporteCierrePersonal',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);

        var cbAnho = Ext.ComponentQuery.query('#ReporteCierrePersonal #cbAnho')[0];
        var cbMes = Ext.ComponentQuery.query('#ReporteCierrePersonal #cbMes')[0];

        var date = new Date();
        var yearIni = 2019;
        var year = date.getFullYear();
        var month = date.getMonth();
        var years = [];
        while(yearIni <= year){
            years.push({
                'VALOR' : yearIni
            });
            yearIni++;
        }


        cbAnho.getStore().loadData(years);
        cbAnho.setValue(year);
        cbMes.setValue(cbMes.getStore().getAt(month));
        storeCargarEmpresas.load({
            params: {
                p_estado: 'A'
            }
        });
    
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        title: 'Reporte Cierre Personal',
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
                xtype: 'combo',
                name: 'cbEmp',
                itemId: 'cbEmp',
                fieldLabel: 'Empresa',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                displayField: 'NOMBRE',
                valueField: 'PK_COD_EMP',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '30%',  
                allowBlank: false,
                store: storeCargarEmpresas,
                value: EMPRESA
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbAnho',
                itemId: 'cbAnho',
                fieldLabel: 'Año',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                displayField: 'VALOR',
                valueField: 'VALOR',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '30%',  
                allowBlank: false
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbMes',
                itemId: 'cbMes',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                store: storeExtras_cargarMeses,
                fieldLabel: 'Mes',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '30%',  
                allowBlank: false,      
            }]
        }, ],
        buttons: [{
            tooltip: 'Genera excel según filtros de consulta',
            scale: 'large',
            text: 'Exportar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                values.p_usuario = NOMBRE;
                console.log(values);
                if(form.isValid()) {
                    //console.log(form.getValues());
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                url: host + 'excelExport/ExcelExportController/cargarCierrePersonal',
                                timeout : 300000,
                            }).submit({
                                target: 'ReporteCierrePersonal' + '-form-iframe',
                                params: values,
                                timeout : 300000,
                            });
                        }
                    });
                }
            }
        }]

    }],
    

});


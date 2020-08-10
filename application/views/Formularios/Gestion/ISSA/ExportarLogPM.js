Ext.define('fcab.Container.ISSA.ExportarLogPM', {
    extend: 'Ext.form.Panel',
    xtype: 'ExportarLogPMISSA',
    itemId: 'ExportarLogPMISSA',
    border: false,
    padding: 5,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    listeners: {
        afterrender: function() {
            var cbEmp = Ext.ComponentQuery.query('#ExportarLogPMISSA #cbEmp')[0];
            storeCargarEmpresas.load({
                callback: function(records, operation, success) {
                    storeCargarEmpresas.insert(0, {"PK_COD_EMP":'', "NOMBRE": "TODOS"});
                    cbEmp.setValue('');
                }
            });
        }
    },
    items: [{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Periodo',
            labelAlign:'left',
            name: 'txtProceso',
            itemId: 'txtProceso',
            typeAhead: true,
            anchor: '100%',
            maxLength: 20,
            emptyText: 'formato: yyyy/mm',
            allowBlank: true,
            
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combobox',
            labelAlign:'left',
            fieldLabel: 'Empresa',
            displayField: 'NOMBRE',
            valueField: 'PK_COD_EMP',
            anchor: '100%',
            name: 'cbEmp',
            itemId: 'cbEmp',
            editable: true,
            readOnly: false,
            triggerAction: 'all',
            typeAhead: true,
            queryMode: 'local',
            forceSelection: true,
            selectOnFocus: true,
            allowBlank: false,
            value: '',
            store: storeCargarEmpresas  
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combobox',
            labelAlign:'left',
            fieldLabel: 'Tipo',
            displayField: 'NOMBRE',
            valueField: 'VALOR',
            anchor: '100%',
            name: 'cbTipo',
            itemId: 'cbTipo',
            editable: true,
            readOnly: false,
            triggerAction: 'all',
            typeAhead: true,
            queryMode: 'local',
            forceSelection: true,
            selectOnFocus: true,
            allowBlank: false,
            value: '',
            store: Ext.create('Ext.data.Store', {
                data: [
                    {
                        "NOMBRE": "TODOS",
                        "VALOR": ""
                    },
                    {
                        "NOMBRE": "PROCESO",
                        "VALOR": "PROCESO"
                    },
                    {
                        "NOMBRE": "REPROCESO",
                        "VALOR": "REPROCESO"
                    },
                    {
                        "NOMBRE": "RRHH",
                        "VALOR": "RRHH"
                    },                
                ]
            }),
            
        }]
    }],
    buttons: [{
        text: 'Limpiar',
        scale: 'small',
        width: 100,
        style: 'margin-right: 5px',
        handler: function () {
            Ext.ComponentQuery.query('#ExportarLogNovedadesISSA #cbTipo')[0].reset();
            Ext.ComponentQuery.query('#ExportarLogNovedadesISSA #dtFec1')[0].reset();
            Ext.ComponentQuery.query('#ExportarLogNovedadesISSA #dtFec1')[0].reset();
        }
    },{
        text: 'Exportar xls',
        scale: 'small',
        width: 100,
        handler: function () {
            var form = this.up('form').getForm();
            var values = form.getValues();
                console.log(values);
                if(form.isValid()) {
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            //console.log(form.getValues());
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                timeout : 300000,
                                url: host + 'issa/IssaController/crearXlsHistorialEnviosPMISSA'
                            }).submit({
                                params: values,
                                timeout : 300000,
                                target: 'ReporteLogEnvios' + '-form-iframe',
                            });
                        }
                    });
                }
        }
    }]

});

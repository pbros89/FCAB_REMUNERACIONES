Ext.define('fcab.Container.ISSA.ExportarLogNovedades', {
    extend: 'Ext.form.Panel',
    xtype: 'ExportarLogNovedadesISSA',
    itemId: 'ExportarLogNovedadesISSA',
    border: false,
    padding: 5,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    items: [{
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
                        "NOMBRE": "AUSENTISMO",
                        "VALOR": "AUSENTISMO"
                    },
                    {
                        "NOMBRE": "CAMBIO AFP",
                        "VALOR": "CAMBIO AFP"
                    },
                    {
                        "NOMBRE": "CAMBIO BONO",
                        "VALOR": "CAMBIO BONO"
                    },
                    {
                        "NOMBRE": "CAMBIO CARGO RENTA",
                        "VALOR": "CAMBIO CARGO RENTA"
                    },
                    {
                        "NOMBRE": "CAMBIO DEPOSITO",
                        "VALOR": "CAMBIO DEPOSITO"
                    },
                    {
                        "NOMBRE": "CAMBIO OTROS",
                        "VALOR": "CAMBIO OTROS"
                    },
                    {
                        "NOMBRE": "CAMBIO SALUD",
                        "VALOR": "CAMBIO SALUD"
                    },
                    {
                        "NOMBRE": "CAMBIO SINDICATO",
                        "VALOR": "CAMBIO SINDICATO"
                    },
                    {
                        "NOMBRE": "CONCEPTOS FINIQUITO",
                        "VALOR": "CONCEPTOS FINIQUITO"
                    },
                    {
                        "NOMBRE": "CONCEPTOS INGRESO PERSONAL",
                        "VALOR": "CONCEPTOS INGRESO PERSONAL"
                    },
                    {
                        "NOMBRE": "DESCUENTO RRLL",
                        "VALOR": "DESCUENTO RRLL"
                    },
                    {
                        "NOMBRE": "FINIQUITO",
                        "VALOR": "FINIQUITO"
                    },
                    {
                        "NOMBRE": "HABER RRLL",
                        "VALOR": "HABER RRLL"
                    },
                    {
                        "NOMBRE": "INGRESAR PERSONAL",
                        "VALOR": "INGRESAR PERSONAL"
                    },                    
                ]
            }),
            
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'datefield',
            name: 'dtFec1',
            labelAlign: 'left',
            anchor: '100%',  
            fieldLabel: 'Fecha Inicial',
            itemId: 'dtFec1',
            emptyText: 'yyyy/mm/dd',
            submitFormat: 'Y/m/d',
            format : 'Y/m/d',
            editable: true,
            allowBlank: true,
    
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'datefield',
            name: 'dtFec2',
            labelAlign: 'left',
            anchor: '100%',  
            fieldLabel: 'Fecha Final',
            itemId: 'dtFec2',
            emptyText: 'yyyy/mm/dd',
            submitFormat: 'Y/m/d',
            format : 'Y/m/d',
            editable: true,
            allowBlank: true,
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
                                url: host + 'issa/IssaController/crearXlsHistorialEnviosISSA'
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

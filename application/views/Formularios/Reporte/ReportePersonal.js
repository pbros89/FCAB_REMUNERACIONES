Ext.define("fcab.Container.ReportePersonal", {
    extend: 'Ext.container.Container',
    xtype: 'ReportePersonal',
    itemId: 'ReportePersonal',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
        
        var cbCC = Ext.ComponentQuery.query('#ReportePersonal #cbCC')[0];
        var cbCargo = Ext.ComponentQuery.query('#ReportePersonal #cbCargo')[0];
        storeCargarCargosFiltro.load({
            callback: function(records, operation, success) {
                storeCargarCargosFiltro.insert(0, {"CODIGO":'', "NOMBRE": "TODOS"});
                cbCargo.setValue('');
            }
        });

        storeCargarCentroCostosFiltro.load({
            callback: function(records, operation, success) {
                storeCargarCentroCostosFiltro.insert(0, {"CODIGO":'', "NOMBRE": "TODOS"});
                cbCC.setValue('');
            }
        })

    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        title: 'Maestro Personal ('+NOM_EMPRESA+')',
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
                name: 'cbCC',
                itemId: 'cbCC',
                displayField: 'NOMBRE',
                valueField: 'CODIGO',
                store: storeCargarCentroCostosFiltro,
                fieldLabel: 'Centro de Costo',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '30%',  
                allowBlank: false,  
                readOnly: false,  
                values: ''
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbCargo',
                itemId: 'cbCargo',
                displayField: 'NOMBRE',
                valueField: 'CODIGO',
                store: storeCargarCargosFiltro,
                fieldLabel: 'Cargo',
                labelAlign:'left',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '30%',  
                allowBlank: false,  
                readOnly: false,  
                values: ''
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            defaultType: 'checkbox',
            items: [{
                itemId: 'checkNoVig',
                //boxLabel: 'No Vigentes',
                fieldLabel: 'No Vigentes',
                labelAlign:'left',
                name: 'checkNoVig',
                inputValue: '0',
                checked: false,
                listeners: {
                    change: function(checkbox, newValue, oldValue, eOpts) {
                        var dtFecNoVig1 = Ext.ComponentQuery.query('#ReportePersonal #dtFecNoVig1')[0];
                        var dtFecNoVig2 = Ext.ComponentQuery.query('#ReportePersonal #dtFecNoVig2')[0];
                        if (newValue) {
                            dtFecNoVig1.show();
                            dtFecNoVig2.show();
                        } else {
                            dtFecNoVig1.hide();
                            dtFecNoVig2.hide();
                        }
                    }
                }
            },],
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtFecNoVig1',
                labelAlign: 'left',
                anchor: '30%',  
                fieldLabel: 'Desde',
                itemId: 'dtFecNoVig1',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: true,
                hidden: true
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtFecNoVig2',
                labelAlign: 'left',
                anchor: '30%',  
                fieldLabel: 'Hasta',
                itemId: 'dtFecNoVig2',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: true,
                hidden: true
            }]
        }],
        buttons: [{
            tooltip: 'Genera excel según filtros de consulta',
            scale: 'large',
            text: 'Exportar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                console.log(values);
                values.p_cod_emp = EMPRESA;
                values.p_usuario = NOMBRE;
                values.checkNoVig = values.checkNoVig == '0' ? 'SI' : 'NO'; 
                values.p_rol = ROL;
                if(form.isValid()) {
                    Ext.MessageBox.confirm('Exportar', 'El proceso puede demorarse varios segundos.<br> ¿Desea continuan?', function(btn) {
                        if (btn === 'yes') {
                            Ext.create('Ext.form.Panel', {
                                renderTo: Ext.getBody(),
                                standardSubmit: true,
                                url: host + 'excelExport/ExcelExportController/cargarPersonal',
                                timeout : 300000,
                                //waitMsg: 'Espere por favor...',
                            }).submit({
                                timeout : 300000,
                                params: values,
                                target: 'ReportePersonal' + '-form-iframe',
                            });
                        }
                    });
                    
                }
            }
        }]

    }],
});


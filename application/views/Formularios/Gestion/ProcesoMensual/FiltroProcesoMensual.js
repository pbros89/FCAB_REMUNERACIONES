/**
 * Limpiar Busqueda
 **/
Ext.define('fcab.Container.MainProcesoMensual.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MainProcesoMensualFiltro',
    itemId: 'MainProcesoMensualFiltro',
    border: false,
    padding: 5,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    listeners: {
        beforerender: function(){
            //storeCargarTipoTrenes.load();
            var dataForm = Ext.getCmp('MainProcesoMensualFiltro').myExtraParams.param2;
            var txtAnho = Ext.ComponentQuery.query('MainProcesoMensualFiltro #txtAnho')[0];
            var cbMes = Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbMes')[0];
            var cbTipo = Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbTipo')[0];
            var cbEstado = Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbEstado')[0];

            if(dataForm !== null && dataForm !== ""){
                
                txtAnho.setValue(dataForm.p_anho);
                cbMes.setValue(dataForm.p_mes);
                cbTipo.setValue(dataForm.p_tipo);
                cbEstado.setValue(dataForm.p_estado);

            }else{
                txtAnho.reset();
                cbMes.reset();
                cbTipo.reset();
                cbEstado.reset();
            }    
               
        }
    },
    items: [{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combobox',
            labelAlign:'top',
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
                    }
                ]
            }),
            
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'thousandnumber',
            itemId: 'txtAnho',
            name: 'txtAnho',
            forcePrecision: true,
            decimalPrecision: 0,
            allowDecimals: true,
            labelAlign:'top',
            fieldLabel: 'Año',
            anchor: '100%',
            allowBlank: true,
            maxValue: 9999,
            minValue: 0
            //value: recRow.data["DURACION"]
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combo',
            name: 'cbMes',
            itemId: 'cbMes',
            displayField: 'NOMBRE',
            valueField: 'VALOR',
            store: storeExtras_cargarMesesFiltro,
            fieldLabel: 'Mes',
            labelAlign:'top',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            anchor: '100%',  
            allowBlank: false,  
            value: ''    
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combobox',
            labelAlign:'top',
            fieldLabel: 'Estado',
            displayField: 'NOMBRE',
            valueField: 'VALOR',
            anchor: '100%',
            name: 'cbEstado',
            itemId: 'cbEstado',
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
                        "NOMBRE": "EN ESPERA",
                        "VALOR": "EN ESPERA"
                    },
                    {
                        "NOMBRE": "TERMINADO",
                        "VALOR": "TERMINADO"
                    }
                    
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
            Ext.ComponentQuery.query('MainProcesoMensualFiltro #txtAnho')[0].reset();
            Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbMes')[0].reset();
            Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbTipo')[0].reset();
            Ext.ComponentQuery.query('MainProcesoMensualFiltro #cbEstado')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MainProcesoMensualFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MainProcesoMensualFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtAnho !== "" || 
                    values.cbMes !== "" || 
                    values.cbTipo !== "" || 
                    values.cbEstado !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_anho : values.txtAnho, 
                    p_mes : values.cbMes, 
                    p_tipo : values.cbTipo,
                    p_estado : values.cbEstado
                }
                cargarMainProcesoMensual(filtros)
                Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MainProcesoMensualGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMainProcesoMensual(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MainProcesoMensualFiltro').destroy();
        }
    }]

});

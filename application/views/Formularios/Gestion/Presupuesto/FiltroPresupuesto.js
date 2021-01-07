/**
 * Limpiar Busqueda
 **/
Ext.define('fcab.Container.MainPresupuesto.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MainPresupuestoFiltro',
    itemId: 'MainPresupuestoFiltro',
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
            var dataForm = Ext.getCmp('MainPresupuestoFiltro').myExtraParams.param2;
            var txtAnho = Ext.ComponentQuery.query('MainPresupuestoFiltro #txtAnho')[0];
            var cbTipo = Ext.ComponentQuery.query('MainPresupuestoFiltro #cbTipo')[0];
            var cbEstado = Ext.ComponentQuery.query('MainPresupuestoFiltro #cbEstado')[0];

            if(dataForm !== null && dataForm !== ""){
                
                txtAnho.setValue(dataForm.p_anho);
                cbTipo.setValue(dataForm.p_tipo);
                cbEstado.setValue(dataForm.p_estado);

            }else{
                txtAnho.reset();
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
                        "NOMBRE": "PRINCIPAL",
                        "VALOR": "PRINCIPAL"
                    },
                    
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
            Ext.ComponentQuery.query('MainPresupuestoFiltro #txtAnho')[0].reset();
            Ext.ComponentQuery.query('MainPresupuestoFiltro #cbTipo')[0].reset();
            Ext.ComponentQuery.query('MainPresupuestoFiltro #cbEstado')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MainPresupuestoFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MainPresupuestoFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtAnho !== "" || 
                    values.cbTipo !== "" || 
                    values.cbEstado !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_anho : values.txtAnho, 
                    p_tipo : values.cbTipo,
                    p_estado : values.cbEstado
                }
                cargarMainPresupuesto(filtros)
                Ext.ComponentQuery.query('#MainPresupuestoGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MainPresupuestoGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMainPresupuesto(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MainPresupuestoFiltro').destroy();
        }
    }]

});

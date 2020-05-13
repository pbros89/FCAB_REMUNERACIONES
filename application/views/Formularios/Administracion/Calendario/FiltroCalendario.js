
Ext.define('fcab.Container.MasterCalendario.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterCalendarioFiltro',
    itemId: 'MasterCalendarioFiltro',
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
            var dataForm = Ext.getCmp('MasterCalendarioFiltro').myExtraParams.param2;
            var txtAnho = Ext.ComponentQuery.query('MasterCalendarioFiltro #txtAnho')[0];
            var txtMes = Ext.ComponentQuery.query('MasterCalendarioFiltro #txtMes')[0];
            var txtDia = Ext.ComponentQuery.query('MasterCalendarioFiltro #txtDia')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterCalendarioFiltro #cbEstado')[0];
            var cbTipo = Ext.ComponentQuery.query('MasterCalendarioFiltro #cbTipo')[0];

            if(dataForm !== null && dataForm !== ""){
                
                txtAnho.setValue(dataForm.p_anho);
                txtMes.setValue(dataForm.p_mes);
                txtDia.setValue(dataForm.p_dia);
                cbEstado.setValue(dataForm.p_estado);
                cbTipo.setValue(dataForm.p_tipo);

            }else{
                txtAnho.reset();
                txtMes.reset();
                txtDia.reset();
                cbEstado.reset();
                cbTipo.reset();
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
                        "NOMBRE": "FERIADO_ANUAL",
                        "VALOR": "FERIADO_ANUAL"
                    },
                    {
                        "NOMBRE": "FERIADO_UNICO",
                        "VALOR": "FERIADO_UNICO"
                    }
                    
                ]
            }),
            
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'textfield',
            //labelWidth: 50,
            itemId: 'txtAnho',
            fieldLabel: 'Año',
            labelAlign:'top',
            name: 'txtAnho',
            allowBlank: true,
            editable: true,
            anchor: '100%',
            maxLength: 4
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'textfield',
            //labelWidth: 50,
            itemId: 'txtMes',
            fieldLabel: 'Mes',
            labelAlign:'top',
            name: 'txtMes',
            allowBlank: true,
            editable: true,
            anchor: '100%',
            maxLength: 2
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'textfield',
            //labelWidth: 50,
            itemId: 'txtDia',
            fieldLabel: 'Día',
            labelAlign:'top',
            name: 'txtDia',
            allowBlank: true,
            editable: true,
            anchor: '100%',
            maxLength: 2
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
                        "NOMBRE": "ACTIVO",
                        "VALOR": "A"
                    },
                    {
                        "NOMBRE": "INACTIVO",
                        "VALOR": "I"
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
            Ext.ComponentQuery.query('MasterCalendarioFiltro #txtAnho')[0].reset();
            Ext.ComponentQuery.query('MasterCalendarioFiltro #txtMes')[0].reset();
            Ext.ComponentQuery.query('MasterCalendarioFiltro #txtDia')[0].reset();
            Ext.ComponentQuery.query('MasterCalendarioFiltro #cbEstado')[0].reset();
            Ext.ComponentQuery.query('MasterCalendarioFiltro #cbTipo')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterCalendarioFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterCalendarioFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.cbTipo !== "" || 
                    values.txtAnho !== "" || 
                    values.cbEstado !== "" ||
                    values.txtMes !== "" ||
                    values.txtDia !== "")
            {
                filtros = {
                    p_tipo : values.cbTipo,
                    p_anho : values.txtAnho, 
                    p_mes : values.txtMes,
                    p_estado : values.cbEstado,
                    p_dia : values.txtDia
                }
                Ext.ComponentQuery.query('#MasterCalendarioGrilla')[0].filtros = filtros;
                Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterCalendarioGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = filtros;
        
            }
            cargarMasterCalendario(filtros)
            
            Ext.getCmp('MasterCalendarioFiltro').destroy();
        }
    }]

});

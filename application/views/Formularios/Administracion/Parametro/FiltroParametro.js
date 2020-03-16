
Ext.define('fcab.Container.MasterParametro.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterParametroFiltro',
    itemId: 'MasterParametroFiltro',
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
            var dataForm = Ext.getCmp('MasterParametroFiltro').myExtraParams.param2;
            var txtId = Ext.ComponentQuery.query('MasterParametroFiltro #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('MasterParametroFiltro #txtNombre')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterParametroFiltro #cbEstado')[0];
            var cbTipo = Ext.ComponentQuery.query('MasterParametroFiltro #cbTipo')[0];


            storeCargarTiposParamFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarTiposParamFiltro.insert(0, {"PK_TIPO_PARAM":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                            cbTipo.setValue(dataForm.p_tipo);
                        }else{
                            cbTipo.reset();
                        }
                    }
                    
                }
            })

            if(dataForm !== null && dataForm !== ""){
                
                txtId.setValue(dataForm.p_param);
                txtNombre.setValue(dataForm.p_nombre);
                cbEstado.setValue(dataForm.p_estado);
                cbTipo.setValue(dataForm.p_tipo);

            }else{
                txtId.reset();
                txtNombre.reset();
                cbEstado.reset();
                cbTipo.reset();
            }    
               
        }
    },
    items: [{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'textfield',
            //labelWidth: 50,
            itemId: 'txtId',
            fieldLabel: 'ID',
            labelAlign:'top',
            name: 'txtId',
            allowBlank: true,
            editable: true,
            anchor: '100%',
            maxLength: 20
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin:0 5 5 5',
        items: [{
            xtype: 'textfield',
            //labelWidth: 50,
            itemId: 'txtNombre',
            fieldLabel: 'Nombre',
            labelAlign:'top',
            name: 'txtNombre',
            allowBlank: true,
            editable: true,
            anchor: '100%',
            maxLength: 200
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combo',
            name: 'cbTipo',
            itemId: 'cbTipo',
            displayField: 'NOMBRE',
            valueField: 'PK_TIPO_PARAM',
            store: storeCargarTiposParamFiltro,
            fieldLabel: 'Tipo',
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
            Ext.ComponentQuery.query('MasterParametroFiltro #txtId')[0].reset();
            Ext.ComponentQuery.query('MasterParametroFiltro #txtNombre')[0].reset();
            Ext.ComponentQuery.query('MasterParametroFiltro #cbEstado')[0].reset();
            Ext.ComponentQuery.query('MasterParametroFiltro #cbTipo')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterParametroFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterParametroFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtId !== "" || 
                    values.txtNombre !== "" || 
                    values.cbEstado !== "" ||
                    values.cbTipo !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_param : values.txtId, 
                    p_nombre : values.txtNombre,
                    p_estado : values.cbEstado,
                    p_tipo : values.cbTipo
                }
                Ext.ComponentQuery.query('#MasterParametroGrilla')[0].filtros = filtros;
                cargarMasterParametro(filtros)
                Ext.ComponentQuery.query('#MasterParametroGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterParametroGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMasterParametro(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MasterParametroFiltro').destroy();
        }
    }]

});

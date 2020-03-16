
Ext.define('fcab.Container.MasterCargo.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterCargoFiltro',
    itemId: 'MasterCargoFiltro',
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
            var dataForm = Ext.getCmp('MasterCargoFiltro').myExtraParams.param2;
            var txtId = Ext.ComponentQuery.query('MasterCargoFiltro #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('MasterCargoFiltro #txtNombre')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterCargoFiltro #cbEstado')[0];
            var cbRol = Ext.ComponentQuery.query('MasterCargoFiltro #cbRol')[0];

            storeCargarRolesCargoFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarRolesCargoFiltro.insert(0, {"PK_COD_ROL":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                            cbRol.setValue(dataForm.p_rol);
                        }else{
                            cbRol.reset();
                        }
                    }
                    
                }
            })

            if(dataForm !== null && dataForm !== ""){
                
                txtId.setValue(dataForm.p_cod_cargo);
                txtNombre.setValue(dataForm.p_nombre);
                cbEstado.setValue(dataForm.p_estado);
                cbRol.setValue(dataForm.p_rol);

            }else{
                txtId.reset();
                txtNombre.reset();
                cbEstado.reset();
                cbRol.reset();
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
            name: 'cbRol',
            itemId: 'cbRol',
            displayField: 'NOMBRE',
            valueField: 'PK_COD_ROL',
            store: storeCargarRolesCargoFiltro,
            fieldLabel: 'Rol',
            labelAlign:'top',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            anchor: '100%',  
            allowBlank: false  ,
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
            Ext.ComponentQuery.query('MasterCargoFiltro #txtId')[0].reset();
            Ext.ComponentQuery.query('MasterCargoFiltro #txtNombre')[0].reset();
            Ext.ComponentQuery.query('MasterCargoFiltro #cbEstado')[0].reset();
            Ext.ComponentQuery.query('MasterCargoFiltro #cbRol')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterCargoFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterCargoFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtId !== "" || 
                    values.txtNombre !== "" || 
                    values.cbEstado !== "" ||
                    values.cbRol !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_cod_cargo : values.txtId, 
                    p_nombre : values.txtNombre,
                    p_estado : values.cbEstado,
                    p_rol : values.cbRol
                }
                Ext.ComponentQuery.query('#MasterCargoGrilla')[0].filtros = filtros;
                Ext.ComponentQuery.query('#MasterCargoGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterCargoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = filtros;
        
            }
            cargarMasterCargo(filtros)
            
            Ext.getCmp('MasterCargoFiltro').destroy();
        }
    }]

});

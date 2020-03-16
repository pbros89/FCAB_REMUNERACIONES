
Ext.define('fcab.Container.MasterUsuario.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterUsuarioFiltro',
    itemId: 'MasterUsuarioFiltro',
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
            var dataForm = Ext.getCmp('MasterUsuarioFiltro').myExtraParams.param2;
            var txtUsuario = Ext.ComponentQuery.query('MasterUsuarioFiltro #txtUsuario')[0];
            var cbRol = Ext.ComponentQuery.query('MasterUsuarioFiltro #cbRol')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterUsuarioFiltro #cbEstado')[0];

            storeCargarRolesFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarRolesFiltro.insert(0, {"PK_ROL":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                
                            txtUsuario.setValue(dataForm.p_usuario);
                            cbRol.setValue(dataForm.p_rol);
                            cbEstado.setValue(dataForm.p_estado);
            
                        }else{
                            txtUsuario.reset();
                            cbRol.reset();
                            cbEstado.reset();
                        }
                    }
                    
                }
            })

            if(dataForm !== null && dataForm !== ""){
                
                txtUsuario.setValue(dataForm.p_usuario);
                cbRol.setValue(dataForm.p_rol);
                cbEstado.setValue(dataForm.p_estado);

            }else{
                txtUsuario.reset();
                cbRol.reset();
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
            xtype: 'textfield',
            fieldLabel: 'Usuario Intranet',
            labelAlign:'top',
            name: 'txtUsuario',
            itemId: 'txtUsuario',
            typeAhead: true,
            anchor: '100%',
            maxLength: 100,
            allowBlank: true,
            value: ''
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
            valueField: 'PK_ROL',
            store: storeCargarRolesFiltro,
            fieldLabel: 'Rol',
            labelAlign:'top',
            queryMode: 'local',
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            anchor: '100%',  
            allowBlank: true,
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
            allowBlank: true,
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
            Ext.ComponentQuery.query('MasterUsuarioFiltro #txtUsuario')[0].reset();
            Ext.ComponentQuery.query('MasterUsuarioFiltro #cbRol')[0].reset();
            Ext.ComponentQuery.query('MasterUsuarioFiltro #cbEstado')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterUsuarioFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterUsuarioFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;

            if(values.txtUsuario !== "" || 
                    values.cbRol !== "" || 
                    values.cbEstado !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_usuario : values.txtUsuario, 
                    p_rol : values.cbRol,
                    p_estado : values.cbEstado
                }
                Ext.ComponentQuery.query('#MasterUsuarioGrilla')[0].filtros = filtros;
                cargarMasterUsuario(filtros)
                Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterUsuarioGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMasterUsuario(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MasterUsuarioFiltro').destroy();
        }
    }]

});


Ext.define('fcab.Container.MasterConcepto.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterConceptoFiltro',
    itemId: 'MasterConceptoFiltro',
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
            var dataForm = Ext.getCmp('MasterConceptoFiltro').myExtraParams.param2;
            var txtId = Ext.ComponentQuery.query('MasterConceptoFiltro #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('MasterConceptoFiltro #txtNombre')[0];
            var cbGrupo = Ext.ComponentQuery.query('MasterConceptoFiltro #cbGrupo')[0];
            var cbTipoMes = Ext.ComponentQuery.query('MasterConceptoFiltro #cbTipoMes')[0];
            var cbTipo = Ext.ComponentQuery.query('MasterConceptoFiltro #cbTipo')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterConceptoFiltro #cbEstado')[0];

            storeCargarGrupoConceptosFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarGrupoConceptosFiltro.insert(0, {"PK_GRUPO_CONCEPTOS":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                            cbGrupo.setValue(dataForm.p_grupo);
                        }else{
                            cbGrupo.reset();
                        }
                    }
                    
                }
            });

            storeCargarTipoMesConceptosFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarTipoMesConceptosFiltro.insert(0, {"PK_TIPO_MES_CONCEPTO":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                            cbTipoMes.setValue(dataForm.p_tipo_mes);
                        }else{
                            cbTipoMes.reset();
                        }
                    }
                    
                }
            });

            storeCargarTipoConceptosFiltro.load({
                callback: function(records, operation, success) {
                    storeCargarTipoConceptosFiltro.insert(0, {"PK_TIPO_CONCEPTO":'', "NOMBRE": "TODOS"});
                    if(records != null) {
                        if(dataForm !== null && dataForm !== ""){
                            cbTipo.setValue(dataForm.p_tipo);
                        }else{
                            cbTipo.reset();
                        }
                    }
                    
                }
            });



            if(dataForm !== null && dataForm !== ""){
                
                txtId.setValue(dataForm.p_cod_concepto);
                txtNombre.setValue(dataForm.p_nombre);
                cbEstado.setValue(dataForm.p_estado);
            }else{
                txtId.reset();
                txtNombre.reset();
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
            xtype: 'combo',
            name: 'cbGrupo',
            itemId: 'cbGrupo',
            displayField: 'NOMBRE',
            valueField: 'PK_GRUPO_CONCEPTOS',
            store: storeCargarGrupoConceptosFiltro,
            fieldLabel: 'Grupo',
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
            xtype: 'textfield',
            fieldLabel: 'ID',
            labelAlign:'top',
            name: 'txtId',
            itemId: 'txtId',
            typeAhead: true,
            anchor: '100%',
            maxLength: 20,
            allowBlank: true,
            value: ''
        }]
    },{
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Nombre',
            labelAlign:'top',
            name: 'txtNombre',
            itemId: 'txtNombre',
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
            name: 'cbTipoMes',
            itemId: 'cbTipoMes',
            displayField: 'NOMBRE',
            valueField: 'PK_TIPO_MES_CONCEPTO',
            store: storeCargarTipoMesConceptosFiltro,
            fieldLabel: 'Periodo',
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
            xtype: 'combo',
            name: 'cbTipo',
            itemId: 'cbTipo',
            displayField: 'NOMBRE',
            valueField: 'PK_TIPO_CONCEPTO',
            store: storeCargarTipoConceptosFiltro,
            fieldLabel: 'Tipo',
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
            Ext.ComponentQuery.query('MasterConceptoFiltro #txtId')[0].reset();
            Ext.ComponentQuery.query('MasterConceptoFiltro #txtNombre')[0].reset();
            Ext.ComponentQuery.query('MasterConceptoFiltro #cbGrupo')[0].reset();
            Ext.ComponentQuery.query('MasterConceptoFiltro #cbTipoMes')[0].reset();
            Ext.ComponentQuery.query('MasterConceptoFiltro #cbTipo')[0].reset();
            Ext.ComponentQuery.query('MasterConceptoFiltro #cbEstado')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterConceptoFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterConceptoFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;

            if(values.txtId !== "" || 
                    values.txtNombre !== "" || 
                    values.cbEstado !== "" ||
                    values.cbGrupo !== "" ||
                    values.cbTipoMes  !== "" ||
                    values.cbTipo !== "")
            {
                filtros = {
                    p_cod_concepto : values.txtId,
                    p_cod_emp : EMPRESA,
                    p_nombre : values.txtNombre,
                    p_grupo: values.cbGrupo,
                    p_tipo: values.cbTipo,
                    p_tipo_mes: values.cbTipoMes,
                    p_estado: values.cbEstado
                }
                Ext.ComponentQuery.query('#MasterConceptoGrilla')[0].filtros = filtros;
                Ext.ComponentQuery.query('#MasterConceptoGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterConceptoGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = filtros;
            }
            cargarMasterConcepto(filtros);
           
        
            Ext.getCmp('MasterConceptoFiltro').destroy();
        }
    }]

});

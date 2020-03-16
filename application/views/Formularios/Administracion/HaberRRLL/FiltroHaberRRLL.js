/**
 * Limpiar Busqueda
 **/
Ext.define('fcab.Container.MasterHaberRRLL.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MasterHaberRRLLFiltro',
    itemId: 'MasterHaberRRLLFiltro',
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
            var dataForm = Ext.getCmp('MasterHaberRRLLFiltro').myExtraParams.param2;
            var txtId = Ext.ComponentQuery.query('MasterHaberRRLLFiltro #txtId')[0];
            var txtNombre = Ext.ComponentQuery.query('MasterHaberRRLLFiltro #txtNombre')[0];
            var cbEstado = Ext.ComponentQuery.query('MasterHaberRRLLFiltro #cbEstado')[0];
            if(dataForm !== null && dataForm !== ""){
                
                txtId.setValue(dataForm.p_cod_cc);
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
            Ext.ComponentQuery.query('MasterHaberRRLLFiltro #txtId')[0].reset();
            Ext.ComponentQuery.query('MasterHaberRRLLFiltro #txtNombre')[0].reset();
            Ext.ComponentQuery.query('MasterHaberRRLLFiltro #cbEstado')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MasterHaberRRLLFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MasterHaberRRLLFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtId !== "" || 
                    values.txtNombre !== "" || 
                    values.cbEstado !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_cod : values.txtId, 
                    p_nombre : values.txtNombre,
                    p_estado : values.cbEstado
                }
                Ext.ComponentQuery.query('#MasterHaberRRLLGrilla')[0].filtros = filtros;
                cargarMasterHaberRRLL(filtros)
                Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MasterHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMasterHaberRRLL(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MasterHaberRRLLFiltro').destroy();
        }
    }]

});

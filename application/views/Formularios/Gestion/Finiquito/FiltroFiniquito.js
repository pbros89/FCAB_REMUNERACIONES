
Ext.define('fcab.Container.MainFiniquito.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MainFiniquitoFiltro',
    itemId: 'MainFiniquitoFiltro',
    border: false,
    padding: 5,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    listeners: {
        beforerender: function(){
            var dataForm = Ext.getCmp('MainFiniquitoFiltro').myExtraParams.param2;
            var txtRut = Ext.ComponentQuery.query('MainFiniquitoFiltro #txtRut')[0];
            var dtFec1 = Ext.ComponentQuery.query('MainFiniquitoFiltro #dtFec1')[0];
            var dtFec2 = Ext.ComponentQuery.query('MainFiniquitoFiltro #dtFec2')[0];
            var cbEstado = Ext.ComponentQuery.query('MainFiniquitoFiltro #cbEstado')[0];


            if(dataForm !== null && dataForm !== ""){
                
                txtRut.setValue(dataForm.p_rut);
                dtFec1.setValue(dataForm.p_fec1);
                dtFec2.setValue(dataForm.p_fec2);
                cbEstado.setValue(dataForm.p_estado);

            }else{
                txtRut.reset();
                dtFec1.reset();
                dtFec2.reset();
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
            xtype: 'thousandnumber',
            style: 'margin: 0 10px 5px 0',
            itemId: 'txtRut',
            name: 'txtRut',
            forcePrecision: true,
            decimalPrecision: 0,
            allowDecimals: false,
            labelAlign:'left',
            fieldLabel: 'Rut',
            width: '100%',
            allowBlank: true,
            maxValue: 999999999,
            minValue: 0
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
            fieldLabel: 'Desde',
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
            fieldLabel: 'Hasta',
            itemId: 'dtFec2',
            emptyText: 'yyyy/mm/dd',
            submitFormat: 'Y/m/d',
            format : 'Y/m/d',
            editable: true,
            allowBlank: true,
        }]
    }, {
        xtype: 'container',
        columnWidth: 1,
        layout: 'anchor',
        style: 'margin: 0 5 5 5',
        items: [{
            xtype: 'combobox',
            labelAlign:'left',
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
            Ext.ComponentQuery.query('MainFiniquitoFiltro #txtRut')[0].reset();
            Ext.ComponentQuery.query('MainFiniquitoFiltro #dtFec1')[0].reset();
            Ext.ComponentQuery.query('MainFiniquitoFiltro #dtFec1')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MainFiniquitoFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MainFiniquitoFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtRut !== "" || 
                    values.dtFec2 !== "" || 
                    values.dtFec1 !== "" ||
                    values.p_estado !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_rut : values.txtRut, 
                    p_fec1 : values.dtFec1,
                    p_fec2 : values.dtFec2,
                    p_estado: values.cbEstado
                }
                cargarMainFiniquito(filtros)
                Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MainFiniquitoGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMainFiniquito(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MainFiniquitoFiltro').destroy();
        }
    }]

});


Ext.define('fcab.Container.MainIngHaberRRLL.Filtro', {
    extend: 'Ext.form.Panel',
    xtype: 'MainIngHaberRRLLFiltro',
    itemId: 'MainIngHaberRRLLFiltro',
    border: false,
    padding: 5,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    listeners: {
        beforerender: function(){
            var dataForm = Ext.getCmp('MainIngHaberRRLLFiltro').myExtraParams.param2;
            var txtRut = Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #txtRut')[0];
            var dtFec1 = Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #dtFec1')[0];
            var dtFec2 = Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #dtFec2')[0];


            if(dataForm !== null && dataForm !== ""){
                
                txtRut.setValue(dataForm.p_rut);
                dtFec1.setValue(dataForm.p_fec1);
                dtFec2.setValue(dataForm.p_fec2);

            }else{
                txtRut.reset();
                dtFec1.reset();
                dtFec2.reset();
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
            fieldLabel: 'Fecha Inicial',
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
            fieldLabel: 'Fecha Final',
            itemId: 'dtFec2',
            emptyText: 'yyyy/mm/dd',
            submitFormat: 'Y/m/d',
            format : 'Y/m/d',
            editable: true,
            allowBlank: true,
        }]
    }],
    buttons: [{
        text: 'Limpiar',
        scale: 'small',
        width: 100,
        style: 'margin-right: 5px',
        handler: function () {
            Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #txtRut')[0].reset();
            Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #dtFec1')[0].reset();
            Ext.ComponentQuery.query('MainIngHaberRRLLFiltro #dtFec1')[0].reset();
        }
    },{
        text: 'Filtrar',
        scale: 'small',
        width: 100,
        handler: function () {
            var grid = Ext.getCmp('MainIngHaberRRLLFiltro').myExtraParams.param1;
            var param = Ext.getCmp('MainIngHaberRRLLFiltro').myExtraParams.param2;
            var form = this.up('form').getForm(); //Obtenemos el formulario actual
            var values = form.getValues();
            var filtros = null;
            console.log(values);
            if(values.txtRut !== "" || 
                    values.dtFec2 !== "" || 
                    values.dtFec1 !== "")
            {
                filtros = {
                    p_cod_emp : EMPRESA,
                    p_rut : values.txtRut, 
                    p_fec1 : values.dtFec1,
                    p_fec2 : values.dtFec2
                }
                cargarMainIngHaberRRLL(filtros)
                Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnLimFiltro')[0].setHidden(false);
            }else{
                Ext.ComponentQuery.query('#MainIngHaberRRLLGrilla #btnLimFiltro')[0].setHidden(true);
                cargarMainIngHaberRRLL(null);
            }
            grid.filtros = filtros;
        
            Ext.getCmp('MainIngHaberRRLLFiltro').destroy();
        }
    }]

});

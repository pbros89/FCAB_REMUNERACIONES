Ext.define('fcab.Container.MainFiniquito.DetalleGeneral', {
    extend: 'Ext.form.Panel',
    xtype: 'MainFiniquitoDetalleGeneral',
    itemId: 'MainFiniquitoDetalleGeneral',
    autoScroll: true,
    layout: {
        type: 'column',
        align: "stretch",
        pack: 'center'
    },
    border: false,
    
    listeners: {
        afterrender: function(){
            
        }
    },
    items: [{
            
        xtype: 'fieldset',
        title: 'Trabajador',
        style: 'margin: 0 10px 5px 10px',
        columnWidth: 1,
        layout: {
            type: 'column',
            align: 'strech'
        },

        items: [{
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtRut',
                name: 'txtRut',
                labelAlign:'top',
                fieldLabel: 'Rut',
                anchor: '100%',
                typeAhead: true,
                maxLength: 20,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        },{
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtNombre',
                name: 'txtNombre',
                labelAlign:'top',
                fieldLabel: 'Nombre',
                anchor: '100%',
                typeAhead: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        }, {
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtCC',
                name: 'txtCC',
                labelAlign:'top',
                fieldLabel: 'Centro Costo',
                anchor: '100%',
                typeAhead: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        }, {
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtCargo',
                name: 'txtCargo',
                labelAlign:'top',
                fieldLabel: 'Cargo',
                anchor: '100%',
                typeAhead: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        }, {
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtIngreso',
                name: 'txtIngreso',
                labelAlign:'top',
                fieldLabel: 'Fecha Ingreso',
                anchor: '100%',
                typeAhead: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        }],
    }, {
        xtype: 'fieldset',
        title: 'Finiquito',
        style: 'margin: 0 10px 10px 10px',
        columnWidth: 1,
        layout: {
            type: 'column',
            align: 'strech'
        },

        items: [{
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtID',
                name: 'txtID',
                labelAlign:'top',
                fieldLabel: 'ID',
                anchor: '100%',
                typeAhead: true,
                maxLength: 20,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        },{
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combo',
                name: 'cbCausal',
                itemId: 'cbCausal',
                displayField: 'NOMBRE',
                valueField: 'CODIGO',
                store: storeCargarParam_CAUSAL_DESPIDO,
                fieldLabel: 'Causal',
                labelAlign:'top',
                queryMode: 'local',
                triggerAction: 'all',
                editable: true,
                typeAhead: true,
                selectOnFocus: true,
                forceSelection: true,
                anchor: '100%',  
                allowBlank: false,  
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',

            }]
        },{
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'datefield',
                name: 'dtBaja',
                labelAlign: 'top',
                anchor: '100%',  
                fieldLabel: 'Fecha Baja',
                itemId: 'dtBaja',
                emptyText: 'yyyy/mm/dd',
                submitFormat: 'Y/m/d',
                format : 'Y/m/d',
                editable: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',

            },]
            
        }, {
            xtype: 'container',
            columnWidth: .5,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textfield',
                itemId: 'txtEstado',
                name: 'txtEstado',
                labelAlign:'top',
                fieldLabel: 'Estado',
                anchor: '100%',
                typeAhead: true,
                allowBlank: false,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        },{
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'textareafield',
                itemId: 'txtObs',
                name: 'txtObs',
                labelAlign:'top',
                fieldLabel: 'Observación',
                anchor: '100%',
                typeAhead: true,
                allowBlank: true,
                maxLength: 1000,
                readOnly: true,
                fieldStyle: 'background-color: #d8d8d8; background-image: none;',
            }]
        },]
    }],
    //buttonAlign: 'center',
    
});

Ext.define("fcab.Container.DetalleCambioBonoInfo", {
    extend: 'Ext.container.Container',
    xtype: 'DetalleCambioBonoInfo',
    itemId: 'DetalleCambioBonoInfo',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('DetalleCambioBono').myExtraParams.param2.data;

            storeCargarPersonalFiniquito.load({
                params : {
                    p_rut : param.RUT
                    , p_cod_emp: EMPRESA
                    
                },
                callback: function(records, operation, success) {
                    var txtRutOld = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtRutOld')[0];
                    var txtCC = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtCC')[0];
                    var txtCargo = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtCargo')[0];
                    var txtNombre = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtNombre')[0];
                    var txtIngreso = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtIngreso')[0];
                    var txtObs = Ext.ComponentQuery.query('#DetalleCambioBonoInfo #txtObs')[0];

                    if(records != null && records.length > 0) {
                        

                        txtRutOld.setValue(records[0].data.RUT);
                        txtCC.setValue(records[0].data.COD_CC+'-'+records[0].data.NOM_CC);
                        txtCargo.setValue(records[0].data.NOM_CARGO);
                        txtNombre.setValue(records[0].data.NOMBRE);
                        txtIngreso.setValue(records[0].data.FECHA_INGRESO_FORMAT);
                        txtObs.setValue(param.OBSERVACION);

                    }else{
                        txtRutOld.reset();
                        txtCC.reset();
                        txtCargo.reset();
                        txtNombre.reset();
                        txtIngreso.reset();
                        txtObs.reset();
                        
                        Ext.MessageBox.show({
                            title: 'ADVERTENCIA',
                            msg: "No se encontro personal con el RUT ingresado",
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                        
                    }
                    
                }
            });
        }
    },
    items: [{
        xtype: 'form',
        itemId: 'formInfo',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        autoScroll: true,
        height: 600, 
        layout: {
            type: 'column',
            align: 'strech'
        },
        
        items:[{
            
            xtype: 'fieldset',
            title: 'Información Personal',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtRutOld',
                    name: 'txtRutOld',
                    labelAlign:'top',
                    fieldLabel: 'Rut',
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
                columnWidth: 1,
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
            }]
        }],
        

    }],
    

});
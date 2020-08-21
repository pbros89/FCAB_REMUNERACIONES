Ext.define('fcab.Container.CrearContactoEmergencia', {
    extend: 'Ext.container.Container',
    xtype: 'CrearContactoEmergencia',
    itemId: 'CrearContactoEmergencia',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items: [{
            xtype: 'container',
            columnWidth: 1,
            layout: {
                type: 'hbox',
                align: 'bottom',
                //pack: 'end',
            },
            items: [{
                xtype: 'thousandnumber',
                style: 'margin: 0 10px 5px 0',
                itemId: 'txtRut',
                name: 'txtRut',
                forcePrecision: true,
                decimalPrecision: 0,
                allowDecimals: false,
                labelAlign:'top',
                fieldLabel: 'Rut',
                width: '150',
                allowBlank: false,
                minValue: 0
            },{
                xtype: 'textfield',
                style: 'margin: 0 10px 5px 0',
                itemId: 'txtDV',
                name: 'txtDV',
                labelAlign:'top',
                fieldLabel: 'DV',
                width: '50',
                typeAhead: true,
                maxLength: 1,
                allowBlank: false
            },{
                xtype: 'button',
                style: 'margin: 0 10px 5px 0',
                text:'Validar',
                handler: function() {
                    var txtRut = Ext.ComponentQuery.query('#CrearContactoEmergencia #txtRut')[0].getValue();
                    var txtDV = Ext.ComponentQuery.query('#CrearContactoEmergencia #txtDV')[0].getValue();
                    var txtValidar = Ext.ComponentQuery.query('#CrearContactoEmergencia #txtValidar')[0];

                    if(txtRut != null && txtRut != '' && 
                    txtDV != null && txtDV != '') {
                        storeCargarPersonalFiniquito.load({
                            params : {
                                p_rut : txtRut + '-' + txtDV
                                , p_cod_emp: EMPRESA
                                
                            },
                            callback: function(records, operation, success) {

                                if(records != null && records.length > 0) {
                                    txtValidar.setHtml('<span style="color:green"><b>Correcto</b></span>');

                                }else{
                                    txtValidar.setHtml('<span style="color:red"><b>No existe</b></span>');
                                }
                                
                            }
                        });
                    }else{
                        Ext.MessageBox.show({
                            title: 'ADVERTENCIA',
                            msg: "Los campos RUT y DV son requeridos",
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },{
                itemId:'txtValidar',
                border: false,
                style: 'margin: 0 10px 5px 0',
                width: '20%',
                html: '<span><b>Falta Validar</b></span>'
            }]
        },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre Contacto',
                    labelAlign:'top',
                    name: 'txtNombre',
                    itemId: 'txtNombre',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 100,
                    allowBlank: false,
                    
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    vtype: 'email',
                    itemId: 'txtCorreo',
                    name: 'txtCorreo',
                    labelAlign:'top',
                    fieldLabel: 'Correo Contacto',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 500,
                    allowBlank: true
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtTelefono',
                    name: 'txtTelefono',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Teléfono Contacto',
                    anchor: '100%',
                    allowBlank: true,
                    minValue: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtCelular',
                    name: 'txtCelular',
                    forcePrecision: true,
                    decimalPrecision: 0,
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Celular Contacto',
                    anchor: '100%',
                    allowBlank: true,
                    minValue: 0
                }]
            },],
            buttons: [{
            text: 'Crear',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;

                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    //console.log(values);
                    if(values.txtCorreo != '' || values.txtCelular != '' || values.txtTelefono != '') { 

                        Ext.MessageBox.show({
                            msg: 'Cargando',
                            progressText: 'Espere por favor...',
                            width: 300,
                            wait: {
                                interval: 200
                            }
                        });
                        storeCrearContactoEmergencia.load({
                            params : {
                                p_rut: values.txtRut + "-" + values.txtDV,
                                p_cod_emp: EMPRESA,
                                p_nombre: values.txtNombre,
                                p_correo: values.txtCorreo,
                                p_usuario: NOMBRE,
                                p_celular: values.txtCelular,
                                p_telefono: values.txtTelefono,
                            },
                            callback: function(records, operation, success) {
                                Ext.MessageBox.hide();
                                if(records != null) {
                                    if(records[0].data.r_msg == 'OK'){
                                        showToast('Contacto creado correctamente.');
                                        cargarMainContactoEmergenciaRut(values.txtRut, values.txtDV);
                                        Ext.getCmp('CrearContactoEmergencia').destroy();
                                    }else{
                                        Ext.MessageBox.show({
                                            title: 'ADVERTENCIA',
                                            msg: records[0].data.r_msg,
                                            icon: Ext.MessageBox.WARNING,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }
                                
                            }
                        });
                    }else{
                        Ext.MessageBox.show({
                            title: 'ADVERTENCIA',
                            msg: 'Debe ingresar al menos un medio de contacto (Correo o Celular o Telefono)',
                            icon: Ext.MessageBox.WARNING,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        }]
    }]
        
});
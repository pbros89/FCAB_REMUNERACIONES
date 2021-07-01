Ext.define('fcab.Container.MasterReajuste.Crear', {
    extend: 'Ext.container.Container',
    xtype: 'MasterReajusteCrear',
    itemId: 'MasterReajusteCrear',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    listeners: {
        afterrender: function () {
            storeEliminarReajusteIngAll.load({
                params: {
                    p_usuario: NOMBRE,
                },
                callback: function () {
                    storeCargarReajusteIgnorados.load({
                        params: {
                            p_usuario: NOMBRE,
                        },
                    });
                }
            });
            storeCargarPersonalVigentePorPrivilegioUsuario.load({
                params: {
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE,
                    p_rol: ROL,
                },
            });
        }
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'hbox',
            align: 'strech'
        },
        items: [{
            xtype: 'fieldset',
            title: 'Reajuste',
            flex: 2,
            margin: '0 10px 0 0',
            defaults: {
                width: '100%'
            },
            layout: {
                type: 'vbox',
                align: 'strech'
            },
            items: [{

                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'thousandnumber',
                    name: 'txtFactor',
                    fieldLabel: 'Factor',
                    labelAlign: 'top',
                    maxValue: 99999999,
                    minValue: -999999,
                    allowBlank: false,
                    decimalPrecision: 4,
                }]
            }, {
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    labelAlign: 'top',
                    name: 'txtNombre',
                    itemId: 'txtNombre',
                    typeAhead: true,
                    anchor: '100%',
                    maxLength: 500,
                    allowBlank: false
                }]
            }, /*{
                xtype: 'fieldset',
                title: 'Valores',
                columnWidth: 1,
                defaultType: 'checkbox',
                defaults: {
                    anchor: '100%'
                },

                items: [{
                    boxLabel: 'Sueldo',
                    name: 'box_sueldo',
                    checked: true,
                    disabled: true
                }]
            },*/],
        }, {

            xtype: 'fieldset',
            title: 'Ignorar',
            flex: 3,

            defaults: {
                width: '100%'
            },
            layout: {
                type: 'vbox',
                align: 'strech'
            },
            items: [{
                xtype: "container",
                style: "margin: 0 10px 10px 0",
                layout: {
                    type: "hbox",
                    align: "bottom",
                    //pack: "end",
                },
                items: [
                    {
                        xtype: "combo",
                        name: "cbTrabajador",
                        itemId: "cbTrabajador",
                        displayField: "INFO",
                        valueField: "PK_PERSONAL",
                        store: storeCargarPersonalVigentePorPrivilegioUsuario,
                        fieldLabel: "Trabajador",
                        labelAlign: "top",
                        queryMode: "local",
                        triggerAction: "all",
                        flex: 1,
                        editable: true,
                        typeAhead: true,
                        selectOnFocus: true,
                        forceSelection: true,
                        allowBlank: false,
                        readOnly: false,
                    },
                    {
                        xtype: 'button',
                        margin: '0 0 0 10',
                        text: "Ignorar",
                        handler: function () {
                            var form = this.up("form").getForm(); //Obtenemos el formulario actual
                            var values = form.getValues();
                            var cbTrabajador = Ext.ComponentQuery.query('#MasterReajusteCrear #cbTrabajador')[0];

                            if (cbTrabajador.getValue()) {
                                storeCrearReajusteIng.load({
                                    params: {
                                        p_id_personal: cbTrabajador.getValue(),
                                        p_usuario: NOMBRE
                                    },
                                    callback: function (records, operation, success) {
                                        storeCargarReajusteIgnorados.load({
                                            params: {
                                                p_usuario: NOMBRE,
                                            },
                                        });
                                        if (records != null) {
                                            if (records[0].data.r_msg != 'OK') {
                                                Ext.MessageBox.show({
                                                    title: 'ADVERTENCIA',
                                                    msg: records[0].data.r_msg,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.Msg.OK
                                                });
                                            }
                                        }


                                    }
                                })
                            } else {
                                Ext.MessageBox.show({
                                    title: 'ADVERTENCIA',
                                    msg: "Seleccione trabajador",
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    }
                ],
            }, {
                xtype: 'MasterReajusteCrearIgnoradosGrid'
            }],
        }],
        buttons: [{
            text: 'Agregar Factor',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    console.log(values);

                    var params = {
                        p_valor: values.txtFactor,
                        p_nombre: values.txtNombre,
                        p_cod_emp: EMPRESA,
                        p_in_sueldo: 1,
                        p_in_bono: 0,
                        p_usuario: NOMBRE
                    }

                    ventanaDinamica("MasterReajusteGrillaFactor", "Simulación Factor Reajuste", "800", "", "MasterReajusteGrillaFactor", 1, 0, params);

                }
            }
        }]
    },]

});


Ext.define("fcab.Container.MasterReajusteCrearIgnoradosGrid", {
    extend: "Ext.grid.Panel",
    xtype: "MasterReajusteCrearIgnoradosGrid",
    itemId: "MasterReajusteCrearIgnoradosGrid",
    columnLines: true,
    emptyText: "Sin datos para mostrar",
    width: "100%",
    height: 200,
    store: storeCargarReajusteIgnorados,
    columns: [

        {
            text: "Rut",
            sortable: true,
            dataIndex: "RUT",
            hidden: false,
            width: 120
        },
        {
            text: "Nombre",
            sortable: true,
            dataIndex: "NOMBRE",
            hidden: false,
            flex: 1
        },
        {
            xtype: "actioncolumn",
            text: "",
            width: 30,
            items: [
                {
                    iconCls: "icon-form-delete",
                    tooltip: "Borrar",
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);


                        var ewin = Ext.WindowManager.getActive();
                        if (ewin) {
                            storeEliminarReajusteIng.load({
                                params: {
                                    p_id_personal: rec.data.PK_PERSONAL,
                                    p_usuario: NOMBRE,
                                },
                                callback: function (records, operation, success) {
                                    storeCargarReajusteIgnorados.load({
                                        params: {
                                            p_usuario: NOMBRE,
                                        },
                                    });
                                },
                            });
                        }

                    },
                }]
        }
    ],

});

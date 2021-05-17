Ext.define("fcab.Container.MasterTarifario.GrillaEditar", {
    extend: "Ext.grid.Panel",
    xtype: "MasterTarifarioGrillaEditar",
    itemId: "MasterTarifarioGrillaEditar",
    store: storeCargarTarifas,
    columnLines: true,
    emptyText: "Sin datos para mostrar",
    filtros: null,
    plugins: pluginFactory(),
    width: "100%",
    height: 450,
    viewConfig: {
        stripeRows: true,
    },
    columns: [{
        xtype: "actioncolumn",
        text: "",
        width: 30,
        items: [
            {
                iconCls: "icon-form-delete",
                tooltip: "Borrar tarifa",
                handler: function (grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);

                    Ext.MessageBox.confirm(
                        "Borrar Tarifa",
                        "¿Esta seguro de borrar la tarifa?",
                        function (btn) {
                            if (btn === "yes") {

                                storeEliminarTarifa.load({
                                    params: {
                                        p_nro_solicitud: rec.data.NRO_SOLICITUD,
                                        p_usuario: NOMBRE,
                                    },
                                    callback: function (records, operation, success) {
                                        if (records != null) {
                                            if (records[0].data.r_msg == "OK") {
                                                showToast("Tarifa borrada correctamente");

                                                cargarMasterTarifario();

                                            } else {
                                                Ext.MessageBox.show({
                                                    title: "ADVERTENCIA",
                                                    msg: records[0].data.r_msg,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.Msg.OK,
                                                });
                                            }
                                        }
                                    },
                                });

                            }
                        }
                    );
                },
            },
        ],
    },
    {
        text: "Nro Solicitud",
        sortable: true,
        dataIndex: "NRO_SOLICITUD",
        //align: 'center',
        hidden: false,
        width: 80,
    },
    {
        text: "Rut",
        sortable: true,
        dataIndex: "RUT",
        //align: 'center',
        hidden: false,
        width: 100,
    },
    {
        text: "Razón Social",
        sortable: true,
        dataIndex: "RAZON_SOCIAL",
        //align: 'center',
        hidden: false,
        width: 200,
    },
    {
        text: "Id Ruta",
        sortable: true,
        dataIndex: "ID_RUTA",
        width: 100,
        editable: true,
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: 1,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("ID_RUTA", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },
    {
        text: "Servicio",
        sortable: true,
        dataIndex: "SERVICIO",
        width: 100,
        editable: true,
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }


            fieldType = "textfield";
            return {
                xtype: fieldType,
                typeAhead: true,
                maxLength: 1000,
                allowBlank: false,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("SERVICIO", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Bono Con",
        sortable: true,
        dataIndex: "BONO_CONDUCTOR",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("BONO_CONDUCTOR", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Bono Con Sec",
        sortable: true,
        dataIndex: "BONO_CONDUCTOR_SEC",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("BONO_CONDUCTOR_SEC", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Viático",
        sortable: true,
        dataIndex: "VIATICO",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("VIATICO", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Valor",
        sortable: true,
        dataIndex: "VALOR",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("VALOR", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Ton 27.5",
        sortable: true,
        dataIndex: "TON_27_5",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("TON_27_5", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },

    {
        text: "Peaje",
        sortable: true,
        dataIndex: "PEAJE",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("PEAJE", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },


    {
        text: "Tiempo Espera",
        sortable: true,
        dataIndex: "TIEMPO_ESPERA",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 4,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {

                            modificarTarifaGrilla("TIEMPO_ESPERA", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },
    {
        text: "Factor TE",
        sortable: true,
        dataIndex: "FACTOR_TE",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: 0,
                allowBlank: false,
                decimalPrecision: 4,
                listeners: {
                    change: function (obj, newValue, oldValue) {
                        if (newValue != null) {

                            modificarTarifaGrilla("FACTOR_TE", newValue, record);

                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    }
                },
            };
        }
    },
    {
        text: "Bono SQM",
        sortable: true,
        dataIndex: "BONO_SQM",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {
                            modificarTarifaGrilla("BONO_SQM", newValue, record);
                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },
    {
        text: "MP Vacio",
        sortable: true,
        dataIndex: "MP_VACIO",
        width: 100,
        editable: true,
        renderer: Ext.util.Format.numberRenderer('0.0,0'),
        getEditor: function (record) {

            var grid = this.up("grid"),
                cellediting = grid.findPlugin("cellediting"),
                editors = cellediting.editors,
                editor = editors.getByKey(this.id),
                fieldType;

            if (editor) {
                // Do this to avoid memory leaks
                editors.remove(editor);
            }
            fieldType = "thousandnumber";

            return {
                xtype: fieldType,
                maxValue: 99999999,
                minValue: -99999999,
                allowBlank: false,
                decimalPrecision: 0,
                listeners: {
                    change: function (obj, newValue, oldValue) {

                        if (newValue != null) {
                            modificarTarifaGrilla("MP_VACIO", newValue, record);
                        } else {
                            showToast('Valor incorrecto, se conservara el valor anterior.');
                        }
                    },
                },
            };
        }
    },
    ],

});


var modificarTarifaGrilla = function (dataIndex, valor, record) {

    params = {
        p_nro_solicitud: record.data.NRO_SOLICITUD,
        p_rut: record.data.RUT,
        p_razon_social: record.data.RAZON_SOCIAL,
        p_id_ruta: dataIndex == 'ID_RUTA' ? valor : record.data.ID_RUTA,
        p_servicio: dataIndex == 'SERVICIO' ? valor : record.data.SERVICIO,
        p_bono_conductor: dataIndex == 'BONO_CONDUCTOR' ? valor : record.data.BONO_CONDUCTOR,
        p_bono_conductor_sec: dataIndex == 'BONO_CONDUCTOR_SEC' ? valor : record.data.BONO_CONDUCTOR_SEC,
        p_viatico: dataIndex == 'VIATICO' ? valor : record.data.VIATICO,
        p_valor: dataIndex == 'VALOR' ? valor : record.data.VALOR,
        p_ton_27_5: dataIndex == 'TON_27_5' ? valor : record.data.TON_27_5,
        p_peaje: dataIndex == 'PEAJE' ? valor : record.data.PEAJE,
        p_tiempo_espera: dataIndex == 'TIEMPO_ESPERA' ? valor : record.data.TIEMPO_ESPERA,
        p_factor_te: dataIndex == 'FACTOR_TE' ? valor : record.data.FACTOR_TE,
        p_bono_sqm: dataIndex == 'BONO_SQM' ? valor : record.data.BONO_SQM,
        p_mp_vacio: dataIndex == 'MP_VACIO' ? valor : record.data.MP_VACIO,
        p_usuario: NOMBRE,
    };

    storeModificarTarifa.load({
        params: params
    });
};



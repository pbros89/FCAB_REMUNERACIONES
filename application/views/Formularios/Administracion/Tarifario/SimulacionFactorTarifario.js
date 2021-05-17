Ext.define("fcab.Container.MasterTarifario.GrillaFactor", {
    extend: "Ext.grid.Panel",
    xtype: "MasterTarifarioGrillaFactor",
    itemId: "MasterTarifarioGrillaFactor",
    store: storeCargarSimulacionFactor,
    columnLines: true,
    emptyText: "Sin datos para mostrar",
    filtros: null,
    plugins: pluginFactory(),
    width: "100%",
    height: 450,
    viewConfig: {
        stripeRows: true,
    },
    listeners: {
        afterrender: function() {
            var params = Ext.getCmp('MasterTarifarioGrillaFactor').myExtraParams.param1;

            console.log(params);
            storeCargarSimulacionFactor.load({
                params: params
            });
        }
    },
    columns: [

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
        },
        {
            text: "Servicio",
            sortable: true,
            dataIndex: "SERVICIO",
            width: 100,
        },
        {
            text: "Bono Con",
            sortable: true,
            dataIndex: "BONO_CONDUCTOR",
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
            width: 100,
        },
        {
            text: "Bono Con Sec",
            sortable: true,
            dataIndex: "BONO_CONDUCTOR_SEC",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },

        {
            text: "Viático",
            sortable: true,
            dataIndex: "VIATICO",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },

        {
            text: "Valor",
            sortable: true,
            dataIndex: "VALOR",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },

        {
            text: "Ton 27.5",
            sortable: true,
            dataIndex: "TON_27_5",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },

        {
            text: "Peaje",
            sortable: true,
            dataIndex: "PEAJE",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },


        {
            text: "Tiempo Espera",
            sortable: true,
            dataIndex: "TIEMPO_ESPERA",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },
        {
            text: "Factor TE",
            sortable: true,
            dataIndex: "FACTOR_TE",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },
        {
            text: "Bono SQM",
            sortable: true,
            dataIndex: "BONO_SQM",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },
        {
            text: "MP Vacio",
            sortable: true,
            dataIndex: "MP_VACIO",
            width: 100,
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
        },

    ],
    dockedItems: [
        {
            xtype: "toolbar",
            items: [
                {
                    text: "Exportar",
                    tooltip: "Exportar xls",
                    iconCls: "icon-form-download",
                    handler: function () {
                        this.ownerCt.ownerCt.saveDocumentAs({
                            type: "excel",
                            title: "Simulacion Tarifas " + NOM_EMPRESA,
                            fileName:
                                "Simulacion Tarifas " +
                                NOM_EMPRESA +
                                " " +
                                new Date().getTime() +
                                ".xls",
                        });
                    },
                },

                {
                    text: "Confirmar Tarifas",
                    tooltip: "Confirmar factor a las tarifas",
                    iconCls: "icon-form-add",
                    handler: function () {
                        var params = Ext.getCmp('MasterTarifarioGrillaFactor').myExtraParams.param1;
                        Ext.MessageBox.confirm(
                            "Confirmar",
                            "¿Esta seguro de agregar factor a las tarifas?",
                            function (btn) {
                              if (btn === "yes") {
                                    storeAgregarFactorTarifa.load({
                                        params: params,
                                        callback: function (records, operation, success) {
                                            if (records != null) {
                                                if (records[0].data.r_msg == 'OK') {
                                                    showToast('El factor se cargo correctamente.');
                                                    cargarMasterTarifario();
                                                    Ext.getCmp('MasterTarifarioGrillaFactor').destroy();
                                                    Ext.getCmp('MasterTarifarioFactor').destroy();
                                                } else {
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
                                }
                            });
                    },
                },

            ],
        },
    ],

});

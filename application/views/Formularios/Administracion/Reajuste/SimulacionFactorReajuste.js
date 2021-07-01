Ext.define("fcab.Container.MasterReajuste.GrillaFactor", {
    extend: "Ext.grid.Panel",
    xtype: "MasterReajusteGrillaFactor",
    itemId: "MasterReajusteGrillaFactor",
    store: storeCargarSimulacionReajuste,
    columnLines: true,
    emptyText: "Sin datos para mostrar",
    plugins: pluginFactory(),
    width: "100%",
    height: 450,
    viewConfig: {
        stripeRows: true,
    },
    listeners: {
        afterrender: function () {
            var params = Ext.getCmp('MasterReajusteGrillaFactor').myExtraParams.param1;

            console.log(params);
            storeCargarSimulacionReajuste.load({
                params: params
            });
        }
    },
    columns: [

        {
            text: "ID Personal",
            sortable: true,
            dataIndex: "PK_PERSONAL",
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
            text: "Nombre",
            sortable: true,
            dataIndex: "NOMBRE",
            //align: 'center',
            hidden: false,
            width: 250,
        },
        {
            text: "Sueldo Actual",
            sortable: true,
            dataIndex: "SUELDO_ACTUAL",
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
            flex: 1,
        },
        {
            text: "Sueldo Reajustado",
            sortable: true,
            dataIndex: "SUELDO_REAJUSTADO",
            renderer: Ext.util.Format.numberRenderer('0.0,0'),
            flex: 1,
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
                            title: "Simulacion Reajuste " + NOM_EMPRESA,
                            fileName:
                                "Simulacion Reajuste " +
                                NOM_EMPRESA +
                                " " +
                                new Date().getTime() +
                                ".xls",
                        });
                    },
                },

                {
                    text: "Confirmar Reajuste",
                    tooltip: "Confirmar Reajuste",
                    iconCls: "icon-form-add",
                    handler: function () {
                        var params = Ext.getCmp('MasterReajusteGrillaFactor').myExtraParams.param1;
                        Ext.MessageBox.confirm(
                            "Confirmar",
                            "¿Esta seguro de agregar factor?",
                            function (btn) {
                                if (btn === "yes") {
                                    Ext.MessageBox.show({
                                        msg: 'Creando Reajuste',
                                        progressText: 'Espere por favor...',
                                        width: 300,
                                        wait: {
                                            interval: 200
                                        }
                                    });
                                    storeCrearReajuste.load({
                                        params: params,
                                        callback: function (records, operation, success) {
                                            Ext.MessageBox.hide();
                                            if (records != null) {
                                                if (records[0].data.r_msg == 'OK') {
                                                    showToast('El factor se cargo correctamente.');
                                                    cargarMasterReajuste();
                                                    Ext.getCmp('MasterReajusteGrillaFactor').destroy();
                                                    Ext.getCmp('MasterReajusteCrear').destroy();
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

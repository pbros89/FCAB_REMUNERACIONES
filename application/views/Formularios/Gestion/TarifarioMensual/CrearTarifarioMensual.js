Ext.define("fcab.Container.MainTarifarioMensual.Crear", {
    extend: "Ext.container.Container",
    xtype: "MainTarifarioMensualCrear",
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: "anchor",
    scrollable: true,
    listeners: {
        beforerender: function () {
            var cbAnho = Ext.ComponentQuery.query(
                "#MainTarifarioMensualCrear #cbAnho"
            )[0];
            var cbMes = Ext.ComponentQuery.query(
                "#MainTarifarioMensualCrear #cbMes"
            )[0];
            var dtFec1 = Ext.ComponentQuery.query(
                "#MainTarifarioMensualCrear #dtFec1"
            )[0];
            var dtFec2 = Ext.ComponentQuery.query(
                "#MainTarifarioMensualCrear #dtFec2"
            )[0];

            var date = new Date();
            var yearIni = 2019;
            var year = date.getFullYear();
            var month = date.getMonth();
            var years = [];
            while (yearIni <= year) {
                years.push({
                    VALOR: yearIni,
                });
                yearIni++;
            }

            cbAnho.getStore().loadData(years);
            cbAnho.setValue(year);
            cbMes.setValue(cbMes.getStore().getAt(month));
            dtFec1.setValue(date);
            dtFec2.setValue(date);
        },
    },
    items: [
        {
            xtype: "form",
            titleAlign: "center",
            border: false,
            frame: true,
            bodyPadding: 10,
            layout: {
                type: "column",
                align: "strech",
            },
            items: [
                {
                    xtype: "container",
                    columnWidth: 1,
                    layout: "anchor",
                    style: "margin-bottom: 5px",
                    items: [
                        {
                            xtype: "combo",
                            name: "cbAnho",
                            itemId: "cbAnho",
                            fieldLabel: "Año",
                            labelAlign: "left",
                            queryMode: "local",
                            triggerAction: "all",
                            displayField: "VALOR",
                            valueField: "VALOR",
                            editable: true,
                            typeAhead: true,
                            selectOnFocus: true,
                            forceSelection: true,
                            anchor: "50%",
                            allowBlank: false,
                        },
                    ],
                },
                {
                    xtype: "container",
                    columnWidth: 1,
                    layout: "anchor",
                    style: "margin-bottom: 5px",
                    items: [
                        {
                            xtype: "combo",
                            name: "cbMes",
                            itemId: "cbMes",
                            displayField: "NOMBRE",
                            valueField: "VALOR",
                            store: storeExtras_cargarMeses,
                            fieldLabel: "Mes",
                            labelAlign: "left",
                            queryMode: "local",
                            triggerAction: "all",
                            editable: true,
                            typeAhead: true,
                            selectOnFocus: true,
                            forceSelection: true,
                            anchor: "50%",
                            allowBlank: false,
                        },
                    ],
                },
                {
                    xtype: "container",
                    columnWidth: 1,
                    layout: "hbox",
                    style: "margin-bottom: 15px",
                    items: [
                        {
                            xtype: "datefield",
                            name: "dtFec1",
                            labelAlign: "left",
                            fieldLabel: "Inicio",
                            itemId: "dtFec1",
                            emptyText: "yyyy/mm/dd",
                            submitFormat: "Y/m/d",
                            format: "Y/m/d",
                            editable: true,
                            allowBlank: false,
                            width: "60%",
                            margin: "0 10 0 0",
                        },
                    ],
                },
                {
                    xtype: "container",
                    columnWidth: 1,
                    layout: "hbox",
                    style: "margin-bottom: 10px",
                    items: [
                        {
                            xtype: "datefield",
                            name: "dtFec2",
                            labelAlign: "left",
                            fieldLabel: "Termino",
                            itemId: "dtFec2",
                            emptyText: "yyyy/mm/dd",
                            submitFormat: "Y/m/d",
                            format: "Y/m/d",
                            editable: true,
                            allowBlank: false,
                            margin: "0 10 0 0",
                            width: "60%",
                        },
                    ],
                },
                {
                    xtype: "container",
                    columnWidth: 1,
                    layout: "anchor",
                    style: "margin-bottom: 15px",
                    items: [
                        {
                            xtype: "textareafield",
                            fieldLabel: "Observación",
                            labelAlign: "top",
                            name: "txtObservacion",
                            itemId: "txtObservacion",
                            typeAhead: true,
                            anchor: "100%",
                            maxLength: 1000,
                            allowBlank: true,
                        },
                    ],
                },
            ],
            buttons: [
                {
                    text: "Iniciar",
                    handler: function () {
                        var form = this.up("form").getForm();
                        if (!ValidarFormulario(form)) return;

                        var ewin = Ext.WindowManager.getActive();
                        if (ewin) {
                            var values = form.getValues();
                            iniciarTarifarioMensual(values);
                        }
                    },
                },
            ],
        },
    ],
});

Ext.define("fcab.Container.MainTarifarioMensual.GrillaValidacion", {
    extend: "Ext.grid.Panel",
    xtype: "MainTarifarioMensualGrillaValidacion",
    itemId: "MainTarifarioMensualGrillaValidacion",
    store: storeCargarValidacionErroresTarifario,
    columnLines: true,
    emptyText: "Sin datos para mostrar",
    filtros: null,
    plugins: pluginFactory(),
    columns: [
        {
            text: "Tipo",
            sortable: true,
            dataIndex: "TIPO",
            //align: 'center',
            flex: 1,
        },
        {
            text: "Descripción",
            sortable: true,
            dataIndex: "DESCRIPCION",
            //align: 'center',
            flex: 2,
        },
        {
            text: "Cant. Guias",
            sortable: true,
            dataIndex: "CANTIDAD_GUIAS",
            //align: 'center',
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
                            title: "VALIDACION_TARIFARIO",
                            fileName:
                                "VALIDACION_TARIFARIO" +
                                " " +
                                new Date().getTime() +
                                ".xls",
                        });
                    },
                },

                {
                    text: "Confirmar Inicio",
                    tooltip: "Confirmar Inicio",
                    iconCls: "icon-form-ok",
                    handler: function () { 
                        var values = Ext.getCmp('MainTarifarioMensualGrillaValidacion').myExtraParams.param2;
                        crearTarifarioMensual(values);
                    },
                },
            ],
        },
    ],
    height: 450,
    width: "100%",
});

var iniciarTarifarioMensual = function (values) {
    Ext.MessageBox.show({
        msg: "Validando Tarifario Mensual",
        progressText: "Espere por favor...",
        width: 300,
        wait: {
            interval: 200,
        },
    });

    storeCargarValidacionErroresTarifario.load({
        params: {
            p_anho: values.cbAnho,
            p_mes: values.cbMes,
            p_desde: values.dtFec1,
            p_hasta: values.dtFec2,
        },
        callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null && records.length > 0) {
                ventanaDinamica(
                    "MainTarifarioMensualGrillaValidacion",
                    "Detalle Validación Tarifario",
                    "800",
                    "",
                    "MainTarifarioMensualGrillaValidacion",
                    1,
                    0,
                    values,
                    values
                );
            } else {
                crearTarifarioMensual(values);
            }
        }
    });
};

var crearTarifarioMensual = function (values) {
    Ext.MessageBox.show({
        msg: "Creando Tarifario Mensual",
        progressText: "Espere por favor...",
        width: 300,
        wait: {
            interval: 200,
        },
    });
    storeIniciarTarifarioMensual.load({
        params: {
            p_anho: values.cbAnho,
            p_mes: values.cbMes,
            p_desde: values.dtFec1,
            p_hasta: values.dtFec2,
            p_observacion: values.txtObservacion,
            p_usuario: NOMBRE,
        },
        callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
                if (records[0].data.r_msg == "OK") {
                    showToast("Tarifario mensual creado correctamente.");
                    cargarMainTarifarioMensual();
                    Ext.getCmp("MainTarifarioMensualCrear").destroy();
                    if(Ext.getCmp("MainTarifarioMensualGrillaValidacion") !=  null) {
                        Ext.getCmp("MainTarifarioMensualGrillaValidacion").destroy();
                    }

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



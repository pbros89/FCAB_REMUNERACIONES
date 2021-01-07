Ext.define("fcab.Container.DetalleImportarDiasTrabajados", {
  extend: "Ext.tab.Panel",
  xtype: "DetalleImportarDiasTrabajados",
  itemId: "DetalleImportarDiasTrabajados",
  activeTab: 0,
  width: "100%",

  listeners: {
    beforerender: function () {
      cargarErroresImportarDiasTrabajados();
    },
  },
  //buttonAlign: 'center',
  defaults: {
    scrollable: true,
  },
  layout: {
    align: "stretch",
    pack: "center",
  },
  items: [
    {
      title: "Resumen",
      height: 565,
      items: [
        {
          xtype: "DetalleImportarDiasTrabajadosResumen",
        },
      ],
      buttons: [
        {
          scale: "large",
          text: "CONFIRMAR",
          tooltip: "Confirmar que se guarden los valores",
          handler: function () {
            var param = Ext.getCmp("DetalleImportarDiasTrabajados")
              .myExtraParams.param2;
            param.p_usuario = NOMBRE;

            var ewin = Ext.WindowManager.getActive();
            if (ewin) {
              Ext.MessageBox.show({
                msg: "Cargando",
                progressText: "Espere por favor...",
                width: 300,
                wait: {
                  interval: 200,
                },
              });
              storeGuardarImportarDiasTrabajados.proxy.setTimeout(300000);
              storeGuardarImportarDiasTrabajados.load({
                params: param,
                callback: function (records, operation, success) {
                  Ext.MessageBox.hide();
                  if (records != null) {
                    if (records[0].data.r_msg == "OK") {
                      showToast("Importación correcta.");
                      storeCargarCierresMensual.load();
                      ewin.destroy();
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
          },
        },
      ],
    },
    {
      title: "Detalle",
      height: 565,
      items: [
        {
          xtype: "DetalleImportarDiasTrabajadosDetalle",
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.DetalleImportarDiasTrabajados.Resumen", {
  extend: "Ext.grid.Panel",
  xtype: "DetalleImportarDiasTrabajadosResumen",
  itemId: "DetalleImportarDiasTrabajadosResumen",
  store: storeResumenValidarImportarDiasTrabajados,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
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
              title: "Resumen importar",
              fileName: "Resumen importar " + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
  columns: [
    {
      text: "Mensaje",
      sortable: true,
      dataIndex: "MENSAJE",
      flex: 4,
      renderer: function (value, meta) {
        if (value === "OK") {
          meta.style = "color:green;";
          return value;
        } else {
          meta.style = "color:red;";
          return value;
        }
      },
    },

    {
      text: "Cantidad",
      sortable: true,
      dataIndex: "CONTAR",
      flex: 1,
    },
  ],
  height: 500,
  width: "100%",
});

Ext.define("fcab.Container.DetalleImportarDiasTrabajados.Detalle", {
  extend: "Ext.grid.Panel",
  xtype: "DetalleImportarDiasTrabajadosDetalle",
  itemId: "DetalleImportarDiasTrabajadosDetalle",
  store: storeValidarImportarDiasTrabajados,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
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
              title: "Detalle importar",
              fileName: "Detalle importar " + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
  columns: [
    {
      text: "Mensaje",
      sortable: true,
      dataIndex: "MENSAJE",
      width: 200,
      renderer: function (value, meta) {
        if (value === "OK") {
          meta.style = "color:green;";
          return value;
        } else {
          meta.style = "color:red;";
          return value;
        }
      },
    },
    {
      text: "COD_PERSONAL",
      sortable: true,
      dataIndex: "COD_PERSONAL",
      width: 200,
    },
    {
      text: "NUM_RUT",
      sortable: true,
      dataIndex: "NUM_RUT",
      width: 100,
    },
    {
      text: "DV",
      sortable: true,
      dataIndex: "DV_RUT",
      width: 50,
    },
    {
      text: "NOMBRE",
      sortable: true,
      dataIndex: "NOMBRE",
      width: 200,
    },
    {
      text: "COD_CC",
      sortable: true,
      dataIndex: "COD_CC",
      width: 200,
    },
    {
      text: "NOM_CC",
      sortable: true,
      dataIndex: "NOM_CC",
      width: 200,
    },
    {
      text: "COD_CARGO",
      sortable: true,
      dataIndex: "COD_CARGO",
      width: 200,
    },
    {
      text: "NOM_CARGO",
      sortable: true,
      dataIndex: "NOM_CARGO",
      width: 200,
    },
    {
      text: "TIPO_CONTRATO",
      sortable: true,
      dataIndex: "TIPO_CONTRATO",
      width: 200,
    },
    {
      text: "JORNADA",
      sortable: true,
      dataIndex: "JORNADA",
      width: 200,
    },
    {
      text: "DIAS_TRABAJADOS",
      sortable: true,
      dataIndex: "DIAS_TRABAJADOS",
      width: 200,
    },
  ],
  height: 530,
  width: "100%",
});

var cargarErroresImportarDiasTrabajados = function () {
  var param = Ext.getCmp("DetalleImportarDiasTrabajados").myExtraParams.param2;

  storeValidarImportarDiasTrabajados.loadData([], false);

  storeValidarImportarDiasTrabajados.load({
    params: param,
  });

  storeResumenValidarImportarDiasTrabajados.loadData([], false);

  storeResumenValidarImportarDiasTrabajados.load({
    params: param,
  });
};

Ext.define("fcab.Container.WFModificarFichaDetalle", {
    extend: "Ext.tab.Panel",
    xtype: "WFModificarFichaDetalle",
    itemId: "WFModificarFichaDetalle",
    activeTab: 0,
    width: "100%",
    height: (Ext.getBody().getViewSize().height - 150) > 800 ? 800 : Ext.getBody().getViewSize().height - 150,
    listeners: {
      beforerender: function () {
        cargarResumenSolicitudCambiarFichaDetalle();
      }
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
        itemId: "tabResumen",
        items: [
          {
            xtype: "WFModificarFichaDetalleResumen",
          },
        ],
      },
      {
        title: "Etapas",
        itemId: "tabEtapas",
        items: [
          {
            xtype: "WFModificarFichaDetalleEtapas",
          },
        ],
      },
    ],
  });
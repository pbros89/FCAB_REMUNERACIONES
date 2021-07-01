Ext.define("fcab.Container.WFModificarFichaDetalle", {
    extend: "Ext.tab.Panel",
    xtype: "WFModificarFichaDetalle",
    itemId: "WFModificarFichaDetalle",
    activeTab: 0,
    width: "100%",
    height: (Ext.getBody().getViewSize().height - 150) > 800 ? 800 : Ext.getBody().getViewSize().height - 150,
    listeners: {
      beforerender: function () {
        cargarTrabajadoresCambioFichaDetalle();
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
        title: "Trabajadores",
        itemId: "tabTrabajadores",
        items: [
          {
            xtype: "WFModificarFichaDetalleTrabajadores",
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


  var cargarTrabajadoresCambioFichaDetalle = function() {
    var param = Ext.getCmp('WFModificarFichaDetalle').myExtraParams.param2;
    Ext.getCmp('WFModificarFichaDetalle').setDisabled(true);
    storeCargarSolicitudesCambioFichaDet.load({
      params: {
        p_id: param.PK_ID
      },
      callback: function() {
        cargarResumenSolicitudCambiarFichaDetalle();
        Ext.getCmp('WFModificarFichaDetalle').setDisabled(false);
      }
    })
  }
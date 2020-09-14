Ext.define("fcab.Container.WFModificarFichaCrear", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrear",
  itemId: "WFModificarFichaCrear",
  layout: 'fit',
  listeners: {
    beforerender: function () {
    console.log("height : " +Ext.getBody().getViewSize().height);
      storeCargarParam_JORNADA.load();
      storeCargarParam_TIPO_CONTRATO.load();
      storeCargarCentroCostosFiltro.load();
      storeCargarCargosFiltro.load();
      storeExtras_cargarPeriodos.load();
      storeCargarParam_LUGAR_TRABAJO.load();
      storeCargarParam_GERENCIA.load();
      storeCargarParam_DEPARTAMENTO.load();
      storeCargarPersonalVigentePorPrivilegioUsuario.load({
        params: {
          p_cod_emp: EMPRESA,
          p_usuario: NOMBRE,
          p_rol: ROL,
        },
      });
    },
  },
  items: [
    {
      xtype: "WFModificarFichaCrearPanelBuscar",
    },
    {
      xtype: "WFModificarFichaCrearTabpanel",
    },
  ],
});

Ext.define("fcab.Container.WFModificarFichaCrearPanelBuscar", {
  extend: "Ext.form.Panel",
  xtype: "WFModificarFichaCrearPanelBuscar",
  itemId: "WFModificarFichaCrearPanelBuscar",
  width: "100%",
  padding: 10,
  border: false,
  layout: {
    type: "column",
    align: "stretch",
  },
  items: [
    {
      xtype: "container",
      columnWidth: 0.4,
      style: "margin: 0 10px 0 0",
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
          width: "100%",
          store: storeCargarPersonalVigentePorPrivilegioUsuario,
          fieldLabel: "Trabajador",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          allowBlank: false,
          readOnly: false,
          listeners: {
            change: function (obj, newValue, oldValue) {
              var cbPeriodo = Ext.ComponentQuery.query('#WFModificarFichaCrearPanelBuscar #cbPeriodo')[0];
              var tabResumen = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabResumen')[0];
              tabResumen.setDisabled(true);
              if (newValue) {
                //TRABAJADOR SELECCIONADO SETIAR VALORES ACTUALES
                Ext.ComponentQuery.query(
                  "#WFModificarFichaCrearTabpanel"
                )[0].setDisabled(false);

                setTrabajadorModificarFichaGeneral(obj);
                setTrabajadorModificarFichaTraslado(obj);
                cargarResumenSolicitudcambiarFicha();

                if(cbPeriodo.getValue() != null && cbPeriodo.getValue() != '') {
                  tabResumen.setDisabled(false);
                }

              } else {
                //TRABAJADOR NO SELECCIONADO LIMPIAR VALORES ACTUALES Y DESACTIVAR PANEL
                Ext.ComponentQuery.query(
                  "#WFModificarFichaCrearTabpanel"
                )[0].setDisabled(true);

                resetModificarFichaGeneral();
                resetModificarFichaTraslado();
              }
            },
          },
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.6,
      layout: {
        type: "hbox",
        align: "bottom",
        pack: "end",
      },
      items: [
        {
          xtype: "combo",
          name: "cbPeriodo",
          itemId: "cbPeriodo",
          displayField: "PERIODO",
          valueField: "PERIODO",
          store: storeExtras_cargarPeriodos,
          fieldLabel: "Periodo",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          allowBlank: false,
          readOnly: false,
          listeners: {
            change: function (obj, newValue, oldValue) {
              var cbTrabajador = Ext.ComponentQuery.query('#WFModificarFichaCrearPanelBuscar #cbTrabajador')[0];
              var tabResumen = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabResumen')[0];
              
              tabResumen.setDisabled(true);
              
              if (newValue) {
                if(cbTrabajador.getValue() != null && cbTrabajador.getValue() != '') {
                  tabResumen.setDisabled(false);
                }

              }
            },
          },
        },
      ],
    },
    
  ],
});

Ext.define("fcab.Container.WFModificarFichaCrearTabpanel", {
  extend: "Ext.tab.Panel",
  xtype: "WFModificarFichaCrearTabpanel",
  itemId: "WFModificarFichaCrearTabpanel",
  activeTab: 0,
  width: "100%",
  disabled: true,
  height: (Ext.getBody().getViewSize().height - 150) > 800 ? 800 : Ext.getBody().getViewSize().height - 150,
  listeners: {
    tabchange: function (tabPanel, tab) {
     // console.log(tabPanel.itemId + " " + tab.itemId);

      if(tab.itemId == 'tabResumen') {
        cargarResumenSolicitudcambiarFicha();
      }
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
      title: "Modificar Datos",
      itemId: "tabLaboral",
      items: [
        {
          xtype: "WFModificarFichaCrearGeneral",
        },
      ],
    },
    {
      title: "Anexo Traslado Temporal / Reemplazo",
      itemId: "tabTraslado",
      //disabled: true,
      items: [
        {
          xtype: "WFModificarFichaCrearTraslado",
        },
      ],
    },
    {
      title: "Resumen Solicitud",
      itemId: "tabResumen",
      disabled: true,
      items: [
        {
          xtype: "WFModificarFichaCrearResumen",
        },
      ],
    },
  ],
});

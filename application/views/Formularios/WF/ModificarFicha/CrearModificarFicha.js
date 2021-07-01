Ext.define("fcab.Container.WFModificarFichaCrear", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrear",
  itemId: "WFModificarFichaCrear",
  layout: 'anchor',
  listeners: {
    beforerender: function () {
      console.log("height : " + Ext.getBody().getViewSize().height);
      var cbTipoForm = Ext.ComponentQuery.query('#cbTipoForm')[0];
      var grid = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccionGrilla')[0];
      var store = grid.getStore();
      store.removeAll();

      cbTipoForm.setValue("MODIFICAR");
      storeCargarParam_JORNADA.load();
      storeCargarParam_TIPO_CONTRATO.load();
      storeCargarCentroCostosFiltro.load();
      storeCargarCargosFiltro.load();
      storeCargarParam_LUGAR_TRABAJO.load();
      storeCargarParam_GERENCIA.load();
      storeCargarParam_DEPARTAMENTO.load()
      storeCargarParam_SOL_CAMBIO_MOTIVO.load();
      storeCargarContratos.load({
        params: {
          p_estado: 'A',
          p_cod_emp: EMPRESA
        }
      });
      storeCargarPersonalVigentePorPrivilegioUsuario.load({
        params: {
          p_cod_emp: EMPRESA,
          p_usuario: NOMBRE,
          p_rol: ROL,
        },
      });

      storeExtras_cargarPeriodos.load({
        callback: function (records, operation, success) {
          var cbPeriodo = Ext.ComponentQuery.query('#WFModificarFichaCrearPanelBuscar #cbPeriodo')[0];

          if (records != null && records.length > 0) {
            var date = new Date();
            console.log(records[0].data.PERIODO);
            console.log(records[1].data.PERIODO);
            console.log(date.getDate());
            if (date.getDate() <= 19) {
              cbPeriodo.setValue(records[0].data.PERIODO);
            } else {
              cbPeriodo.setValue(records[1].data.PERIODO);
            }
          }
        }
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
    type: "hbox",
    align: "bottom",
    //pack: "end",
  },
  items: [
    {
      xtype: "container",
      flex: 1,
      style: "margin: 0 10px 0 0",
      layout: {
        type: "hbox",
        align: "bottom",
        //pack: "end",
      },
      items: [
        {
          xtype: "combo",
          name: "cbTipoForm",
          itemId: "cbTipoForm",
          store: [['MODIFICAR', 'MODIFICAR DATOS'], ['TRASLADO', 'ANEXO VINCULANTE']],
          fieldLabel: "Tipo de Solicitud",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: false,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          allowBlank: false,
          readOnly: false,
          width: 200,
          margin: '0 10 0 0',
          listeners: {
            change: function (obj, newValue, oldValue) {
              var tabPanel = Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel")[0];
              var cbPeriodo = Ext.ComponentQuery.query('#WFModificarFichaCrearPanelBuscar #cbPeriodo')[0];
              var tabLaboral = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabLaboral')[0];
              var tabSeleccion = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabSeleccion')[0];
              var tabTraslado = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabTraslado')[0];
              var tabResumen = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabResumen')[0];

              tabResumen.setDisabled(true);
              if (newValue) {
                tabPanel.setDisabled(false);
                tabPanel.setActiveTab(0);
                switch (newValue) {
                  case "MODIFICAR":
                    tabLaboral.tab.show();
                    tabTraslado.tab.hide();
                    break;
                  case "TRASLADO":

                    tabLaboral.tab.hide();
                    tabTraslado.tab.show();
                    break;
                }



                /*setTrabajadorModificarFichaGeneral(obj);
                setTrabajadorModificarFichaTraslado(obj);
                cargarResumenSolicitudcambiarFicha();*/

                if (cbPeriodo.getValue() != null && cbPeriodo.getValue() != '') {
                  tabResumen.setDisabled(false);
                }

              } else {
                //TRABAJADOR NO SELECCIONADO LIMPIAR VALORES ACTUALES Y DESACTIVAR PANEL
                tabPanel.setDisabled(true);
              }
              resetModificarFichaGeneral();
              resetModificarFichaTraslado();
            },
          },
        },
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
              var cbTipoForm = Ext.ComponentQuery.query('#WFModificarFichaCrearPanelBuscar #cbTipoForm')[0];
              var tabResumen = Ext.ComponentQuery.query('#WFModificarFichaCrearTabpanel #tabResumen')[0];

              tabResumen.setDisabled(true);

              if (newValue) {
                if (cbTipoForm.getValue() != null && cbTipoForm.getValue() != '') {
                  tabResumen.setDisabled(false);
                }

              }
            },
          },
        },
      ],
    },
    {
      xtype: "container",
      flex: 1,
      layout: {
        type: "hbox",
        align: "bottom",
        pack: "end",
      },
      items: [
        {
          xtype: "button",
          text: "Limpiar Fomulario",
          handler: function () {
            resetModificarFichaGeneral();
            resetModificarFichaTraslado();
            cargarResumenSolicitudcambiarFicha();
          }
        }
      ],
    },

  ],
});

Ext.define("fcab.Container.WFModificarFichaCrearTabpanel", {
  extend: "Ext.tab.Panel",
  xtype: "WFModificarFichaCrearTabpanel",
  itemId: "WFModificarFichaCrearTabpanel",
  activeTab: 0,
  disabled: true,
  flex: 1,
  height: (Ext.getBody().getViewSize().height - 150) > 800 ? 800 : Ext.getBody().getViewSize().height - 150,
  listeners: {
    tabchange: function (tabPanel, tab) {
      // console.log(tabPanel.itemId + " " + tab.itemId);

      if (tab.itemId == 'tabResumen') {
        cargarResumenSolicitudcambiarFicha();
      }
    },
  },
  defaults: {
    scrollable: true,
  },
  layout: {
    pack: "center",
  },
  items: [
    {
      title: "1.- Selección de Trabajadores",
      id: "tabSeleccion",
      itemId: "tabSeleccion",
      items: [
        {
          xtype: "WFModificarFichaCrearSeleccion",
        },
      ],
    },
    {
      title: "2.- Modificar Datos",
      id: "tabLaboral",
      itemId: "tabLaboral",
      hidden: true,
      items: [
        {
          xtype: "WFModificarFichaCrearGeneral",
        },
      ],
    },
    {
      title: "2.- Anexo Vinculante",
      id: "tabTraslado",
      itemId: "tabTraslado",
      hidden: true,
      items: [
        {
          xtype: "WFModificarFichaCrearTraslado",
        },
      ],
    },

    {
      title: "3.- Resumen Solicitud",
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



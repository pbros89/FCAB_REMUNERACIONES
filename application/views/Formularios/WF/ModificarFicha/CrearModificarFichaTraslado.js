Ext.define("fcab.Container.WFModificarFichaCrearTraslado", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearTraslado",
  itemId: "WFModificarFichaCrearTraslado",
  width: "100%",
  layout: 'fit',
  border: false,
  frame: false,
  constructor: function (config) {
    this.callParent([config]);
  },
  items: [
    {
      xtype: "form",
      itemId: "formTras",
      titleAlign: "center",
      border: false,
      frame: false,
      flex: 1,
      padding: 10,
      layout: {
        type: "vbox",
        align: "strech",
      },

      items: [

        {
          xtype: "fieldset",
          title: "<b>Instrucciones</b>",
          style: "margin: 5px",
          width: '100%',
          layout: {
            align: "strech",
          },
          items: [
            {
              xtype: "label",
              html:
                "<ul>" +
                "<li><b>Para generar traslado temporal o reemplazo debera completar todos los campos de esta pestaña.</b></li>" +
                "</ul>",
            },

          ],
        },
        {
          xtype: "fieldset",
          title: "<b>Datos</b>",
          style: "margin: 5px",
          width: '100%',
          layout: {
            type: "vbox",
            align: "strech",
          },

          items: [
            {
              xtype: "combo",
              name: "cbCCTras",
              itemId: "cbCCTras",
              width: 300,
              displayField: "NOMBRE_FULL",
              valueField: "CODIGO",
              store: storeCargarCentroCostosFiltro,
              fieldLabel: "Centro de Costo",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              allowBlank: true,
              readOnly: false,
            },
            {
              xtype: "combo",
              name: "cbCargoTras",
              itemId: "cbCargoTras",
              displayField: "NOMBRE",
              valueField: "CODIGO",
              store: storeCargarCargosFiltro,
              fieldLabel: "Cargo",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              width: 300,
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              allowBlank: true,
              readOnly: false,
            },

            {
              xtype: "combo",
              name: "cbContratoTras",
              itemId: "cbContratoTras",
              displayField: "INFO",
              valueField: "PK_ID",
              store: storeCargarContratos,
              fieldLabel: "Contrato",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              width: 300,
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              allowBlank: true,
              readOnly: false,
            },
            {
              xtype: 'datefield',
              name: 'dtIniTras',
              labelAlign: 'top',
              fieldLabel: 'F. Inicio',
              itemId: 'dtIniTras',
              emptyText: 'yyyy/mm/dd',
              submitFormat: 'Y/m/d',
              format: 'Y/m/d',
              width: 300,
              editable: true,
              allowBlank: true,
            }, {
              xtype: 'checkbox',
              boxLabel: '¿Termino Indefinido?',
              name: 'checkTermino',
              itemId: 'checkTermino',
              checked: false,
              listeners: {
                change: function (checkbox, newValue, oldValue, eOpts) {
                  var dateField = Ext.ComponentQuery.query(
                    "#WFModificarFichaCrearTabpanel #dtFinTras"
                  )[0];
                  if (newValue) {
                    dateField.reset();
                    dateField.hide();
                  } else {
                    dateField.show();
                  }
                },
              },
            }, {
              xtype: 'datefield',
              name: 'dtFinTras',
              labelAlign: 'top',
              fieldLabel: 'F. Término',
              itemId: 'dtFinTras',
              emptyText: 'yyyy/mm/dd',
              submitFormat: 'Y/m/d',
              format: 'Y/m/d',
              width: 300,
              editable: true,
              allowBlank: true,
            },
            {
              xtype: "textareafield",
              itemId: "txtCargoObsTras",
              name: "txtCargoObsTras",
              labelAlign: "top",
              fieldLabel: "Observación",
              width: '100%',
              typeAhead: true,
              maxLength: 1000,
              allowBlank: true,
              readOnly: false,
            },
          ],
        },
      ],
    },
  ],
});

var resetModificarFichaTraslado = function () {

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCCTras"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargoTras"
  )[0].reset();
  
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbContratoTras"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #dtIniTras"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #checkTermino"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #dtFinTras"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoObsTras"
  )[0].reset();

};


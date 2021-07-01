Ext.define("fcab.Container.WFModificarFichaCrearGeneral", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearGeneral",
  itemId: "WFModificarFichaCrearGeneral",
  border: false,
  frame: false,
  layout: 'fit',
  constructor: function (config) {
    this.callParent([config]);
  },
  items: [
    {
      xtype: "form",
      itemId: "formGeneral",
      titleAlign: "center",
      border: false,
      frame: false,
      padding: 10,
      width: '100%',
      layout: {
        align: "stretch",
        pack: "vbox",
      },
      items: [
        {
          xtype: "fieldset",
          title: "<b>Instrucciones</b>",
          style: "margin: 5px",
          flex: 1,
          layout: {
            type: "hbox",
          },
          items: [
            {
              xtype: "label",
              html:
                "<ul>" +
                "<li><b>Solo rellene los campos que necesita actualizar.</b></li>" +
                "<li><b>Los campos que no necesita actualizar dejelos en blanco.</b></li>" +
                "</ul>",
            },
          ],
        },
        {
          xtype: "fieldset",
          style: "margin: 5px",
          padding: '0 20 20 20',
          title: "<b>Motivo Modificación</b>",
          layout: {
            type: "hbox",
          },
          items: [
            {
              xtype: "container",
              flex: 1,
              items: [
                {
                  xtype: 'combo',
                  name: 'cbMotivo',
                  itemId: 'cbMotivo',
                  store: storeCargarParam_SOL_CAMBIO_MOTIVO,
                  fieldLabel: 'Tipo',
                  displayField: "NOMBRE",
                  valueField: "CODIGO",
                  labelAlign: 'top',
                  forceSelection: true,
                  queryMode: 'local',
                  width: 300,
                  triggerAction: 'all',
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  allowBlank: false

                },
                {
                  xtype: "textareafield",
                  itemId: "txtMotivo",
                  name: "txtMotivo",
                  labelAlign: "top",
                  fieldLabel: 'Observación',
                  width: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },

          ],
        },
        {
          layout: {
            type: "hbox",
          },
          border: false,
          items: [
            {
              xtype: "fieldset",
              title: "<b>Datos Nuevos</b>",
              style: "margin: 5px",
              padding: '0 20 20 20',
              flex: 1,
              layout: {
                type: "vbox",
              },
              items: [
                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                  },
                  margin: '0 0 10 0',
                  width: '100%',
                  items: [
                    {
                      xtype: "thousandnumber",
                      itemId: "txtSueldo",
                      name: "txtSueldo",
                      margin: '0 10 0 0',
                      width: 300,
                      forcePrecision: true,
                      decimalPrecision: 0,
                      allowDecimals: false,
                      labelAlign: "top",
                      fieldLabel: "Sueldo Nuevo",
                      allowBlank: true,
                      minValue: 0,
                    },{
                      xtype: 'checkbox',
                      boxLabel: '¿Supera mid-point?',
                      name: 'checkMidPoint',
                      itemId: 'checkMidPoint',
                      checked: false,
                  },
                  ]
                },

                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                  },
                  margin: '0 0 10 0',
                  width: '100%',
                  items: [
                    {
                      xtype: "combo",
                      name: "cbCargo",
                      itemId: "cbCargo",
                      flex: 1,
                      margin: '0 10 0 0',
                      displayField: "NOMBRE",
                      valueField: "CODIGO",
                      store: storeCargarCargosFiltro,
                      fieldLabel: "Cargo Nuevo",
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
                      name: "cbCC",
                      itemId: "cbCC",
                      flex: 1,

                      displayField: "NOMBRE_FULL",
                      valueField: "CODIGO",
                      store: storeCargarCentroCostosFiltro,
                      fieldLabel: "Centro de Costo Nuevo",
                      labelAlign: "top",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      allowBlank: true,
                      readOnly: false,
                      listeners: {
                        change: function (obj, newValue, oldValue) {
                          console.log(newValue);
                          var txtGerencia = Ext.ComponentQuery.query('#WFModificarFichaCrearGeneral #txtGerencia')[0];
                          var txtDepartamento = Ext.ComponentQuery.query('#WFModificarFichaCrearGeneral #txtDepartamento')[0];
                          var txtJefe = Ext.ComponentQuery.query('#WFModificarFichaCrearGeneral #txtJefe')[0];
                          if (newValue != null) {
                            if (obj.selection.data.RUT_JEFE) {
                              txtJefe.setValue(obj.selection.data.RUT_JEFE + " " + obj.selection.data.NOM_JEFE);
                            } else {
                              txtJefe.reset();
                            }
                            txtGerencia.setValue(obj.selection.data.NOM_GERENCIA);
                            txtDepartamento.setValue(obj.selection.data.NOM_DEPARTAMENTO);

                          } else {
                            txtGerencia.reset();
                            txtDepartamento.reset();
                            txtJefe.reset();
                          }
                        }
                      }
                    },
                  ],
                },
                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                  },
                  margin: '0 0 10 0',
                  width: '100%',
                  items: [

                    {
                      xtype: "textfield",
                      itemId: "txtGerencia",
                      name: "txtGerencia",
                      margin: '0 10 0 0',
                      labelAlign: "top",
                      fieldLabel: "Gerencia Nueva",
                      flex: 1,
                      maxLength: 500,
                      allowBlank: true,
                      readOnly: true,
                      fieldStyle:
                        "background-color: #d8d8d8; background-image: none;",
                    },
                    {
                      xtype: "textfield",
                      itemId: "txtDepartamento",
                      name: "txtDepartamento",
                      margin: '0 10 0 0',
                      labelAlign: "top",
                      fieldLabel: "Departamento Nuevo",
                      flex: 1,
                      maxLength: 500,
                      allowBlank: true,
                      readOnly: true,
                      fieldStyle:
                        "background-color: #d8d8d8; background-image: none;",
                    },
                    {
                      xtype: "textfield",
                      itemId: "txtJefe",
                      name: "txtJefe",
                      labelAlign: "top",
                      fieldLabel: "Jefatura Nueva",
                      flex: 1,
                      maxLength: 500,
                      allowBlank: true,
                      readOnly: true,
                      fieldStyle:
                        "background-color: #d8d8d8; background-image: none;",
                    },
                  ],
                },
                {
                  xtype: "container",
                  layout: {
                    type: "hbox",
                  },

                  width: '100%',
                  items: [
                    {
                      xtype: "combo",
                      name: "cbPlazo",
                      itemId: "cbPlazo",
                      margin: '0 10 0 0',
                      displayField: "NOMBRE",
                      valueField: "CODIGO",
                      store: storeCargarParam_TIPO_CONTRATO,
                      fieldLabel: "Plazo Nuevo",
                      labelAlign: "top",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      flex: 1,
                      allowBlank: true,
                      readOnly: false,
                    },

                    {
                      xtype: "combo",
                      name: "cbJornada",
                      itemId: "cbJornada",
                      margin: '0 10 0 0',
                      displayField: "NOMBRE",
                      valueField: "CODIGO",
                      store: storeCargarParam_JORNADA,
                      fieldLabel: "Jornada Nueva",
                      labelAlign: "top",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      flex: 1,
                      allowBlank: true,
                      readOnly: false,
                    },

                    {
                      xtype: "combo",
                      name: "cbLugar",
                      itemId: "cbLugar",
                      displayField: "NOMBRE",
                      valueField: "CODIGO",
                      store: storeCargarParam_LUGAR_TRABAJO,
                      fieldLabel: "Lugar de Trabajo Nuevo",
                      labelAlign: "top",
                      queryMode: "local",
                      triggerAction: "all",
                      editable: true,
                      typeAhead: true,
                      selectOnFocus: true,
                      forceSelection: true,
                      flex: 1,
                      allowBlank: true,
                      readOnly: false,
                    },
                  ]
                },
                {
                  xtype: "combo",
                  name: "cbContrato",
                  itemId: "cbContrato",
                  displayField: "INFO",
                  valueField: "PK_ID",
                  store: storeCargarContratos,
                  fieldLabel: "Contrato",
                  labelAlign: "top",
                  queryMode: "local",
                  triggerAction: "all",
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  forceSelection: true,
                  width: '100%',
                  allowBlank: true,
                  readOnly: false,
                },

              ],
            },
          ]
        },
      ],
    },
  ],
});


var resetModificarFichaGeneral = function () {
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldo"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #checkMidPoint"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbContrato"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0].reset();

  Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtMotivo"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbMotivo"
  )[0].reset();
};

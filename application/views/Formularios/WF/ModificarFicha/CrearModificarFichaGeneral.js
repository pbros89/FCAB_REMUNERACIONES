Ext.define("fcab.Container.WFModificarFichaCrearGeneral", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearGeneral",
  itemId: "WFModificarFichaCrearGeneral",
  border: false,
  frame: false,
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
                "<li><b>Ningún campo es obligatorio.</b></li>" +
                "<li><b>Solo rellene los campos que necesita actualizar.</b></li>" +
                "<li><b>Trate de siempre dejar un comentario al dato que actualice.</b></li>" +
                "<li><b>Los campos que no necesita actualizar dejelos en blanco.</b></li>" +
                "</ul>",
            },
          ],
        },
        {
          xtype: "fieldset",
          title: "<b>Motivo de modificación</b>",
          style: "margin: 5px",

          layout: {
            type: "hbox",
          },

          items: [
            {
              xtype: "container",
              flex: 1,
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtMotivo",
                  name: "txtMotivo",
                  labelAlign: "top",
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
              title: "<b>Sueldo</b>",
              style: "margin: 5px",
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
                  width: '100%',
                  items: [
                    {
                      xtype: "thousandnumber",
                      margin: '0 10px 0 0',
                      itemId: "txtSueldoOld",
                      name: "txtSueldoOld",
                      labelAlign: "top",
                      fieldLabel: "Actual",
                      forcePrecision: true,
                      decimalPrecision: 0,
                      allowDecimals: false,
                      flex: 1,
                      allowBlank: true,
                      readOnly: true,
                      fieldStyle:
                        "background-color: #d8d8d8; background-image: none;",
                    },
                    {
                      xtype: "thousandnumber",
                      itemId: "txtSueldo",
                      name: "txtSueldo",
                      forcePrecision: true,
                      decimalPrecision: 0,
                      allowDecimals: false,
                      labelAlign: "top",
                      fieldLabel: "Nuevo",
                      flex: 1,
                      allowBlank: true,
                      minValue: 0,
                    },
                  ],
                },

                {
                  xtype: "textareafield",
                  itemId: "txtSueldoObs",
                  name: "txtSueldoObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  width: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },


                {
                  xtype: "container",
                  width: "100%",
                  layout: {
                    type: "hbox",
                    align: "bottom",
                    pack: "end",
                  },
                  items: [
                    {
                      xtype: "button",
                      text: "Limpiar",
                      handler: function () {
                        Ext.ComponentQuery.query(
                          "#WFModificarFichaCrearTabpanel #txtSueldo"
                        )[0].reset();
                        Ext.ComponentQuery.query(
                          "#WFModificarFichaCrearTabpanel #txtSueldoObs"
                        )[0].reset();
                      },
                    },
                  ],
                },
              ],
            },
            {
              xtype: "fieldset",
              title: "<b>Cargo</b>",
              style: "margin: 5px",
              flex: 1,
              layout: {
                type: "vbox",
              },
              items: [
                {
                  xtype: "container",
                  width: '100%',
                  layout: "hbox",
                  items: [
                    {
                      xtype: "textfield",
                      margin: '0 10px 0 0',
                      itemId: "txtCargoOld",
                      name: "txtCargoOld",
                      labelAlign: "top",
                      fieldLabel: "Actual",
                      flex: 1,
                      maxLength: 500,
                      allowBlank: true,
                      readOnly: true,
                      fieldStyle:
                        "background-color: #d8d8d8; background-image: none;",
                    },
                    {
                      xtype: "combo",
                      name: "cbCargo",
                      itemId: "cbCargo",
                      displayField: "NOMBRE",
                      valueField: "CODIGO",
                      store: storeCargarCargosFiltro,
                      fieldLabel: "Nuevo",
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
                  ],
                },
                {
                  xtype: "textareafield",
                  itemId: "txtCargoObs",
                  name: "txtCargoObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  width: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },

                {
                  xtype: "container",
                  width: "100%",
                  layout: {
                    type: "hbox",
                    align: "bottom",
                    pack: "end",
                  },
                  items: [
                    {
                      xtype: "button",
                      text: "Limpiar",
                      handler: function () {
                        Ext.ComponentQuery.query(
                          "#WFModificarFichaCrearTabpanel #cbCargo"
                        )[0].reset();
                        Ext.ComponentQuery.query(
                          "#WFModificarFichaCrearTabpanel #txtCargoObs"
                        )[0].reset();
                      },
                    },
                  ],
                },
              ],
            },
          ]
        },


        {
          xtype: "fieldset",
          title: "<b>Centro de Costo</b>",
          style: "margin: 5px",
          flex: 1,
          layout: {
            type: "vbox",
            align: "strech",
          },

          items: [
            {
              xtype: "container",
              width: '100%',
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtCCOld",
                  name: "txtCCOld",
                  labelAlign: "top",
                  fieldLabel: "Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              layout: "anchor",
              style: "margin: 0 10px 5px 0",
              items: [
                {
                  xtype: "combo",
                  name: "cbCC",
                  itemId: "cbCC",
                  displayField: "NOMBRE_FULL",
                  valueField: "CODIGO",
                  store: storeCargarCentroCostosFiltro,
                  fieldLabel: "Nuevo",
                  labelAlign: "top",
                  queryMode: "local",
                  triggerAction: "all",
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  forceSelection: true,
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtGerenciaOld",
                  name: "txtGerenciaOld",
                  labelAlign: "top",
                  fieldLabel: "Gerencia Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtGerencia",
                  name: "txtGerencia",
                  labelAlign: "top",
                  fieldLabel: "Gerencia Nueva",
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtDepartamentoOld",
                  name: "txtDepartamentoOld",
                  labelAlign: "top",
                  fieldLabel: "Departamento Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtDepartamento",
                  name: "txtDepartamento",
                  labelAlign: "top",
                  fieldLabel: "Departamento Nuevo",
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtJefeOld",
                  name: "txtJefeOld",
                  labelAlign: "top",
                  fieldLabel: "Jefatura Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtJefe",
                  name: "txtJefe",
                  labelAlign: "top",
                  fieldLabel: "Actual",
                  anchor: "100%",
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
              columnWidth: 1,
              layout: "anchor",
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtCCObs",
                  name: "txtCCObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  anchor: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: {
                type: "hbox",
                align: "bottom",
                pack: "end",
              },
              items: [
                {
                  xtype: "button",
                  text: "Limpiar",
                  handler: function () {
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #cbCC"
                    )[0].reset();
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #txtCCObs"
                    )[0].reset();
                  },
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldset",
          title: "<b>Plazo de contrato</b>",
          style: "margin: 5px",
          columnWidth: 0.5,
          layout: {
            type: "column",
            align: "strech",
          },

          items: [
            {
              xtype: "container",
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtPlazoOld",
                  name: "txtPlazoOld",
                  labelAlign: "top",
                  fieldLabel: "Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              layout: "anchor",
              items: [
                {
                  xtype: "combo",
                  name: "cbPlazo",
                  itemId: "cbPlazo",
                  displayField: "NOMBRE",
                  valueField: "CODIGO",
                  store: storeCargarParam_TIPO_CONTRATO,
                  fieldLabel: "Nuevo",
                  labelAlign: "top",
                  queryMode: "local",
                  triggerAction: "all",
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  forceSelection: true,
                  anchor: "100%",
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: "anchor",
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtPlazoObs",
                  name: "txtPlazoObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  anchor: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: {
                type: "hbox",
                align: "bottom",
                pack: "end",
              },
              items: [
                {
                  xtype: "button",
                  text: "Limpiar",
                  handler: function () {
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #cbPlazo"
                    )[0].reset();
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #txtPlazoObs"
                    )[0].reset();
                  },
                },
              ],
            },
          ],
        },

        {
          xtype: "fieldset",
          title: "<b>Jornada</b>",
          style: "margin: 5px",
          columnWidth: 0.5,
          layout: {
            type: "column",
            align: "strech",
          },

          items: [
            {
              xtype: "container",
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtJornadaOld",
                  name: "txtJornadaOld",
                  labelAlign: "top",
                  fieldLabel: "Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              layout: "anchor",
              items: [
                {
                  xtype: "combo",
                  name: "cbJornada",
                  itemId: "cbJornada",
                  displayField: "NOMBRE",
                  valueField: "CODIGO",
                  store: storeCargarParam_JORNADA,
                  fieldLabel: "Nuevo",
                  labelAlign: "top",
                  queryMode: "local",
                  triggerAction: "all",
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  forceSelection: true,
                  anchor: "100%",
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: "anchor",
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtJornadaObs",
                  name: "txtJornadaObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  anchor: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: {
                type: "hbox",
                align: "bottom",
                pack: "end",
              },
              items: [
                {
                  xtype: "button",
                  text: "Limpiar",
                  handler: function () {
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #cbJornada"
                    )[0].reset();
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #txtJornadaObs"
                    )[0].reset();
                  },
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldset",
          title: "<b>Lugar de Trabajo</b>",
          style: "margin: 5px",
          columnWidth: 0.5,
          layout: {
            type: "column",
            align: "strech",
          },

          items: [
            {
              xtype: "container",
              columnWidth: 0.5,
              style: "margin: 0 10px 0 0",
              layout: "anchor",
              items: [
                {
                  xtype: "textfield",
                  itemId: "txtLugarOld",
                  name: "txtLugarOld",
                  labelAlign: "top",
                  fieldLabel: "Actual",
                  anchor: "100%",
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
              columnWidth: 0.5,
              layout: "anchor",
              items: [
                {
                  xtype: "combo",
                  name: "cbLugar",
                  itemId: "cbLugar",
                  displayField: "NOMBRE",
                  valueField: "CODIGO",
                  store: storeCargarParam_LUGAR_TRABAJO,
                  fieldLabel: "Nuevo",
                  labelAlign: "top",
                  queryMode: "local",
                  triggerAction: "all",
                  editable: true,
                  typeAhead: true,
                  selectOnFocus: true,
                  forceSelection: true,
                  anchor: "100%",
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: "anchor",
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtLugarObs",
                  name: "txtLugarObs",
                  labelAlign: "top",
                  fieldLabel: "Comentario",
                  anchor: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: {
                type: "hbox",
                align: "bottom",
                pack: "end",
              },
              items: [
                {
                  xtype: "button",
                  text: "Limpiar",
                  handler: function () {
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #cbLugar"
                    )[0].reset();
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #txtLugarObs"
                    )[0].reset();
                  },
                },
              ],
            },
          ],
        },
        {
          xtype: "fieldset",
          title: "<b>Bonos asignaciones y otras</b>",
          style: "margin: 5px",
          columnWidth: 0.5,
          layout: {
            type: "column",
            align: "strech",
          },

          items: [
            {
              xtype: "container",
              columnWidth: 1,
              layout: "anchor",
              items: [
                {
                  xtype: "textareafield",
                  itemId: "txtBono",
                  name: "txtBono",
                  labelAlign: "top",
                  fieldLabel: "Detallar",
                  anchor: "100%",
                  typeAhead: true,
                  maxLength: 1000,
                  allowBlank: true,
                  readOnly: false,
                },
              ],
            },
            {
              xtype: "container",
              columnWidth: 1,
              layout: {
                type: "hbox",
                align: "bottom",
                pack: "end",
              },
              items: [
                {
                  xtype: "button",
                  text: "Limpiar",
                  handler: function () {
                    Ext.ComponentQuery.query(
                      "#WFModificarFichaCrearTabpanel #txtBono"
                    )[0].reset();
                  },
                },
              ],
            },
          ],
        },

      ],
    },
  ],
});

var setTrabajadorModificarFichaGeneral = function (trabajador) {
  var item = trabajador.selection.data;
  console.log(item);
  resetModificarFichaGeneral();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoOld"
  )[0].setValue(item.SALARIO_BASE);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoOld"
  )[0].setValue(item.NOM_CARGO);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoOld"
  )[0].setValue(item.TIPO_CONTRATO);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaOld"
  )[0].setValue(item.JORNADA);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarOld"
  )[0].setValue(item.NOM_LUGAR_TRABAJO);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCOld"
  )[0].setValue(item.COD_CC + " - " + item.NOM_CC);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtGerenciaOld"
  )[0].setValue(item.NOM_GERENCIA);

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtDepartamentoOld"
  )[0].setValue(item.NOM_DEPARTAMENTO);

  if (item.RUT_SUPERVISOR) {
    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #txtJefeOld"
    )[0].setValue(item.RUT_SUPERVISOR + " " + item.NOM_SUPERVISOR);
  } else {
    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #txtJefeOld"
    )[0].reset();
  }
}


var resetModificarFichaGeneral = function () {
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldo"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtSueldoOld"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbCargo"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCargoOld"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbPlazo"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtPlazoOld"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtBono"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbJornada"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtJornadaOld"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #cbLugar"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtLugarOld"
  )[0].reset();

  Ext.ComponentQuery.query("#WFModificarFichaCrearTabpanel #cbCC")[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCObs"
  )[0].reset();
  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtCCOld"
  )[0].reset();

  Ext.ComponentQuery.query(
    "#WFModificarFichaCrearTabpanel #txtMotivo"
  )[0].reset();
};

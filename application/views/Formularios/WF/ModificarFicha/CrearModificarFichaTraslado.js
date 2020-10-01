Ext.define("fcab.Container.WFModificarFichaCrearTraslado", {
    extend: "Ext.container.Container",
    xtype: "WFModificarFichaCrearTraslado",
    itemId: "WFModificarFichaCrearTraslado",
    width: "100%",
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
  
        padding: 10,
        autoScroll: true,
        layout: {
          type: "column",
          align: "strech",
        },
  
        items: [
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
                    text: "Limpiar Pestaña",
                    scale: 'large',
                    handler: function () {
                      resetModificarFichaTraslado();
                    },
                  },
                ],
              },
          {
            xtype: "fieldset",
            title: "<b>Instrucciones</b>",
            style: "margin: 5px",
            columnWidth: 1,
            layout: {
              type: "column",
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
            title: "<b>Cargo</b>",
            style: "margin: 5px",
            columnWidth: 1,
            layout: {
              type: "column",
              align: "strech",
            },
  
            items: [
              {
                xtype: "container",
                columnWidth: 0.5,
                layout: "anchor",
                style: "margin: 0 10px 0 0",
                items: [
                  {
                    xtype: "textfield",
                    itemId: "txtCargoOldTras",
                    name: "txtCargoOldTras",
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
                    name: "cbCargoTras",
                    itemId: "cbCargoTras",
                    displayField: "NOMBRE",
                    valueField: "CODIGO",
                    store: storeCargarCargosFiltro,
                    fieldLabel: "Propuesto",
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
                    itemId: "txtCargoObsTras",
                    name: "txtCargoObsTras",
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
              
            ],
          },
          {
            xtype: "fieldset",
            title: "<b>Tiempo Traslado</b>",
            style: "margin: 5px",
            columnWidth: .5,
            layout: {
              type: "column",
              align: "strech",
            },
  
            items: [{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 0 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtIniTras',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'F. Inicio',
                    itemId: 'dtIniTras',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: true,
                },]
                
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 0 0',
                items: [{
                    xtype: 'datefield',
                    name: 'dtFinTras',
                    labelAlign: 'top',
                    anchor: '100%',  
                    fieldLabel: 'F. Término',
                    itemId: 'dtFinTras',
                    emptyText: 'yyyy/mm/dd',
                    submitFormat: 'Y/m/d',
                    format : 'Y/m/d',
                    editable: true,
                    allowBlank: true,
                },]
                
            },
              
              
            ],
          },{
            xtype: "fieldset",
            title: "<b>Bono de reemplazo</b>",
            style: "margin: 5px",
            columnWidth: .5,
            layout: {
              type: "column",
              align: "strech",
            },
  
            items: [
                {
                    xtype: "container",
                    columnWidth: 0.5,
                    layout: 'anchor',
                    style: 'margin: 0 10px 0 0',
                    hidden: true,
                    items: [
                      {
                        xtype: "thousandnumber",
                        itemId: "txtMonto",
                        name: "txtMonto",
                        forcePrecision: true,
                        decimalPrecision: 0,
                        allowDecimals: false,
                        labelAlign: "top",
                        fieldLabel: "Monto",
                        width: "100%",
                        allowBlank: true,
                        disabled: true,
                        minValue: 0,
                      },
                    ],
                  },
                  {
                    xtype      : 'fieldcontainer',
                    //fieldLabel : 'Size',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: {
                        type: 'hbox',
                    },
                    margin: '30 0 0 10',
                    items: [
                        {
                            boxLabel  : 'Si',
                            name      : 'rbBono',
                            inputValue: '1',
                            id        : 'radioSiTras',
                            
                            width: 50,
                            listeners: {
                              change: function(rf, newValue, oldValue) {
                                  console.log(newValue);
                                  if (newValue) {
                                    Ext.ComponentQuery.query(
                                      "#WFModificarFichaCrearTabpanel #txtMonto"
                                    )[0].setDisabled(false);
                                  }
                              }
                            }
                        }, {
                            boxLabel  : 'No',
                            name      : 'rbBono',
                            inputValue: '0',
                            id        : 'radioNoTras',
                            checked   : true,
                            width: 50,
                            listeners: {
                              change: function(rf, newValue, oldValue) {
                                console.log(newValue);
                                  if (newValue) {
                                    Ext.ComponentQuery.query(
                                      "#WFModificarFichaCrearTabpanel #txtMonto"
                                    )[0].reset();
                                    Ext.ComponentQuery.query(
                                      "#WFModificarFichaCrearTabpanel #txtMonto"
                                    )[0].setDisabled(true)
                                  }
                              }
                            }
                        }, 
                    ]
                },
              
            ],
          },
        ],
      },
    ],
  });
  
  var setTrabajadorModificarFichaTraslado = function (trabajador) {
    var item = trabajador.selection.data;
    console.log(item);
    resetModificarFichaTraslado();

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #txtCargoOldTras"
    )[0].setValue(item.NOM_CARGO);
  };
  
  var resetModificarFichaTraslado = function () {
    
    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #cbCargoTras"
    )[0].reset();

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #dtIniTras"
    )[0].reset();

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #dtFinTras"
    )[0].reset();

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #txtMonto"
    )[0].reset();

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #radioNoTras"
    )[0].setValue(true);

    Ext.ComponentQuery.query(
      "#WFModificarFichaCrearTabpanel #txtCargoObsTras"
    )[0].reset();
    
  };
  
  
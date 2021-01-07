Ext.define("fcab.Container.IndMainResumen", {
  extend: "Ext.Panel",
  xtype: "IndMainResumen",
  itemId: "IndMainResumen",
  border: false,
  frame: false,
  width: "100%",
  layout: 'anchor',
  padding: 10,
  //height:
  constructor: function (config) {
    this.callParent([config]);
  },
  listeners: {
    afterrender: function () {
      //storeCargarParam_SALUD.load();
      //storeCargarParam_TIPO_CAMBIO_SALUD.load();
      //storeExtras_cargarPeriodos.load();
    },
  },
  items: [
    {
      layout: {
        type: "hbox",
        pack: "center",
        align: "center",
      },
      width:'100%',
      border: false,
      items: [
        {
          xtype: "IndMainResumenDotacion",
        },
        {
          xtype: "IndMainResumenDisEtaria",
        },
      ],
    },
    {
      layout: {
        type: "hbox",
        pack: "center",
        align: "center",
      },
      border: false,
      width:'100%',
      items: [
        {
          xtype: "IndMainResumenDisAntiguedad",
        },
        {
          xtype: "IndMainResumenRotacionTotal",
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.IndMainResumen.Dotacion", {
  extend: "Ext.Panel",
  xtype: "IndMainResumenDotacion",
  layout: "fit",
  height: 300,
  width: 600,
  padding: 10,
  items: [
    {
      xtype: "polar",
      reference: "chart",
      theme: "default-gradients",

      captions: {
        title: "Dotación " + NOM_EMPRESA,
        credits: {
          text: "Periodo: 09/2020\n" + "Agrupación: Rol",
          align: "left",
        },
      },
      legend: {
        docked: "rigth", //'bottom'
      },
      //store: storeSumatoriaSolicitudesGF,
      //insetPadding: 40,
      //innerPadding: 20,
      interactions: ["rotate", "itemhighlight"],
      /*sprites: [{
            type: 'text',
            text: 'Sumario de Estados',
            fontSize: 16,
            width: 70,
            height: 20,
            x: 10, // the sprite x position
            y: 20  // the sprite y position
        }],*/
      series: [
        {
          type: "pie",
          angleField: "CONTADOR",
          label: {
            field: "INFO",
            calloutLine: {
              length: 60,
              width: 3,
              // specifying 'color' is also possible here
            },
          },
          highlight: true,
          tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
              tooltip.setHtml(
                record.get("NOM_EST") + ": " + record.get("INFO") + "%"
              );
            },
          },
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.IndMainResumen.DisEtaria", {
  extend: "Ext.Panel",
  xtype: "IndMainResumenDisEtaria",
  layout: "anchor",
  height: 300,
  width: 600,
  padding: 10,
  items: [
    {
      xtype: "polar",
      reference: "chart",
      theme: "default-gradients",

      captions: {
        title: "Distribución Etaria " + NOM_EMPRESA,
        credits: {
          text: "Periodo: 09/2020",
          align: "left",
        },
      },
      legend: {
        docked: "rigth", //'bottom'
      },
      //store: storeSumatoriaSolicitudesGF,
      //insetPadding: 40,
      //innerPadding: 20,
      interactions: ["rotate", "itemhighlight"],
      /*sprites: [{
              type: 'text',
              text: 'Sumario de Estados',
              fontSize: 16,
              width: 70,
              height: 20,
              x: 10, // the sprite x position
              y: 20  // the sprite y position
          }],*/
      series: [
        {
          type: "pie",
          angleField: "CONTADOR",
          label: {
            field: "INFO",
            calloutLine: {
              length: 60,
              width: 3,
              // specifying 'color' is also possible here
            },
          },
          highlight: true,
          tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
              tooltip.setHtml(
                record.get("NOM_EST") + ": " + record.get("INFO") + "%"
              );
            },
          },
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.IndMainResumen.DisAntiguedad", {
  extend: "Ext.Panel",
  xtype: "IndMainResumenDisAntiguedad",
  layout: "fit",
  height: 300,
  width: 600,
  padding: 10,
  items: [
    {
      xtype: "polar",
      reference: "chart",
      theme: "default-gradients",

      captions: {
        title: "Distribución Antiguedad " + NOM_EMPRESA,
        credits: {
          text: "Periodo: 09/2020",
          align: "left",
        },
      },
      legend: {
        docked: "rigth", //'bottom'
      },
      //store: storeSumatoriaSolicitudesGF,
      //insetPadding: 40,
      //innerPadding: 20,
      interactions: ["rotate", "itemhighlight"],
      /*sprites: [{
              type: 'text',
              text: 'Sumario de Estados',
              fontSize: 16,
              width: 70,
              height: 20,
              x: 10, // the sprite x position
              y: 20  // the sprite y position
          }],*/
      series: [
        {
          type: "pie",
          angleField: "CONTADOR",
          label: {
            field: "INFO",
            calloutLine: {
              length: 60,
              width: 3,
              // specifying 'color' is also possible here
            },
          },
          highlight: true,
          tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
              tooltip.setHtml(
                record.get("NOM_EST") + ": " + record.get("INFO") + "%"
              );
            },
          },
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.IndMainResumen.RotacionTotal", {
  extend: "Ext.Panel",
  xtype: "IndMainResumenRotacionTotal",
  layout: "fit",
  height: 300,
  width: 600,
  padding: 10,
  items: [
    {
      xtype: "polar",
      reference: "chart",
      theme: "default-gradients",

      captions: {
        title: "Rotación Total " + NOM_EMPRESA,
        credits: {
          text: "Periodo: 09/2020",
          align: "left",
        },
      },
      legend: {
        docked: "rigth", //'bottom'
      },
      //store: storeSumatoriaSolicitudesGF,
      //insetPadding: 40,
      //innerPadding: 20,
      interactions: ["rotate", "itemhighlight"],
      /*sprites: [{
                type: 'text',
                text: 'Sumario de Estados',
                fontSize: 16,
                width: 70,
                height: 20,
                x: 10, // the sprite x position
                y: 20  // the sprite y position
            }],*/
      series: [
        {
          type: "pie",
          angleField: "CONTADOR",
          label: {
            field: "INFO",
            calloutLine: {
              length: 60,
              width: 3,
              // specifying 'color' is also possible here
            },
          },
          highlight: true,
          tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
              tooltip.setHtml(
                record.get("NOM_EST") + ": " + record.get("INFO") + "%"
              );
            },
          },
        },
      ],
    },
  ],
});

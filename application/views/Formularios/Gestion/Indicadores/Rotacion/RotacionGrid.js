Ext.define("fcab.Container.IndRotacion.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndRotacionGrid",
  itemId: "IndRotacionGrid",
  store: storeCargarConteoRotacionMensual,//Ext.create('Ext.data.Store'),
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  margin: 10,
  plugins: pluginFactory(),
  columns: [
    {
      text: "AÑO",
      sortable: true,
      dataIndex: "ANHO",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "MES",
      sortable: true,
      dataIndex: "MES_TEXT",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "ROL",
      sortable: true,
      dataIndex: "ROL",
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "DOTACION",
      sortable: true,
      dataIndex: "DOTACION",
      width: 100,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "ROTACION TOTAL",
      sortable: true,
      dataIndex: "ROTACION_TOTAL",
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "ROTACION VOLUNTARIA",
      sortable: true,
      dataIndex: "ROTACION_VOLUNTARIA",
      width: 150,
      renderer: function (value, meta, record) {
        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }
        return value;
      },
    },
    {
      text: "% ROTACION TOTAL",
      sortable: true,
      dataIndex: "% ROTACION TOTAL",
      width: 150,
      renderer: function (value, meta, record) {
        var valor =
          record.data.ROTACION_TOTAL > 0
            ? (record.data.ROTACION_TOTAL * 100) / record.data.DOTACION
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
      },
    },

    {
      text: "% ROTACION VOLUNTARIA",
      sortable: true,
      dataIndex: "% ROTACION VOLUNTARIA",
      width: 150,
      renderer: function (value, meta, record) {
        var valor =
          record.data.ROTACION_VOLUNTARIA > 0
            ? (record.data.ROTACION_VOLUNTARIA * 100) / record.data.DOTACION
            : 0;
        var final = valor.toFixed(2);

        if (record.data.MES_TEXT === "TOTAL") {
          meta.style = "font-weight: bold;";
        }

        return final + "%";
      },
    },
  ],
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
              title: "Rotacion",
              fileName: "Rotacion_" + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
});

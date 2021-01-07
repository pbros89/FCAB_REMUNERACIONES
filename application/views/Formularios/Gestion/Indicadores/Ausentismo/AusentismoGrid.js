Ext.define("fcab.Container.IndAusentismo.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "IndAusentismoGrid",
  itemId: "IndAusentismoGrid",
  store: Ext.create('Ext.data.Store'),
  //store: storeCargarConteoAusentismoMensual,
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
      hidden: false,
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "MES",
      sortable: true,
      dataIndex: "MES_TEXT",
      hidden: false,
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "DIAS_TOTALES",
      sortable: true,
      dataIndex: "TOTAL",
      //align: 'center',
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "DIAS_TRABAJADOS",
      sortable: true,
      dataIndex: "DIAS_TRABAJADOS",
      //align: 'center',
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "VACACIONES",
      sortable: true,
      dataIndex: "VACACIONES",
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "LICENCIAS",
      sortable: true,
      dataIndex: "LICENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "AUSENCIAS",
      sortable: true,
      dataIndex: "AUSENCIAS",
      width: 100,
      renderer: function (value, meta, record) {
        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}
        return value;
      },
    },
    {
      text: "% VACACIONES",
      sortable: true,
      dataIndex: "VACACIONES",
      width: 100,
      renderer: function (value, meta, record) {
        var valor = record.data.TOTAL > 0 ? record.data.VACACIONES * 100 / record.data.TOTAL : 0;
        var final = valor.toFixed(2);

        if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}

        return final + '%';
      },
    },
    {
        text: "% LICENCIAS",
        sortable: true,
        dataIndex: "LICENCIAS",
        width: 100,
        renderer: function (value, meta, record) {
          var valor = record.data.TOTAL > 0 ? record.data.LICENCIAS * 100 / record.data.TOTAL : 0;
          var final = valor.toFixed(2);

          if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}

          return final + '%';
        },
      },
      {
        text: "% AUSENCIAS",
        sortable: true,
        dataIndex: "AUSENCIAS",
        width: 100,
        renderer: function (value, meta, record) {
          var valor = record.data.TOTAL > 0 ? record.data.AUSENCIAS * 100 / record.data.TOTAL : 0;
          var final = valor.toFixed(2);

          if(record.data.MES_TEXT === 'TOTAL'){ meta.style = 'font-weight: bold;';}

          return final + '%';
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
              title: "Ausentismo ",
              fileName: "Ausentismo_" + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
});

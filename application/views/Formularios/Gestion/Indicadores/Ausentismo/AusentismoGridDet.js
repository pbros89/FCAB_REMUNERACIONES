Ext.define("fcab.Container.IndAusentismo.GrillaDet", {
    extend: "Ext.grid.Panel",
    xtype: "IndAusentismoGridDet",
    itemId: "IndAusentismoGridDet",
    store: storeCargarConteoAusentismoGerencia,
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
      },
      {
        text: "MES",
        sortable: true,
        dataIndex: "MES_TEXT",
        hidden: false,
        width: 100,
      },
      {
        text: "COD_GERENCIA",
        sortable: true,
        dataIndex: "COD_GERENCIA",
        hidden: false,
        width: 100,
      },
      {
        text: "DIAS_TOTALES",
        sortable: true,
        dataIndex: "TOTAL",
        //align: 'center',
        width: 100,
      },
      {
        text: "DIAS_TRABAJADOS",
        sortable: true,
        dataIndex: "DIAS_TRABAJADOS",
        //align: 'center',
        width: 100,
      },
      {
        text: "VACACIONES",
        sortable: true,
        dataIndex: "VACACIONES",
        width: 100,
        //hidden: true
      },
      {
        text: "LICENCIAS",
        sortable: true,
        dataIndex: "LICENCIAS",
        width: 100,
        //hidden: true
      },
      {
        text: "AUSENCIAS",
        sortable: true,
        dataIndex: "AUSENCIAS",
        width: 100,
        //hidden: true
      },
      {
        text: "% VACACIONES",
        sortable: true,
        dataIndex: "VACACIONES",
        width: 100,
        renderer: function (value, meta, record) {
          var valor = record.data.TOTAL > 0 ? record.data.VACACIONES * 100 / record.data.TOTAL : 0;
          var final = valor.toFixed(2);
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
                fileName: "Ausentismo_Det_" + new Date().getTime() + ".xls",
              });
            },
          },
        ],
      },
    ],
  });
  
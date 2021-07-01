Ext.define("fcab.Container.WFModificarFichaDetalleTrabajadores", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaDetalleTrabajadores",
  itemId: "WFModificarFichaDetalleTrabajadores",
  border: false,
  frame: false,
  layout: 'fit',
  constructor: function (config) {
    this.callParent([config]);
  },
  items: [
    
    {
      xtype: "WFModificarFichaDetalleTrabajadoresGrilla"
    }
  ],
});


Ext.define("fcab.Container.WFModificarFichaDetalleTrabajadoresGrilla", {
  extend: "Ext.grid.Panel",
  xtype: "WFModificarFichaDetalleTrabajadoresGrilla",
  itemId: "WFModificarFichaDetalleTrabajadoresGrilla",
  title: "Trabajadores",
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  width: "100%",
  flex: 1,
  store: storeCargarSolicitudesCambioFichaDet,
  columns: [
    {
      text: "Id",
      sortable: true,
      dataIndex: "PFK_PERSONAL",
      hidden: true,
      width: 120,
    },

    {
      text: "Rut",
      sortable: true,
      dataIndex: "RUT",
      hidden: false,
      width: 120,
    },
    {
      text: "Nombre",
      sortable: true,
      dataIndex: "NOMBRE",
      hidden: false,
      width: 200,
    },

    {
      text: "ID Gerencia",
      sortable: true,
      dataIndex: "COD_GERENCIA",
      hidden: false,
      width: 100,
    },
    {
      text: "Gerencia",
      sortable: true,
      dataIndex: "NOM_GERENCIA",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Departamento",
      sortable: true,
      dataIndex: "COD_DEPARTAMENTO",
      hidden: false,
      width: 100,
    },
    {
      text: "Departamento",
      sortable: true,
      dataIndex: "NOM_DEPARTAMENTO",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Ceco",
      sortable: true,
      dataIndex: "COD_CC",
      hidden: false,
      width: 100,
    },
    {
      text: "Ceco",
      sortable: true,
      dataIndex: "NOM_CC",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Cargo",
      sortable: true,
      dataIndex: "COD_CARGO",
      hidden: false,
      width: 100,
    },
    {
      text: "Cargo",
      sortable: true,
      dataIndex: "NOM_CARGO",
      hidden: false,
      width: 100,
    },

    {
      text: "ID Plazo",
      sortable: true,
      dataIndex: "COD_PLAZO",
      hidden: false,
      width: 100,
    },
    {
      text: "Plazo",
      sortable: true,
      dataIndex: "NOM_PLAZO",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Jornada",
      sortable: true,
      dataIndex: "COD_JORNADA",
      hidden: false,
      width: 100,
    },
    {
      text: "Jornada",
      sortable: true,
      dataIndex: "NOM_JORNADA",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Lugar",
      sortable: true,
      dataIndex: "COD_LUGAR",
      hidden: false,
      width: 100,
    },
    {
      text: "Lugar",
      sortable: true,
      dataIndex: "NOM_LUGAR",
      hidden: false,
      width: 100,
    },
    {
      text: "Sueldo",
      sortable: true,
      dataIndex: "SUELDO",
      hidden: false,
      width: 100,
      renderer: Ext.util.Format.numberRenderer('0.0,0')
    },
  ],

});

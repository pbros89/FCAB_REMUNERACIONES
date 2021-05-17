/**
 * Contenedor
 **/
Ext.define("fcab.Container.MasterTarifario", {
  extend: "Ext.container.Container",
  xtype: "MasterTarifario",
  layout: "fit",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  constructor: function (config) {
    this.callParent([config]);

    /*ROL_ACCIONES.forEach((accion) => {
      var estado = accion.ESTADO;
      var acc = accion.PFK_ACCION;
      var pantalla = accion.PFK_PANTALLA;

      if (pantalla == "MAESTRO_CC" && estado == "A") {
        switch (acc) {
          case "INGRESAR":
            Ext.ComponentQuery.query(
              "#MasterTarifarioGrilla #btnIngresar"
            )[0].setHidden(false);
            break;
          case "EDITAR":
            Ext.ComponentQuery.query("#MasterTarifarioGrilla #btnEditar")[0].setHidden(
              false
            );
            break;
        }
      } else if (pantalla == "MAESTRO_CC" && estado != "A" && acc == "EDITAR") {
        //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
        Ext.ComponentQuery.query("#MasterTarifarioGrilla")[0].suspendEvents();
      }
    });*/

    cargarMasterTarifario();
  },
  items: [
    {
      xtype: "MasterTarifarioGrilla",
    },
  ],
});

Ext.define("fcab.Container.MasterTarifario.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "MasterTarifarioGrilla",
  itemId: "MasterTarifarioGrilla",
  store: storeCargarTarifas,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  width: "100%",
  title: "Maestro Tarifario (TRAIN)",
  viewConfig: {
    stripeRows: true,
  },
  columns: [
  {
    text: "Nro Solicitud",
    sortable: true,
    dataIndex: "NRO_SOLICITUD",
    //align: 'center',
    hidden: false,
    width: 80,
  },
  {
    text: "Rut",
    sortable: true,
    dataIndex: "RUT",
    //align: 'center',
    hidden: false,
    width: 100,
  },
  {
    text: "Razón Social",
    sortable: true,
    dataIndex: "RAZON_SOCIAL",
    //align: 'center',
    hidden: false,
    width: 200,
  },
  {
    text: "Id Ruta",
    sortable: true,
    dataIndex: "ID_RUTA",
    width: 100,
  },
  {
    text: "Servicio",
    sortable: true,
    dataIndex: "SERVICIO",
    width: 100,
  },
  {
    text: "Bono Con",
    sortable: true,
    dataIndex: "BONO_CONDUCTOR",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },

  {
    text: "Bono Con Sec",
    sortable: true,
    dataIndex: "BONO_CONDUCTOR_SEC",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },
  {
    text: "Viático",
    sortable: true,
    dataIndex: "VIATICO",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },
  {
    text: "Valor",
    sortable: true,
    dataIndex: "VALOR",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },

  {
    text: "Ton 27.5",
    sortable: true,
    dataIndex: "TON_27_5",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },

  {
    text: "Peaje",
    sortable: true,
    dataIndex: "PEAJE",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },


  {
    text: "Tiempo Espera",
    sortable: true,
    dataIndex: "TIEMPO_ESPERA",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },
  {
    text: "Factor TE",
    sortable: true,
    dataIndex: "FACTOR_TE",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },
  {
    text: "Bono SQM",
    sortable: true,
    dataIndex: "BONO_SQM",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  },
  {
    text: "MP Vacio",
    sortable: true,
    dataIndex: "MP_VACIO",
    width: 100,
    renderer: Ext.util.Format.numberRenderer('0.0,0'),
  }],
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          text: "Agregar Tarifa",
          itemId: "btnIngresar",
          hidden: false,
          tooltip: "Ingresar nuevo tarifa",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickMaestroTarifarioCrear(grid);
          },
        },
        {
          text: "Editar Tarifas",
          itemId: "btnEditar",
          hidden: false,
          tooltip: "Editar tarifas",
          iconCls: "icon-form-edit",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickMaestroTarifarioEditar(grid);
          },
        },
        {
          text: "Cargar factor a tarifas",
          itemId: "btnFactor",
          hidden: false,
          tooltip: "Cargar factor a las tarifas",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickMaestroTarifarioFactor(grid);
          },
        },
        {
          text: "Refrescar",
          tooltip: "Refrescar Pantalla",
          iconCls: "icon-form-refresh",
          handler: function () {
            cargarMasterTarifario();
          },
        },
        {
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "Tarifas " + NOM_EMPRESA,
              fileName:
                "Tarifas " +
                NOM_EMPRESA +
                " " +
                new Date().getTime() +
                ".xls",
            });
          },
        },
      ],
    },
  ],
});

var cargarMasterTarifario = function () {
  storeCargarTarifas.load();
};

var clickMaestroTarifarioCrear = function (grid) {
  var rec = grid.getStore();
  ventanaDinamica("MasterTarifarioCrear", "Agregar Tarifa", "500", "", "MasterTarifarioCrear", 1, 0, rec);
};

var clickMaestroTarifarioEditar = function (grid) {
  var rec = grid.getStore();
  ventanaDinamica("MasterTarifarioGrillaEditar", "Editar Tarifas", "1000", "", "MasterTarifarioGrillaEditar", 1, 0, rec);
};

var clickMaestroTarifarioFactor = function (grid) {
  var rec = grid.getStore();
  ventanaDinamica("MasterTarifarioFactor", "Cargar Factor", "500", "", "MasterTarifarioFactor", 1, 0, rec);
};

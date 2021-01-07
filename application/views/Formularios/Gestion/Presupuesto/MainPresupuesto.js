/**
 * Contenedor
 **/
Ext.define("fcab.Container.MainPresupuesto", {
  extend: "Ext.container.Container",
  xtype: "MainPresupuesto",
  layout: "fit",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  constructor: function (config) {
    this.callParent([config]);

    ROL_ACCIONES.forEach((accion) => {
      var estado = accion.ESTADO;
      var acc = accion.PFK_ACCION;
      var pantalla = accion.PFK_PANTALLA;

      if (pantalla == "PRESUPUESTO" && estado == "A") {
        switch (acc) {
          case "DETALLE":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnDetalle"
            )[0].setHidden(false);
            break;
          case "INGRESAR":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnIngresar"
            )[0].setHidden(false);
            break;
          case "EDITAR":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnEditar"
            )[0].setHidden(false);
            break;
          case "ASOCIAR_CC":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnAsoCC"
            )[0].setHidden(false);
            break;
          case "TERMINAR":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnTerminar"
            )[0].setHidden(false);
            break;
          case "ELIMINAR":
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnEliminar"
            )[0].setHidden(false);
            break;
        }
      } else if (
        pantalla == "PRESUPUESTO" &&
        estado != "A" &&
        acc == "EDITAR"
      ) {
        //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
        Ext.ComponentQuery.query("#MainPresupuestoGrilla")[0].suspendEvents();
      }
    });

    cargarMainPresupuesto(null);
  },
  items: [
    {
      xtype: "MainPresupuestoGrilla",
    },
  ],
});

Ext.define("fcab.Container.MainPresupuesto.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "MainPresupuestoGrilla",
  itemId: "MainPresupuestoGrilla",
  store: storeCargarPresupuestos,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  listeners: {
    itemdblclick: function (view, rec, node, index, e, options) {
      clickEditarPresupuesto(view.grid, index);
    },
  },
  columns: [
    {
      text: "ID Empresa",
      sortable: true,
      dataIndex: "PFK_COD_EMP",
      //align: 'center',
      hidden: true,
      flex: 1,
    },
    {
      text: "Empresa",
      sortable: true,
      dataIndex: "NOM_EMP",
      //align: 'center',
      hidden: true,
      flex: 1,
    },
    {
      text: "Año",
      sortable: true,
      dataIndex: "PK_ANHO",
      //align: 'center',
      flex: 1,
    },
    {
      text: "Tipo",
      sortable: true,
      dataIndex: "PK_TIPO",
      //align: 'center',
      flex: 1,
    },
    {
      text: "Inicio",
      sortable: true,
      dataIndex: "INICIO",
      flex: 2,
    },

    {
      text: "Termino",
      sortable: true,
      dataIndex: "TERMINO",
      flex: 2,
    },
    {
      text: "Creación",
      sortable: true,
      dataIndex: "FECHA_CREACION",
      flex: 2,
      //hidden: true
    },
    {
      text: "Creador",
      sortable: true,
      dataIndex: "USR_CREADOR",
      flex: 2,
    },
    {
      text: "Modificación",
      sortable: true,
      dataIndex: "FECHA_MODIFICO",
      flex: 2,
      hidden: true,
    },
    {
      text: "Modificador",
      sortable: true,
      dataIndex: "USR_MODIFICO",
      flex: 2,
      hidden: true,
    },
    {
      text: "Observacion",
      sortable: true,
      dataIndex: "OBSERVACION",
      flex: 2,
      //hidden: true
    },
    {
      text: "Estado",
      sortable: true,
      dataIndex: "ESTADO",
      flex: 1,
      renderer: function (value, meta) {
        if (value === "EN ESPERA") {
          meta.style = "color:red;";
          return "EN ESPERA";
        } else if (value === "TERMINADO") {
          meta.style = "color:green;";
          return "TERMINADO";
        } else {
          return value;
        }
      },
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          text: "Detalle",
          itemId: "btnDetalle",
          hidden: true,
          tooltip: "Ver Detalle",
          iconCls: "icon-form-detail",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickDetallePresupuesto(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea ver el Detalle",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
        {
          text: "Iniciar",
          itemId: "btnIngresar",
          hidden: true,
          tooltip: "Iniciar nuevo item",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickCrearPresupuesto(grid);
          },
        },
        {
          text: "Editar",
          itemId: "btnEditar",
          hidden: true,
          tooltip: "Editar Item seleccionado",
          iconCls: "icon-form-edit",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickEditarPresupuesto(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea Editar",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
        {
          text: "Asociar Centros de Costos",
          itemId: "btnAsoCC",
          hidden: true,
          tooltip: "Asociar Centros de Costos Item seleccionado",
          iconCls: "icon-form-user",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickAsociarCCPresupuesto(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea Editar",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
        {
          text: "Terminar",
          itemId: "btnTerminar",
          hidden: true,
          tooltip: "Terminar Item seleccionado",
          iconCls: "icon-form-ok",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickTerminarPresupuesto(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea terminar",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
        {
          text: "Eliminar",
          itemId: "btnEliminar",
          hidden: true,
          tooltip: "Eliminar Item seleccionado",
          iconCls: "icon-form-delete",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickEliminarPresupuesto(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea eliminar",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              console.debug(e);
            }
          },
        },
        {
          text: "Refrescar",
          tooltip: "Refrescar Pantalla",
          iconCls: "icon-form-refresh",
          handler: function () {
            var grid = this.up("grid");
            cargarMainPresupuesto(grid.filtros);
          },
        },
        {
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "Presupuestos " + NOM_EMPRESA,
              fileName:
                "Presupuestos " +
                NOM_EMPRESA +
                " " +
                new Date().getTime() +
                ".xls",
            });
          },
        },
        {
          text: "Filtrar",
          tooltip: "Filtrar Tabla",
          iconCls: "icon-form-filter",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              clickFiltrarPresupuesto(grid);
            } catch (e) {
              //msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
              console.debug(e);
            }
          },
        },
        {
          text: "Limpiar",
          itemId: "btnLimFiltro",
          tooltip: "Limpiar Filtros",
          iconCls: "icon-form-filter-del",
          hidden: true,
          width: 120,
          handler: function () {
            var grid = this.up("grid");
            Ext.ComponentQuery.query(
              "#MainPresupuestoGrilla #btnLimFiltro"
            )[0].setHidden(true);
            grid.filtros = null;
            cargarMainPresupuesto(null);
          },
        },
      ],
    },
  ],
  height: Ext.getBody().getViewSize().height - 130,
  width: "100%",
  title: "Presupuesto (" + NOM_EMPRESA + ")",
});

var clickCrearPresupuesto = function (grid) {
  var rec = grid.getStore();
  ventanaDinamica(
    "MainPresupuestoCrear",
    "Crear Presupuesto (" + NOM_EMPRESA + ")",
    "500",
    "",
    "MainPresupuestoCrear",
    1,
    0,
    rec
  );
};

var clickDetallePresupuesto = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  ventanaDinamica(
    "MainPresupuestoDetalle",
    "Detalle Presupuesto (" + NOM_EMPRESA + ")",
    "1000",
    "",
    "MainPresupuestoDetalle",
    1,
    0,
    rec,
    recRow
  );
};

var clickEditarPresupuesto = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  ventanaDinamica(
    "MainPresupuestoEditar",
    "Editar Presupuesto (" + NOM_EMPRESA + ")",
    "500",
    "",
    "MainPresupuestoEditar",
    1,
    0,
    rec,
    recRow
  );
};

var clickTerminarPresupuesto = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Terminar Presupuesto",
    "¿Esta seguro de terminar el presupuesto?",
    function (btn) {
      if (btn === "yes") {
        storeModificarEstadoPresupuesto.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_cod_emp: EMPRESA,
            p_tipo: recRow.data.PK_TIPO,
            p_estado: "TERMINADO",
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Presupuesto terminado correctamente.");
                cargarMainPresupuesto(null);

                /*if(Ext.getCmp('PersonasPresupuesto') != null){
                                    cargarCCPersonasPresupuesto();
                                }*/
              } else {
                Ext.MessageBox.show({
                  title: "ADVERTENCIA",
                  msg: records[0].data.r_msg,
                  icon: Ext.MessageBox.WARNING,
                  buttons: Ext.Msg.OK,
                });
              }
            }
          },
        });
      }
    }
  );
};

var clickEliminarPresupuesto = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Eliminar Proceso Mensual",
    "¿Esta seguro de eliminar el proceso mensual?",
    function (btn) {
      if (btn === "yes") {
        Ext.MessageBox.show({
          msg: "Cargando",
          progressText: "Espere por favor...",
          width: 300,
          wait: {
            interval: 200,
          },
        });
        storeBorrarPresupuesto.load({
          params: {
            p_cod_emp: EMPRESA,
            p_anho: recRow.data.PK_ANHO,
            p_tipo: recRow.data.PK_TIPO,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Presupuesto eliminado correctamente.");
                cargarMainPresupuesto(null);
              } else {
                Ext.MessageBox.show({
                  title: "ADVERTENCIA",
                  msg: records[0].data.r_msg,
                  icon: Ext.MessageBox.WARNING,
                  buttons: Ext.Msg.OK,
                });
              }
            }
          },
        });
      }
    }
  );
};

var clickAsociarCCPresupuesto = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  ventanaDinamica(
    "PresupuestoCC",
    "Asociar Centros de Costos",
    "1000",
    "",
    "PresupuestoCC",
    1,
    0,
    rec,
    recRow
  );
};

var clickFiltrarPresupuesto = function (grid) {
  var rec = grid.getStore();
  var filtros = grid.filtros;
  ventanaDinamica(
    "MainPresupuestoFiltro",
    "Filtrar Presupuesto (" + NOM_EMPRESA + ")",
    "300",
    "",
    "MainPresupuestoFiltro",
    1,
    0,
    grid,
    filtros
  );
};

var cargarMainPresupuesto = function (filtros) {
  if (filtros !== null) {
    storeCargarPresupuestos.load({
      params: {
        p_cod_emp: EMPRESA,
        p_anho: filtros.p_anho,
        p_estado: filtros.p_estado,
        p_tipo: filtros.p_tipo,
      },
    });
  } else {
    Ext.ComponentQuery.query(
      "#MainPresupuestoGrilla #btnLimFiltro"
    )[0].setHidden(true);
    Ext.ComponentQuery.query("#MainPresupuestoGrilla")[0].filtros = null;
    storeCargarPresupuestos.load({
      params: {
        p_cod_emp: EMPRESA,
      },
    });
  }
};

/**
 * Contenedor
 **/
Ext.define("fcab.Container.MainTarifarioMensual", {
  extend: "Ext.container.Container",
  xtype: "MainTarifarioMensual",
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

      if (pantalla == "TARIFA_MENSUAL" && estado == "A") {
        switch (acc) {
          case "ANULAR":
            Ext.ComponentQuery.query(
              "#MainTarifarioMensualGrilla #btnAnular"
            )[0].setHidden(false);
            break;
        }
      } 
    });

    cargarMainTarifarioMensual();
  },
  items: [
    {
      xtype: "MainTarifarioMensualGrilla",
    },
  ],
});

Ext.define("fcab.Container.MainTarifarioMensual.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "MainTarifarioMensualGrilla",
  itemId: "MainTarifarioMensualGrilla",
  store: storeCargarTarifasMensuales,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  columns: [
    {
      text: "Estado",
      sortable: true,
      dataIndex: "ESTADO",
      width: 100,
      renderer: function (value, meta) {
        if (value === "EN ESPERA") {
          meta.style = "color:red;";
          return "EN ESPERA";
        } else if (value === "TERMINADO") {
          meta.style = "color:green;";
          return "TERMINADO";
        } else {
          meta.style = "color:orange;";
          return value;
        }
      },
    },
    {
      text: "Año",
      sortable: true,
      dataIndex: "PK_ANHO",
      //align: 'center',
      width: 100,
    },
    {
      text: "Mes",
      sortable: true,
      dataIndex: "PK_MES",
      //align: 'center',
      width: 100,
    },
    {
      text: "Desde",
      sortable: true,
      dataIndex: "DESDE",
      //align: 'center',
      width: 100,
    },
    {
      text: "Hasta",
      sortable: true,
      dataIndex: "HASTA",
      //align: 'center',
      width: 100,
    },
    {
      text: "Observación",
      sortable: true,
      dataIndex: "OBSERVACION",
      //align: 'center',
      width: 100,
    },
    {
      text: "Fec. Creación",
      sortable: true,
      dataIndex: "FECHA_CREACION",
      width: 100,
      //hidden: true
    },
    {
      text: "Usr. Creador",
      sortable: true,
      dataIndex: "USR_CREADOR",
      width: 100,
    },
    {
      text: "Fec. Traspaso",
      sortable: true,
      dataIndex: "FECHA_TRASPASO",
      width: 100,
    },
    {
      text: "Usr. Traspaso",
      sortable: true,
      dataIndex: "USR_TRASPASO",
      width: 100,
    },
    {
      text: "Fec. Termino",
      sortable: true,
      dataIndex: "FECHA_TERMINO",
      width: 100,
    },
    {
      text: "Usr. Termino",
      sortable: true,
      dataIndex: "USR_TERMINO",
      width: 100,
    },

  ],
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          text: "Detalle",
          itemId: "btnDetalle",
          //hidden: true,
          tooltip: "Ver Detalle",
          iconCls: "icon-form-detail",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickDetalleTarifarioMensual(grid, rowIndex);
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
          //hidden: true,
          tooltip: "Iniciar nuevo tarifario mensual",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickIniciarTarifarioMensual(grid);
          },
        },

        {
          text: "Traspasar Bonos",
          itemId: "btnTraspasar",
          //hidden: true,
          tooltip: "Traspasar bonos del Item seleccionado al proceso mensual",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickTraspasarTarifarioMensual(grid, rowIndex);
            } catch (e) {
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea traspasar",
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
          //hidden: true,
          tooltip: "Terminar Item seleccionado",
          iconCls: "icon-form-ok",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickTerminarTarifarioMensual(grid, rowIndex);
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
          //hidden: true,
          tooltip: "Eliminar Item seleccionado",
          iconCls: "icon-form-delete",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickEliminarTarifarioMensual(grid, rowIndex);
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
          text: 'Anular',
          itemId: 'btnAnular',
          hidden: true,
          tooltip: 'Anular Item seleccionado',
          iconCls: 'icon-form-suspend',
          handler: function () {
            var grid = this.up('grid'); //Recuperamos la grilla
            try { //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
              clickAnularTarifarioMensual(grid, rowIndex);
            } catch (e) {
              msg("Nada seleccionado", "Por favor, seleccione el item que desea anular", Ext.Msg.ERROR, Ext.Msg.OK);
              console.debug(e);
            }
          }

        },
        {
          text: "Restaurar Maestro",
          tooltip: "Restaura maestro de tarifas usando las tarifas del tarifario seleccionado",
          iconCls: "icon-form-refresh",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickRestaurarTarifas(grid, rowIndex);
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
            cargarMainTarifarioMensual();
          },
        },
        {
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "Tarifario Mensual " + NOM_EMPRESA,
              fileName:
                "Tarifario Mensual " +
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
  height: Ext.getBody().getViewSize().height - 130,
  width: "100%",
  title: "Tarifario Mensual TRAIN",
});

var clickIniciarTarifarioMensual = function (grid) {
  var rec = grid.getStore();
  ventanaDinamica(
    "MainTarifarioMensualCrear",
    "Crear Tarifario Mensual",
    "500",
    "",
    "MainTarifarioMensualCrear",
    1,
    0,
    rec
  );
};


var clickTraspasarTarifarioMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Traspasar Bonos",
    "¿Esta seguro de traspasar los bonos al proceso mensual?",
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
        storeTraspasarTarifarioMensual.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_mes: recRow.data.PK_MES,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Los bonos se traspasaron correctamente.");
                cargarMainTarifarioMensual();
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

var clickTerminarTarifarioMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Terminar Tarifario",
    "¿Esta seguro de terminar el tarifario mensual?<br><b>Nota: Un tarifario terminado no puede ser modificado.</b>",
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
        storeTerminarTarifarioMensual.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_mes: recRow.data.PK_MES,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Tarifario mensual terminado correctamente.");
                cargarMainTarifarioMensual();
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

var clickAnularTarifarioMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Anular Tarifario",
    "¿Esta seguro de anular el tarifario mensual?",
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
        storeAnularTarifarioMensual.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_mes: recRow.data.PK_MES,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Tarifario mensual anulado correctamente.");
                cargarMainTarifarioMensual();
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


var clickEliminarTarifarioMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Eliminar Tarifario",
    "¿Esta seguro de eliminar el tarifario mensual?<br><b>Se borraran los bonos traspasados y todos los datos asociados al tarifario</b>",
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
        storeEliminarTarifarioMensual.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_mes: recRow.data.PK_MES,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Tarifario mensual eliminado correctamente.");
                cargarMainTarifarioMensual();
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


var clickRestaurarTarifas = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Restaurar Tarifas",
    "¿Esta seguro de restaurar el maestro de tarifas?<br><b>Nota: Se reemplazaran todas las tarifas del maestro, por las tarifas del tarifario seleccionado.</b>",
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
        storeCopiarTarifa.load({
          params: {
            p_anho: recRow.data.PK_ANHO,
            p_mes: recRow.data.PK_MES,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Tarifas restauradas correctamente.");
                cargarMainTarifarioMensual();
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


var clickDetalleTarifarioMensual = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  ventanaDinamica(
    "MainTarifarioMensualDetalle",
    "Detalle Tarifario ",
    "1000",
    "",
    "MainTarifarioMensualDetalle",
    1,
    0,
    rec,
    recRow
  );
};

var cargarMainTarifarioMensual = function () {

  storeCargarTarifasMensuales.load();

};

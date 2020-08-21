Ext.define("fcab.Container.MainContactoEmergencia", {
  extend: "Ext.container.Container",
  xtype: "MainContactoEmergencia",
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

      if (pantalla == "CONTACTO_EMERGENCIA" && estado == "A") {
        switch (acc) {
          case "INGRESAR":
            Ext.ComponentQuery.query(
              "#MainContactoEmergenciaGrilla #btnIngresar"
            )[0].setHidden(false);
            break;
          case "ELIMINAR":
            Ext.ComponentQuery.query(
              "#MainContactoEmergenciaGrilla #btnEliminar"
            )[0].setHidden(false);
            break;
        }
      }

      
    });
    storeCargarContactosEmergencia.removeAll();
  },
  items: [
      {
      xtype: "MainContactoEmergenciaGrilla",
    },
  ],
});

Ext.define("fcab.Container.MainContactoEmergencia.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "MainContactoEmergenciaGrilla",
  itemId: "MainContactoEmergenciaGrilla",
  store: storeCargarContactosEmergencia,
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  height: Ext.getBody().getViewSize().height - 120,
  width: "100%",
  columns: [
    {
      text: "ID",
      sortable: true,
      dataIndex: "PK_ID",
      width: 100,
    },
    {
      text: "Rut Trabajador",
      sortable: true,
      dataIndex: "RUT_TRABAJADOR",
      width: 100,
    },
    {
      text: "Nombre Contacto",
      sortable: true,
      dataIndex: "NOMBRE_CONTACTO",
      width: 200,
    },
    {
      text: "Correo Contacto",
      sortable: true,
      dataIndex: "CORREO_CONTACTO",
      width: 200,
    },
    {
      text: "Telefono Contacto",
      sortable: true,
      dataIndex: "TELEFONO_CONTACTO",
      width: 100,
    },
    {
      text: "Celular Contacto",
      sortable: true,
      dataIndex: "CELULAR_CONTACTO",
      width: 100,
    },
    {
      text: "Creador",
      sortable: true,
      dataIndex: "USR_CREADOR",
      width: 200,
    },
    {
      text: "Creación",
      sortable: true,
      dataIndex: "FECHA_CREACION",
      width: 150,
    },
  ],
  dockedItems: [
    {
        xtype: "container",
        padding: '0 10 10 10',
        layout: {
          type: "hbox",
          align: "bottom",
          //pack: 'end',
        },
        items: [
          {
            xtype: "thousandnumber",
            style: "margin: 0 10px 5px 0",
            itemId: "txtRut",
            name: "txtRut",
            forcePrecision: true,
            decimalPrecision: 0,
            allowDecimals: false,
            labelAlign: "top",
            fieldLabel: "Rut",
            width: "150",
            allowBlank: false,
            minValue: 0,
          },
          {
            xtype: "textfield",
            style: "margin: 0 10px 5px 0",
            itemId: "txtDV",
            name: "txtDV",
            labelAlign: "top",
            fieldLabel: "DV",
            width: "50",
            typeAhead: true,
            maxLength: 1,
            allowBlank: false,
          },
          {
            xtype: "button",
            style: "margin: 0 10px 5px 0",
            text: "Buscar Contactos",
            handler: function () {
              cargarMainContactoEmergencia();
            },
          },
        ],
      },
    
    {
      xtype: "toolbar",
      items: [
        {
          text: "Ingresar",
          itemId: "btnIngresar",
          //hidden: true,
          tooltip: "Ingresar nuevo item",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickCrearContactoEmergencia(grid);
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
              clickEliminarContactoEmergencia(grid, rowIndex);
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
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "Contacto_Emergencia",
              fileName: "Contacto_Emergencia " + new Date().getTime() + ".xls",
            });
          },
        },
      ],
    },
  ],
  title: "Contactos de Emergencia",
});

var clickCrearContactoEmergencia = function (grid) {
  var rec = grid.getStore();
  var width = Ext.getBody().getViewSize().width * 0.8;
  var height = Ext.getBody().getViewSize().height * 0.9;

  ventanaDinamica(
    "CrearContactoEmergencia",
    "Crear Contacto de Emergencia ("+NOM_EMPRESA+")",
    "500",
    "",
    "CrearContactoEmergencia",
    1,
    0,
    rec
  );
};

var cargarMainContactoEmergencia = function () {
  var txtRut = Ext.ComponentQuery.query(
    "#MainContactoEmergenciaGrilla #txtRut"
  )[0].getValue();
  var txtDV = Ext.ComponentQuery.query(
    "#MainContactoEmergenciaGrilla #txtDV"
  )[0].getValue();

  if (txtRut != null && txtRut != "" && txtDV != null && txtDV != "") {
    storeCargarContactosEmergencia.load({
      params: {
        p_rut: txtRut + "-" + txtDV,
      },
      callback: function (records, operation, success) {
        if (records != null && records.length > 0) {
        } else {
          Ext.MessageBox.show({
            title: "ADVERTENCIA",
            msg: "No se encontraron contactos",
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.Msg.OK,
          });
        }
      },
    });
  } else {
    Ext.MessageBox.show({
      title: "ADVERTENCIA",
      msg: "Los campos RUT y DV son requeridos",
      icon: Ext.MessageBox.WARNING,
      buttons: Ext.Msg.OK,
    });
  }
};

var cargarMainContactoEmergenciaRut = function(rut, dv) {

    Ext.ComponentQuery.query(
        "#MainContactoEmergenciaGrilla #txtRut"
      )[0].setValue(rut);
     Ext.ComponentQuery.query(
        "#MainContactoEmergenciaGrilla #txtDV"
      )[0].setValue(dv);

    storeCargarContactosEmergencia.load({
        params: {
          p_rut: rut+"-"+dv,
        },
        callback: function (records, operation, success) {
          if (records != null && records.length > 0) {
          } else {
            Ext.MessageBox.show({
              title: "ADVERTENCIA",
              msg: "No se encontraron contactos",
              icon: Ext.MessageBox.WARNING,
              buttons: Ext.Msg.OK,
            });
          }
        },
      });
}

var clickEliminarContactoEmergencia = function (grid, rowIndex) {
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  Ext.MessageBox.confirm(
    "Eliminar Contacto de Emergencia",
    "¿Esta seguro de eliminar el contacto?",
    function (btn) {
      if (btn === "yes") {
        Ext.MessageBox.show({
            msg: 'Cargando',
            progressText: 'Espere por favor...',
            width: 300,
            wait: {
                interval: 200
            }
        });
        storeEliminarContactoEmergencia.load({
          params: {
            p_id: recRow.data.PK_ID,
            p_cod_emp: EMPRESA,
            p_usuario: NOMBRE,
          },
          callback: function (records, operation, success) {
            Ext.MessageBox.hide();
            if (records != null) {
              if (records[0].data.r_msg == "OK") {
                showToast("Contacto eliminado correctamente.");
                cargarMainContactoEmergencia();
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

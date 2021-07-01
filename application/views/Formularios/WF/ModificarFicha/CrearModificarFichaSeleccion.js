Ext.define("fcab.Container.WFModificarFichaCrearSeleccion", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaCrearSeleccion",
  itemId: "WFModificarFichaCrearSeleccion",
  border: false,
  frame: false,
  layout: 'fit',
  constructor: function (config) {
    this.callParent([config]);
  },
  items: [
    {
      xtype: "form",
      itemId: "formGeneral",
      titleAlign: "center",
      border: false,
      frame: false,
      padding: 10,
      width: '100%',
      layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start',
      },
      items: [

        {
          xtype: "container",
          flex: 1,
          style: "margin: 0 10px 0 0",
          layout: {
            type: "hbox",
            align: "bottom",
            //pack: "end",
          },
          items: [
            {
              xtype: "combo",
              name: "cbTrabajador",
              itemId: "cbTrabajador",
              displayField: "INFO",
              valueField: "PK_PERSONAL",
              store: storeCargarPersonalVigentePorPrivilegioUsuario,
              fieldLabel: "Trabajador",
              labelAlign: "left",
              queryMode: "local",
              triggerAction: "all",
              width: 500,
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              allowBlank: false,
              readOnly: false,
            },
            {
              xtype: 'button',
              margin: '0 0 0 10',
              text: "Seleccionar",
              handler: function () {
                var form = this.up("form").getForm(); //Obtenemos el formulario actual
                var values = form.getValues();
                var cbTrabajador = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccion #cbTrabajador')[0];
                var grid = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccionGrilla')[0];
                var store = grid.getStore();

                console.log(cbTrabajador);
                if (values.cbTrabajador) {
                  var existe = false;
                  var item = cbTrabajador.selection.data;
                  var seleccionados = store.data.items;
                  if (seleccionados) {
                    for (let index = 0; index < seleccionados.length; index++) {
                      const element = seleccionados[index].data;
                      console.log(element);
                      console.log(element.PK_PERSONAL + "///" + item.PK_PERSONAL);
                      if (element.PK_PERSONAL == item.PK_PERSONAL) {
                        existe = true;
                        break;
                      }
                    }
                  }

                  console.log(existe);

                  if (!existe) {
                    store.add(item);
                    return;
                  }



                  Ext.MessageBox.show({
                    title: "ADVERTENCIA",
                    msg: "El trabajador ya se encuentra seleccionado",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK,
                  });
                } else {
                  Ext.MessageBox.show({
                    title: "ADVERTENCIA",
                    msg: "Nada seleccionado",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK,
                  });
                }
              }
            }
          ],
        },
      ],
    },
    {
      xtype: "WFModificarFichaCrearSeleccionGrilla"
    }
  ],
});


Ext.define("fcab.Container.WFModificarFichaCrearSeleccionGrilla", {
  extend: "Ext.grid.Panel",
  xtype: "WFModificarFichaCrearSeleccionGrilla",
  itemId: "WFModificarFichaCrearSeleccionGrilla",
  title: "Trabajadores seleccionados",
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  width: "100%",
  flex: 1,
  store: Ext.create('Ext.data.Store'),
  columns: [
    {
      xtype: "actioncolumn",
      text: "",
      width: 30,
      items: [
        {
          iconCls: "icon-form-delete",
          tooltip: "Borrar",
          handler: function (grid, rowIndex) {
            var grid = Ext.ComponentQuery.query('#WFModificarFichaCrearSeleccionGrilla')[0];
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            store.remove(rec);
          },
        }]
    },
    {
      text: "Id",
      sortable: true,
      dataIndex: "PK_PERSONAL",
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
      dataIndex: "COD_TIPO_CONTRATO",
      hidden: false,
      width: 100,
    },
    {
      text: "Plazo",
      sortable: true,
      dataIndex: "TIPO_CONTRATO",
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
      dataIndex: "JORNADA",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Lugar",
      sortable: true,
      dataIndex: "COD_LUGAR_TRABAJO",
      hidden: false,
      width: 100,
    },
    {
      text: "Lugar",
      sortable: true,
      dataIndex: "NOM_LUGAR_TRABAJO",
      hidden: false,
      width: 100,
    },
    {
      text: "Sueldo",
      sortable: true,
      dataIndex: "SALARIO_BASE",
      hidden: false,
      width: 100,
      renderer: Ext.util.Format.numberRenderer('0.0,0')
    },
  ],

});

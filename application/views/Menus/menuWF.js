Ext.define("fcab.store.menu.wf", {
  extend: "Ext.data.TreeStore",
  fields: [
    "name",
    "text",
    "tituloTab",
    "formulario",
    "id",
    "descripcion",
    "icon",
    "iconCls",
    "expanded",
    "cerrable",
  ],
  root: {
    name: "Filtro1",
    text: "ROOT",
    tituloTab: "",
    formulario: "",
    id: "",
    descripcion: "",
    icon: "",
    iconCls: "",
    expanded: true,
    cerrable: false,
    children: [
      {
        name: "Filtro1", //Items a Filtrar
        text: "WF Modificación Datos Laborales",
        tipo: "tab",
        tituloTab: "WF Modificación Datos Laborales",
        id: "menu_wf_cambio_ficha",
        formulario: "WFModificarFichaInicio", //xtype
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        //cls: 'x-hidden'
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Desvinculación",
        tipo: "tab",
        tituloTab: "Solicitud Desvinculación",
        id: "menu_wf_desvinculacion",
        formulario: "InicioDesvinculacion", //xtype
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        //cls: 'x-hidden'
        //disabled: true
      },
    ],
  },
  noCache: false,
  autoScroll: false,
});
var storeMenuWF = Ext.create("fcab.store.menu.wf");

//Menu Sección
/*******************************************************************************
 Arbol de Ingresos
 *******************************************************************************/
Ext.define("fcab.menu.wf", {
  extend: "Ext.tree.Panel",
  store: storeMenuWF,
  id: "west-panel-wf",
  itemId: "west-panel-wf",
  autoHeight: true,
  border: 0,
  animate: true,
  useArrows: true,
  rootVisible: false,
  containerScroll: false,
  listeners: {
    itemdblclick: function (s, r) {
      // Recojo los datos del Store (Nombre, Id, Icono)
      // Y los envio para generar el nuevo TAB
      var id = r.data.id.toString();
      var tituloTab = r.data.tituloTab.toString();
      var formulario = r.data.formulario.toString();
      var icono = r.data.icon.toString(); //http://fortawesome.github.io/Font-Awesome/icons/
      var cerrable = r.data.cerrable.toString();
      if (formulario === "") {
        //Id no permite campos null por eso string
        //No hacemos nada :)
      } else {
        addTab(id, tituloTab, icono, formulario, cerrable); //Generamos el nuevo TAB
      }
    },
  },
});
var menuWF = Ext.create("fcab.menu.wf", {});

Ext.define("fcab.store.menu.admin", {
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
        text: "Maestro Usuario",
        tipo: "tab",
        tituloTab: "Maestro Usuario",
        id: "menu_usuario",
        formulario: "MasterUsuario",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Empresa",
        tipo: "tab",
        tituloTab: "Maestro Empresa",
        id: "menu_empresa",
        formulario: "MasterEmpresa",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Centro de Costo",
        tipo: "tab",
        tituloTab: "Maestro Centro de Costo",
        id: "menu_cc",
        formulario: "MasterCC",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Cargo",
        tipo: "tab",
        tituloTab: "Maestro Cargo",
        id: "menu_cargo",
        formulario: "MasterCargo",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Concepto",
        tipo: "tab",
        tituloTab: "Maestro Concepto",
        id: "menu_concepto",
        formulario: "MasterConcepto",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Parametro",
        tipo: "tab",
        tituloTab: "Maestro Parametro",
        id: "menu_parametro",
        formulario: "MasterParametro",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Haber RRLL",
        tipo: "tab",
        tituloTab: "Maestro Haber RRLL",
        id: "menu_haber_rrll",
        formulario: "MasterHaberRRLL",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Descuento RRLL",
        tipo: "tab",
        tituloTab: "Maestro Descuento RRLL",
        id: "menu_descuento_rrll",
        formulario: "MasterDescuentoRRLL",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Calendario",
        tipo: "tab",
        tituloTab: "Maestro Calendario",
        id: "menu_calendario",
        formulario: "MasterCalendario",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Maestro Tarifario",
        tipo: "tab",
        tituloTab: "Maestro Tarifario",
        id: "menu_tarifario",
        formulario: "MasterTarifario",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
    ],
  },
});
var storeMenuAdmin = Ext.create("fcab.store.menu.admin");

//Menu Sección
/*******************************************************************************
 Arbol de Ingresos
 *******************************************************************************/
Ext.define("fcab.menu.admin", {
  extend: "Ext.tree.Panel",
  store: storeMenuAdmin,
  id: "west-panel-admin",
  itemId: "west-panel-admin",
  border: 0,
  animate: true,
  useArrows: true,
  rootVisible: false,
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
var menuAdmin = Ext.create("fcab.menu.admin", {});

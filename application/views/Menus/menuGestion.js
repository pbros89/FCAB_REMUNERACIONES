Ext.define("fcab.store.menu.gestion", {
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
        text: "Proceso Mensual",
        tipo: "tab",
        tituloTab: "Proceso Mensual",
        id: "menu_proceso_mensual",
        formulario: "MainProcesoMensual",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Conceptos Trabajadores",
        tipo: "tab",
        tituloTab: "Conceptos Trabajadores",
        id: "menu_proceso_mensual_trabajador",
        formulario: "PersonasProcesoMensual",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Ingresar Personal",
        tipo: "tab",
        tituloTab: "Ingresar Personal",
        id: "menu_ingreso_personal",
        formulario: "MainIngresoPersonal",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar AFP",
        tipo: "tab",
        tituloTab: "Cambiar AFP",
        id: "menu_cambio_afp",
        formulario: "MainCambioAFP",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar Salud",
        tipo: "tab",
        tituloTab: "Cambiar Salud",
        id: "menu_cambio_salud",
        formulario: "MainCambioSalud",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar Sindicato",
        tipo: "tab",
        tituloTab: "Cambiar Sindicato",
        id: "menu_cambio_sindicato",
        formulario: "MainCambioSindicato",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar Deposito Rem",
        tipo: "tab",
        tituloTab: "Cambiar Deposito Rem",
        id: "menu_cambio_deposito",
        formulario: "MainCambioDeposito",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambios Laborales",
        tipo: "tab",
        tituloTab: "Cambios Laborales",
        id: "menu_cambio_cargo_renta",
        formulario: "MainCambioCargoRenta",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar Bonos",
        tipo: "tab",
        tituloTab: "Cambiar Bonos",
        id: "menu_cambio_bono",
        formulario: "MainCambioBono",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Cambiar Otros",
        tipo: "tab",
        tituloTab: "Cambiar Otros",
        id: "menu_cambio_otros",
        formulario: "MainCambioOtros",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Finiquitar Personal",
        tipo: "tab",
        tituloTab: "Finiquitar Personal",
        id: "menu_finiquito_personal",
        formulario: "MainFiniquito",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Haber RRLL",
        tipo: "tab",
        tituloTab: "Haber RRLL",
        id: "menu_ing_haber_rrll",
        formulario: "MainIngHaberRRLL",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Descuento RRLL",
        tipo: "tab",
        tituloTab: "Descuento RRLL",
        id: "menu_ing_descuento_rrll",
        formulario: "MainIngDescuentoRRLL",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Ausentismo",
        tipo: "tab",
        tituloTab: "Ausentismo",
        id: "menu_ausentismo",
        formulario: "MainAusentismo",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Contacto Emergencia",
        tipo: "tab",
        tituloTab: "Contacto Emergencia",
        id: "menu_contacto_emergencia",
        formulario: "MainContactoEmergencia",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Presupuesto",
        tipo: "tab",
        tituloTab: "Presupuesto",
        id: "menu_presupuesto",
        formulario: "MainPresupuesto",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Presupuesto Dotación",
        tipo: "tab",
        tituloTab: "Presupuesto Dotación",
        id: "menu_presupuesto_dotacion",
        formulario: "DotacionPresupuesto",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Seguimiento ISSA",
        tipo: "tab",
        tituloTab: "Seguimiento ISSA",
        id: "menu_issa",
        formulario: "SeguimientoISSA",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },

      {
        name: "Filtro1", //Items a Filtrar
        text: "Indicadores",
        tipo: "tab",
        tituloTab: "Indicadores",
        id: "menu_indicadores",
        formulario: "MainIndicadores",
        icon: "icon-listaTab",
        leaf: true,
        iconCls: "icon-prototipo",
        cerrable: 1,
        cls: "x-hidden",
        //disabled: true
      },
      {
        name: "Filtro1", //Items a Filtrar
        text: "Tarifario Mensual",
        tipo: "tab",
        tituloTab: "Tarifario Mensual",
        id: "menu_tarifario_mensual",
        formulario: "MainTarifarioMensual",
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
var storeMenuGestion = Ext.create("fcab.store.menu.gestion");

//Menu Sección
/*******************************************************************************
 Arbol de Ingresos
 *******************************************************************************/
Ext.define("fcab.menu.gestion", {
  extend: "Ext.tree.Panel",
  store: storeMenuGestion,
  id: "west-panel-gestion",
  itemId: "west-panel-gestion",
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
var menuGestion = Ext.create("fcab.menu.gestion", {});

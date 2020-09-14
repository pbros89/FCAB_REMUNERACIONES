var storeDesv_misRoles = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/misRoles",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_listRutNombre = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/listRutNombre",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: true
});

var storeDesv_datosPersonal = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/datosPersonal",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: true
});

var storeDesv_listCausalesDespido = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/listCausalesDespido",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_guardarSolDesvinculacion = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/guardarSolDesvinculacion",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_listaDesvinculaciones = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/listaDesvinculaciones",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_detalleDesvinculacion = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/detalleDesvinculacion",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_detalleCasoWF = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/detalleCasoWF",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_detalleAprobacionWF = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/detalleAprobacionWF",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeAnularSolDesvinculacion = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/anularSolDesvinculacion",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_aprobarDesvinculacion = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/aprobarDesvinculacion",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_existeSolicitud = new Ext.data.Store({
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "WFDesvinculacion/WFDesvinculacionController/existeSolicitud",
    reader: {
      type: "json",
      rootProperty: "items",
      totalProperty: "total"
    }
  },
  autoLoad: false
});

var storeDesv_horarioCorreo = new Ext.data.Store({
  data:[
    {"HORARIO":'Mañana'},
    {"HORARIO":'Tarde'}
  ],
autoload: false,
});
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
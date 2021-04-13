var storeCargarConteoMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionEtariaMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionEtariaMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionEtariaMensualDinamic = Ext.create(
  "Ext.data.Store",
  {
    proxy: {
      type: "ajax",
      url:
        JsonHost +
        "indicador/IndicadorController/cargarConteoDotacionEtariaMensualDinamic",
      reader: {
        type: "json",
        rootProperty: "items",
      },
      listeners: {
        exception: function (proxy, response, operation) {
          console.log(proxy);
          console.log(response);
          console.log(operation);
        },
      },
    },
    autoLoad: false,
  }
);
var storeCargarConteoDotacionEtariaMensualDet = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionEtariaMensualDet",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionAntiguedadMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionAntiguedadMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionAntiguedadMensualDinamic = Ext.create(
  "Ext.data.Store",
  {
    proxy: {
      type: "ajax",
      url:
        JsonHost +
        "indicador/IndicadorController/cargarConteoDotacionAntiguedadMensualDinamic",
      reader: {
        type: "json",
        rootProperty: "items",
      },
      listeners: {
        exception: function (proxy, response, operation) {
          console.log(proxy);
          console.log(response);
          console.log(operation);
        },
      },
    },
    autoLoad: false,
  }
);

var storeCargarConteoDotacionAntiguedadMensualDet = Ext.create(
  "Ext.data.Store",
  {
    proxy: {
      type: "ajax",
      url:
        JsonHost +
        "indicador/IndicadorController/cargarConteoDotacionAntiguedadMensualDet",
      reader: {
        type: "json",
        rootProperty: "items",
      },
      listeners: {
        exception: function (proxy, response, operation) {
          console.log(proxy);
          console.log(response);
          console.log(operation);
        },
      },
    },
    autoLoad: false,
  }
);

var storeCargarConteoDotacionRolPaisMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionRolPaisMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionRolPaisMensualDinamic = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionRolPaisMensualDinamic",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionRolPaisMensualDet = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionRolPaisMensualDet",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionRolSexoMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionRolSexoMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionRolSexoMensualDet = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionRolSexoMensualDet",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionSexoMensualDinamic = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoDotacionSexoMensualDinamic",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoRotacionMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoRotacionMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoRotacionMensualDinamic = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoRotacionMensualDinamic",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoRotacionConsolidado = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/cargarConteoRotacionConsolidado",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoDotacionMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionEmpresa = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoDotacionEmpresa",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionMensualDinamic = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarConteoDotacionMensualDinamic",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoDotacionGerencia = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/cargarConteoDotacionGerencia",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarCierresMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url: JsonHost + "indicador/IndicadorController/cargarCierresMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeValidarImportarDiasTrabajados = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/validarImportarDiasTrabajados",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeResumenValidarImportarDiasTrabajados = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost +
      "indicador/IndicadorController/resumenValidarImportarDiasTrabajados",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeGuardarImportarDiasTrabajados = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/guardarImportarDiasTrabajados",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoAusentismoMensual = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/cargarConteoAusentismoMensual",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});


var storeCargarConteoAusentismoMensualDinamic = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/cargarConteoAusentismoMensualDinamic",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

var storeCargarConteoAusentismoGerencia = Ext.create("Ext.data.Store", {
  proxy: {
    type: "ajax",
    url:
      JsonHost + "indicador/IndicadorController/cargarConteoAusentismoGerencia",
    reader: {
      type: "json",
      rootProperty: "items",
    },
    listeners: {
      exception: function (proxy, response, operation) {
        console.log(proxy);
        console.log(response);
        console.log(operation);
      },
    },
  },
  autoLoad: false,
});

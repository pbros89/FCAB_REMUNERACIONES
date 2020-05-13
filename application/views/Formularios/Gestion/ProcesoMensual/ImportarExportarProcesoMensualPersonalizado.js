Ext.define(
  "fcab.Container.ProcesoMensual.ImportarExportarProcesoMensualPersonalizado",
  {
    extend: "Ext.container.Container",
    xtype: "ImportarExportarProcesoMensualPersonalizado",
    itemId: "ImportarExportarProcesoMensualPersonalizado",
    border: false,
    frame: false,
    items: [
      {
        xtype: "panel",
        width: "100%",
        margin: "10 0 10 0",
        title: "Exportar Archivo",
        border: true,
        layout: {
          type: "vbox",
          align: "middle",
          pack: "center",
        },
        items: [
          {
            border: false,
            margin: "20 20 0 20",
            html:
              "<h3><b><i>Genera el archivo XLS con formato compatible.</i></b></h3>",
          },
          {
            xtype: "button",
            text: "Exportar",
            tooltip: "Exporta Archivo",
            scale: "large",
            margin: "20",
            columnWidth: 0.1,
            handler: function () {
              Ext.create("Ext.form.Panel", {
                renderTo: Ext.getBody(),
                standardSubmit: true,
                url:
                  host +
                  "procesoMensual/ProcesoMensualController/exportarProcesoMensualPersonalizado",
                timeout: 300000,
              }).submit({
                timeout: 300000,
                target: "Exportar" + "-form-iframe",
              });
            },
          },
        ],
      },
      {
        xtype: "form",
        width: "100%",
        margin: "10 0 10 0",
        title: "Importar Archivo",
        border: true,
        layout: {
          type: "vbox",
          align: "middle",
          pack: "center",
        },
        items: [
          {
            border: false,
            margin: "20 20 0 20",
            html:
              "<h3><b><i>Cargar archivo de conceptos compatible</i></b></h3>",
          },
          {
            xtype: "filefield",
            accept: ".xls",
            margin: "20 20 0 20",
            name: "file",
            fieldLabel: "Archivo XLS",
            msgTarget: "side",
            allowBlank: false,
            width: "100%",
            buttonText: "Seleccionar Archivo",
          },
          {
            xtype: "button",
            margin: "20",
            text: "Importar",
            tooltip: "Importar Archivo",
            scale: "large",
            handler: function () {
              var param = Ext.getCmp(
                "ImportarExportarProcesoMensualPersonalizado"
              ).myExtraParams.param2.data;
              var form = this.up("form").getForm();
              if (form.isValid()) {
                //console.log(form.getValues());
                form.submit({
                  url:
                    host +
                    "procesoMensual/ProcesoMensualController/importarProcesoMensualPersonalizado",
                  waitMsg: "Importando archivo...",
                  timeout: 300000,
                  params: {
                    p_proceso: param.PK_PROCESO,
                    p_tipo: param.PK_TIPO,
                    p_cod_emp: EMPRESA,
                    p_usuario: NOMBRE,
                  },
                  success: function (f, a) {
                    if (
                      a.result.items.r_msg != null &&
                      a.result.items.r_msg == "OK"
                    ) {
                      
                      var param2 = Ext.getCmp(
                        "ImportarExportarProcesoMensualPersonalizado"
                      ).myExtraParams.param2;
                      ventanaDinamica(
                        "DetalleErroresImpotarProcesoMensualPersonalizada",
                        "Detalle Importación",
                        "1000",
                        "",
                        "DetalleErroresImpotarProcesoMensualPersonalizada",
                        1,
                        0,
                        null,
                        param2
                      );
                    } else {
                      Ext.MessageBox.show({
                        title: "Importación fallida",
                        msg: "Problemas al cargar documento",
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK,
                      });
                    }
                  },
                  failure: function (f, a) {
                    console.log("failure");
                    console.log(a);
                    Ext.MessageBox.show({
                      title: "Importación fallida",
                      msg: "Problemas al cargar documento",
                      icon: Ext.MessageBox.ERROR,
                      buttons: Ext.Msg.OK,
                    });
                  },
                });
              }
            },
          },
        ],
      },
    ],
  }
);

Ext.define("fcab.Container.ReportePresupDotacion", {
  extend: "Ext.container.Container",
  xtype: "ReportePresupDotacion",
  itemId: "ReportePresupDotacion",
  layout: "fit",
  width: "100%",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  listeners: {
    beforerender: function () {
      var cbAnho = Ext.ComponentQuery.query(
        "#ReportePresupDotacion #cbAnho"
      )[0];

      var date = new Date();
      var yearIni = 2019;
      var year = date.getFullYear() + 1;
      var years = [];
      while (yearIni <= year) {
        years.push({
          VALOR: yearIni,
        });
        yearIni++;
      }

      cbAnho.getStore().loadData(years);
      cbAnho.setValue(year);
    },
  },
  items: [
    {
      xtype: "form",
      titleAlign: "center",
      border: false,
      frame: false,
      title: "Presupuesto Dotación (" + NOM_EMPRESA + ")",
      bodyPadding: 10,
      layout: {
        type: "column",
        align: "strech",
      },
      items: [
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combobox",
              labelAlign: "left",
              fieldLabel: "Tipo",
              displayField: "NOMBRE",
              valueField: "VALOR",
              anchor: "30%",
              name: "cbTipo",
              itemId: "cbTipo",
              editable: true,
              readOnly: false,
              triggerAction: "all",
              typeAhead: true,
              queryMode: "local",
              forceSelection: true,
              selectOnFocus: true,
              allowBlank: false,
              value: "PRINCIPAL",
              store: Ext.create("Ext.data.Store", {
                data: [
                  {
                    NOMBRE: "PRINCIPAL",
                    VALOR: "PRINCIPAL",
                  },
                ],
              }),
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combo",
              name: "cbAnho",
              itemId: "cbAnho",
              fieldLabel: "Año",
              labelAlign: "left",
              queryMode: "local",
              triggerAction: "all",
              displayField: "VALOR",
              valueField: "VALOR",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "30%",
              allowBlank: false,
            },
          ],
        },
      ],
      buttons: [
        {
          tooltip: "Genera excel según filtros de consulta",
          scale: "large",
          text: "Exportar",
          handler: function () {
            var form = this.up("form").getForm();
            var values = form.getValues();
            values.p_cod_emp = EMPRESA;
            values.p_usuario = NOMBRE;
            values.p_rol = ROL;
            console.log(values);

            if (form.isValid()) {
              Ext.MessageBox.confirm(
                "Exportar",
                "El proceso puede demorarse varios segundos.<br> ¿Desea continuan?",
                function (btn) {
                  if (btn === "yes") {
                    //console.log(form.getValues());
                    Ext.create("Ext.form.Panel", {
                      renderTo: Ext.getBody(),
                      standardSubmit: true,
                      url:
                        host +
                        "excelExport/ExcelExportController/cargarPresupuestoDotacion",
                      timeout: 300000,
                    }).submit({
                      params: values,
                      target: "ReportePresupDotacion" + "-form-iframe",
                      timeout: 300000,
                    });
                  }
                }
              );
            }
          },
        },
      ],
    },
  ],
});

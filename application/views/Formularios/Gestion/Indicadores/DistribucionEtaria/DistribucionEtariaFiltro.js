Ext.define("fcab.Container.IndDistribucionEtaria.Filtro", {
  extend: "Ext.form.Panel",
  xtype: "IndDistribucionEtariaFiltro",
  itemId: "IndDistribucionEtariaFiltro",
  border: false,
  padding: 5,
  layout: {
    type: "column",
    align: "stretch",
    pack: "center",
  },
  listeners: {
    beforerender: function () {
      var dataForm = Ext.getCmp("IndDistribucionEtariaFiltro").myExtraParams
        .param2;
      var cmbAnho = Ext.ComponentQuery.query(
        "IndDistribucionEtariaFiltro #cmbAnho"
      )[0];
      var cmbEmp = Ext.ComponentQuery.query(
        "IndDistribucionEtariaFiltro #cmbEmp"
      )[0];
      var cmbGer = Ext.ComponentQuery.query(
        "IndDistribucionEtariaFiltro #cmbGer"
      )[0];
      var cmbDep = Ext.ComponentQuery.query(
        "IndDistribucionEtariaFiltro #cmbDep"
      )[0];
      var cmbCC = Ext.ComponentQuery.query(
        "IndDistribucionEtariaFiltro #cmbCC"
      )[0];

      var date = new Date();
      var yearIni = 2019;
      var year = date.getFullYear();
      var years = [];
      while (yearIni <= year) {
        years.push({
          VALOR: yearIni,
        });
        yearIni++;
      }

      storeCargarEmpresas.load();
      cmbAnho.getStore().loadData(years);

      if (dataForm !== null && dataForm !== "") {
        cmbAnho.setValue(dataForm.p_anho);
        cmbEmp.setValue(dataForm.p_cod_emp);
        cmbGer.setValue(dataForm.p_cod_ger);
        cmbDep.setValue(dataForm.p_cod_dep);
        cmbCC.setValue(dataForm.p_cod_cc);
      } else {
        cmbEmp.setValue(EMPRESA);
        cmbGer.reset();
        cmbDep.reset();
        cmbCC.reset();
        cmbAnho.setValue(year);
      }
    },
  },
  items: [
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbAnho",
          itemId: "cmbAnho",
          fieldLabel: "Año",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          displayField: "VALOR",
          valueField: "VALOR",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: false,
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbEmp",
          itemId: "cmbEmp",
          displayField: "NOMBRE",
          valueField: "PK_COD_EMP",
          store: storeCargarEmpresas,
          fieldLabel: "Empresa",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: true,
          readOnly: false,
          listeners: {
            change: function (obj, newValue, oldValue) {
              Ext.ComponentQuery.query(
                "IndDistribucionEtariaFiltro #cmbGer"
              )[0].reset();
              Ext.ComponentQuery.query(
                "IndDistribucionEtariaFiltro #cmbDep"
              )[0].reset();
              Ext.ComponentQuery.query(
                "IndDistribucionEtariaFiltro #cmbCC"
              )[0].reset();
              if (newValue) {
                console.log("codigos");
                storeCargarParam_GERENCIA.load({
                  params: {
                    p_cod_emp: newValue,
                  },
                });
                storeCargarParam_DEPARTAMENTO.load({
                  params: {
                    p_cod_emp: newValue,
                  },
                });
                storeCargarCentroCostosFiltro.load({
                  params: {
                    p_cod_emp: newValue,
                  },
                });
              }
            },
          },
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbGer",
          itemId: "cmbGer",
          displayField: "NOMBRE",
          valueField: "CODIGO",
          store: storeCargarParam_GERENCIA,
          fieldLabel: "Gerencia",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: true,
          readOnly: false,
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbDep",
          itemId: "cmbDep",
          displayField: "NOMBRE",
          valueField: "CODIGO",
          store: storeCargarParam_DEPARTAMENTO,
          fieldLabel: "Departamento",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: true,
          readOnly: false,
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbCC",
          itemId: "cmbCC",
          displayField: "NOMBRE_FULL",
          valueField: "CODIGO",
          store: storeCargarCentroCostosFiltro,
          fieldLabel: "Centro de Costo",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: true,
          readOnly: false,
        },
      ],
    },
  ],
  buttons: [
    {
      text: "Limpiar",
      scale: "small",
      width: 100,
      style: "margin-right: 5px",
      handler: function () {
        var date = new Date();
        var year = date.getFullYear();
        Ext.ComponentQuery.query(
          "IndDistribucionEtariaFiltro #cmbAnho"
        )[0].setValue(year);
        Ext.ComponentQuery.query(
          "IndDistribucionEtariaFiltro #cmbEmp"
        )[0].setValue(EMPRESA);
        Ext.ComponentQuery.query(
          "IndDistribucionEtariaFiltro #cmbGer"
        )[0].reset();
        Ext.ComponentQuery.query(
          "IndDistribucionEtariaFiltro #cmbDep"
        )[0].reset();
        Ext.ComponentQuery.query(
          "IndDistribucionEtariaFiltro #cmbCC"
        )[0].reset();
      },
    },
    {
      text: "Filtrar",
      scale: "small",
      width: 100,
      handler: function () {
        var grid = Ext.getCmp("IndDistribucionEtariaFiltro").myExtraParams
          .param1;
        var form = this.up("form").getForm(); //Obtenemos el formulario actual
        var values = form.getValues();
        var filtros = null;
        console.log(values);
        if (
          values.cmbAnho !== "" ||
          values.cmbEmp !== "" ||
          values.cmbGer !== "" ||
          values.cmbDep !== "" ||
          values.cmbCC !== ""
        ) {
          filtros = {
            p_anho: values.cmbAnho,
            p_cod_emp: values.cmbEmp,
            p_cod_ger: values.cmbGer,
            p_cod_dep: values.cmbDep,
            p_cod_cc: values.cmbCC,
            p_cod_emp_nom: Ext.ComponentQuery.query(
              "IndDistribucionEtariaFiltro #cmbEmp"
            )[0].getRawValue(),
            p_cod_ger_nom: Ext.ComponentQuery.query(
              "IndDistribucionEtariaFiltro #cmbGer"
            )[0].getRawValue(),
            p_cod_dep_nom: Ext.ComponentQuery.query(
              "IndDistribucionEtariaFiltro #cmbDep"
            )[0].getRawValue(),
            p_cod_cc_nom: Ext.ComponentQuery.query(
              "IndDistribucionEtariaFiltro #cmbCC"
            )[0].getRawValue(),
          };
          cargarIndDistribuscionEtaria(filtros, false);
        } else {
          cargarIndDistribuscionEtaria(null, false);
        }
        grid.filtros = filtros;

        Ext.getCmp("IndDistribucionEtariaFiltro").destroy();
      },
    },
  ],
});

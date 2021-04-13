Ext.define("fcab.Container.IndRotacion.Filtro", {
  extend: "Ext.form.Panel",
  xtype: "IndRotacionFiltro",
  itemId: "IndRotacionFiltro",
  border: false,
  padding: 5,
  layout: {
    type: "column",
    align: "stretch",
    pack: "center",
  },
  listeners: {
    beforerender: function () {
      var dataForm = Ext.getCmp("IndRotacionFiltro").myExtraParams.param2;
      var cmbEmp = Ext.ComponentQuery.query("IndRotacionFiltro #cmbEmp")[0];
      var cmbGer = Ext.ComponentQuery.query("IndRotacionFiltro #cmbGer")[0];
      var cmbDep = Ext.ComponentQuery.query("IndRotacionFiltro #cmbDep")[0];
      var cmbCC = Ext.ComponentQuery.query("IndRotacionFiltro #cmbCC")[0];
      var cmbRol = Ext.ComponentQuery.query("IndRotacionFiltro #cmbRol")[0];
      var cmbCausal = Ext.ComponentQuery.query(
        "IndRotacionFiltro #cmbCausal"
      )[0];

      storeCargarEmpresas.load();
      storeCargarRolesCargo.load();

      if (dataForm !== null && dataForm !== "") {
        cmbEmp.setValue(dataForm.p_cod_emp);
        cmbGer.setValue(dataForm.p_cod_ger);
        cmbDep.setValue(dataForm.p_cod_dep);
        cmbCC.setValue(dataForm.p_cod_cc);
        cmbRol.setValue(dataForm.p_rol_cargo);
        cmbCausal.setValue(dataForm.p_causal);
      } else {
        cmbEmp.setValue(EMPRESA);
        cmbGer.reset();
        cmbDep.reset();
        cmbCC.reset();
        cmbRol.reset();
        cmbCausal.reset();
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
              Ext.ComponentQuery.query("IndRotacionFiltro #cmbGer")[0].reset();
              Ext.ComponentQuery.query("IndRotacionFiltro #cmbDep")[0].reset();
              Ext.ComponentQuery.query("IndRotacionFiltro #cmbCC")[0].reset();
              Ext.ComponentQuery.query("IndRotacionFiltro #cmbCausal")[0].reset();
              if (newValue) {
                storeCargarParam_GERENCIA.load({
                  params: {
                    p_cod_emp: newValue,
                  },
                });
                storeCargarParam_CAUSAL_DESPIDO.load({
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
    {
      xtype: "container",
      columnWidth: 0.5,
      layout: "anchor",
      style: "margin: 0 5px 5px 5px",
      items: [
        {
          xtype: "combo",
          name: "cmbRol",
          itemId: "cmbRol",
          displayField: "NOMBRE",
          valueField: "PK_COD_ROL",
          store: storeCargarRolesCargo,
          fieldLabel: "Rol Cargo",
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
          name: "cmbCausal",
          itemId: "cmbCausal",
          displayField: "NOMBRE",
          valueField: "CODIGO",
          store: storeCargarParam_CAUSAL_DESPIDO,
          fieldLabel: "Causal",
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

        Ext.ComponentQuery.query("IndRotacionFiltro #cmbEmp")[0].setValue(EMPRESA);
        Ext.ComponentQuery.query("IndRotacionFiltro #cmbGer")[0].reset();
        Ext.ComponentQuery.query("IndRotacionFiltro #cmbDep")[0].reset();
        Ext.ComponentQuery.query("IndRotacionFiltro #cmbCC")[0].reset();
        Ext.ComponentQuery.query("IndRotacionFiltro #cmbRol")[0].reset();
        Ext.ComponentQuery.query("IndRotacionFiltro #cmbCausal")[0].reset();
      },
    },
    {
      text: "Filtrar",
      scale: "small",
      width: 100,
      handler: function () {
        var grid = Ext.getCmp("IndRotacionFiltro").myExtraParams.param1;
        var form = this.up("form").getForm(); //Obtenemos el formulario actual
        var values = form.getValues();
        var filtros = null;
        
        filtros = {
          p_cod_emp: values.cmbEmp,
          p_cod_ger: values.cmbGer,
          p_cod_dep: values.cmbDep,
          p_cod_cc: values.cmbCC,
          p_rol_cargo: values.cmbRol,
          p_causal: values.cmbCausal,
          p_cod_emp_nom : Ext.ComponentQuery.query('IndRotacionFiltro #cmbEmp')[0].getRawValue(), 
          p_cod_ger_nom : Ext.ComponentQuery.query('IndRotacionFiltro #cmbGer')[0].getRawValue(),
          p_cod_dep_nom : Ext.ComponentQuery.query('IndRotacionFiltro #cmbDep')[0].getRawValue(),
          p_cod_cc_nom: Ext.ComponentQuery.query('IndRotacionFiltro #cmbCC')[0].getRawValue(),
          p_rol_cargo_nom: Ext.ComponentQuery.query('IndRotacionFiltro #cmbRol')[0].getRawValue(),
          p_causal_nom: Ext.ComponentQuery.query('IndRotacionFiltro #cmbCausal')[0].getRawValue(),
        };
        grid.filtros = filtros;
        cargarIndRotacion(filtros, false); 

        Ext.getCmp("IndRotacionFiltro").destroy();
      },
    },
  ],
});

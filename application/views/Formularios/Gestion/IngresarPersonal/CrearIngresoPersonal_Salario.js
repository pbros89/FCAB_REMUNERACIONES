Ext.define("fcab.Container.CrearIngresoPersonalSalario", {
    extend: 'Ext.container.Container',
    xtype: 'CrearIngresoPersonalSalario',
    itemId: 'CrearIngresoPersonalSalario',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    constructor: function (config) {
        this.callParent([config]);
    },
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: false,
        bodyPadding: 10,
        autoScroll: true,
        height: 600, 
        layout: {
            type: 'column',
            align: 'strech'
        },
        
        items:[{
            xtype: 'fieldset',
            title: 'Salario',
            style: 'margin: 0 10px 5px 0',
            columnWidth: 1,
            layout: {
                type: 'column',
                align: 'strech'
            },
    
            items: [{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbFormaPago',
                    itemId: 'cbFormaPago',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_FORMA_PAGO,
                    fieldLabel: 'Forma de Pago',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: 0.5,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'combo',
                    name: 'cbBanco',
                    itemId: 'cbBanco',
                    displayField: 'NOMBRE',
                    valueField: 'CODIGO',
                    store: storeCargarParam_BANCO,
                    fieldLabel: 'Banco',
                    labelAlign:'top',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: true,
                    typeAhead: true,
                    selectOnFocus: true,
                    forceSelection: true,
                    anchor: '100%',  
                    allowBlank: false,  
                    readOnly: false,  
                }]
            },{
                xtype: 'container',
                columnWidth: .33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'textfield',
                    itemId: 'txtCuenta',
                    name: 'txtCuenta',
                    labelAlign:'top',
                    fieldLabel: 'Cuenta Bancaria',
                    anchor: '100%',
                    typeAhead: true,
                    maxLength: 100,
                    allowBlank: false    
                }]
            },{
                xtype: 'container',
                columnWidth: 0.33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtSueldo',
                    name: 'txtSueldo',
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Sueldo Base',
                    anchor: '100%',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    value: 0
                }]
            },{
                xtype: 'container',
                columnWidth: 0.33,
                layout: 'anchor',
                style: 'margin: 0 10px 5px 0',
                items: [{
                    xtype: 'thousandnumber',
                    itemId: 'txtRentaContrato',
                    name: 'txtRentaContrato',
                    allowDecimals: false,
                    labelAlign:'top',
                    fieldLabel: 'Renta Contrato',
                    anchor: '100%',
                    allowBlank: false,
                    decimalPrecision: 4,
                    minValue: 0,
                    value: 0
                }]
            },],
        }],
        buttons: [{
            tooltip: 'Ingresar personal',
            //scale: 'large',
            text: 'Ingresar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                console.log(values);
                if (!ValidarFormulario(form)) return;

                
                
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    //INFO PERSONAL
                    
                    var formInfo = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #formInfo')[0];
                    var cbEstadoCivil = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #cbEstadoCivil')[0];
                    var cbNvlEducacional = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #cbNvlEducacional')[0];
                    var dtNacimiento = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #dtNacimiento')[0];
                    var txtApeMat = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtApeMat')[0];
                    var txtCalle = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtCalle')[0];
                    //var txtCelular = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtCelular')[0];
                    var txtCiudad = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtCiudad')[0];
                    var txtComuna = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtComuna')[0];
                    var txtCorreo = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtCorreo')[0];
                    var txtDV = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtDV')[0];
                    var txtDepartamento = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtDepartamento')[0];
                    var txtFono = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtFono')[0];
                    var txtNacionalidad = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtNacionalidad')[0];
                    var txtApePat = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtApePat')[0];
                    var txtNombre = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtNombre')[0];
                    var txtNumero = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtNumero')[0];
                    var txtRut = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #txtRut')[0];
                    var cbSexo = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #cbSexo')[0];
                    var cbPeriodo = Ext.ComponentQuery.query('#CrearIngresoPersonalInfo #cbPeriodo')[0];

                    //CARGO
                    var formCargo = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #formCargo')[0];
                    var cbCC = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbCC')[0];
                    var cbCargo = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbCargo')[0];
                    var cbIne = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbIne')[0];
                    var cbJornada = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbJornada')[0];
                    var cbRolCargo = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbRolCargo')[0];
                    var cbTipoContrato = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbTipoContrato')[0];
                    var dtIngreso = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #dtIngreso')[0];
                    var dtVencimiento = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #dtVencimiento')[0];
                    var txtCorreoEmp = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #txtCorreoEmp')[0];
                    var cbLugar = Ext.ComponentQuery.query('#CrearIngresoPersonalCargo #cbLugar')[0];

                    //SALUD
                    var cbAdiEmp = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbAdiEmp')[0];
                    var cbAdiTra = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbAdiTra')[0];
                    var cbPlanColectivoSalud = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbPlanColectivoSalud')[0];
                    var cbPlanSalud = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbPlanSalud')[0];
                    var cbSalud = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbSalud')[0];
                    var txtAdiEmp = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #txtAdiEmp')[0];
                    var txtAdiTra = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #txtAdiTra')[0];
                    var txtPlanColectivoSalud = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #txtPlanColectivoSalud')[0];
                    var txtPlanSalud = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #txtPlanSalud')[0];
                    var txtGes = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #txtGes')[0];
                    var cbGes = Ext.ComponentQuery.query('#CrearIngresoPersonalSalud #cbGes')[0];

                    //AFP
                    var cbAFP = Ext.ComponentQuery.query('#CrearIngresoPersonalAFP #cbAFP')[0];
                    var cbInstAPV = Ext.ComponentQuery.query('#CrearIngresoPersonalAFP #cbInstAPV')[0];
                    var cbMontoApv = Ext.ComponentQuery.query('#CrearIngresoPersonalAFP #cbMontoApv')[0];
                    var cbRegAPV = Ext.ComponentQuery.query('#CrearIngresoPersonalAFP #cbRegAPV')[0];
                    var txtMontoAPV = Ext.ComponentQuery.query('#CrearIngresoPersonalAFP #txtMontoAPV')[0];

                    //SALARIO
                    var cbBanco = Ext.ComponentQuery.query('#CrearIngresoPersonalSalario #cbBanco')[0];
                    var cbFormaPago = Ext.ComponentQuery.query('#CrearIngresoPersonalSalario #cbFormaPago')[0];
                    var txtCuenta = Ext.ComponentQuery.query('#CrearIngresoPersonalSalario #txtCuenta')[0];
                    var txtRentaContrato = Ext.ComponentQuery.query('#CrearIngresoPersonalSalario #txtRentaContrato')[0];
                    var txtSueldo = Ext.ComponentQuery.query('#CrearIngresoPersonalSalario #txtSueldo')[0];
                    
                    var dtIngresoString = formCargo.getForm().getValues().dtIngreso != null ? formCargo.getForm().getValues().dtIngreso : '';
                    var dtNacimientoString = formInfo.getForm().getValues().dtNacimiento != null ? formInfo.getForm().getValues().dtNacimiento : '';
                    var dtVencimientoString = formCargo.getForm().getValues().dtVencimiento != null ? formCargo.getForm().getValues().dtVencimiento : '';


                    storeCrearIngresarPersonal.load({
                        params : {
                              P_RUT : txtRut.value
                            , P_DV : txtDV.value
                            , P_NOMBRES : txtNombre.value
                            , P_APE_PAT : txtApePat.value
                            , P_APE_MAT : txtApeMat.value
                            , P_FECHA_INGRESO : dtIngresoString
                            , P_FECHA_NACIMIENTO  : dtNacimientoString
                            , P_SEXO : cbSexo.getRawValue()
                            , P_NACIONALIDAD : txtNacionalidad.value
                            , P_ESTADO_CIVIL : cbEstadoCivil.getRawValue()
                            , P_NIVEL_EDUCACION : cbNvlEducacional.getRawValue()
                            , P_CALLE : txtCalle.value
                            , P_NUMERO : txtNumero.value
                            , P_DEPARTAMENTO : txtDepartamento.value
                            , P_COMUNA : txtComuna.value
                            , P_CIUDAD  : txtCiudad.value
                            , P_TELEFONO : txtFono.value
                            , P_CELULAR  : '' //txtCelular.value
                            , P_CORREO : txtCorreo.value
                            , P_COD_CC : cbCC.value
                            , P_NOM_CC : cbCC.selection.data.NOMBRE
                            , P_FECHA_VENCIMIENTO : dtVencimientoString
                            , P_COD_CARGO : cbCargo.value
                            , P_NOM_CARGO : cbCargo.selection.data.NOMBRE 
                            , P_INE : cbIne.getRawValue()
                            , P_TIPO_CONTRATO : cbTipoContrato.getRawValue()
                            , P_ROL_CARGO : cbRolCargo.value
                            , P_SUELDO_BASE : txtSueldo.value
                            , P_RENTA_CONTRATO : txtRentaContrato.value
                            , P_AFP : cbAFP.getRawValue()
                            , P_SALUD : cbSalud.getRawValue()
                            , P_PLAN_SALUD : txtPlanSalud.value
                            , P_FORMATO_PLAN_SALUD : cbPlanSalud.value
                            , P_PLAN_COLECTIVO_SALUD : txtPlanColectivoSalud.value
                            , P_FORMATO_PLAN_COLECTIVO_SALUD : cbPlanColectivoSalud.value
                            , P_MONTO_APV : txtMontoAPV.value
                            , P_INSTITUCION_APV : cbInstAPV.getRawValue()
                            , P_REGIMEN_APV : cbRegAPV.getRawValue()
                            , P_FORMA_PAGO : cbFormaPago.getRawValue()
                            , P_BANCO : cbBanco.getRawValue()
                            , P_CUENTA : txtCuenta.value
                            , P_JORNADA : cbJornada.getRawValue()
                            , P_COD_AFP : cbAFP.value
                            , P_COD_SALUD : cbSalud.value
                            , P_COD_BANCO : cbBanco.value
                            , P_COD_ESTADO_CIVIL : cbEstadoCivil.value
                            , P_COD_JORNADA : cbJornada.value
                            , P_COD_EMP : EMPRESA
                            , P_NOM_EMP : NOM_EMPRESA
                            , P_USUARIO : NOMBRE
                            , P_ESTADO : 'EN ESPERA'
                            , P_COD_INE : cbIne.value
                            , P_COD_SEXO : cbSexo.value
                            , P_COD_INSTITUCION_APV : cbInstAPV.value
                            , P_COD_REGIMEN_APV : cbRegAPV.value
                            , P_COD_FORMA_PAGO : cbFormaPago.value
                            , P_COD_NIVEL_EDUCACION : cbNvlEducacional.value
                            , P_FORMATO_MONTO_APV : cbMontoApv.value
                            , P_MONTO_GES : txtGes.value
                            , P_FORMATO_GES : cbGes.value
                            , P_MONTO_ADI_TRA : txtAdiTra.value
                            , P_FORMATO_ADI_TRA : cbAdiTra.value
                            , P_MONTO_ADI_EMP : txtAdiEmp.value
                            , P_FORMATO_ADI_EMP : cbAdiEmp.value
                            , P_COD_TIPO_CONTRATO : cbTipoContrato.value
                            , P_PERIODO: cbPeriodo.value
                            , P_CORREO_EMP: txtCorreoEmp.value
                            , P_COD_LUGAR_TRABAJO: cbLugar.value
                            , P_NOM_LUGAR_TRABAJO: cbLugar.getRawValue()
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Ingreso de personal creado correctamente.');
                                    cargarMainIngresoPersonal(null);
                                    ewin.destroy();
                                }else{
                                    Ext.MessageBox.show({
                                        title: 'ADVERTENCIA',
                                        msg: records[0].data.r_msg,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                            
                        }
                    });

                }
            }
        }]

    }],
    

});
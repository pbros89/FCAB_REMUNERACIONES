Ext.define("fcab.Container.EditarIngresoPersonalSalario", {
    extend: 'Ext.container.Container',
    xtype: 'EditarIngresoPersonalSalario',
    itemId: 'EditarIngresoPersonalSalario',
    layout : 'fit',
    width : '100%',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    
    listeners: {
        beforerender: function(){
            var param = Ext.getCmp('EditarIngresoPersonal').myExtraParams.param2.data;
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #cbBanco')[0].setValue(param.COD_BANCO);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #cbFormaPago')[0].setValue(param.COD_FORMA_PAGO);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtCuenta')[0].setValue(param.CUENTA);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtRentaContrato')[0].setValue(param.RENTA_CONTRATO);
            Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtSueldo')[0].setValue(param.SUELDO_BASE);
        }
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
                    minValue: 0
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
                    minValue: 0
                }]
            },],
        }],
        buttons: [{
            tooltip: 'Editar ingreso personal',
            //scale: 'large',
            text: 'Editar',
            handler: function () {
                var form = this.up('form').getForm();
                var values = form.getValues();
                console.log(values);
                if (!ValidarFormulario(form)) return;

                
                
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {

                    var param = Ext.getCmp('EditarIngresoPersonal').myExtraParams.param2.data;

                    //INFO PERSONAL
                    var formInfo = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #formInfo')[0];
                    var cbEstadoCivil = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbEstadoCivil')[0];
                    var cbNvlEducacional = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbNvlEducacional')[0];
                    var dtNacimiento = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #dtNacimiento')[0];
                    var txtApeMat = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtApeMat')[0];
                    var txtCalle = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtCalle')[0];
                    var txtFono2 = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtFono2')[0];
                    var cbCiudad = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbCiudad')[0];
                    var cbComuna = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbComuna')[0];
                    var txtCorreo = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtCorreo')[0];
                    var txtDV = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtDV')[0];
                    var txtDepartamento = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtDepartamento')[0];
                    var txtFono = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtFono')[0];
                    var cbNacionalidad = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbNacionalidad')[0];
                    var txtApePat = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtApePat')[0];
                    var txtNombre = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtNombre')[0];
                    var txtNumero = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtNumero')[0];
                    var txtRut = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtRut')[0];
                    var cbSexo = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbSexo')[0];
                    var txtPeriodo = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #txtPeriodo')[0];
                    var cbInvalidez = Ext.ComponentQuery.query('#EditarIngresoPersonalInfo #cbInvalidez')[0];

                    //CARGO
                    var formCargo = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #formCargo')[0];
                    var cbCC = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbCC')[0];
                    var cbCargo = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbCargo')[0];
                    var cbIne = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbIne')[0];
                    var cbJornada = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbJornada')[0];
                    var cbRolCargo = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbRolCargo')[0];
                    var cbTipoContrato = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbTipoContrato')[0];
                    var dtIngreso = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #dtIngreso')[0];
                    var dtVencimiento = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #dtVencimiento')[0];
                    var txtCorreoEmp = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #txtCorreoEmp')[0];
                    var cbLugar = Ext.ComponentQuery.query('#EditarIngresoPersonalCargo #cbLugar')[0];

                    //SALUD
                    var cbAdiEmp = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbAdiEmp')[0];
                    var cbAdiTra = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbAdiTra')[0];
                    var cbPlanColectivoSalud = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbPlanColectivoSalud')[0];
                    var cbPlanSalud = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbPlanSalud')[0];
                    var cbSalud = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbSalud')[0];
                    var txtAdiEmp = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtAdiEmp')[0];
                    var txtAdiTra = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtAdiTra')[0];
                    var txtPlanColectivoSalud = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtPlanColectivoSalud')[0];
                    var txtPlanSalud = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtPlanSalud')[0];
                    var txtGes = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #txtGes')[0];
                    var cbGes = Ext.ComponentQuery.query('#EditarIngresoPersonalSalud #cbGes')[0];

                    //AFP
                    var cbAFP = Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbAFP')[0];
                    var cbInstAPV = Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbInstAPV')[0];
                    var cbMontoApv = Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbMontoApv')[0];
                    var cbRegAPV = Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #cbRegAPV')[0];
                    var txtMontoAPV = Ext.ComponentQuery.query('#EditarIngresoPersonalAFP #txtMontoAPV')[0];

                    //SALARIO
                    var cbBanco = Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #cbBanco')[0];
                    var cbFormaPago = Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #cbFormaPago')[0];
                    var txtCuenta = Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtCuenta')[0];
                    var txtRentaContrato = Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtRentaContrato')[0];
                    var txtSueldo = Ext.ComponentQuery.query('#EditarIngresoPersonalSalario #txtSueldo')[0];
                    
                    var dtIngresoString = formCargo.getForm().getValues().dtIngreso != null ? formCargo.getForm().getValues().dtIngreso : '';
                    var dtNacimientoString = formInfo.getForm().getValues().dtNacimiento != null ? formInfo.getForm().getValues().dtNacimiento : '';
                    var dtVencimientoString = formCargo.getForm().getValues().dtVencimiento != null ? formCargo.getForm().getValues().dtVencimiento : '';


                    storeModificarIngresarPersonal.load({
                        params : {
                              P_RUT : txtRut.value
                            , P_DV : txtDV.value
                            , P_NOMBRES : txtNombre.value
                            , P_APE_PAT : txtApePat.value
                            , P_APE_MAT : txtApeMat.value
                            , P_FECHA_INGRESO : dtIngresoString
                            , P_FECHA_NACIMIENTO  : dtNacimientoString
                            , P_SEXO : cbSexo.getRawValue()
                            , P_NACIONALIDAD : cbNacionalidad.getRawValue()
                            , P_ESTADO_CIVIL : cbEstadoCivil.getRawValue()
                            , P_NIVEL_EDUCACION : cbNvlEducacional.getRawValue()
                            , P_CALLE : txtCalle.value
                            , P_NUMERO : txtNumero.value
                            , P_DEPARTAMENTO : txtDepartamento.value
                            , P_COMUNA : cbComuna.getRawValue()
                            , P_CIUDAD  : cbCiudad.getRawValue()
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
                            , P_PK_ID : param.PK_ID
                            , P_PERIODO: txtPeriodo.value
                            , P_CORREO_EMP: txtCorreoEmp.value
                            , P_COD_LUGAR_TRABAJO: cbLugar.value
                            , P_NOM_LUGAR_TRABAJO: cbLugar.getRawValue()
                            , P_COD_COMUNA: cbComuna.value
                            , P_COD_CIUDAD: cbCiudad.value
                            , P_COD_NACIONALIDAD: cbNacionalidad.value
                            , P_COD_INVALIDEZ: cbInvalidez.value
                            , P_NOM_INVALIDEZ: cbInvalidez.getRawValue()
                            , P_TELEFONO2: txtFono2.value
                        },
                        callback: function(records, operation, success) {
                            if(records != null) {
                                if(records[0].data.r_msg == 'OK'){
                                    showToast('Ingreso de personal editado correctamente.');
                                    cargarMainIngresoPersonal(null);
                                    Ext.getCmp('EditarIngresoPersonal').destroy();
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
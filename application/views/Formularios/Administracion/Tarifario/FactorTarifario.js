Ext.define('fcab.Container.MasterTarifario.Factor', {
    extend: 'Ext.container.Container',
    xtype: 'MasterTarifarioFactor',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    layout: 'anchor',
    scrollable: true,
    items: [{
        xtype: 'form',
        titleAlign: 'center',
        border: false,
        frame: true,
        bodyPadding: 10,
        layout: {
            type: 'column',
            align: 'strech'
        },
        items: [{
                xtype: 'container',
                columnWidth: 1,
                layout: 'anchor',
                style: 'margin-bottom: 5px',
                items: [{
                    xtype: 'thousandnumber',
                    name: 'txtFactor',
                    fieldLabel: 'Factor',
                    labelAlign:'left',
                    maxValue: 99999999,
                    minValue: -999999,
                    allowBlank: false,
                    decimalPrecision: 4,
                }]
            },{
                xtype: 'fieldset',
                title: 'Valores',
                columnWidth: 1,
                defaultType: 'checkbox',
                defaults: {
                    anchor: '100%'
                },
        
                items: [{
                    boxLabel: 'Bono Conductor',
                    name: 'box_bono',
                    checked: true,
                }, {
                    boxLabel: 'Bono Conductor Segundario',
                    name: 'box_bono_sec',
                    checked: true,
                }, {
                    boxLabel: 'Viático',
                    name: 'box_viatico',
                    checked: true,
                },{
                    boxLabel: 'Valor',
                    name: 'box_valor',
                    checked: true,
                },{
                    boxLabel: 'Ton 27,5',
                    name: 'box_ton',
                    checked: true,
                },{
                    boxLabel: 'Peaje',
                    name: 'box_peaje',
                    checked: true,
                },{
                    boxLabel: 'Tiempo Espera',
                    name: 'box_tiempo_espera',
                    checked: true,
                },{
                    boxLabel: 'Bono SQM',
                    name: 'box_bono_sqm',
                    checked: true,
                },{
                    boxLabel: 'MP Vacio',
                    name: 'box_mp',
                    checked: true,
                }]
            },],
            buttons: [{
            text: 'Agregar Factor',
            handler: function () {
                var form = this.up('form').getForm();
                if (!ValidarFormulario(form)) return;
                //TODO: Solo actualizara si es llamado desde una ventana (modal), en caso contrario no hara nada.
                var ewin = Ext.WindowManager.getActive();
                if (ewin) {
                    var values = form.getValues();
                    console.log(values);
                     
                    var params = {
                        p_factor: values.txtFactor,
                        p_bono_conductor: values.box_bono ? 1 : 0,
                        p_bono_conductor_sec: values.box_bono_sec ? 1: 0,
                        p_viatico: values.box_viatico ? 1 : 0,
                        p_valor: values.box_valor ? 1 : 0,
                        p_ton_27_5: values.box_ton ? 1: 0,
                        p_peaje: values.box_peaje ? 1 : 0 ,
                        p_tiempo_espera: values.box_tiempo_espera ? 1: 0 ,
                        p_bono_sqm: values.box_bono_sqm ? 1 : 0,
                        p_mp_vacio: values.box_mp ? 1 : 0,
                        p_usuario: NOMBRE
                    }

                    ventanaDinamica("MasterTarifarioGrillaFactor", "Simulación Factor Tarifa", "1000", "", "MasterTarifarioGrillaFactor", 1, 0, params);
                    
                }
            }
        }]
    }]
        
});
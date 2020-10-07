var carta = '';
var equipos = '';
var celu = '';
var docs = '';
var caja = '';
var detalleIsRender = false;

var ModalFormDesvinculacion= function(rol){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación',
        modal: true,
        width: 1000,
        height: 600,
        listeners:{
            beforedestroy: function(){
                var store = Ext.getCmp('InicioDesvinculacionGrilla').getStore();
                store.load({
                    params:{
                        cod_emp: EMPRESA,
                        cod_usr: NOMBRE,
                        rol_usr: ROL
                    }
                });
            }
        },
        items:[{
            xtype: 'form',
            titleAlign: 'center',
			layout: {
				type: 'column',
				align: 'strech'
			},
        	items: [{
                xtype: 'tabpanel',
                items:  [{// PARTE 1 DEL FORMULARIO
                    title: 'Información Personal',
                    items: [{
                        xtype: 'panel',
                        width: 1000,
                        height: 460,
                        bodyPadding: '10 10 10 10',
                        items:  [{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'label',
                                text: 'Ingrese los datos del trabajador involucrado',
                                style: 'font-weight: bold;',
                                margin: '10 0 10 0'
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'combo',
                                fieldLabel: 'Rut',
                                labelAlign: 'top',
                                name:'cb_rut',
                                margin: '0 10 0 0',
                                flex: 1,
                                store: storeDesv_listRutNombre,
                                queryMode: 'local',
                                displayField: 'RUTNOM',
                                valueField: 'RUT',
                                emptyText: 'Seleccione',
                                allowBlank: false,
                                //hideTrigger: true,
                                //typeAhead: true,
                                //typeAheadDelay: 100,
                                //minChars: 2,
                                //lastQuery: '',
                                listeners:{
                                    afterrender: function(combo){
                                        var store = combo.getStore();
                                        store.load({
                                            params:{
                                                cod_emp: EMPRESA,
                                                cod_usr: NOMBRE
                                            }
                                        });
                                    },
                                    select: function(combo){
                                        
                                        var seleccion = combo.getStore().find('RUT', combo.getValue());
                                        var personal = combo.getStore().getAt(seleccion).get('PK_PERSONAL');

                                        var form = this.up('form').getForm();

                                        storeDesv_existeSolicitud.load({
                                            params:{ 
                                                p_personal: personal 
                                            },
                                            callback: function(records) {
                                                if(records!=null){
                                                    if(records[0].data.EXISTE > 0){
                                                        showToast('Ya existe una solicitud ACTIVA para la persona.');
                                                        func_llenarDatosPersonal(form, null);
                                                        combo.reset();
                                                    }else{
                                                        storeDesv_datosPersonal.load({
                                                            params:{
                                                                p_id:personal
                                                            },
                                                            callback: function() {
                                                                func_llenarDatosPersonal(form, storeDesv_datosPersonal);
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                        
                                    }
                                }
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Apellidos',
                                labelAlign: 'top',
                                name: 'txt_apellidos',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Nombres',
                                labelAlign: 'top',
                                name: 'txt_nombres',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Empresa',
                                labelAlign: 'top',
                                name: 'txt_empresa',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Departamento',
                                labelAlign: 'top',
                                name: 'txt_departamento',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Gerencia',
                                labelAlign: 'top',
                                name: 'txt_gerencia',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Rol',
                                labelAlign: 'top',
                                name: 'txt_rol',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'label',
                                margin: '0 10 0 0',
                                flex: 2,
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha en que debe ser finiquitado',
                                margin: '0 10 0 0',
                                labelAlign: 'top',
                                flex: 1,
                                name: 'date_fecha',
                                format: 'd/m/Y',
                                allowBlank: false,
                                minValue: Ext.Date.add(new Date(), Ext.Date.DAY,2),//Se restringe por 48 horas.
                            },{
                                xtype: 'radiogroup',
                                fieldLabel: '¿Carta aviso 30 días?',
                                labelAlign: 'top',
                                flex: 1,
                                allowBlank: false,
                                items: [
                                    {boxLabel: 'Si', name: 'rbCarta', inputValue: 'Si', margin: '0 10 0 0'},
                                    {boxLabel: 'No', name: 'rbCarta', inputValue: 'No', margin: '0 10 0 0'}
                                ],
                                listeners:{
                                    change: function(field, newValue, oldValue){
                                        carta = newValue['rbCarta'];
                                    }
                                }
                            },{
                                xtype: 'label',
                                flex: 1
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'combo',
                                fieldLabel: 'Seleccione causal de Despido',
                                labelAlign: 'top',
                                name:'cb_causal',
                                margin: '0 10 0 0',
                                flex: 1,
                                store: storeDesv_listCausalesDespido,
                                queryMode: 'local',
                                displayField: 'NOMBRE',
                                valueField: 'CODIGO',
                                emptyText: 'Seleccione',
                                forceSelection: true,
                                allowBlank: false,
                                listeners:{
                                    afterrender: function(combo){
                                        var store = combo.getStore();
                                        store.load({
                                            params:{
                                                cod_emp: EMPRESA
                                            }
                                        });
                                    },
                                    change: function(combo){
                                        var form = this.up('form').getForm();
                                        var combo2 = form.findField('cb_causal2');
                                        var cod_causal = combo.value;
                                        var cod_causal2 = combo2.value;
                                        var causal = combo.rawValue;
                                        var causal2 = combo2.rawValue;
                                        
                                        if(cod_causal == cod_causal2){
                                            showToast('No puede ser las dos causales iguales.');
                                            combo.reset();
                                        }else{
                                            if(detalleIsRender){
                                                var campoHechos = form.findField('txt_hechos');
                                                if(cod_causal2 != null){
                                                    campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal +' - ' +causal2+') consisten en:') ;
                                                }else{
                                                    campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal+') consisten en:') ;
                                                }
                                            }
                                        }
                                    }
                                }
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Seleccione segunda causal de Despido (opcional)',
                                labelAlign: 'top',
                                name:'cb_causal2',
                                margin: '0 10 0 0',
                                flex: 1,
                                store: storeDesv_listCausalesDespido,
                                queryMode: 'local',
                                displayField: 'NOMBRE',
                                valueField: 'CODIGO',
                                emptyText: 'Seleccione',
                                forceSelection: false,
                                listeners:{
                                    change: function(combo){
                                        var form = this.up('form').getForm();
                                        var combo2 = form.findField('cb_causal');
                                        var cod_causal = combo2.value;
                                        var cod_causal2 = combo.value;
                                        var causal = combo2.rawValue;
                                        var causal2 = combo.rawValue;
                                        
                                        if(cod_causal == cod_causal2){
                                            showToast('No puede ser las dos causales iguales.');
                                            combo.reset();
                                        }else{
                                            if(detalleIsRender){
                                                var campoHechos = form.findField('txt_hechos');
                                                campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal +' - ' +causal2+') consisten en:') ;
                                            }
                                        }
                                    }
                                }
                            }]
                        }]
                    }]
                },{// PARTE 2 DEL FORMULARIO
                    title: 'Detalle de la desvinculación',
                    items: [{
                        xtype: 'panel',
                        width: 1000,
                        height: 460,
                        bodyPadding: '10 10 10 10',
                        items:[{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'label',
                                text: 'Detallar la causal de despido seleccionada anteriormente',
                                style: 'font-weight: bold;',
                                margin: '10 0 10 0'
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textareafield',
                                fieldLabel: 'Los hechos en que se funda la causal invocada ( ) consisten en',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_hechos',
                                margin: '0 10 0 0',
                                height: 150,
                                //maxRows: 4,
                                maxLength: 500,
                                enforceMaxLength: true,
                                allowBlank: false,
                                listeners:{
                                    afterrender:function(){
                                        detalleIsRender = true;
                                        var form = this.up('form').getForm();
                                        var combo1 = form.findField('cb_causal');
                                        var combo2 = form.findField('cb_causal2');
                                        var causal = combo1.rawValue;
                                        var causal2 = combo2.rawValue;
                                        var campoHechos = form.findField('txt_hechos');
                                        if(causal2 != null){
                                            campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal +' - ' +causal2+') consisten en:') ;
                                        }else{
                                            campoHechos.labelEl.update('Los hechos en que se funda la causal invocada ('+causal+') consisten en:') ;
                                        }
                                    }
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textareafield',
                                fieldLabel: 'Motivo real',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_motivo',
                                margin: '0 10 0 0',
                                height: 150,
                                //maxRows: 4,
                                maxLength: 500,
                                enforceMaxLength: true,
                                allowBlank: false,
                            }]
                        }]
                    }]
                },{// PARTE 3 DEL FORMULARIO
                    title: 'Detalle de haberes',
                    items: [{
                        xtype: 'panel',
                        width: 1000,
                        height: 460,
                        bodyPadding: '10 10 10 10',
                        items:[{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'label',
                                text: 'Materiales, Equipos y Elementos de trabajo que debe entregar a Jefe Directo',
                                style: 'font-weight: bold;',
                                margin: '20 0 10 0'
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'radiogroup',
                                fieldLabel: 'Equipos Computacionales',
                                labelAlign: 'top',
                                cls: 'x-check-group-alt',
                                flex: 1,
                                allowBlank: false,
                                items: [
                                    {boxLabel: 'Si', name: 'rb_comp', inputValue: 'Si', margin: '0 10 0 0',},
                                    {boxLabel: 'No', name: 'rb_comp', inputValue: 'No', margin: '0 10 0 0',}
                                ],
                                listeners:{
                                    change: function(field, newValue, oldValue){
                                        equipos = newValue['rb_comp'];
                                    }
                                }
                            },{
                                xtype: 'radiogroup',
                                fieldLabel: 'Celular',
                                labelAlign: 'top',
                                cls: 'x-check-group-alt',
                                flex: 1,
                                allowBlank: false,
                                items: [
                                    {boxLabel: 'Si', name: 'rb_celu', inputValue: 'Si', margin: '0 10 0 0',},
                                    {boxLabel: 'No', name: 'rb_celu', inputValue: 'No', margin: '0 10 0 0',}
                                ],
                                listeners:{
                                    change: function(field, newValue, oldValue){
                                        celu = newValue['rb_celu'];
                                    }
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'radiogroup',
                                fieldLabel: 'Información, Archivos y Otros',
                                labelAlign: 'top',
                                cls: 'x-check-group-alt',
                                flex: 1,
                                allowBlank: false,
                                items: [
                                    {boxLabel: 'Si', name: 'rb_docs', inputValue: 'Si', margin: '0 10 0 0',},
                                    {boxLabel: 'No', name: 'rb_docs', inputValue: 'No', margin: '0 10 0 0',}
                                ],
                                listeners:{
                                    change: function(field, newValue, oldValue){
                                        docs = newValue['rb_docs'];
                                    }
                                }
                            },{
                                xtype: 'radiogroup',
                                fieldLabel: 'Caja Chica',
                                labelAlign: 'top',
                                cls: 'x-check-group-alt',
                                flex: 1,
                                allowBlank: false,
                                items: [
                                    {boxLabel: 'Si', name: 'rb_caja', inputValue: 'Si', margin: '0 10 0 0',},
                                    {boxLabel: 'No', name: 'rb_caja', inputValue: 'No', margin: '0 10 0 0',}
                                ],
                                listeners:{
                                    change: function(field, newValue, oldValue){
                                        caja = newValue['rb_caja'];
                                    }
                                }
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Vehículos u otros (Especificar)',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_vehiculo',
                                margin: '0 10 0 0',
                                maxLength: 50,
                                enforceMaxLength: true
                            },{
                                xtype: 'label',
                                flex:1
                            }]
                        }]
                    }]
                }]// Fin Items Tabs
            }],//Fin Items Form
            buttons:[{
                xtype: 'button',
                //iconCls: 'iconMD-save',
                text: 'Crear',
                margin: '0 10 0 0',
                handler: function(){

                    var form = this.up('form').getForm();

                    var modal = this;

                    if(!form.isValid()){
                        showToast('Debe completar los campos del formulario.');
                    }else{
                    
                        var combo_rut = form.findField('cb_rut');
                        var seleccion = combo_rut.getStore().find('RUTNOM',combo_rut.getValue());
                        
                        var personal = combo_rut.getStore().getAt(seleccion).get('PK_PERSONAL');
                        var combo_fecha = form.findField('date_fecha').value;
                        var finiquito = Ext.Date.format(combo_fecha,'d/m/Y');
                        var cod_causal = form.findField('cb_causal').value;
                        var cod_causal2 = form.findField('cb_causal2').value;
                        var causal = form.findField('cb_causal').rawValue;
                        var causal2 = form.findField('cb_causal2').rawValue;
                        var hechos = form.findField('txt_hechos').value;
                        var motivo = form.findField('txt_motivo').value;
                        var vehiculo = form.findField('txt_vehiculo').value;

                        func_guardarSolDesvinculacion(rol, personal, finiquito, carta, cod_causal, cod_causal2, hechos, motivo, vehiculo, modal);
                    }

                }
            },{
                xtype: 'button',
                //iconCls: 'iconMD-save',
                text: 'Cancelar',
                margin: '0 10 0 0',
                handler: function(){
                    this.up('window').close();
                }
            }]
        }]//Fin Items Modal
    }).show();
};

function func_llenarDatosPersonal(form, store){

    if(store!=null){
        var records = store.getRange();
        form.findField('txt_apellidos').setValue(records[0].get('APELLIDOS'));
        form.findField('txt_nombres').setValue(records[0].get('NOMBRES'));
        form.findField('txt_empresa').setValue(records[0].get('EMPRESA'));
        form.findField('txt_departamento').setValue(records[0].get('DEPARTAMENTO'));
        form.findField('txt_gerencia').setValue(records[0].get('GERENCIA'));
        form.findField('txt_rol').setValue(records[0].get('ROL'));
    }else{
        form.findField('txt_apellidos').reset();
        form.findField('txt_nombres').reset();
        form.findField('txt_empresa').reset();
        form.findField('txt_departamento').reset();
        form.findField('txt_gerencia').reset();
        form.findField('txt_rol').reset();
    }
    
}

function func_guardarSolDesvinculacion(rol, personal, finiquito, carta, causal, causal2, hechos, motivo, vehiculo, modal){

    //Mensaje de loading...
    Ext.MessageBox.show({
        msg: 'Creando Solicitud',
        progressText: 'Espere por favor...',
        width: 300,
        wait: {
            interval: 200
        }
    });
    
    var array_lineas = [];

    var usuario = NOMBRE;
    var empresa = EMPRESA;
    var estado = 'ACTIVO';

    array_lineas.push({
        usuario,
        empresa,
        rol,
        personal,
        finiquito,
        carta,
        causal,
        causal2,
        hechos,
        motivo,
        equipos,
        celu,
        docs,
        caja,
        vehiculo,
        estado
    });

    var arrayToJson = JSON.stringify(array_lineas);

    storeDesv_guardarSolDesvinculacion.load({
        params: {
            listado_lineas: arrayToJson
        },
        callback: function(records) {
            
            Ext.MessageBox.hide();//Fin loading.

            if(records != null){
                var estado = records[0].data.r_est;
                var mensaje = records[0].data.r_msg;
                
                if (estado == 0) {
                    showToast('Solicitud creada exitosamente.');
                    modal.up('window').close();
                    
                }else{
                    Ext.MessageBox.show({
                        title: 'ADVERTENCIA',
                        msg: mensaje,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        }
    });
}
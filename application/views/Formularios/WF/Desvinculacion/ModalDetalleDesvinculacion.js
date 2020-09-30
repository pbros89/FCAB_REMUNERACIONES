
var ultimo_paso = false;

var ModalDetalleDesvinculacion= function(p_numero, p_rol){
    Ext.create('Ext.window.Window', {
        title: 'Solicitud de Desvinculación (Nº'+p_numero+')',
        //modal: true,
        width: 1000,
        height: 600,
        //autoScroll : true,
        extend: 'Ext.tab.Panel',
        activeTab: 0,
        listeners:{
            afterrender: function(){

                var form = this.down('form').getForm();

                //Reiniciamos el valor de la variable:
                ultimo_paso = false;

                //Traemos el detalle de la solicitud:
                storeDesv_detalleDesvinculacion.load({
                    params:{
                        p_numero: p_numero,
                        p_emp: EMPRESA
                    },
                    callback: function(records){
                        if(records != null){
                            //Traemos el detalle de la persona:
                            var personal = records[0].data.PERSONAL;
                            
                            storeDesv_datosPersonal.load({
                                params:{
                                    p_id:personal
                                },
                                callback: function() {
                                    var recordsPer = storeDesv_datosPersonal.getRange();
                                    //Llenamos el formulario:
                                    func_llenarDetalleDesvinculacion(form, records,recordsPer);
                                }
                            });
                        }
                    }
                });

            },
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
                        items:[{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'label',
                                text: 'Datos del trabajador involucrado',
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
                                xtype: 'textfield',
                                fieldLabel: 'Rut',
                                labelAlign: 'top',
                                name:'txt_rut',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre',
                                labelAlign: 'top',
                                name: 'txt_nombre',
                                margin: '0 10 0 0',
                                flex: 2,
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
                                xtype: 'textfield',
                                fieldLabel: 'Fecha en que debe ser finiquitado',
                                labelAlign: 'top',
                                name: 'txt_fecha',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: '¿Carta aviso 30 días?',
                                labelAlign: 'top',
                                name:'txt_carta',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'label',
                                margin: '0 10 0 0',
                                flex: 1,
                            }]
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Causal de Despido',
                                labelAlign: 'top',
                                name:'txt_causal',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Causal de Despido 2',
                                labelAlign: 'top',
                                name:'txt_causal_2',
                                margin: '0 10 0 0',
                                flex: 1,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            }]
                        },]
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
                                text: 'Detalle de la causal de despido:',
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
                                margin: '0 0 0 0',
                                maxRows: 4,
                                maxLength: 500,
                                enforceMaxLength: true,
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
                                xtype: 'textareafield',
                                fieldLabel: 'Motivo real',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_motivo',
                                margin: '0 0 0 0',
                                maxRows: 4,
                                maxLength: 500,
                                enforceMaxLength: true,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
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
                                xtype: 'textfield',
                                fieldLabel: 'Equipos Computacionales',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_equipos',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Celular',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_celular',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Información, Archivos y Otros',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_docs',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Caja Chica',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_cajachica',
                                margin: '0 10 0 0',
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
                                fieldLabel: 'Vehículos u otros (Especificar)',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_vehiculo',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'label',
                                flex: 1
                            }]
                        }]
                    }]
                },{//PARTE 4 DEL FORMULARIO
                    title: 'Estado Aprobación',
                    items: [{
                        xtype: 'panel',
                        id:'mypanelflow',
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
                                text: 'Flujo de Aprobación:',
                                style: 'font-weight: bold;',
                                margin: '20 0 10 20'
                            }]
                        },{
                            xtype: 'box',
                            autoEl:{//Un CANVAS para dibujar en él el flujo de aprobación:
                                tag: 'canvas',
                                height: 200,
                                width: 980,
                            },
                            listeners:{
                                render:{
                                    scope:this,
                                    fn:function(){

                                        var canvas = Ext.getCmp('mypanelflow').items.items[1].el.dom;
                                        var records = storeDesv_detalleDesvinculacion.getRange();
                                        var caso = records[0].get('CASO');
                                        var estado = records[0].get('ESTADO');

                                        //Traemos el detalle del Caso del wf:
                                        storeDesv_detalleCasoWF.load({
                                            params:{
                                                p_wf: 'DESVINCULACION',
                                                p_caso: caso
                                            },
                                            callback: function(){
                                                //Traemos el detalle de aprobacion de la solicitud:
                                                storeDesv_detalleAprobacionWF.load({
                                                    params:{
                                                        p_numero: p_numero
                                                    },
                                                    callback: function(){
                                                        var recordCaso = storeDesv_detalleCasoWF.getRange();
                                                        var recordAprob = storeDesv_detalleAprobacionWF.getRange();
                                                        //Dibujamos el flujo:
                                                        func_drawFlow(canvas, estado, recordCaso, recordAprob);
                                                        //Comprobamos si es ultima etapa:
                                                        if(recordAprob.length == recordCaso.length-1){
                                                            ultimo_paso = true;
                                                            //Ext.getCmp('id_labelCorreo').show();
                                                            Ext.getCmp('id_itemsCorreo').show();
                                                            Ext.getCmp('btn_aprobarSolDesv').hide();
                                                            Ext.getCmp('btn_rechazarSolDesv').hide();
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                        //Dibujar Linea:
                                        //func_drawFlow(Ext.getCmp('mypanelflow').items.items[1].el.dom);

                                    }
                                }
                            }
                        },{
                            xtype: 'container',
                            id:'id_labelCorreo',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'label',
                                text: '*En caso de Aprobar la solicitud:',
                                margin: '0 10 0 0'
                            }]
                        },{
                            xtype: 'container',
                            id:'id_itemsCorreo',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de notificación por correos',
                                margin: '0 10 0 0',
                                labelAlign: 'top',
                                flex: 1,
                                name: 'date_fechaCorreo',
                                format: 'd/m/Y',
                                allowBlank: false,
                                listeners:{
                                    select: function(){
                                        var form = this.up('form').getForm();
                                        var combo_fecha = form.findField('date_fechaCorreo');
                                        var myfecha = Ext.Date.format(combo_fecha.value,'Y/m/d');
                                        var hoy = Ext.Date.format(new Date(),'Y/m/d');
                                        if(myfecha<hoy){
                                            showToast('La fecha no puede ser inferior a Hoy.');
                                            combo_fecha.reset();
                                        }
                                    }	
                                }
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Horario en que se notificará',
                                labelAlign: 'top',
                                name:'cb_horarioCorreo',
                                margin: '0 10 0 0',
                                flex: 1,
                                store: storeDesv_horarioCorreo,
                                displayField: 'DETALLE',
                                valueField: 'HORARIO',
                                allowBlank: false,
                                listeners:{
                                    afterrender: function(combo){
                                        var store = combo.getStore();
                                        store.load({
                                            callback: function (records){
                                                if(records!=null){
                                                    var primero = records[0].data.HORARIO;
                                                    combo.setValue(primero);
                                                }
                                            }
                                        });
                                    },
                                    change: function(combo){
                                        
                                    }
                                }
                            },{
                                xtype: 'button',
                                text: 'Cerrar Solicitud',
                                margin: '30 10 0 0',
                                flex: 2,
                                style:{
                                    'background-color':'#00c853;',
                                    'border':'1px solid #00c853;'
                                },
                                handler: function(){
                                    var form = this.up('form').getForm();
                                    var estado = 'A';
                                    var modal = this;
                                    if(ultimo_paso){
                                        if(form.isValid()){
                                            var combo_fecha = form.findField('date_fechaCorreo');
                                            var fecha_correo = Ext.Date.format(combo_fecha.value,'d/m/Y');
                                            var horario_correo = form.findField('cb_horarioCorreo').value;
                                            console.log(horario_correo);
                                            func_aprobar_desvinculacion(p_numero, p_rol, estado, NOMBRE, fecha_correo, horario_correo, modal);
                                        }else{
                                            showToast('Debe seleccionar una fecha y un horario para la notificación por correos.');
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
                                xtype: 'button',
                                id: 'btn_aprobarSolDesv',
                                text: 'Aprobar Solicitud',
                                margin: '20 10 0 0',
                                flex: 1,
                                style:{
                                    'background-color':'#00c853;',
                                    'border':'1px solid #00c853;'
                                },
                                handler: function(){
                                    var form = this.up('form').getForm();
                                    var estado = 'A';
                                    var modal = this;
                                    if(ultimo_paso){
                                        if(form.isValid()){
                                            var combo_fecha = form.findField('date_fechaCorreo');
                                            var fecha_correo = Ext.Date.format(combo_fecha.value,'d/m/Y');
                                            var horario_correo = form.findField('cb_horarioCorreo').value;
                                            console.log(horario_correo);
                                            //func_aprobar_desvinculacion(p_numero, p_rol, estado, NOMBRE, fecha_correo, horario_correo, modal);
                                        }else{
                                            showToast('Debe seleccionar una fecha y un horario para la notificación por correos.');
                                        }
                                    }else{
                                        func_aprobar_desvinculacion(p_numero, p_rol, estado, NOMBRE, null, null, modal);
                                    }
                                   
                                }
                            },{
                                xtype: 'button',
                                id: 'btn_rechazarSolDesv',
                                text: 'Rechazar Solicitud',
                                margin: '20 10 0 0',
                                flex: 1,
                                style:{
                                    'background-color':'#E74C3C;',
                                    'border':'1px solid #E74C3C;'
                                },
                                handler: function(){
                                    
                                    var estado = 'R';
                                    var modal = this;
                                    func_aprobar_desvinculacion(p_numero, p_rol, estado, NOMBRE, null, null, modal);

                                }
                            }]
                        }]
                    }]
                }]// Fin Items Panel
            }],//Fin Items Form
            buttons:[{
                xtype: 'button',
                text: 'Cancelar',
                margin: '0 10 0 0',
                handler: function(){
                    this.up('window').close();
                }
            }]
        }]//Fin Items Modal
    }).show();
};

function func_llenarDetalleDesvinculacion(form, recordsSol, recordsPer){

    form.findField('txt_rut').setValue(recordsPer[0].get('RUT'));
    form.findField('txt_nombre').setValue(recordsPer[0].get('NOMBRES')+' '+recordsPer[0].get('APELLIDOS'));
    form.findField('txt_empresa').setValue(recordsPer[0].get('EMPRESA'));
    form.findField('txt_departamento').setValue(recordsPer[0].get('DEPARTAMENTO'));
    form.findField('txt_gerencia').setValue(recordsPer[0].get('GERENCIA'));
    form.findField('txt_rol').setValue(recordsPer[0].get('ROL'));

    form.findField('txt_fecha').setValue(recordsSol[0].get('FINIQUITO'));
    form.findField('txt_causal').setValue(recordsSol[0].get('CAUSAL'));
    form.findField('txt_causal_2').setValue(recordsSol[0].get('CAUSAL_2'));
    form.findField('txt_carta').setValue(recordsSol[0].get('CARTA'));
    form.findField('txt_hechos').setValue(recordsSol[0].get('HECHOS'));
    if(recordsSol[0].get('CAUSAL_2') != null) {
        form.findField('txt_hechos').setFieldLabel('Los hechos en que se funda la causal invocada ('
        +recordsSol[0].get('CAUSAL') 
        +' - '
        +recordsSol[0].get('CAUSAL_2') 
        +') consisten en');
    }else{
        form.findField('txt_hechos').setFieldLabel('Los hechos en que se funda la causal invocada ('
        +recordsSol[0].get('CAUSAL')
        +') consisten en');
    }
    
    form.findField('txt_motivo').setValue(recordsSol[0].get('MOTIVO'));
    form.findField('txt_equipos').setValue(recordsSol[0].get('EQUIPOS'));
    form.findField('txt_celular').setValue(recordsSol[0].get('CELULAR'));
    form.findField('txt_docs').setValue(recordsSol[0].get('DOCUMENTOS'));
    form.findField('txt_cajachica').setValue(recordsSol[0].get('CAJA_CHICA'));
    form.findField('txt_vehiculo').setValue(recordsSol[0].get('VEHICULOS'));

    if(recordsSol[0].get('ESTADO') != 'ACTIVO'){
        Ext.getCmp('btn_aprobarSolDesv').hide();
        Ext.getCmp('btn_rechazarSolDesv').hide();
    }

}

function func_aprobar_desvinculacion(p_numero, p_rol, p_estado, p_usuario, p_fecha, p_horario, modal){
    //Mensaje de loading...
    Ext.MessageBox.show({
        msg: 'Aplicando cambios',
        progressText: 'Espere por favor...',
        width: 300,
        wait: {
            interval: 200
        }
    });

    storeDesv_aprobarDesvinculacion.load({
        params:{
            p_numero: p_numero,
            p_rol: p_rol,
            p_estado: p_estado,
            p_usuario: p_usuario,
            p_fecha: p_fecha,
            p_horario: p_horario
        },
        callback : function(records){

            Ext.MessageBox.hide();//Fin loading.

            if(records != null){
                var estado = records[0].data.r_est;
                if (estado < 0) {
                    Ext.MessageBox.show({
                        title: 'ADVERTENCIA',
                        msg: records[0].data.r_msg,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK
                    });
                }else{
                    showToast('Se cambió el etado de la solicitud exitosamente.');
                    modal.up('window').close();
                }
            }
        }
    });
}

//Función para dibujar el flujo de aprobacion:
function func_drawFlow(el , estado, recordCaso, recordAprob) {
    
    var canvas = el;
    var lapiz = canvas.getContext("2d");

    //Estilo del lapiz:
    var azul = "#5fa2dd";
    var verde = "#00c853";
    var rojo = "#E74C3C";
    var gris = "#b0bec5";

    lapiz.strokeStyle = azul;
    lapiz.fillStyle = azul;
    lapiz.font = "8pt Verdana";
    lapiz.textAlign = "center";

    //Limpiamos cualquier dibujo previo sobre el canvas:
    lapiz.clearRect(0, 0, canvas.width, canvas.height);

    //Setting:
    var margen = 50;

    var alto_line = 20;
    var largo_line = canvas.width-margen*2;

    var cant_box = recordCaso.length;

    var alto_box = 80;
    var largo_box = largo_line / (cant_box+1);
    var distacia = (largo_line - largo_box*cant_box) /(cant_box-1);

    var nameEtapa = '';
    var nameRol = '';

    //Dibujar Linea de flujo:
    lapiz.fillRect(margen,margen,largo_line,alto_line);

    //Colocar Box de Aprobación:
    for (i=0; i<cant_box; i++){

        if(i<recordAprob.length){
            if(recordAprob[i].get('ESTADO') == 'APROBADO'){
                lapiz.fillStyle = verde;
            }else{//Rechazado
                lapiz.fillStyle = rojo;
            }
            nameRol = recordAprob[i].get('USUARIO');
        }else{
            lapiz.fillStyle = azul;
            nameRol = recordCaso[i].get('ROL');
        }
        if(estado == 'ANULADO'){
            lapiz.fillStyle = gris;
        }
        
        x = margen + i*largo_box + i*distacia;
        y = margen - alto_box/2 + alto_line/2;

        roundedRect(lapiz,x,y,largo_box,alto_box,5,false,true);

        //Textos:
        lapiz.fillStyle = "white";
        //Etapa:
        nameEtapa = 'ETAPA '+(i+1);
        lapiz.fillText(nameEtapa,x+largo_box/2,y+30);
        //Responsable:
        lapiz.fillText(nameRol,x+largo_box/2,y+60);
    }
    //Colocamos el Caso:
    lapiz.fillStyle = azul;
    lapiz.fillText('CASO: '+recordCaso[0].get('CASO'),canvas.width/2,margen+alto_box+20);

  }
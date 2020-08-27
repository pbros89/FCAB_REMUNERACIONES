var carta = '';

var ModalDetalleDesvinculacion= function(p_numero){
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
                //Traemos el detalle de la solicitud:
                storeDesv_detalleDesvinculacion.load({
                    params:{
                        p_numero: p_numero
                    },
                    callback: function(){
                        var records = storeDesv_detalleDesvinculacion.getRange();
                        //Traemos el detalle de la persona:
                        var personal = records[0].get('PERSONAL');
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
                                fieldLabel: 'Causal de Despido',
                                labelAlign: 'top',
                                name:'txt_causal',
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
                                fieldLabel: '¿Carta aviso 30 días?',
                                labelAlign: 'top',
                                name:'txt_carta',
                                margin: '0 10 0 0',
                                flex: 2,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'label',
                                margin: '0 10 0 0',
                                flex: 4,
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
                                text: 'Informe de haberes y descuentos pendientes a la fecha del finiquito del trabajador:',
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
                                fieldLabel: 'Cantidad Horas Extras',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_horasExtras',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Viáticos (en pesos)',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_viatico',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textareafield',
                                fieldLabel: 'Otros haberes',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_haberes',
                                margin: '0 10 0 0',
                                maxRows: 4,
                                maxLength: 100,
                                enforceMaxLength: true,
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
                            },{
                                xtype: 'textareafield',
                                fieldLabel: 'Descuentos',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_descuentos',
                                margin: '0 10 0 0',
                                maxRows: 4,
                                maxLength: 100,
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
                                xtype: 'label',
                                text: 'Materiales, Equipos y Elementos detrabajo que debe entregar a Jefe Directo',
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
                            },{
                                xtype: 'textfield',
                                fieldLabel: 'Vehículos u otros (Especificar)',
                                flex: 1,
                                labelAlign: 'top',
                                name: 'txt_vehiculo',
                                margin: '0 10 0 0',
                                readOnly: true,
                                fieldStyle: 'background-color:#d8d8d8 ; background-image:none;'
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
                                height: 250,
                                width: 900,
                            },
                            listeners:{
                                render:{
                                    scope:this,
                                    fn:function(){
                                        //Dibujar Linea:
                                        func_drawFlow(Ext.getCmp('mypanelflow').items.items[1].el.dom);
                                    }
                                }
                            }
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'left',
                            },
                            items: [{
                                xtype: 'button',
                                text: 'Aprobar Solicitud',
                                margin: '0 10 0 20',
                                flex: 1,
                                style:{
                                    'background-color':'#00c853;',
                                    'border':'1px solid #00c853;'
                                },
                                handler: function(){
                                   //
                                }
                            },{
                                xtype: 'button',
                                text: 'Rechazar Solicitud',
                                margin: '0 20 0 0',
                                flex: 1,
                                style:{
                                    'background-color':'#E74C3C;',
                                    'border':'1px solid #E74C3C;'
                                },
                                handler: function(){
                                    //
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
    form.findField('txt_carta').setValue(recordsSol[0].get('CARTA'));
    form.findField('txt_hechos').setValue(recordsSol[0].get('HECHOS'));
    form.findField('txt_motivo').setValue(recordsSol[0].get('MOTIVO'));
    form.findField('txt_horasExtras').setValue(recordsSol[0].get('HORAS_EXTRAS'));
    form.findField('txt_viatico').setValue(recordsSol[0].get('VIATICOS'));
    form.findField('txt_haberes').setValue(recordsSol[0].get('HABERES'));
    form.findField('txt_descuentos').setValue(recordsSol[0].get('DESCUENTOS'));
    form.findField('txt_equipos').setValue(recordsSol[0].get('EQUIPOS'));
    form.findField('txt_celular').setValue(recordsSol[0].get('CELULAR'));
    form.findField('txt_docs').setValue(recordsSol[0].get('DOCUMENTOS'));
    form.findField('txt_cajachica').setValue(recordsSol[0].get('CAJA_CHICA'));
    form.findField('txt_vehiculo').setValue(recordsSol[0].get('VEHICULOS'));
}

//Función para dibujar el flujo de aprobacion:
function func_drawFlow(el) {
    
    var canvas = el;
    var lapiz = canvas.getContext("2d");

    //Estilo del lapiz:
    lapiz.strokeStyle = "#5fa2dd";
    lapiz.fillStyle = "#5fa2dd";
    lapiz.font = "10pt Verdana";
    lapiz.textAlign = "center";

    //Limpiamos cualquier dibujo previo sobre el canvas:
    lapiz.clearRect(0, 0, canvas.width, canvas.height);

    var margen = 100;

    var alto_line = 20;
    var largo_line = 800;

    var cant_box = 5;

    var alto_box = 80;
    var largo_box = largo_line / (cant_box+1);
    var distacia = (largo_line - largo_box*cant_box) /(cant_box-1);

    var name_y = margen + alto_line/2;

    //Dibujar Linea de flujo:
    lapiz.fillRect(margen,margen,largo_line,alto_line);

    //Colocar Box de Aprobación:
    for (i=0; i<cant_box; i++){

        x = margen + i*largo_box + i*distacia;
        y = margen - alto_box/2 + alto_line/2;

        lapiz.fillStyle = "#5fa2dd";
        roundedRect(lapiz,x,y,largo_box,alto_box,5,false,true);

        //Textos:
        lapiz.fillStyle = "white";
        //Etapa:
        name = 'ETAPA '+(i+1);
        lapiz.fillText(name,x+largo_box/2,y+30);
        //Responsable:
        name = 'RESPONSABLE';
        lapiz.fillText(name,x+largo_box/2,y+60);
    }

  }

  //Función que dibuja un rectangulo redondeado:
  function roundedRect(ctx,x,y,width,height,radius,stroke,fill){
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    if(stroke){
        ctx.stroke();
    }
    if (fill){
        ctx.fill();
    }
 }
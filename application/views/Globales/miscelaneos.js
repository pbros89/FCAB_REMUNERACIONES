//Validar limite fechas
Ext.apply(Ext.form.VTypes, {
    daterange : function (val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDate && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDate); //field.up('form').down('#'+field.startDate);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;

        } else if (field.endDate && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDate); //field.up('form').down('#' + field.endDate);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    }
});



var msg = function (title, msg, icono, boton, fn) {
    Ext.Msg.show({
        title: title,
        msg: msg,
        minWidth: 200,
        modal: true,
        closable: false,
        icon: icono,    //Ext.Msg.INFO,
        buttons: boton,  //Ext.Msg.OK
        fn: fn
    });
};

var closeWin = function () {
    var ewin = Ext.WindowManager.getActive();
    if (ewin) {
        //ewin.close();
        ewin.destroy();
    }
};

var CerrarLimpiarTab = function () {
    //Removemos el TABpanel
    var a = tabs.getActiveTab();
    tabs.remove(a, true);
};

var ObtenerTiempo = function () {
    var date = new Date;
    var tiempo = [];

    tiempo['segundos'] = date.getSeconds();
    tiempo['minutos'] = date.getMinutes();
    tiempo['horas'] = date.getHours();

    return (tiempo);
};

var ObtenerFecha = function () {
    var date = new Date;
    var anio = date.getFullYear();
    var dia = date.getDate();
    var day; var mes;
    switch (date.getDay()) {
        case 0:
            day = "Domingo";
            break;
        case 1:
            day = "Lunes";
            break;
        case 2:
            day = "Martes";
            break;
        case 3:
            day = "Miércoles";
            break;
        case 4:
            day = "Jueves";
            break;
        case 5:
            day = "Viernes";
            break;
        case 6:
            day = "Sábado";
            break;
    }

    switch (date.getMonth()) {
        case 0:
            mes = "Enero";
            break;
        case 1:
            mes = "Febrero";
            break;
        case 2:
            mes = "Marzo";
            break;
        case 3:
            mes = "Abril";
            break;
        case 4:
            mes = "Mayo";
            break;
        case 5:
            mes = "Junio";
            break;
        case 6:
            mes = "Julio";
            break;
        case 7:
            mes = "Agosto";
            break;
        case 8:
            mes = "Septiembre";
            break;
        case 9:
            mes = "Octubre";
            break;
        case 10:
            mes = "Noviembre";
            break;
        case 11:
            mes = "Diciembre";
            break;
    }

    return (day + ' ' + dia + ' de ' + mes + ' del ' + anio);
};


var obtenerMesAnio = function () {
    var date = new Date;
    var anio = date.getFullYear();
    var mes;


    switch (date.getMonth()) {
        case 0:
            mes = "Enero";
            break;
        case 1:
            mes = "Febrero";
            break;
        case 2:
            mes = "Marzo";
            break;
        case 3:
            mes = "Abril";
            break;
        case 4:
            mes = "Mayo";
            break;
        case 5:
            mes = "Junio";
            break;
        case 6:
            mes = "Julio";
            break;
        case 7:
            mes = "Agosto";
            break;
        case 8:
            mes = "Septiembre";
            break;
        case 9:
            mes = "Octubre";
            break;
        case 10:
            mes = "Noviembre";
            break;
        case 11:
            mes = "Diciembre";
            break;
    }

    return mes + " " + anio;
};

/**
 * @return {string}
 */

var ObtenerFechaShort2 = function () {
    var date = new Date;
    var anio = date.getFullYear();
    var dia = date.getDate();
    var mes;

    switch (date.getMonth()) {
        case 0:
            mes = "01";
            break;
        case 1:
            mes = "02";
            break;
        case 2:
            mes = "03";
            break;
        case 3:
            mes = "04";
            break;
        case 4:
            mes = "05";
            break;
        case 5:
            mes = "06";
            break;
        case 6:
            mes = "07";
            break;
        case 7:
            mes = "08";
            break;
        case 8:
            mes = "09";
            break;
        case 9:
            mes = "10";
            break;
        case 10:
            mes = "11";
            break;
        case 11:
            mes = "12";
            break;
    }

    return anio + '/' + mes + '/' + dia;
};

var ObtenerFechaShort = function () {
    var date = new Date;
    var anio = date.getFullYear();
    var dia = date.getDate();
    var mes;

    switch (date.getMonth()) {
        case 0:
            mes = "01";
            break;
        case 1:
            mes = "02";
            break;
        case 2:
            mes = "03";
            break;
        case 3:
            mes = "04";
            break;
        case 4:
            mes = "05";
            break;
        case 5:
            mes = "06";
            break;
        case 6:
            mes = "07";
            break;
        case 7:
            mes = "08";
            break;
        case 8:
            mes = "09";
            break;
        case 9:
            mes = "10";
            break;
        case 10:
            mes = "11";
            break;
        case 11:
            mes = "12";
            break;
    }

    return dia + '/' + mes + '/' + anio;
};

var ObtenerHora = function () {
    var date = new Date;
    var hora = date.getHours();
    //if(hora <= 9){
    //    hora = '0' + hora;
    //}
    return (hora);
};

var ObtenerMinuto = function () {
    var date = new Date;
    var minutos = date.getMinutes();
    //if(minutos <= 9){
    //    minutos = '0' + minutos;
    //}
    return (minutos);
};

/**************************************************************************
 * Validando Formularios Dinamicamnte
 *
 * Manda un mensajeBox con los nombres de los campos obligatorios que no
 * fueron completados correctamente (en base a "name")
 *
 * @param form: Nombre del formulario con getCmp()
 * @returns {boolean} //Devuelve si el formulario es valido o no
 *
 * Modo de uso (En el boton submit o donde desees validar, agrega lo siguiente
 *
 *

 //Este fragmento va en en el boton del formulario a validar
 var form = this.up('form').getForm();
 if(!ValidarFormulario(form)) return;
 //TODO (Resto del codigo)

 *
 */

var ValidarFormulario = function (form) {
    if (form.isValid()) {
        return true;
    } else {
        var invalidFields = [];
        Ext.suspendLayouts();
        form.getFields().filterBy(function (field) {
            if (field.validate()) return;
            invalidFields.push(field);
        });
        Ext.resumeLayouts(true);
        var fieldNames = [];
        var field;
        var fields = invalidFields;
        for (var i = 0; i < fields.length; i++) {
            field = fields[i];
            if (field.getFieldLabel() === '') {
                fieldNames.push(field.getName());
            } else {
                fieldNames.push(field.getFieldLabel());
            }
        }
        msg("Error - Campos Invalidos", "Debe ingresar " + fieldNames.join(', '), Ext.Msg.INFO, Ext.Msg.OK);
        return false;
    }
};

var ValidarPorId = function (campo, TituloCampo) {
    if (campo === null || campo === '') {
        //console.log("Hola Mundo!, esta vacio")
        msg("Campo no valido", "Debe ingresar un " + TituloCampo, Ext.Msg.INFO, Ext.Msg.OK);
        return false;
    } else {
        //console.log(campo);
        return true;
    }
};

var showToast = function(html)
{
    Ext.toast({
        html: html,
        closable: false,
        align: 't',
        slideDUration: 400,
        maxWidth: 400
    }); 
};

var obtenerMesesPeriodoTexto = function(mes, periodo){
    var mesesTexto = "";
    var valorMes = 0;
    var seleccion = false;
    console.log(mes, periodo);
    switch(periodo){
        case "TRIMESTRAL":
            seleccion = mes <= 3;
            valorMes = 3;
            break;

        case "SEMESTRAL":
            seleccion = mes <= 6;
            valorMes = 6;
            break;

        case "BIMESTRAL":
            seleccion = mes <= 2;
            valorMes = 2;
            break;

        case "ANUAL":
            seleccion = mes <= 12;
            valorMes = 12;
            break;
    }
    if(seleccion){
        var indexMes = mes-1;
        for(var i = 1; i < 12; i++){
            
            
            i = indexMes;
            console.log(indexMes);
            if(indexMes < 12){
                mesesTexto += storeExtras_cargarMeses.getAt(indexMes).data.NOMBRE + ", ";
            }else{
                break;
            }
            indexMes = indexMes+(valorMes);
            
        }
    }

    return mesesTexto;
}

var sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


    var cerrarVentanas =  function () {
        Ext.WindowManager.each(function(component) {
            console.log(component);
            if (component.getXType() === 'window') {
                component.destroy();
            }
        });
    }


  var verde = '#4cd385;';
  var rojo = '#e74c3c;';
  var amarillo = '#f7b85c;';

  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
var isValidDate = function (dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function OpenInNewTabWinBrowser(url) {
    console.log(window.location.pathname+url);
    var win = window.open(window.location.pathname+url, '_blank');
    win.focus();
};

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

 function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  function moneyFormat(number) {
  var formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(number);
}



/**
 * Created by MarioTi on 21-01-16.
 */


Ext.define("Ext.locale.es.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Hoy",
    minText: "Esta fecha es anterior a la fecha mínima",
    maxText: "Esta fecha es posterior a la fecha máxima",
    disabledDaysText: "",
    disabledDatesText: "",
    nextText: 'Mes Siguiente (Control+Right)',
    prevText: 'Mes Anterior (Control+Left)',
    monthYearText: 'Seleccione un mes (Control+Up/Down para desplazar el año)',
    todayTip: "{0} (Barra espaciadora)",
    format: "d/m/Y",
    startDay: 1
});

Ext.Date.dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sabado'
];

Ext.Date.monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];



Ext.form.Field.prototype.invalidText = 'El texto ingresado no es valido';

Ext.form.TextField.prototype.blankText = 'Este campo es obligatorio';
Ext.form.TextField.prototype.minLengthText = 'la cantidad minima de caracteres es {0}';
Ext.form.TextField.prototype.maxLengthText = 'la cantidad maxima de caracteres es {0}';

Ext.form.NumberField.prototype.minText = 'El valor mínimo para este campo es {0}';
Ext.form.NumberField.prototype.maxText = 'El valor máximo para este campo es {0}';
Ext.form.NumberField.prototype.nanText = '{0} No es un número';

Ext.form.DateField.prototype.disabledDaysText = 'No se puede seleccionar';
Ext.form.DateField.prototype.disabledDatesText = 'No seleccionable';
Ext.form.DateField.prototype.minText = 'La fecha debe ser igual o posterior a {0}';
Ext.form.DateField.prototype.maxText = 'la fecha debe ser igual o anterior a {0}';
Ext.form.DateField.prototype.invalidText = '{0} no es una fecha valida, debe estar en el siguiente formato {1}';

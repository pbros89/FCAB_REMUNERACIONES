Ext.define('appmovil.model.Reportes', {
    extend: 'appmovil.model.Base',

    fields: [
        { name: 'COD_REPORTE', type: 'string' },
        { name: 'LUGAR_EXACTO', type: 'string' },
        { name: 'DESCRIPCION', type: 'string' },
        { name: 'SOLUCION_PROPUESTA', type: 'string' },
        { name: 'CAUSA',   type: 'string' },
        { name: 'OBSERVACION', type: 'string' },
        { name: 'DIAGNOSTICO', type: 'string' },
        { name: 'FECHA_REPORTADO', type: 'string' },
        { name: 'FECHA_LIMITE', type: 'string' },
        { name: 'RUT_INFORMANTE', type: 'string' },
        { name: 'NOMBRE_INFORMANTE', type: 'string' },
        { name: 'COD_CC_AFECTADO', type: 'string' },
        { name: 'RUT_COORDINADOR', type: 'string' },
        { name: 'RUT_SUPERVISOR', type: 'string' },
        { name: 'CB_AREA_AFECTADA', type: 'string' },
        { name: 'CB_AREA_USUARIO', type: 'string' },
        { name: 'HORA_INCIDENTE', type: 'string' },
        { name: 'MINUTO_INCIDENTE', type: 'string' },
        { name: 'EST_CRITICIDAD', type: 'string' },
        { name: 'TIPO_REPORTE', type: 'string' },
        { name: 'ACCIDENTE_TIPO', type: 'string' },
        { name: 'CATEGORIA', type: 'string' },
        { name: 'OCURRENCIA_INFORMANTE', type: 'string' },
        { name: 'MAGNITUD_INFORMANTE', type: 'string' },
        { name: 'RIESGO_INFORMANTE', type: 'string' },
        { name: 'PROCESO', type: 'string' },
        { name: 'ACTIVIDAD', type: 'string' },
        { name: 'NOMBRE_INVOLUCRADO', type: 'string' },
        { name: 'DESC_SUPERVISOR', type: 'string' },
        { name: 'RIESGO_INVESTIGADOR', type: 'string' },
        { name: 'OCURRENCIA_INVESTIGADOR', type: 'string' },
        { name: 'MAGNITUD_INVESTIGADOR', type: 'string' },
        { name: 'PROBLEMA_REAL', type: 'string' },
        { name: 'CB_ESTADO', type: 'string' },
        { name: 'INVESTIGADOR', type: 'string' },
        { name: 'RIESGO', type: 'string' },
        { name: 'FECHA_CERRADO', type: 'string' },
        { name: 'CORREO_INVESTIGADOR', type: 'string' },
        { name: 'CORREO_COORDINADOR', type: 'string' },
        { name: 'CORREO_INFORMANTE', type: 'string' }, {
            name: 'CUSTOM_DESC',
            mapping: 'TIPO',
            convert: function (v, record) {
                return Ext.util.Format.ellipsis(record.get('DESCRIPCION'), 60) + '...'; //Es lo que mostrara en el combobox
            }
        }
    ]
});
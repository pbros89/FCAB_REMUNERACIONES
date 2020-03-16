Ext.define('Dev.ux.UpperTextField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.uppertextfield',
    config: {
        uppercaseValue: true //config defecto true
    },

    constructor: function (config) {
        this.initConfig(config);
        this.callParent([config]);
    },

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            fieldStyle: 'text-transform:uppercase'
        });

        me.callParent();
    },

    //overriden function
    getValue: function () {
        var val = this.callParent();
        return this.getUppercaseValue() ? val.toUpperCase() : val;
    }
});
/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/**
 LazyLoad makes it easy and painless to lazily load one or more external
 JavaScript or CSS files on demand either during or after the rendering of a web
 page.

 Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
 Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
 are not officially supported.

 Visit https://github.com/rgrove/lazyload/ for more info.

 Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
 All rights reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the 'Software'), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 @module lazyload
 @class LazyLoad
 @static
 */

LazyLoad = (function (doc) {
    // -- Private Variables ------------------------------------------------------

    // User agent and feature test information.
    var env,

    // Reference to the <head> element (populated lazily).
        head,

    // Requests currently in progress, if any.
        pending = {},

    // Number of times we've polled to check whether a pending stylesheet has
    // finished loading. If this gets too high, we're probably stalled.
        pollCount = 0,

    // Queued requests.
        queue = {css: [], js: []},

    // Reference to the browser's list of stylesheets.
        styleSheets = doc.styleSheets;

    // -- Private Methods --------------------------------------------------------

    /**
     Creates and returns an HTML element with the specified name and attributes.

     @method createNode
     @param {String} name element name
     @param {Object} attrs name/value mapping of element attributes
     @return {HTMLElement}
     @private
     */
    function createNode(name, attrs) {
        var node = doc.createElement(name), attr;

        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                node.setAttribute(attr, attrs[attr]);
            }
        }

        return node;
    }

    /**
     Called when the current pending resource of the specified type has finished
     loading. Executes the associated callback (if any) and loads the next
     resource in the queue.

     @method finish
     @param {String} type resource type ('css' or 'js')
     @private
     */
    function finish(type) {
        var p = pending[type],
            callback,
            urls;

        if (p) {
            callback = p.callback;
            urls = p.urls;

            urls.shift();
            pollCount = 0;

            // If this is the last of the pending URLs, execute the callback and
            // start the next request in the queue (if any).
            if (!urls.length) {
                callback && callback.call(p.context, p.obj);
                pending[type] = null;
                queue[type].length && load(type);
            }
        }
    }

    /**
     Populates the <code>env</code> variable with user agent and feature test
     information.

     @method getEnv
     @private
     */
    function getEnv() {
        var ua = navigator.userAgent;

        env = {
            // True if this browser supports disabling async mode on dynamically
            // created script nodes. See
            // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
            async: doc.createElement('script').async === true
        };

        (env.webkit = /AppleWebKit\//.test(ua))
        || (env.ie = /MSIE|Trident/.test(ua))
        || (env.opera = /Opera/.test(ua))
        || (env.gecko = /Gecko\//.test(ua))
        || (env.unknown = true);
    }

    /**
     Loads the specified resources, or the next resource of the specified type
     in the queue if no resources are specified. If a resource of the specified
     type is already being loaded, the new request will be queued until the
     first request has been finished.

     When an array of resource URLs is specified, those URLs will be loaded in
     parallel if it is possible to do so while preserving execution order. All
     browsers support parallel loading of CSS, but only Firefox and Opera
     support parallel loading of scripts. In other browsers, scripts will be
     queued and loaded one at a time to ensure correct execution order.

     @method load
     @param {String} type resource type ('css' or 'js')
     @param {String|Array} urls (optional) URL or array of URLs to load
     @param {Function} callback (optional) callback function to execute when the
     resource is loaded
     @param {Object} obj (optional) object to pass to the callback function
     @param {Object} context (optional) if provided, the callback function will
     be executed in this object's context
     @private
     */
    function load(type, urls, callback, obj, context) {
        var _finish = function () {
                finish(type);
            },
            isCSS = type === 'css',
            nodes = [],
            i, len, node, p, pendingUrls, url;

        env || getEnv();

        if (urls) {
            // If urls is a string, wrap it in an array. Otherwise assume it's an
            // array and create a copy of it so modifications won't be made to the
            // original.
            urls = typeof urls === 'string' ? [urls] : urls.concat();

            // Create a request object for each URL. If multiple URLs are specified,
            // the callback will only be executed after all URLs have been loaded.
            //
            // Sadly, Firefox and Opera are the only browsers capable of loading
            // scripts in parallel while preserving execution order. In all other
            // browsers, scripts must be loaded sequentially.
            //
            // All browsers respect CSS specificity based on the order of the link
            // elements in the DOM, regardless of the order in which the stylesheets
            // are actually downloaded.
            if (isCSS || env.async || env.gecko || env.opera) {
                // Load in parallel.
                queue[type].push({
                    urls: urls,
                    callback: callback,
                    obj: obj,
                    context: context
                });
            } else {
                // Load sequentially.
                for (i = 0, len = urls.length; i < len; ++i) {
                    queue[type].push({
                        urls: [urls[i]],
                        callback: i === len - 1 ? callback : null, // callback is only added to the last URL
                        obj: obj,
                        context: context
                    });
                }
            }
        }

        // If a previous load request of this type is currently in progress, we'll
        // wait our turn. Otherwise, grab the next item in the queue.
        if (pending[type] || !(p = pending[type] = queue[type].shift())) {
            return;
        }

        head || (head = doc.head || doc.getElementsByTagName('head')[0]);
        pendingUrls = p.urls.concat();

        for (i = 0, len = pendingUrls.length; i < len; ++i) {
            url = pendingUrls[i];

            if (isCSS) {
                node = env.gecko ? createNode('style') : createNode('link', {
                    href: url,
                    rel: 'stylesheet'
                });
            } else {
                node = createNode('script', {src: url});
                node.async = false;
            }

            node.className = 'lazyload';
            node.setAttribute('charset', 'utf-8');

            if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
                node.onreadystatechange = function () {
                    if (/loaded|complete/.test(node.readyState)) {
                        node.onreadystatechange = null;

                        // "loaded" readyState fired prematurely in IE 10.
                        // But waiting for a little while can fix this issue.
                        // Please check this out:
                        // https://connect.microsoft.com/IE/feedback/details/729164/\
                        // ie10-dynamic-script-element-fires-loaded-readystate-prematurely
                        env.ie && env.ie[1] == 10 ? setTimeout(_finish, 4) : _finish();
                    }
                };
            } else if (isCSS && (env.gecko || env.webkit)) {
                // Gecko and WebKit don't support the onload event on link nodes.
                if (env.webkit) {
                    // In WebKit, we can poll for changes to document.styleSheets to
                    // figure out when stylesheets have loaded.
                    p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
                    pollWebKit();
                } else {
                    // In Gecko, we can import the requested URL into a <style> node and
                    // poll for the existence of node.sheet.cssRules. Props to Zach
                    // Leatherman for calling my attention to this technique.
                    node.innerHTML = '@import "' + url + '";';
                    pollGecko(node);
                }
            } else {
                node.onload = node.onerror = _finish;
            }

            nodes.push(node);
        }

        for (i = 0, len = nodes.length; i < len; ++i) {
            head.appendChild(nodes[i]);
        }
    }

    /**
     Begins polling to determine when the specified stylesheet has finished loading
     in Gecko. Polling stops when all pending stylesheets have loaded or after 10
     seconds (to prevent stalls).

     Thanks to Zach Leatherman for calling my attention to the @import-based
     cross-domain technique used here, and to Oleg Slobodskoi for an earlier
     same-domain implementation. See Zach's blog for more details:
     http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

     @method pollGecko
     @param {HTMLElement} node Style node to poll.
     @private
     */
    function pollGecko(node) {
        var hasRules;

        try {
            // We don't really need to store this value or ever refer to it again, but
            // if we don't store it, Closure Compiler assumes the code is useless and
            // removes it.
            hasRules = !!node.sheet.cssRules;
        } catch (ex) {
            // An exception means the stylesheet is still loading.
            pollCount += 1;

            if (pollCount < 200) {
                setTimeout(function () {
                    pollGecko(node);
                }, 50);
            } else {
                // We've been polling for 10 seconds and nothing's happened. Stop
                // polling and finish the pending requests to avoid blocking further
                // requests.
                hasRules && finish('css');
            }

            return;
        }

        // If we get here, the stylesheet has loaded.
        finish('css');
    }

    /**
     Begins polling to determine when pending stylesheets have finished loading
     in WebKit. Polling stops when all pending stylesheets have loaded or after 10
     seconds (to prevent stalls).

     @method pollWebKit
     @private
     */
    function pollWebKit() {
        var css = pending.css, i;

        if (css) {
            i = styleSheets.length;

            // Look for a stylesheet matching the pending URL.
            while (--i >= 0) {
                if (styleSheets[i].href === css.urls[0]) {
                    finish('css');
                    break;
                }
            }

            pollCount += 1;

            if (css) {
                if (pollCount < 200) {
                    setTimeout(pollWebKit, 50);
                } else {
                    // We've been polling for 10 seconds and nothing's happened, which may
                    // indicate that the stylesheet has been removed from the document
                    // before it had a chance to load. Stop polling and finish the pending
                    // request to prevent blocking further requests.
                    finish('css');
                }
            }
        }
    }

    return {

        /**
         Requests the specified CSS URL or URLs and executes the specified
         callback (if any) when they have finished loading. If an array of URLs is
         specified, the stylesheets will be loaded in parallel and the callback
         will be executed after all stylesheets have finished loading.

         @method css
         @param {String|Array} urls CSS URL or array of CSS URLs to load
         @param {Function} callback (optional) callback function to execute when
         the specified stylesheets are loaded
         @param {Object} obj (optional) object to pass to the callback function
         @param {Object} context (optional) if provided, the callback function
         will be executed in this object's context
         @static
         */
        css: function (urls, callback, obj, context) {
            load('css', urls, callback, obj, context);
        },

        /**
         Requests the specified JavaScript URL or URLs and executes the specified
         callback (if any) when they have finished loading. If an array of URLs is
         specified and the browser supports it, the scripts will be loaded in
         parallel and the callback will be executed after all scripts have
         finished loading.

         Currently, only Firefox and Opera support parallel loading of scripts while
         preserving execution order. In other browsers, scripts will be
         queued and loaded one at a time to ensure correct execution order.

         @method js
         @param {String|Array} urls JS URL or array of JS URLs to load
         @param {Function} callback (optional) callback function to execute when
         the specified scripts are loaded
         @param {Object} obj (optional) object to pass to the callback function
         @param {Object} context (optional) if provided, the callback function
         will be executed in this object's context
         @static
         */
        js: function (urls, callback, obj, context) {
            load('js', urls, callback, obj, context);
        }

    };
})(this.document);

var SafeClick = function () {
    //<!--
    function clickIE() {
        if (document.all) {

            return false;
        }
    }

    function clickNS(e) {
        if
        (document.layers || (document.getElementById && !document.all)) {
            if (e.which === 2 || e.which === 3) {

                return false;
            }
        }
    }

    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS;
    }
    else {
        document.onmouseup = clickNS;
        document.oncontextmenu = clickIE;
    }
    document.oncontextmenu = new Function("return false");
// -->
};

var restaFechas = function (f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    return Math.floor(dif / (1000 * 60 * 60 * 24));
};

var digitoRut = function (rut) {
    var count = 0;
    var count2 = 0;
    var factor = 2;
    var suma = 0;
    var sum = 0;
    var digito = 0;
    count2 = rut.length - 1;
    while (count < rut.length) {
        sum = factor * (parseInt(rut.substr(count2, 1)));
        suma = suma + sum;
        sum = 0;
        count = count + 1;
        count2 = count2 - 1;
        factor = factor + 1;
        if (factor > 7) {
            factor = 2;
        }
    }
    digito = 11 - (suma % 11);
    if (digito === 11) {
        digito = 0;
    }
    if (digito === 10) {
        digito = "k";
    }
    return digito;
};

//TODO: Aca comienza la magia. Lo de arriba, ya no se usa...

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': document.URL + 'resources/ExtJs/build/packages/ux/pack'
    }
});

Ext.require([
    'Ext.tab.*',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
    //'Ext.tip.QuickTipManager',
    //'Ext.ux.TabReorderer',
    //'Ext.ux.LiveSearchGridPanel',
    //'Ext.ux.statusbar.StatusBar'
]);

//Ext.QuickTips.init();

Ext.onReady(function () {

    body = Ext.getBody();

    Ext.define('sortec.async', {
        statics: {
            CargarPromesas: function (store, parametros) {
                var deferred = new Ext.Deferred(); // create the Ext.Deferred object

                for (var p in parametros) {
                    if (parametros.hasOwnProperty(p)) {
                        var srt = p + ',' + parametros[p];
                        store.getProxy().setExtraParam(p, parametros[p]);
                    }
                }
                store.load({
                    callback: function (records, operation, success) {
                        if (success) {
                            deferred.resolve(records);
                        }
                        else {
                            deferred.reject("Error al cargar el JSON.");
                            Ext.MessageBox.show({
                                title: 'Problemas con la conexión',
                                msg: 'Ocurrio un error al comunicarse con la base de datos, puedes intentar solucionar el problema de dos formas<br /><br />1-. Cerrando la pestaña y volviendo abrirla<br />2-. Refrescando la página.<br /><br/>¿Deseas refrescar la página?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                icon: Ext.MessageBox.WARNING,
                                fn: function (btn) {
                                    if (btn == 'ok') {
                                        location.reload();
                                    }
                                }
                            });
                        }
                    }
                });
                return deferred.promise;
            },
            PrometoSyncArchivos: function (url) {
                var deferred = new Ext.Deferred();
                Ext.Ajax.request({
                    url: host + 'loader/getFolder?folder=' + url,
                    success: function (response) {
                        deferred.resolve(JSON.parse(response.responseText));
                    },
                    failure: function (response) {
                        deferred.reject(response.status);
                    }
                });
                return deferred.promise; // will return underlying promise
            },
            PrometoAsyncStore: function(store) {
                return new Ext.Promise(function (resolve, reject) {
                    //something asynchronous, like loading a store
                    store.load({
                        callback: function(records, operation, success) {
                            if(success){
                                if(records.length > 0){
                                    //when it’s ok
                                    resolve(records);
                                } else {
                                    //still ok, but no results
                                    resolve(false);
                                }
                            } else{
                                //something bad happened
                                reject(operation);
                            }
                        }
                    });
                });
            },
            
            PrometoUnAjax: function (url, rec, params) {
                var deferred = new Ext.Deferred();

                function getJsonOfStore(store) {
                    var datar = [];
                    var jsonDataEncode = "";
                    var records = store.getRange();
                    for (var i = 0; i < records.length; i++) {
                        datar.push(records[i].data);
                    }
                    jsonDataEncode = Ext.util.JSON.encode(datar);

                    return jsonDataEncode;
                }

                if (params === null || params === '' || params === 0) params = "invalido";
                var store = getJsonOfStore(rec);
                Ext.Ajax.request({
                    url: host + url,
                    method: 'POST',
                    params: {
                        rec: store,
                        params: params //Puede ser array o simple, cambia como se lee en php
                    },
                    success: function (response) {
                        deferred.resolve(response.responseText);
                    },
                    failure: function (response) {
                        deferred.reject(response.status);
                    }
                });
                return deferred.promise; // will return underlying promise
            }
        }
    });

    Ext.Loader.loadScript({url: hostSource + 'resources/ExtJs/build/exts-ext.js'});
    Ext.Loader.loadScript({url: hostSource + 'resources/ExtJs/build/packages/charts/classic/' + style_ext + '/resources/charts-all.css'});
    Ext.Loader.loadScript({url: hostSource + 'resources/css/main.css'});
    Ext.Loader.loadScript({url: hostSource + 'resources/js/main.js'});
    Ext.Loader.loadScript({url: hostSource + 'resources/ExtJs/build/packages/charts/classic/charts.js'});

    Ext.EventManager.on(Ext.isIE ? document : window, 'keydown', function (e, t) {
        if (e.getKey() == e.BACKSPACE && ((!/^input$/i.test(t.tagName) && !/^textarea$/i.test(t.tagName)) || t.disabled || t.readOnly)) {
            e.stopEvent();
        }
    });

    SafeClick();

    Ext.define('Ext.overrides.layout.container.Container', {
        override: 'Ext.layout.container.Container',

        notifyOwner: function () {
            this.owner.afterLayout(this);
        }
    });

    var tipoLoginStore = Ext.create('Ext.data.Store', {
        fields: ['valor', 'descripcion'],
        data : [
            {"valor":"INTRANET", "descripcion":"Cuenta Intranet"}
            //{"valor":"TALLER", "descripcion":"Datos Personales"}
        ]
    });

    Ext.define('fcab.view.login.Login', {
        extend: 'Ext.window.Window',
        xtype: 'login',
        id: 'pnlLogin',
        bodyPadding: 10,
        title: 'Identificación de usuario',
        closable: false,
        autoShow: true,
        items: [{
            xtype: 'panel',
            layout: {
                type: 'column',
                align: 'strech'
            },
            border: false,
            items: [{
                columnWidth: 1,
                xtype: 'form',
                border: false,
                //height: 345,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    border: false,
                    items: [{
                        xtype: 'checkbox',
                        id: 'recordarLog',
                        name: 'recordarLog',
                        boxLabel: 'Recordarme',
                        hideLabel: true,
                        disabled: false,
                        checked: true
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        text: 'Iniciar Sesión',
                        formBind: true,
                        handler: function () {
                            var form = this.up('form').getForm();
                            var values = form.getValues();
                            console.log(values);
                            fnLogin(values);
                            
                        }
                    }]
                }],
                items: [{
                    xtype: 'hiddenfield',
                    name: 'tipo_login',
                    store: tipoLoginStore,
                    id: 'tipo_ingreso',
                    value: 'INTRANET',
                    listeners: {
                        /*render: function() {

                        },
                        change: function (rec, nuevo, viejo) {
                            if (nuevo === 'TALLER') {
                                Ext.getCmp('rbRut').show();
                                Ext.getCmp('rbRut').allowBlank = false;
                                Ext.getCmp('anho_nacimiento').show();
                                Ext.getCmp('anho_nacimiento').allowBlank = false;
                                Ext.getCmp('rut_informante').show();
                                Ext.getCmp('rut_informante').allowBlank = false;
                                Ext.getCmp('dv_informante').show();
                                Ext.getCmp('dv_informante').allowBlank = false;

                                Ext.getCmp('usuario_dominio').allowBlank = true;
                                Ext.getCmp('usuario_dominio').hide();
                                Ext.getCmp('pass_dominio').allowBlank = true;
                                Ext.getCmp('pass_dominio').hide();
                                Ext.getCmp('recordarLog').setValue(false);
                                Ext.getCmp('recordarLog').disable();
                            } else {
                                Ext.getCmp('rbRut').hide();
                                Ext.getCmp('rbRut').allowBlank = true;
                                Ext.getCmp('anho_nacimiento').hide();
                                Ext.getCmp('anho_nacimiento').allowBlank = true;
                                Ext.getCmp('rut_informante').hide();
                                Ext.getCmp('rut_informante').allowBlank = true;
                                Ext.getCmp('dv_informante').hide();
                                Ext.getCmp('dv_informante').allowBlank = true;

                                Ext.getCmp('usuario_dominio').allowBlank = false;
                                Ext.getCmp('usuario_dominio').show();
                                Ext.getCmp('pass_dominio').allowBlank = false;
                                Ext.getCmp('pass_dominio').show();
                                Ext.getCmp('recordarLog').setValue(true);
                                Ext.getCmp('recordarLog').enable();
                            }
                        }*/
                    }
                }, {
                    xtype: 'combobox',
                    //labelAlign:'top',
                    labelWidth: 120,
                    width: 390,
                    fieldLabel: 'Empresa',
                    displayField: 'NOMBRE',
                    valueField: 'PK_COD_EMP',
                    name: 'cemp',
                    itemId: 'cemp',
                    id: 'cemp',
                    editable: true,
                    triggerAction: 'all',
                    typeAhead: true,
                    selectOnFocus: true,
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    store: Ext.create('Ext.data.Store', {
                        autoLoad: true,
                        proxy: {
                            type: 'ajax',
                            url: JsonHost + 'empresa/EmpresaController/cargarEmpresas?p_estado=A',
                            reader: {
                                type: 'json',
                                rootProperty: 'items' // your root of your data containing the array of fields for the store
                            },
                        },
                    })
                }, {
                    xtype: 'textfield',
                    hidden: false,
                    name: 'username',
                    id: 'usuario_dominio',
                    labelWidth: 120,
                    width: 390,
                    fieldLabel: 'Usuario',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    name: 'password',
                    id: 'pass_dominio',
                    inputType: 'password',
                    labelWidth: 120,
                    width: 390,
                    fieldLabel: 'Contraseña',
                    hidden: false,
                    allowBlank: false
                }, {
                    xtype: 'displayfield',
                    id: 'errorLabel',
                    hidden: true,
                    width: 390,
                    hideEmptyLabel: false,
                    fieldStyle: "color:red;",
                    value: 'Ingrese su contraseña'
                }]
            }]
        }],
        listeners: {
            afterRender: function (thisForm, options) {
                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                    enter: fnLogin,
                    scope: this
                });
                
                Ext.Ajax.request({
                    url: JsonHost + 'store/Login/getLogin',
                    noCache: false,
                    method: 'GET',
                    success: function (response) {
                        //Ext.MessageBox.hide();
                        try {
                            
                            var acceso = JSON.parse(response.responseText);
                            console.log(acceso);
                            var usuario = acceso.usuario;
                            var empresa = acceso.empresa;
                            
                            console.log(usuario);
                            Ext.getCmp('usuario_dominio').setValue(usuario);
                            Ext.getCmp('cemp').setValue(empresa);
                            
                        } catch (err) {
                            console.log(err);
                            Ext.toast({
                                html: "Verificación de acceso al sistema fallida",
                                closable: false,
                                align: 't',
                                slideInDuration: 400,
                                minWidth: 400
                            });

                          return;
                        }
                    },
                    failure: function (form, action) {
                      //Ext.MessageBox.hide();
                      Ext.getCmp('errorLabel').setValue("Error de conexión");
                      Ext.getCmp('errorLabel').hidden = false;
                    }
                });
            }
        }
    });

    var fnLogin = function (values) {
        
        var uDominio = Ext.getCmp('usuario_dominio').getValue();
        var pDominio = Ext.getCmp('pass_dominio').getValue();
        var rInformante = '';
        var aNacimiento = '';
        var cLogin = Ext.getCmp('recordarLog').getValue();
        var tIngreso = Ext.getCmp('tipo_ingreso').getValue();
        var cemp = Ext.getCmp('cemp').getValue();
        var cnomemp = Ext.getCmp('cemp').getRawValue();
        
        if (tIngreso !== 'Taller') if (uDominio === "" || pDominio === "" || cemp === "" ||
        uDominio === null || pDominio === null || cemp === null 
        ) return;
        
        
        Ext.MessageBox.show({
            msg: 'Cargando...',
            progressText: 'Cargando...',
            width: 300,
            wait: {
                interval: 200
            }
        });

        Ext.Ajax.request({
            url: host + 'store/Login/Ingresar',
            method: 'POST',
            noCache: false,
            params: {
                uDominio: uDominio,
                pDominio: pDominio,
                rInformante: rInformante,
                //aInformante: aInformante,
                aNacimiento: aNacimiento,
                tIngreso: tIngreso,
                cLogin: cLogin,
                cemp: cemp,
                cnomemp: cnomemp
            },
            success: function (response) {
                //Ext.MessageBox.hide();

                try {
                    var usuario = JSON.parse(response.responseText);
                    console.log(usuario);
                    NOMBRE = usuario[0].nombre;
                    RUT = usuario[0].rut;
                    NOMBRE_FULL = usuario[0].nombre_full;
                    CORREO = usuario[0].correo;
                    TIPO = usuario[0].tipo;
                    EMPRESA = cemp;
                    NOM_EMPRESA = cnomemp;
                    validarUsuarioBd(NOMBRE, EMPRESA);

                } catch (e) {
                    console.log("error " + e)
                    Ext.MessageBox.hide();
                    Ext.toast({
                        html: "Los datos ingresados no corresponden a un usuario o usuaria del dominio.",
                        closable: false,
                        align: 't',
                        slideInDuration: 400,
                        minWidth: 400
                    });

                    return;
                }
                
                
                
                
            },
            failure: function (form, action) {
                Ext.MessageBox.hide();
                Ext.getCmp('errorLabel').setValue("Error de conexión");
                Ext.getCmp('errorLabel').hidden = false;
            }
        });

        console.log("PRUEBA");
    };

    //Logear o no logear, he ahí el dilema
    //console.log(logeado + " logeado 2");
    if (logeado === "conectado") {
        
        Ext.MessageBox.show({
            msg: 'Cargando...',
            progressText: 'Cargando...',
            width: 300,
            wait: {
                interval: 200
            }
        });
        //console.log(logeado + " logeado 3");
        //Recuperamos RUT, Nombre y Area (Aun ya estando logeado) - Session
        Ext.Ajax.request({
            url: host + 'store/Login/Recuperar',
            noCache: false,
            method: 'POST',
            success: function (response) {
                console.log(response);
                try {
                    var usuario = JSON.parse(response.responseText);
                    console.log(usuario);
                    //console.debug(usuario[0].nombre);
                    NOMBRE = usuario[0].nombre;
                    RUT = usuario[0].rut;
                    NOMBRE_FULL = usuario[0].nombre_full;
                    CORREO = usuario[0].correo;
                    TIPO = usuario[0].tipo;
                    EMPRESA = usuario.empresa;
                    NOM_EMPRESA = usuario.nomempresa;
                    validarUsuarioBd(NOMBRE, EMPRESA);
                    
                } catch (err) {
                    console.log(err.message);
                    Ext.MessageBox.hide();
                }
            },
            failure: function (form, action) {
                Ext.MessageBox.hide();
            }
        });
    } else { //Pedimos Login
        Ext.create('fcab.view.login.Login', {
            renderTo: body
        });
    }
    //Al final iniciamos el modulo y cargamos la raiz
    var CargarSistema = function () {
        Ext.Loader.loadScript({url: hostSource + 'resources/ExtJs/build/exts-helps.js'});
        Ext.Loader.loadScript({url: hostSource + 'application/views/ConfiguracionLibreria.js'});
        
    };

    var validarUsuarioBd = function(p_usuario, p_empresa) {

        Ext.Ajax.request({
            url: host + 'usuario/UsuarioController/cargarUsuarios',
            method: 'GET',
            noCache: false,
            params: {
                p_usuario : p_usuario,
                p_cod_emp : p_empresa,
                p_estado : 'A'
            },
            success: function (response) {
                try {
                    var data = JSON.parse(response.responseText);
                    if(data.items.length > 0)
                    {
                        ROL = data.items[0].ROL;
                        cargarRolesAcciones(ROL);
                    }else{
                        Ext.MessageBox.hide();
                        Ext.toast({
                            html: "El usuario no esta registrado en el sistema",
                            closable: false,
                            align: 't',
                            slideInDuration: 400,
                            minWidth: 400
                        });
                    }
                }catch(err){
                    Ext.MessageBox.hide();
                    Ext.toast({
                        html: err.message,
                        closable: false,
                        align: 't',
                        slideInDuration: 400,
                        minWidth: 400
                    });

                    console.log(err.message);
                }
            }
        });

    }

    var cargarRolesAcciones = function(p_rol ) {
        Ext.Ajax.request({
            url: host + 'usuario/UsuarioController/cargarRolesAcciones',
            method: 'GET',
            noCache: false,
            params: {
                p_rol : p_rol,
                p_pantalla : '',
                p_accion : ''
            },
            success: function (response) {
                try {
                    Ext.MessageBox.hide();
                    var data = JSON.parse(response.responseText);
                    if(data.items.length > 0)
                    {
                        ROL_ACCIONES = data.items;
                        //console.log(ROL_ACCIONES);
                        if(Ext.getCmp('pnlLogin') != null){
                            Ext.getCmp('pnlLogin').destroy();
                        }
                        CargarSistema();
                    }else{
                        Ext.toast({
                            html: "El problemas al cargar privilegios",
                            closable: false,
                            align: 't',
                            slideInDuration: 400,
                            minWidth: 400
                        });
                    }
                }catch(err){
                    Ext.MessageBox.hide();
                    Ext.toast({
                        html: err.message,
                        closable: false,
                        align: 't',
                        slideInDuration: 400,
                        minWidth: 400
                    });
                    console.log(err.message);
                }
            }
        });

    }
});



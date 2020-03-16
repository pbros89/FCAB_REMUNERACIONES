/**
 *
 * @param titulo Titulo del modal
 * @param spaceFormulario Nombre de espacio del formulario (nameSpace)
 * @param width ancho
 * @param height largo
 */

var modalExternos = function (titulo, spaceFormulario, width, height) {
    var winName = titulo;
    var winURL = document.URL;
    var params = {'externo': 'true', 'formExterno': spaceFormulario};
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", winURL);
    form.setAttribute("target", winName);
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    window.open('', winName, 'toolbar,width=' + width + ',height= ' + height + '');
    form.target = winName;
    form.submit();
    document.body.removeChild(form);

};

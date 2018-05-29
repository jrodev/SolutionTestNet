var classPerson = (function () {
    var dni = '98568597';


    function classPerson(sName, sApe) {
        this.name = sName;
        this.ape = sApe;
        undefinedVar = 10; // Para provocar error en strict mode
    }

    classPerson.prototype.getDni = function () {
        return dni;
    };

    classPerson.prototype.setDni = function (sDni) {
        dni = sDni;
    };

    return classPerson;

})();

var pers1 = new classPerson("Juan", "Rosedal Quispe");
var pers2 = new classPerson("Flor", "Cahua Ardiz");
pers1.setDni('65874986');
pers2.setDni('65968854');

var h3Tit = document.getElementById('h3Tit');
h3Tit.innerHTML = 'Personas: ' + pers1.name + ' | ' + pers2.name;

function newFnc(sArg) {
    var variable = null;
    //var prmse = StackTrace.get().then(callback).catch(errback);
    return "mew fnc!!" + sArg;
}

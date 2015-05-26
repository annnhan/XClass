

var XClass = require('../XClass');

exports.run = function () {
    var Person = function (name) {
        this.name = name;
    }
    Person.prototype.getname = function () {
        return this.name;
    }

    var Hanan = new XClass({
        init: function (name) {
            this.parent(name);
        },
        proto: {
            getname: function () {
                return this.parent();
            }
        },
        parent: Person
    });

    var hanan = new Hanan('hanan');
    var name = hanan.getname();

    console.log('class:', name === 'hanan');
}

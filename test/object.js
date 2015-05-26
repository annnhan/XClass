/**
 * Created by an.han on 15/5/25.
 */

var XClass = require('../XClass');

exports.run = function () {
    var obj = {
        getname: function () {
            return this.name;
        }
    }

    var Person = new XClass({
        init: function () {
            this.name = 'hanan'
        },
        proto: {
            getname: function () {
                return this.parent();
            }
        },
        parent: obj
    });

    var hanan = new Person();
    var name = hanan.getname();

    console.log('object:', name === 'hanan');
}

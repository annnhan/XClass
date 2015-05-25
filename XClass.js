/**
 * Created by an.han on 15/5/24.
 */

~function (global) {

    var slice = Array.prototype.slice;

    function isUndefined (value) {
        return typeof value === 'undefined';
    }

    function isFunction (value) {
        return typeof value === 'function';
    }

    function isComplex (value) {
        return isFunction(value) || typeof value === 'object';
    }

    // 数组遍历方法
    function forEach (array, callback) {
        if (array.forEach) {
            array.forEach(callback);
        }
        else {
            for (var i = 0, len = array.length; i < len; i++) {
                callback(array[i], i, array);
            }
        }
    }

    // 扩展对象方法
    function extend () {
        var args = slice.call(arguments);
        var result = args.shift();
        if (isUndefined(result)) {
            return result;
        }
        forEach(args, function (item, index) {
            for (var key in item) {
                if (isComplex(item[key])){
                    item[key].__parent__ = result[key];
                }
                result[key] = item[key];
            }
        });
        return result;
    }

    // 调用父类方法的函数
    function callParent () {
        var parent = arguments.callee.caller.__parent__;
        if (isFunction(parent)) {
            return parent.apply(this, arguments);
        }
    }

    // 默认配置
    var defaultOptions = {
        init: function () {},
        proto: {},
        parent: {},
        callParentMethodName: 'parent'
    }

    /**
     * @constructor
     * @param options.init    Class的构造函数
     * @param options.proto   Class的原型方法集合
     * @param options.parent  继承的类或对象
     * @param options.callParentMethodName  调用父类方法的方法名
     * @return {Function}
     */
    function XClass(options) {
        if (isUndefined(options)) {
            options = {};
        }

        options = extend({}, defaultOptions, options);

        var proxy = function(){};
        var init  = options.init;
        var proto = options.proto;
        var parent;

        if (isFunction(options.parent)) {
            init.__parent__ = options.parent;
            parent = options.parent.prototype;
        }
        else {
            parent = options.parent;
        }

        proxy.prototype = parent;
        parent = new proxy();
        proto = extend(parent, proto);
        proto[options.callParentMethodName] = callParent;
        proto.constructor = init;
        init.prototype = proto;

        return init;
    }

    global.XClass = global.XClass || XClass;
    try {
        module.exports = XClass;
    }
    catch (e){}

}(this);
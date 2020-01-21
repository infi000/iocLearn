function NoteBook() { }
NoteBook.prototype.printName = function () {
    console.log("this is a notebook");
}

function Pencil() { }
Pencil.prototype.printName = function () {
    console.log("this is a pencil")
}

function Student() { }
Student.prototype.write = function (notebook, pencil) {
    if (!notebook || !pencil) {
        throw new Error("dependecies not provided!");
    }
    console.log("writing....");
}

// 通常：执行student.write需要参数，不然会报错 
// 希望：直接执行student.write，依赖容器中有相应的参数就执行，没有再报错

var cache = {};
// 通过解析Function.prototype.toString()取得参数名
function getParamNames(func) {
    // 正则表达式出自http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript
    var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
    paramNames = paramNames.replace(/ /g, '');
    paramNames = paramNames.split(',');
    return paramNames;
}

var injector = {
    resolve: function (func, bind) {
        //取得参数名
        var paramsName = getParamNames(func);
        var params = [];
        for (let i = 0; i < paramsName.length; i++) {
            // 获取相应参数名的依赖
            params.push(cache[paramsName[i]]);
        }
        // 执行
        func.apply(bind, params)
    }
}

var pencil = new Pencil();
cache.pencil = pencil;
var notebook = new NoteBook();
cache.notebook = notebook;
var student = new Student();






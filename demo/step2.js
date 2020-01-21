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

// 希望：将injector封装

function Injector ( ) {
   this._cache = {}
}
Injector.prototype.put = function (name,opt) {
        this._cache[name] = opt
}
Injector.prototype.getParamNames=function (func){
    var paramNames = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
    paramNames = paramNames.replace(/ /g, '');
    paramNames = paramNames.split(',');
    return paramNames;
}

Injector.prototype.resolve = function (func,bind){
    var paramsName = this.getParamNames(func);
    var params = [];
    for (let i = 0; i < paramsName.length; i++) {
        // 获取相应参数名的依赖
        params.push(this._cache[paramsName[i]]);
    }
    // 执行
    func.apply(bind, params)
}

var pencil = new Pencil();
var notebook = new NoteBook();
var student = new Student();


const myInjector = new Injector()
myInjector.put('pencil',pencil)
myInjector.put('notebook',notebook)



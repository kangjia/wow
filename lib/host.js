require("./config");
var fs = require('fs');
var evts = require("events");

var evt = new evts.EventEmitter();
var CONFIG = {
    ex : "__ex__",
    ip : /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ ,
    grp : /#\s*\=\s*(.*?)\s\.*/
}
function host(){
    var osName = global.OS.toUpperCase();
    var hostPath = "C:\\Windows\\System32\\drivers\\etc\\hosts";
    if (osName === "LINUX" || osName === "MAC"){
        hostPath = "/etc/hosts";
    }
    this.hostPath = hostPath;
};
host.prototype._data2str = function(host){

};
host.prototype._str2data = function(str){
    var strArr = str.split("\r");
    var group = {};
    for (var i = 0; i < strArr.length; i++) {
        var temp = strArr[i].replace("/#+","#");
        var name = "";
        if(temp.match(CONFIG.grp)){
            group[temp.split]
        }
    };
};
host.prototype._readFile = function(){
    var path = this.hostPath;
    var file = fs.readFileSync(path,"utf-8");

    return file;
};
host.prototype._writeFile = function(){

};
host.prototype.open = function(opt){
    
    if(!!opt){
        this.close();
        var file = this._readFile();
        for(var i=0;var len=file.length;i<len;i++){
            if(file[i].test(opt)){

            }
        }
    }
};
host.prototype.close = function(opt){

};

//test main
(function(){
    var test = new host();
    //test._readFile();
})();
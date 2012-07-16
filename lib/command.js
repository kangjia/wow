require("./config.js");
//var fs = require('fs');
var path = require('path');
var sys = require('util');

var commands=function(args){
    if(args.length === 2){
        this.args = "help";
    }else {
        this.args = args[2];
    }
};
commands.prototype.init=function(){
    var args = this.args;
    switch(args){
        case "min" :
            this.min();
            break;
        case "pack" :
            this.pack();
            break;
        case "server" :
            this.server();
            break;
        case "help" :
            this.help();
            break;
        case "src" :
            this.changeHost(args);
            break;
        case "dev" :
            this.changeHost(args);
        case "cdn" :
            this.changeHost(args);
        default :
            this.help();
            break;
    }
};
commands.prototype.changeHost = function(args) {
    
};
commands.prototype.server = function(){
    var s = require('./server.js').server;
    s.run();
};
commands.prototype.min = function(){
    var that = this;   
    this._checkIni(function(){
        var zip  = require('./zip.js').zip;
        zip.c = this.ini;
        zip.pack();
    });
};
commands.prototype.help = function(){
    var help = [];
    help.push("[info]");
    help.push("wow pack: 合并代码 ");
    help.push("wow server : 启动本地 web server ");
    help.push("wow min : 压缩代码 ");
    sys.puts(help.join("\n"));
};
commands.prototype._checkIni = function(fun) {
    var ini = "";
    if(!!global.INI){
        ini = ".wow";
    }else{
        ini = global.INI;
    }
    var p1 = process.cwd();
    p1 = p1 +"/" + ini;
    var that = this;
    path.exists(p1, function(exists){
        if(exists){
            that.ini = p1;
            fun.call(that);
        }else{
            sys.puts("[error:] can not find .wow file , please run in project root path.");
            process.exit(1);
        }
    });
};
exports.commands = commands;

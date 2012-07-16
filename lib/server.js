var url = require("url");
var http = require("http");
var fs = require('fs');
var os = require('os');
var path = require("path");
require("./config");

var mime_config = {
	"js" : "application/javascript",
	"css" : "text/css"
};
var split = "/";
if(os.platform() == "win32"){
	split = "\\";	
}
var DOMAIN = global.DOMAIN;
server = {
	run : function(){
		http.createServer(function(req,res){
			res.writeHead(200);
			var url = req.url;
			var pro = url.split("/")[1];
			var _baseUrl_ = "http://"+DOMAIN+url.split("/js/")[0]+"/js/"+pro+"/";
			if(url.indexOf("minlist.js")>0){
				res.write("var _baseUrl_='"+_baseUrl_+"';\n", "utf-8");
			}
			var f = server._getFile(url);
			fs.exists(f,function(ex){
				if(ex){
					var stream = fs.createReadStream(f);
					stream.on("data", function(chunk){
						res.write(chunk);
					}).on("end", function(){ res.end(); });		
				}			
			});
		}).listen(80,DOMAIN);
	},
	_getFile : function(url){
		var p = process.cwd();
		var branchName = p.split(split);
		branchName = branchName[branchName.length-1];
		var root = url.split(branchName)[1].split("?")[0];
		return path.join(p,root);
	}
}
exports.server = server;

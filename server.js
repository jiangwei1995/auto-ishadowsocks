var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var _ = require('lodash');
var fs = require('fs');
var process = require('child_process');
var q = require('q');
//var app = express();
//app.listen(1337);

// app.get('/', function (req, res) {
//   var promiseRequest = q.denodeify(request);
//   //多页查询需要优化
//   promiseRequest('http://www.ishadowsocks.net').then(function(result){
//     var arr = [];
//     var $ = cheerio.load(result[0].body);
//     $('#free .container .row .col-lg-4').map(function(i, el){
//       var ssl = {};
//       var ipaddress = $('h4', el).eq(0).text();
//       ssl.ipaddress = _.split(ipaddress,':',2)[1];
//       var port = $('h4', el).eq(1).text();
//       ssl.port = _.split(port,':',2)[1];
//       var password = $('h4', el).eq(2).text();
//       ssl.password = _.split(password,':',2)[1];
//       var encryp = $('h4', el).eq(3).text();
//       ssl.encryp = _.split(encryp,':',2)[1];
//       ssl.status = $('h4 font', el).eq(0).text();
//       arr.push(ssl);
//     })
//     return arr;
//   }).then(function(result){
//     console.log("result"+result);
//     startSSL(result[0]);
//   });
// })

function start(){
  var promiseRequest = q.denodeify(request);
  promiseRequest('http://www.ishadowsocks.net').then(function(result){
    var arr = [];
    var $ = cheerio.load(result[0].body);
    $('#free .container .row .col-lg-4').map(function(i, el){
      var ssl = {};
      var ipaddress = $('h4', el).eq(0).text();
      ssl.ipaddress = _.split(ipaddress,':',2)[1];
      var port = $('h4', el).eq(1).text();
      ssl.port = _.split(port,':',2)[1];
      var password = $('h4', el).eq(2).text();
      ssl.password = _.split(password,':',2)[1];
      var encryp = $('h4', el).eq(3).text();
      ssl.encryp = _.split(encryp,':',2)[1];
      ssl.status = $('h4 font', el).eq(0).text();
      arr.push(ssl);
    })
    return arr;
  }).then(function(result){
    console.log(result[0]);
    startSSL(result[2]);
  });
}
function startSSL(ssl){
  //process.exec('killall sslocal',function(error, stdout, stderr){
   /// if (error !== null) {
   //   console.log('exec error: ' + error);
   // }
   console.log('/usr/bin/python3 /home/jiangwei/.local/bin/sslocal -s '+ssl.ipaddress+' -p '+ssl.port+' -b 127.0.0.1 -l 1080 -k '+ssl.password+' -m '+ssl.encryp);
    process.exec('/usr/bin/python3 /home/jiangwei/.local/bin/sslocal -s '+ssl.ipaddress+' -p '+ssl.port+' -b 127.0.0.1 -l 1080 -k '+ssl.password+' -m '+ssl.encryp,
        function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }

      });
 // })
}
start();
// app.get('/write',function(req,res){
//
//   var iconv = require('iconv-lite');
//
//     var file = "ssl";
//
//     // 测试用的中文
//     var ssl = { ipaddress: 'jp3.iss.tf',
//   port: '443',
//   password: '45790126',
//   encryp: 'aes-256-cfb',
//   status: '正常' };
//       var str = "#!/bin/bash \r~/.local/bin/sslocal \\\r";
//       str += "  -s "+ssl.ipaddress+" \\\r";
//       str += "  -p "+ssl.port+" \\\r";
//       str += "  -b 127.0.0.1 \\\r";
//       str += "  -l 1080 \\\r";
//       str += "  -k "+ssl.password+" \\\r";
//       str += "  -m "+ssl.encryp;
//     // 把中文转换成字节数组
//      var arr = iconv.encode(str, 'gbk');
//     // console.log(arr);
//     fs.appendFile(file, arr, function(err){
//         if(err)
//             console.log("fail " + err);
//         else
//             console.log("写入文件ok");
//     });
//
//     // appendFile，如果文件不存在，会自动创建新文件
//     // 如果用writeFile，那么会删除旧文件，直接写新文件
//
// });

// app.get('/exec',function(req,res){
//
//   process.exec('/usr/bin/python3 /home/jiangwei/.local/bin/sslocal -s jp3.iss.tf -p 443 -b 127.0.0.1 -l 1080 -k 45790126 -m aes-256-cfb',
//       function (error, stdout, stderr) {
//         if (error !== null) {
//           console.log('exec error: ' + error);
//         }
//     });
// //直接调用命令
// exports.createDir = function (){
//   process.exec('D: && cd testweb && md mydir',
//       function (error, stdout, stderr) {
//         if (error !== null) {
//           console.log('exec error: ' + error);
//         }
//     });
// }
// //调用执行文件
// exports.openApp = function(){
//     process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
//       function (error,stdout,stderr) {
//         if (error !== null) {
//           console.log('exec error: ' + error);
//         }
//     });
// }
//})

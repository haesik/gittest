
/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var mqtt = require('mqtt');
var assert = require('assert');


var pubClient = mqtt.connect(pubClientOpts);
var pubClientOpts = {
  clientId: 'iotjs-mqtt-test-pub',
//  host: 'test.mosquitto.org',
//  host: 'localhost',
  host: 'ubuntu@ec2-13-125-245-19.ap-northeast-2.compute.amazonaws.com',
  port: 1883,
  keepalive: 30,
};
var pubOpts = {
  topic: 'iotjs-test-topic',
  message: msg,
  qos: 1,
};


/*
// github file download request.
var fs = require('fs');
var request = require('request');
function download_file(urlStr){
	request.get(urlStr, null, function(err,data) {
		if (err) {
			console.error(err);
			return ;
		}
		console.log(data);
		fs.writeFileSync(file_path, data);
	});
};
*/


// receiving webhook of github
var http = require('http');
var port = 8080, server;

(server = http.createServer(function (request, response) {
	var path = request.url.split('?');
	var obj;
	console.log('path : ' + path[0]);
	if (request.method == 'GET') {
		console.log('get request');
		console.log('qwery : ' + path[1]);
		status(response, "Hello,,, world... test... server get");
	} else if(request.method == 'POST') {
		console.log('post request');	
		request.on('data', function(data){
			console.log('post data : ' + data);
			obj = JSON.parse(data, function(key, value){
				console.log(key + ":" + value);
			});		
		});
		status(response, "Hello,,, world... test... server post");
	}
})).listen(port);



// http request utils

function status(res, data, code) {
        var headers;
	var isjson = (typeof data === 'object');

        if (!code) code = 200;
	headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Content-Type': isjson ? 'application/json' : 'text/plain',
	};
        res.writeHead(code, headers);
        return res.end(data);
};


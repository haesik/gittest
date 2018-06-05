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
			obj = JSON.parse(data);
		//	, function(key, value){
		//		console.log(key + ": " + value);
		//	});		
			console.log(' commits : ' + obj.commits);
			console.log('post data : ' + JSON.stringify(obj, null, 2));
			console.log(' commits.added :' + obj.commits.length);
			obj.commits.forEach(function(commit){
				console.log('commit.added.length : ' + commit.added.length);
				commit.added.forEach(function(fname){
					console.log('added filename : ' + fname);
				});
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


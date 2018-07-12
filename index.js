function express(options){
    return function(req, res, next) {
    	var output = getOutput(options);
        if(req.path === output.BindPath && req.method === 'GET'){
            res.set('Content-Type', output.ContentType);
            res.send(output.Body);
        }else{
            next();
        }
    }
}

function koa(options){
    return function(ctx, next) {
    	var output = getOutput(options);
        if(ctx.path === output.BindPath && ctx.method === 'GET'){
            ctx.set('Content-Type', output.ContentType);
            ctx.body = (output.Body);
            next();
        }else{
            next();
        }
    }
}

function getOutput(options){
	var bindContentType = 'application/javascript';
	var bindPath = '/slim-static/env.js';
	var bindKey = 'window.ENV';
	var outBody = '';
	var outENVs = {};
	if(options){
	    if(options.out_type && typeof(options.out_type) === 'string'){
            if(options.out_type === 'json'){
            	bindContentType = 'application/json';
            	bindPath = '/slim-static/env.json';
            }
        }
        if(options.in && options.in instanceof Array){
        	var envs = JSON.parse(JSON.stringify(process.env));
            for(var i=0;i<options.in.length;i++){
                if(envs[options.in[i]]){
                    outENVs[options.in[i]] = envs[options.in[i]];
                }
            }
        }
        if(options.path && typeof(options.path) === 'string'){
        	bindPath = options.path;
        }
        if(options.key && typeof(options.key) === 'string'){
        	bindKey = options.key;
        }
    }
    if(bindContentType === 'application/javascript'){
    	outBody = bindKey + ' = ' + JSON.stringify(outENVs) + ';';
    }else if(bindContentType === 'application/json'){
    	outBody = JSON.stringify(outENVs);
    }
    return { ContentType: bindContentType, Body: outBody, BindPath: bindPath}
}

module.exports = { mw: {express:express, koa:koa } };
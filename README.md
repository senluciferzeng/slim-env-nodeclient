# slim-env

slim-env node client, provide express and koa middleware, bin file for cli and several functions for config

This version only provide express and koa middleware.

## Install

```
npm i slim-env
```

## Usage

### Node

#### Import
```
var slimEnv = require('slim-env')
```

#### 1. Use as middleware
```
app.use(slimEnv.mw({in:['YOUR_SYSTEM_ENV_NAME_1', 'YOUR_SYSTEM_ENV_NAME_2']}))
```

##### - Or
###### - For Koa
```
app.use(slimEnv.mw.koa({in:['YOUR_SYSTEM_ENV_NAME_1', 'YOUR_SYSTEM_ENV_NAME_2']}))
```

###### - For Express
```
app.use(slimEnv.mw.express({in:['YOUR_SYSTEM_ENV_NAME_1', 'YOUR_SYSTEM_ENV_NAME_2']}))
```


#### 2. WebPage import slim js file
```
<script type="application/javascript" src="/slim-static/env.js"></script>
```

### Options

#### in
An Array you want to slim, if you pass an empty array then your webpage's bindKey (default is window.ENV) will be set to empty object ({})

#### path
The path of js/json file, default is /slim-static/env.js for js out_type and /slim-static/env.json for json out_type

#### out_type
The static output format file, must be js or json, default is js. 
If js, the file will look like 'window.ENV = {"TEMP":"C:\\Users\\ADMINI1\\AppData\\Local\\Temp"};' and Content-Type will be 'application/javascript'. 
If json, the file will look like '{"TEMP":"C:\\Users\\ADMINI1\\AppData\\Local\\Temp"}' and Content-Type will be 'application/json'


#### key
Only used when out_type is js, default is 'window.ENV'. It must be a valid js Object key.
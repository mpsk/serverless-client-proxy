# Zoomdata Serverless Client

## Requirements
- npm or yarn

## Install
```sh
$ npm install
$ npm run proxy
```

- Run with logging XHR requests:
`"npm run proxy -- --debug"`

- Run a proxy server against target (https not suported) on special localhost port:
`"npm run proxy -- --target="http://fe.zoomdata.com:8080/" --port=5050`

- Default target: `http://fe.zoomdata.com:8080/`
- Default port: `5050`

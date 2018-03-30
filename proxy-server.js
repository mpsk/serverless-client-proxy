'use strict';

const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');
const express = require('express');
const yargs = require('yargs');

const {fileAlias, getServerIp} = require('./utils');
const {COLORS} = require('./logger');

const flags = yargs.argv;

const PROXY_TARGET  = flags.target || 'http://fe.zoomdata.com:8080/';
const PROXY_PORT = flags.port || 5050;

const app = express();
const server = http.createServer(app);
const proxy = httpProxy.createProxyServer({
    target: PROXY_TARGET,
    ws: true,
    secure: true
});

// requests
app.get('/zoomdata/js/*', (...args) => fileAlias('js', ...args));
app.get('/zoomdata/css/*', (...args) => fileAlias('css', ...args));
app.get('/zoomdata/images/*', (...args) => fileAlias('images', ...args));

app.use((req, res) => proxy.web(req, res));

// websocket
server.on('upgrade', (req, socket, head) => (proxy.ws(req, socket, head)));
server.listen(PROXY_PORT, () => onStart());

function onStart() {
    const localIp = getServerIp();
    const green = COLORS.GREEN;
    const reset = COLORS.GREY;
    console.log(`${green}`, `
       │    ${reset} Proxy started! ${green}
       │                                          
       │    - Local:  http://localhost:${PROXY_PORT}
       │    - Local:  http://${localIp}:${PROXY_PORT}
       │    - Target: ${PROXY_TARGET}
       ${reset}
    `);
}

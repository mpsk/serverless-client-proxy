'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const {log, warn} = require('./logger');

const DIST_FOLDER = '../app/distribute';

module.exports = {
    fileAlias,
    getServerIp
};

function fileAlias(folder, req, res, next) {
    const filename = req.params[0];
    const filePath = path.join(__dirname, `${DIST_FOLDER}/${folder}/${filename}`);

    fs.access(filePath, (err, stats) => {
        if (err) {
            warn(`${err.code}: ${filePath}`);
            next();
        } else {
            log(`GET: ${filePath}`);
            res.sendFile(filePath);
        }
    });
}

function getServerIp() {
    const ifaces = os.networkInterfaces();
    const values = Object.keys(ifaces).map((name) => ifaces[name]);
    const ipv4 = flatten(values).filter(({internal, family}) => (internal === false && family === 'IPv4'))[0];
    return ipv4 ? ipv4.address : undefined;
}

function flatten(arr) {
    return Array.prototype.concat(...arr);
}
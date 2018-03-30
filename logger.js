'use strict';

const yargs = require('yargs');
const flags = yargs.argv;
const DEBUG = flags.debug || false;

const GREY = 'GREY';
const GREEN = 'GREEN';
const RED = 'RED';

const COLORS = {
    [GREY]: '\x1b[0m',
    [GREEN]: '\x1b[32m',
    [RED]: '\x1b[31m'
};

module.exports = {
    log, 
    info, 
    warn,
    COLORS
};

function logger(color, ...args) {
    if (DEBUG || color === RED) {
        console.log(COLORS[color] || COLORS.GREY, ...args);
    }
}

function log(...args) {
    return logger(GREY, ...args);
}

function info(...args) {
    return logger(GREEN, ...args);
}

function warn(...args) {
    return logger(RED, ...args);
}
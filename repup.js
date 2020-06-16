const exec = require('child_process').execFile;
const repl = require('repl');
const delay = require('delay');
const axios = require('axios').default; //Alternative to request lib, as that's deprecated
const chromeLaunch = require('chrome-launcher'); //Apparently there's a package for everything
const puppeteer = require('puppeteer-core');

(async () => {
    let chrome = await chromeLaunch.launch();
    let test = 99;
    console.log("Started Chrome dev tools on " + chrome.port);

    let response = await axios.get(`http://127.0.0.1:${chrome.port}/json/version`);
    let wsEndpoint = response.data.webSocketDebuggerUrl;
    console.log(wsEndpoint);

    const browser = await puppeteer.connect({
        browserWSEndpoint: wsEndpoint
    });

    const page = await browser.newPage();

    console.log("pptr> Puppeteer attached to chrome. 'page' and 'browser' exposed to context.")
    var r = repl.start({prompt: "pptr> "});
    r.context.page = page;
    r.context.browser = browser;

})();
    


const { BrowserWindow} = require('electron');
const path = require('path');

class LoginWindow extends BrowserWindow {
    constructor(url){
        super({
            width:400,
            height:400,
            alwaysOnTop:true,
            webPreferences: {
                preload:path.join(__dirname, '../preloads/loginpreload.js'),
                nodeIntegration: true,
            },
            show:false,
        });
        process.stdin.resume();
        this.loadFile(url);
        this.once('ready-to-show', this.onReadyToShow.bind(this));
    }

    onReadyToShow(){
        this.show();
    }
}

module.exports = LoginWindow;



const { BrowserWindow } = require('electron');
const path =  require('path');

class DashWindow extends BrowserWindow {
    constructor(url){
        super({
            width:800,
            height:600,
            webPreferences: {
                preload: path.join(__dirname, '../preloads/dashpreload.js'),
            }
        });
        this.loadFile(url);
        this.once('ready-to-show', this.onReadyToShow.bind(this));
    }

    onReadyToShow(){
        this.show();
    }
}


module.exports = DashWindow;



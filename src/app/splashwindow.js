const { BrowserWindow } = require('electron');
const path = require('path');

class  SplashWindow extends BrowserWindow {

    constructor(url){
        super({
            width:420,
            height:340,
            frame:false,
            transparent: true,
            resizable:false,
            roundedCorners:true,
            alwaysOnTop:true,
            show:false,
            webPreferences: {
                preload:path.join(__dirname,'../preloads/splashpreload.js'),
            }
        });
        
        this.loadFile(url);
        this.on('closed', this.onClosed.bind(this));
        this.on('ready-to-show', this.onReadyToShow.bind(this));
    }

    onClosed(){
        this.destroy();
    }

    onReadyToShow(){
        this.show();
    }
}

module.exports = SplashWindow;

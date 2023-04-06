const { BrowserWindow } = require('electron');
const path = require('path');

class AddSchedule extends BrowserWindow {

    constructor(url){
        super({
            width:400,
            height:400,
            webPreferences: {
                preload:path.join(__dirname, '../preloads/addnewschedulepreload.js'),
            }
        });

        this.loadFile(url);
        this.once('ready-to-show', this.onReadyToShow.bind(this));
    }

    onReadyToShow(){
        this.show();
    }
}


module.exports  = AddSchedule;


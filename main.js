
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');


const SplashWindow = require('./src/app/splashwindow');
const LoginWindow = require('./src/app/loginwindow');
const DashWindow = require('./src/app/dashwindow');
const AddScheduleWindow = require('./src/app/addschedulewindow');

let splashWin;
let loginWin;
let dashwin;
let addScheduleWin;

// ----------------------- CREATE WINDOWS ---------------------------------

const createSplashWindow =() => {
    splashWin = new SplashWindow('./src/views/splash.html');
}

const setVersion =() => {
    const version = app.getVersion();
    splashWin.webContents.send('set-version', version);
}


//user dashboard.
const createDash =() => {
    dashwin = new DashWindow('./src/views/dashboard.html');
    const dashMenu = Menu.buildFromTemplate(dashMenuTemplate);
    Menu.setApplicationMenu(dashMenu);
};

//add new schedule.
const createAddSchedule = () => {
    addScheduleWin = new AddScheduleWindow('./src/views/addnewschedule.html');
    const addScheduleMenu = Menu.buildFromTemplate(addScheduleMenuTemplate);
    Menu.setApplicationMenu(addScheduleMenu);
}

const createLoginWindow =() => {
    loginWin = new LoginWindow('./src/views/index.html');
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

// ---------------------------------------------------------------------------

app.whenReady().then(async ()=> {

    //OPEN A REALM.
    

    // splashWin = new SplashWindow('./src/views/splash.html');
    createSplashWindow();
    setVersion();

    setTimeout(() => {
        createLoginWindow();
        splashWin.close();
        splashWin = null;

    }, 6000);

    //receive profile data from render.js via preload.js
    ipcMain.on('set-profile', (event, data) => {
        console.log(data);
        //if received user data, close win.
        if(data !== null) {
            setTimeout(() => {
                createDash();
                dashwin.webContents.send('get-profile',data);
                loginWin.close();
                loginWin = null;
            }, 6000);
            
        }
    });

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length === 0) {
            createSplashWindow();
        }
    });

});

// ----------------------------------------------------------------------

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

// ----------------------------------------------------------------------

//Starter Menu Template.
const menuTemplate = [];

//dash Menu Template.
const dashMenuTemplate = [
   {
    label:'File',
    "submenu": [
        {
            label: 'New Schedule',
            click: ()=>{
                createAddSchedule();
            }
        },
        {
            type: 'separator'
        },
        {
            label:'Quit',
            accelerator: process.platform === 'darwin'? 'Command+Q':'Ctrl+Shift+Q',
            click: () => app.quit()
        }
    ]
   },
   {
    label:'View',
    "submenu": [
        {
            label:"Developer Tools",
            accelerator:process.platform === 'darwin'?'Alt+Command+I':'Ctrl+Shift+I',
            click:(item,focusedWindow) =>{
                if(focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            }
        }

     ]
   }
];

//add schedule Menu Template.
const addScheduleMenuTemplate = [
    {
        label:''
    }
];


//-------- SQL --------



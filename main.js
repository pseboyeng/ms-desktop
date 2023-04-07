
const { app, BrowserWindow, ipcMain, Menu } = require('electron');

//----- USERS ---------
const { insertUser, findUsers, updateUser, deleteUser } = require('./db/user');

//----- CHRISTIANLIFE ------
const { newChristianLife } = require('./db/christianlife');

// ----------- IMPORT WINDOWS -------------------------
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

const user ={
    name:'peter',
    surname:'seboyeng',
    mobile:'0638676077',
    password:'JavaAssociate@2022',
    capacity:'ms'
}

const user2 ={
    name:'joe',
    surname:'baloyi',
    mobile:'0638676077',
    password:'JavaAssociate@2022',
    capacity:'el'
}

const user3 ={
    name:'fiyo',
    surname:'phahladira',
    mobile:'0638676077',
    password:'JavaAssociate@2022',
    capacity:'el'
}

const schedule1 = {
    date:'08-04-2023',
    chairman:'peter seboyeng',
    time:'19:00',
    opening_song:89,
    treassures:'fiyo phahladira'
}

// ---------------------------------  APP INITIALIZATION ------------------------------------------

app.whenReady().then(async ()=> {

    // splashWin = new SplashWindow('./src/views/splash.html');
    createSplashWindow();
    setVersion();

    insertUser(user);
    insertUser(user2);
    insertUser(user3);
    findUsers();
    updateUser(2,'hlengani');
    deleteUser(3);

    newChristianLife(schedule1);

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



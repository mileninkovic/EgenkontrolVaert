const { app, BrowserWindow, Menu } = require('electron')
const {exit, createBrowserWindow} = require('./functions/functions.js');

// const createWindow = () => {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600,
//     })
//
//     Menu.setApplicationMenu(menu);
//     win.loadFile('view/index.html')
// }

const menu = Menu.buildFromTemplate([
    {
        label: 'Filer',
        submenu: [
            {
                label:'Find kunde',
                click() {
                    createWindow("findclient.html", 600, 400);
                    // Funktion eksisterer ikke!
                }
            },
            {
                label:'Indstillinger',
                click() {
                    // Funktion eksisterer ikke!
                }
            },
            {type:'separator'},
            {
                label:'Exit',
                click() {
                    exit();
                },
                accelerator: 'Alt+Q'
            }
        ]
    }
])

const windows = new Set();
const createWindow = exports.createWindow = (viewName, width, height) => {
    let newWindow = new BrowserWindow({ 
        show: false,
        width: width,
        height: height, 
    });
    
    Menu.setApplicationMenu(menu);

    newWindow.loadFile("view/" + viewName);
  
    newWindow.once('ready-to-show', () => {
      newWindow.show();
    });
  
    newWindow.on('closed', () => {
      windows.delete(newWindow);
      newWindow = null;
    });
  
    windows.add(newWindow);
    return newWindow;
};
  

app.whenReady().then(() => {
    createWindow("index.html", 800, 600)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
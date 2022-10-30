const { app, BrowserWindow, Menu } = require('electron')
const {exit, createBrowserWindow} = require('./functions/functions.js');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    })

    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label:'New File',
                    click() {
                        createBrowserWindow();
                        // Funktion eksisterer ikke!
                    }
                },
                {
                    label:'Save File',
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
    
    Menu.setApplicationMenu(menu);
    win.loadFile('view/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
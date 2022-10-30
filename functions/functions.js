const { app, BrowserWindow } = require("electron")

module.exports = {
    exit: function(){app.quit()},
    createBrowserWindow: function(){
        const window = new BrowserWindow({
            height: 200,
            width: 200
        });
        window.loadFile("./view/index.html");
    }
}
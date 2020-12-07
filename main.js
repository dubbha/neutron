const { app, BrowserWindow, ipcMain } = require('electron') // manage app lifecycle, create browser windows
const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  hardResetMethod: 'exit'
})

function createWindow () { // create browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // grant the window full access to Node.js API
      contextIsolation: false,
    }
  })

  win.loadFile('index.html') // load index.html into the window
}

app.whenReady().then(createWindow) // call createWindow once app is initialized

app.on('window-all-closed', () => { // quit the app when no open windows left
  if (process.platform !== 'darwin') { // windows management is different on MacOS
    app.quit()
  }
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // 'sync ping'
  event.returnValue = 'sync pong'
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // 'async ping'
  event.reply('asynchronous-reply', 'async pong')
})

ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  console.log(event)
  const result = await Promise.resolve(args[0] ** args[1])
  return result
})

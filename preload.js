const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('bridge', {
  on: (e, cb) => ipcRenderer.on(e, cb),
  syncPing: () => ipcRenderer.sendSync('synchronous-message', 'sync ping'),
  asyncPing: () => ipcRenderer.send('asynchronous-message', 'async ping'),
  invoke: (...args) => ipcRenderer.invoke('my-invokable-ipc', ...args),
  versions: process.versions,
})
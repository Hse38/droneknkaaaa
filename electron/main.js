const { app, BrowserWindow, shell } = require('electron')
const path = require('path')
const isDev = !app.isPackaged
function createWindow() {
  const win = new BrowserWindow({
    width: 1440, height: 900, minWidth: 1280, minHeight: 800,
    backgroundColor: '#060810', titleBarStyle: 'hiddenInset',
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  })
  isDev ? win.loadURL('http://localhost:5173') : win.loadFile(path.join(__dirname, '../dist/index.html'))
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' } })
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })

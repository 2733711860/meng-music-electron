//接收渲染进程广播的数据执行最小化 最大化  关闭的操作


var {ipcMain,BrowserWindow, globalShortcut} =require('electron');


//获取当前的窗口对象   BrowserWindow.getFocusedWindow();


var mainWindow= BrowserWindow.getFocusedWindow();



ipcMain.on('min',()=>{
	mainWindow.minimize()
})

ipcMain.on('max',()=>{
	if(mainWindow.isMaximized()){
		mainWindow.restore();
	 }else{
		mainWindow.maximize()
	}
})

ipcMain.on('close',()=>{
	mainWindow.close()
})

ipcMain.on('in-fullScreen',()=>{
	mainWindow.setFullScreen(true);
})

ipcMain.on('out-fullScreen',()=>{ // 全屏
	mainWindow.setFullScreen(false);
})

globalShortcut.register('ESC', () => { // 退出全屏
	mainWindow.setFullScreen(false);
})

// ipcMain.on('toggle-desktop-lyric', (event, flag) => { // 打开关闭桌面歌词
// 	console.log(global.lyricWindow)
// 	if (flag) {
// 		global.lyricWindow.showInactive()
// 	} else {
// 		global.lyricWindow.hide()
// 	}
// })

// ipcMain.on('fix-desktop-lyric', (event, data) => { // 固定桌面歌词
// 	global.lyricWindow.setIgnoreMouseEvents(data, {
// 		forward: true
// 	})
// 	if (data === false) {
// 		global.lyricWindow.webContents.send('show-lock')
// 	}
// })
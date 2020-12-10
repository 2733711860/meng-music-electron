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
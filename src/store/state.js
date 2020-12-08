const state = {
	audioEle: null, // audio元素
	playlist: [], // 当前播放列表
	currentIndex: -1, // 当前播放音乐索引
	currentTime: 0, // 当前播放时间
	currentMusic: {}, // 当前音乐
	playing: false, // 播放状态
	mode: 'listLoop', // 播放模式，默认顺序播放。listLoop：顺序播放；loop：单曲循环；random：随机播放。
	historyList: [], // 播放历史列表
}

export default state

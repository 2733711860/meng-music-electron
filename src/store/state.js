const state = {
	audioEle: null, // audio元素
	playlist: [], // 当前播放列表
	currentIndex: -1, // 当前播放音乐索引
	currentTime: 0, // 当前播放时间
	currentMusic: {}, // 当前音乐
	playing: false, // 播放状态
	historyList: [], // 播放历史列表
	showHisAndPlay: false, // 是否显示播放列表及历史记录框
	showLeftList: true, // 是否显示歌词页左边播放列表
	lyricObj: '', // 歌词
	showLyric: false, // 是否显示歌词页
	mode: 'icon-xunhuanbofang', // 播放模式。icon-xunhuanbofang：顺序播放；icon-danquxunhuan：单曲循环；icon-suijibofang：随机播放。
}

export default state

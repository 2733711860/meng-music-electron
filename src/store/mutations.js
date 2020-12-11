import * as types from './mutation-types'

const mutations = {
  // audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },

  // playlist
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },

  // 当前播放音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },

  // 当前播放时间
  [types.SET_CURRENTTIME](state, currentTime) {
    state.currentTime = currentTime
  },
  
  // 当前音乐
  [types.SET_CURRENTMUSIC](state, currentMusic) {
    state.currentMusic = currentMusic
  },

  // 播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },

  // 播放历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },
	
	// 是否显示播放列表及历史记录框
	[types.SET_SHOWHISANDPLAY](state) {
	  state.showHisAndPlay = !state.showHisAndPlay
	},
	
	// 是否显示歌词页左边播放列表
	[types.SET_SHOWLEFTLIST](state) {
	  state.showLeftList = !state.showLeftList
	},
	
	// 歌词
	[types.SET_LYRICOBJ](state, lyricObj) {
	  state.lyricObj = lyricObj
	},
	
	// 是否显示歌词页
	[types.SET_SHOWLYRIC](state, showLyric) {
	  state.showLyric = showLyric
	},
	
	// 模式
	[types.SET_MODE](state, mode) {
	  state.mode = mode
	},
	
	// 是否静音
	[types.SET_ISMUTE](state, isMute) {
	  state.isMute = isMute
	},
	
	// 音量
	[types.SET_VOLUME](state, volume) {
	  state.volume = volume
	},
}

export default mutations

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
}

export default mutations

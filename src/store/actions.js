import * as types from './mutation-types'

// playlist
export const setPlaylist = function({ commit }, playlist) {
  commit(types.SET_PLAYLIST, playlist)
}

// 当前播放音乐索引
export const setCurrentIndex = function({ commit }, currentIndex) {
  commit(types.SET_CURRENTINDEX, currentIndex)
}

// 当前播放时间
export const setCurrentTime = function({ commit }, currentTime) {
  commit(types.SET_CURRENTTIME, currentTime)
}

// 播放状态
export const setPlaying= function({ commit }, playing) {
  commit(types.SET_PLAYING, playing)
}

// 播放历史列表
export const setHistorylist = function({ commit }, historylist) {
  commit(types.SET_HISTORYLIST, historylist)
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function({ getters, commit }, { list, index, music }) {
  commit(types.SET_PLAYLIST, list); // 更新播放列表
  commit(types.SET_CURRENTINDEX, index); // 当前播放音乐索引更新
  commit(types.SET_PLAYING, true); // 更新播放状态
}
<template>
	<audio
		ref="ddPlayer"
	></audio>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import audioMusic from '@/utils/audio.js';
import { music } from '@/mixin/music.js';
import { getLyric, getQQLyric, getMusicVKey } from '@/api';
export default{
	mixins: [music],
	
	created() {
		// 设置audio元素
		this.$nextTick(() => {
			this.setAudioele(this.$refs.ddPlayer) // 设置audio元素
		})
	},
	
	mounted() {
		this.$nextTick(() => {
		  audioMusic.initAudio(this)
			this.audioEle.volume = this.isMute ? 0 : this.volume/100
		})
	},
	
	computed: {
	  ...mapGetters([ 
			'audioEle',
			'currentMusic', // 当前音乐
			'mode', // 播放模式
			'historyList', // 播放历史
			'playing', // 播放状态
			'playlist', // 播放列表
			'currentIndex', // 当前音乐索引
			'volume', // 音量
		]),
	},
	
	watch: {
		currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
			if (newMusic.id === oldMusic.id) {
		    return
		  } else {
				if (newMusic.isQQMusic) { // QQ音乐
					getMusicVKey({
						songmid: newMusic.mid
					}).then(res => {
						newMusic.url = res.response.playLists[0];
						this.audioEle.src = newMusic.url;
						this.audioEle.play();
						if (newMusic.isQQMusic) {
							this._getQQLyric(newMusic.mid);
						} else {
							this._getLyric(newMusic.id);
						}
					})
				} else {
					this.audioEle.src = newMusic.url;
					this.audioEle.play();
					if (newMusic.isQQMusic) {
						this._getQQLyric(newMusic.mid);
					} else {
						this._getLyric(newMusic.id);
					}
				}
		  }
		},
		
		playing(newPlaying) { // 播放状态
			const audio = this.audioEle;
			this.$nextTick(() => {
			  newPlaying ? audio.play() : audio.pause()
			})
		},
		
		currentIndex(newIndex, oldIndex) {
			this.setCurrentMusic(this.playlist[newIndex])
		},
		
		volume(newVolume) { // 音量
			this.audioEle.volume = newVolume / 100;
			if (newVolume == 0) {
				this.setIsMute(true);
			} else {
				this.setIsMute(false);
			}
		},
		
		isMute() { // 静音
			if (this.isMute) {
				this.audioEle.volume = 0;
			} else {
				this.audioEle.volume = this.volume / 100;
			}
		}
	},
	
	methods: {
		_getLyric(musicId) { // 获取歌词
			getLyric({
				id: musicId
			}).then(res => {
				if (res.nolyric) { // 没有歌词
					this.set_lyricObj('');
				} else {
					this.set_lyricObj(res.lrc.lyric);
				}
			})
		},
		
		_getQQLyric(musicId) { // 获取歌词
			getQQLyric({
				songmid: musicId
			}).then(res => {
				if (res && res.response && res.response.code == 0 && res.response.lyric) {
					this.set_lyricObj(res.response.lyric);
				} else {
					this.set_lyricObj('');
				}
			})
		},
		
		...mapMutations({
		  setAudioele: 'SET_AUDIOELE',
			setCurrentTime: 'SET_CURRENTTIME',
			setPlaying: 'SET_PLAYING',
			setCurrentMusic: 'SET_CURRENTMUSIC',
			set_lyricObj: 'SET_LYRICOBJ',
		}),
		
		...mapActions([
			'setHistorylist',
		])
	}
}
</script>

<style>
</style>

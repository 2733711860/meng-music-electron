<template>
	<audio
		ref="ddPlayer"
	></audio>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import audioMusic from '@/utils/audio.js';
import { music } from '@/mixin/music.js';
import { getLyric } from '@/api';
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
			// this.audioEle.volume = this.isMute ? 0 : this.volume
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
		]),
	},
	
	watch: {
		currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
			if (newMusic.id === oldMusic.id) {
		    return
		  } else {
		   	this.audioEle.src = newMusic.url;
				this.audioEle.play();
				this._getLyric(newMusic.id);
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
					// this.setNolyric(false)
				  // let lyricc = await parseLyric(res.lrc.lyric)
				  // this.setLyric(lyricc)
				}
				// silencePromise(this.audioEle.play())
			})
		},
		
		...mapMutations({
		  setAudioele: 'SET_AUDIOELE',
			setCurrentTime: 'SET_CURRENTTIME',
			setPlaying: 'SET_PLAYING',
			setCurrentMusic: 'SET_CURRENTMUSIC',
			set_lyricObj: 'SET_LYRICOBJ'
		}),
		
		...mapActions([
			'setHistorylist',
		])
	}
}
</script>

<style>
</style>

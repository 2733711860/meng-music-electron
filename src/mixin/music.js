import { mapGetters, mapMutations, mapActions } from 'vuex';
export const music = {
	data() {
		return{
			
		}
	},
	
	computed: {
	  ...mapGetters([ 'audioEle', 'currentMusic', 'playlist', 'mode', 'currentIndex', 'playing', 'showLyric', 'showLeftList',
		'volume', 'isMute']),
	},
	
	methods: {
		nextMusic() { // 下一首
			if (this.currentMusic.id == undefined) {
				return
			}
			if (this.mode == 'icon-danquxunhuan') { // 单曲循环
				this.audioEle.currentTime = 0;
				this.audioEle.play();
				this.setPlaying(true);
			} else { // 顺序播放
				let index = ''
				if (this.mode === 'icon-xunhuanbofang') { // 列表循环
					index = this.currentIndex + 1
				  if (index === this.playlist.length) { // 已经是最后一首
				    index = 0
				  }
				} else if (this.mode === 'icon-suijibofang') { // 随机播放
					index = Math.floor(Math.random() * (this.playlist.length))
				}
				if (!this.playing) { // 暂停状态
				  this.setPlaying(true)
				}
				this.setCurrentIndex(index)
			}
		},
		
		preMusic() { // 上一首
			if (this.currentMusic.id == undefined) {
				return
			}
			if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
				this.audioEle.currentTime = 0;
				this.audioEle.play();
				this.setPlaying(true);
			} else {
				let index = this.currentIndex - 1;
			  if (index < 0) {
			    index = this.playlist.length - 1;
			  }
			  if (!this.playing) { // 暂停状态
			    this.setPlaying(true);
			  }
			  this.setCurrentIndex(index);
			}
		},
		
		goPlay () { // 播放暂停
			if (this.currentMusic.id == undefined) { //当前没有正在播放的音乐，底部按钮不可点击
				return
			}
			this.setPlaying(!this.playing);
		},
		
		showList() { // 播放列表、历史记录
			if (this.showLyric) {
				this.setShowLeftList(!this.showLeftList);
			} else {
				this.setShowHisAndPlay();
			}
		},
		
		changeMute() { // 静音
			this.setIsMute(!this.isMute);
		},
		
		playThis(music, newMusics) { // 播放音乐
			let list = [].concat(...newMusics);
			let index = list.findIndex(item => item.id == music.id);
			this.selectPlay({
			  list,
			  index,
				music
			});
		},
		
		...mapMutations({
		  setAudioele: 'SET_AUDIOELE',
			setPlaying: "SET_PLAYING",
			setCurrentIndex: "SET_CURRENTINDEX",
			setShowHisAndPlay: "SET_SHOWHISANDPLAY",
			setShowLeftList: "SET_SHOWLEFTLIST",
			setVolume: "SET_VOLUME",
			setIsMute: 'SET_ISMUTE'
		}),
		
		...mapActions([
		  "selectPlay"
		])
	}
}
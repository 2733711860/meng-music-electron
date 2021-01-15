<template>
	<div class="lyric-page" :class="[showLyric ? 'lyricShow' : '']">
		<div class="content">
			<left-play></left-play>
			
			<div class="right" @dblclick="getFullSreen">
				<div class="top">
					<i class="iconfont icon-zuixiaohua" title="收起歌曲详情页" @click="closeLyric"></i>
					<i class="iconfont icon-iconset0127" title="关闭" @click="closeWin"></i>
				</div>
				<div class="song-msg">
					<div class="title">{{currentMusic.name}}</div>
					<div class="msg">
						<span class="singer">{{currentMusic.singer}}</span>
						<span>{{currentMusic.album}}</span>
					</div>
				</div>
				<lyric-component class="lyric"></lyric-component>
			</div>
		</div>
		
		<music-footer></music-footer>
		
		<div class="bgpic" :style="{ backgroundImage: picUrl }"></div>
		<div class="mask"></div>
	</div>
</template>

<script>
import lyricComponent from './lyric-component.vue';
import leftPlay from './left-play.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import musicFooter from '../music-footer.vue';
const {ipcRenderer: ipc} = require('electron');
export default {
	components: {
		lyricComponent, musicFooter, leftPlay
	},
	
	computed: {
	  ...mapGetters([ 'currentMusic', 'showLyric', 'themeObj' ]),
		
		picUrl() {
			let bgUrl = require(`../../assets/image/${this.themeObj.bgCoverIndex}.jpg`);
		  return this.currentMusic.id && this.currentMusic.image
		  	? `url(${this.currentMusic.image}?param=100y100)`
		  	: "url("+bgUrl+")"
		},
	},
	
	data() {
		return {
		}
	},
	
	mounted() {
	},
	
	methods: {
		closeLyric() { // 关闭歌词页
			this.setShowLyric(false);
		},
		
		closeWin() { // 关闭app
			ipc.send('close');
		},
		
		getFullSreen() { // 全屏
			ipc.send('in-fullScreen');
		},
		
		...mapMutations({
			setShowLyric: "SET_SHOWLYRIC"
		}),
	}
}
</script>

<style scoped="scoped" lang="less">
	.lyric-page{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2000;
		background-color: #FFFFFF;
		-os-transform: translateY(100%);
		transform: translateY(100%);
		-webkit-transition: all .5s;
		-moz-transition: all .5s;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.content{
			flex: 1;
			overflow-y: auto;
			display: flex;
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				.top{
					padding: 0 20px;
					height: 50px;
					line-height: 50px;
					text-align: right;
					.iconfont{
						color: #fff;
						cursor: pointer;
						margin-left: 10px;
					}
				}
				.song-msg{
					height: 70px;
					.title{
						color: #fff;
						font-size: 20px;
						line-height: 40px;
						text-align: center;
					}
					.msg{
						color: #aaaaaa;
						text-align: center;
						.singer{
							line-height: 30px;
						}
					}
				}
				.lyric{
					flex: 1;
					margin: 30px 0;
				}
			}
		}
	}
	.lyricShow{
		-os-transform: translateY(0);
		transform: translateY(0);
	}
	
	.bgpic{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		transition: all 0.8s;
		-webkit-transition: all 0.8s;
		filter: blur(12px);
		-webkit-filter: blur(12px);
		opacity: 1;
	}
	
	.mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -2;
		opacity: .6;
		filter: none;
		background-color: rgba(46, 48, 48, 1);
	}
</style>

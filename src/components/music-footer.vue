<template>
	<div class="footer">
		<el-slider 
			v-model="progress" 
			:max="max" 
			:show-tooltip="false" 
			class="music-progress" 
			 :class="[currentMusic.id ? '' : 'disable']"
			@change="changeTime"
			:disabled="!currentMusic.id"></el-slider>
		<div class="footer-tool">
			<div class="music-msg">
				<div class="pic-div" @click="openLyric">
					<i class="iconfont hovicon" :class="[showLyric ? 'icon-shuangjiantouxia' : 'icon-shuangjiantoushang']"></i>
					<img :src="currentMusic.id ? `${currentMusic.image}?param=50y50` : require('../assets/image/11.jpg')" class="music-cover" />
				</div>
				<div class="music-detail" v-show="currentMusic.id">
					<div class="title">{{currentMusic.singer}} - {{currentMusic.name}}</div>
					<div class="time">{{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}</div>
				</div>
			</div>
			
			<div class="music-tool" :class="[currentMusic.id ? '' : 'disable']">
				<i class="iconfont icon-backwardfill" title="上一首" @click="preMusic"></i>
				<i class="iconfont playPause" :class="[playing ? 'icon-bofang' : 'icon-zanting']" title="播放/暂停" @click="goPlay"></i>
				<i class="iconfont icon-play_forward_fill" title="下一首" @click="nextMusic"></i>
			</div>
			
			<div class="music-tool-right">
				<i class="iconfont icon-iconset0261" :class="[currentMusic.id ? '' : 'disable']" title="音量"></i>
				<el-slider v-model="volume" :show-tooltip="false" class="music-volume" :class="[currentMusic.id ? '' : 'disable']"></el-slider>
				<i class="iconfont" :class="[currentMusic.id ? '' : 'disable', mode]" :title="modeObj[mode]" @click="changeMode"></i>
				<i class="iconfont icon-geciweidianji" :class="[currentMusic.id ? '' : 'disable']" title="歌词"></i>
				<i class="iconfont icon-qita" title="播放列表" @click="showList"></i>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { format } from '@/utils';
import { music } from '@/mixin/music.js';
export default {
	mixins: [music],
	
	filters: {
		format
	},
	
	data () {
		return {
			progress: 0,
			volume: 20,
			max: 100,
			modeObj: {
				'icon-xunhuanbofang': '列表循环',
				'icon-danquxunhuan': '单曲循环',
				'icon-suijibofang': '随机播放'
			},
		}
	},
	
	computed: {
		...mapGetters([ 'playing', 'currentMusic', 'currentTime', 'audioEle', 'showLyric', 'mode' ])
	},
	
	watch: {
		currentMusic() {
			this.progress = 0;
			this.max = this.currentMusic.duration * 100;
		},
		
		currentTime() {
			this.progress = Math.round(this.currentTime * 100);
		}
	},
	
	methods: {
		changeTime(val) { // 更改播放时间
			this.audioEle.currentTime = val / 100;
		},
		
		openLyric() { // 打开歌词页
			this.setShowLyric(!this.showLyric);
		},
		
		changeMode() { // 更换播放模式
		  let mode = this.mode == 'icon-xunhuanbofang' ? 'icon-danquxunhuan' : (this.mode == 'icon-danquxunhuan' ? 'icon-suijibofang' : 'icon-xunhuanbofang');
			this.setMode(mode);
			this.$message({
				message: this.modeObj[mode],
				type: 'success',
				center: true
			});
		},
		
		...mapMutations({
			setShowLyric: "SET_SHOWLYRIC",
			setMode: 'SET_MODE'
		}),
	}
}
</script>

<style scoped="scoped" lang="less">
	.footer{
		width: 100%;
		height: 70px;
		position: relative;
		background: rgba(0, 0, 0, .1) border-box;
		.music-progress{
			position: absolute;
			z-index: 100;
			top: 0;
			width: 100%;
		}
		
		.footer-tool{
			height: 100%;
			padding: 0 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.music-msg{
				display: flex;
				align-items: center;
				width: 250px;
				color: #fff;
				.pic-div{
					position: relative;
					.hovicon{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #e8e8e8;
						font-size: 30px;
						display: none;
					}
					.music-cover{
						width: 50px;
						height: 50px;
						border-radius: 5px;
						cursor: pointer;
					}
				}
				.pic-div:hover{
					.hovicon{
						display: block;
					}
				}
				.music-detail{
					margin-left: 10px;
					overflow: hidden;
					.title{
						margin-bottom: 5px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
					.time{
						font-size: 12px;
						color: #f0f0f0;
					}
				}
			}
			
			.music-tool{
				width: 135px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.iconfont{
					font-size: 30px;
					cursor: pointer;
					color: #5965ED;
				}
				.playPause{
					font-size: 40px;
				}
			}
			
			.music-tool-right{
				display: flex;
				width: 250px;
				display: flex;
				align-items: center;
				.music-volume{
					flex: 1;
					margin: 0 15px 0 5px;
				}
				.iconfont{
					font-size: 20px;
					color: #fff;
					cursor: pointer;
				}
				.icon-geciweidianji{
					margin: 0 15px;
				}
			}
		}
	}
	.footer::before {
		content:'';
		position:absolute;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:-1;
		-webkit-filter:blur(25px);
		filter:blur(25px);
	}
</style>
<style lang="less">
	.music-volume{
		.el-slider__runway{
			margin: 0;
			height: 2px;
		}
		.el-slider__button-wrapper{
			width: 16px;
			height: 16px;
			top: -8.9px;
			.el-slider__button{
				width: 6px;
				height: 6px;
				background-color: #5965ED;
				border: 1px solid #5965ED;
			}
		}
		.el-slider__bar{
			background-color: #5965ED;
			height: 2px;
		}
	}
	.music-progress{
		.el-slider__runway{
			margin: 0;
			height: 3px;
		}
		.el-slider__button-wrapper{
			display: none;
			width: 17px;
			height: 17px;
			top: -9px;
			.el-slider__button{
				width: 7px;
				height: 7px;
				background-color: #5965ED;
				border: 1px solid #5965ED;
			}
		}
		.el-slider__bar{
			background-color: #5965ED;
			height: 3px;
		}
	}
	.music-progress:hover{
		.el-slider__button-wrapper{
			display: block;
		}
	}
</style>

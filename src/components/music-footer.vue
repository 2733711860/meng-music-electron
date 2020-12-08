<template>
	<div class="footer">
		<el-slider 
			v-model="progress" 
			:max="max" 
			:show-tooltip="false" 
			class="music-progress" 
			@change="changeTime"
			:disabled="!currentMusic.id"></el-slider>
		<div class="footer-tool">
			<div class="music-msg">
				<img :src="currentMusic.id ? `${currentMusic.image}?param=50y50` : require('../assets/image/11.jpg')" class="music-cover" />
				<div class="music-detail" v-show="currentMusic.id">
					<div class="title">{{currentMusic.singer}} - {{currentMusic.name}}</div>
					<div class="time">{{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}</div>
				</div>
			</div>
			
			<div class="music-tool">
				<i class="iconfont icon-backwardfill" title="上一首" @click="preMusic"></i>
				<i class="iconfont playPause" :class="[playing ? 'icon-bofang' : 'icon-zanting']" title="播放/暂停" @click="goPlay"></i>
				<i class="iconfont icon-play_forward_fill" title="下一首" @click="nextMusic"></i>
			</div>
			
			<div class="music-tool-right">
				<i class="iconfont icon-iconset0261" title="音量"></i>
				<el-slider v-model="volume" :show-tooltip="false" class="music-volume"></el-slider>
				<i class="iconfont icon-xunhuanbofang" title="循环模式"></i>
				<i class="iconfont icon-geciweidianji" title="歌词"></i>
				<i class="iconfont icon-qita" title="播放列表"></i>
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
			max: 100
		}
	},
	
	computed: {
		...mapGetters([ 'playing', 'currentMusic', 'currentTime', 'audioEle' ])
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
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.footer{
		width: 100%;
		height: 70px;
		position: relative;
		background: hsla(0, 0%, 100%, .5) border-box;
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
				.music-cover{
					width: 50px;
					height: 50px;
					border-radius: 5px;
					cursor: pointer;
				}
				.music-detail{
					margin-left: 10px;
					overflow: hidden;
					.title{
						color: #333;
						margin-bottom: 5px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
					.time{
						font-size: 12px;
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
			top: -9.1px;
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

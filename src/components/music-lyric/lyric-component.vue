<template>
	<scroll class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
		<div class="lyric" :style="lyricTop">
			<p v-for="(line, index) in currentLyric.lines" ref="lyricLine"
				class="text"
				:class="{'current':currentLineNum===index}"
				>{{line.txt}}</p>
		</div>  
	</scroll>
</template>

<script>
import Scroll from '@/components/scroll.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LyricParser from 'lyric-parser';
export default {
	components: {
		Scroll
	},
	
	data() {
		return {
			currentLineNum: -1,
			screenHeight: document.documentElement.clientHeight,//屏幕高度
			num: 5
		}
	},
	
	computed: {
	  ...mapGetters([ 
			'lyricObj', // 歌词
			'playing',
			'currentTime'
		]),
		
		lyricTop () {
		  return `transform :translate3d(0, ${-40 *
		    (this.currentLineNum - this.num)}px, 0)`
		},
		
		currentLyric() {
			if (this.lyricObj) {
				return new LyricParser(this.lyricObj)
			} else {
				return {}
			}
		}
	},
	
	watch: {
		currentTime(newTime) { // 监听当前播放时间
		  if (!this.lyricObj) {
		    return
		  }
		  let lyricIndexx = 0
		  for (let i = 0; i < this.currentLyric.lines.length; i++) {
		    if (newTime > this.currentLyric.lines[i].time / 1000) {
		      lyricIndexx = i
		    }
		  }
			this.currentLineNum = lyricIndexx;
		},
		
		screenHeight() { //监听屏幕高度变化
			this.getMiddleValue();
		},
	},
	
	mounted() {
		this.getMiddleValue();
		window.onresize = () => { // 定义窗口大小变更通知事件
			this.screenHeight = document.documentElement.clientHeight; //窗口高度
		};
	},
	
	methods: {
		getMiddleValue() {
			var faBoxHeight = document.querySelector('.lyric-wrapper').offsetHeight;
			let num = Math.round(faBoxHeight/40);
			this.num = Math.floor(num / 2);
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.lyric-wrapper{
		overflow: hidden;
		position: relative; // 必须加这个，否则滚动条样式会有问题
		// height: 100%;
		.lyric{
			cursor: pointer;
			user-select: none;
			transition: all .5s;
			.current{
				color: #fff !important;
				font-size: 17px !important;
			}
			.text{
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #aaaaaa;
				font-size: 15px;
			}
		}
	}
</style>

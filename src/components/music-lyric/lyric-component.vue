<template>
	<scroll class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
		<div class="lyric">
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
			currentLyric: [],
			currentLineNum: -1
		}
	},
	
	computed: {
	  ...mapGetters([ 
			'lyricObj', // 歌词
			'playing'
		]),
	},
	
	watch: {
		lyricObj() {
			this.getLyric();
		},
		
		// playing(newValue) {
		// 	if (this.currentLyric) {
		// 		if (newValue) {
		// 			this.currentLyric.play();
		// 		} else {
		// 			this.currentLyric.stop();
		// 		}
		// 	}
		// }
	},
	
	methods: {
		getLyric() {
			this.currentLyric = new LyricParser(this.lyricObj, this.handleLyric);
			console.log(this.currentLyric)
			if (this.playing) {
				this.currentLyric.play();
			}
		},
		
		handleLyric({lineNum, txt}) {
			console.log(lineNum, txt)
			this.currentLineNum = lineNum;
			// 若当前行大于5,开始滚动,以保歌词显示于中间位置
			if (lineNum > 2) {
				let lineEl = this.$refs.lyricLine[lineNum - 5];
				console.log(lineEl)
				// 结合better-scroll，滚动歌词
				this.$refs.lyricList.scrollToElement(lineEl, 1000);
			} else {
				this.$refs.lyricList.scrollToElement(0, 0, 1000);
			}
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
			.current{
				color: #fff !important;
				font-size: 17px !important;
			}
			.text{
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #cacaca;
				font-size: 15px;
			}
		}
	}
</style>

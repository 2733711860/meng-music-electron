<template>
  <div id="app">
		<music-left class="music-left"></music-left>
		
		<div class="music-right">
			<music-header></music-header>
			<router-view class="view-page"></router-view>
			<music-footer></music-footer>
		</div>
		
		<!-- <music-lyric></music-lyric> -->
		<!--播放器-->
		<audio ref="ddPlayer"></audio>
  </div>
</template>

<script>
import musicLeft from '@/components/music-left/index.vue';
import musicHeader from '@/components/music-header.vue';
import musicFooter from '@/components/music-footer.vue';
import musicLyric from '@/components/music-lyric/music-lyric.vue';
import { music } from '@/mixin/music.js';
export default {
	name: 'meng-music',
	
	mixins: [music],
	
	components: {
		musicLeft, musicHeader, musicFooter, musicLyric
	}
}
</script>

<style lang="less">
	@import url('assets/css/common.less');
	*{
		padding: 0;
		margin: 0;
	}
	html, body, #app{
		.wh(100%, 100%);
		overflow: hidden;
	}
	#app{
		.flexbox(space-between);
		.fontStyle(13px, #6b6b6b);
		font-family: "microsoft yahei";
		position: relative;
		.music-left{
			.wh(200px, 100%);
		}
		.music-right{
			.wh(auto, 100%);
			.flexbox(space-between, center, column);
			.bg('../image/11.jpg');
			flex: 1;
			overflow-x: auto;
			position: relative;
			.view-page{
				.wh(100%, auto);
				flex: 1;
				overflow-y: auto;
				background-color: #fff;
			}
		}
	}
</style>

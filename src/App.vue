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
	*{
		padding: 0;
		margin: 0;
	}
	html, body, #app{
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	#app{
		display: flex;
		justify-content: space-between;
		font-size: 13PX;
		color: #6b6b6b;
		font-family: "microsoft yahei";
		position: relative;
		.music-left{
			width: 200px;
			height: 100%;
		}
		.music-right{
			flex: 1;
			overflow-x: auto;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			position: relative;
			background-image: url(assets/image/11.jpg);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			.view-page{
				width: 100%;
				flex: 1;
				overflow-y: auto;
				background-color: #fff;
			}
		}
	}
</style>

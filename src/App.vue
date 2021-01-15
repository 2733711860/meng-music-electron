<template>
  <div id="app">
		<music-left class="music-left"></music-left>
		
		<div class="music-right" :style="{ backgroundImage: picUrl }">
			<music-header></music-header>
			<router-view class="view-page"></router-view>
			<music-footer></music-footer>
			<Search></Search>
		</div>
		
		<!-- 播放列表，历史记录 -->
		<music-play></music-play>
		
		<music-lyric></music-lyric>
		
		<!--播放器-->
		<music-audio></music-audio>
  </div>
</template>

<script>
import musicLeft from '@/components/music-left/index.vue';
import musicHeader from '@/components/music-header.vue';
import musicFooter from '@/components/music-footer.vue';
import musicLyric from '@/components/music-lyric/music-lyric.vue';
import musicAudio from '@/components/music-audio.vue';
import musicPlay from '@/components/music-play';
import Search from '@/components/Search';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	name: 'meng-music',
	
	components: {
		musicLeft, musicHeader, musicFooter, musicLyric, musicAudio, musicPlay, Search
	},
	
	computed: {
	  ...mapGetters([ 'currentMusic', 'themeObj' ]),
		
		picUrl() {
			let bgUrl = require(`./assets/image/${this.themeObj.bgCoverIndex}.jpg`);
			return "url("+bgUrl+")"
		  // return this.currentMusic.id && this.currentMusic.image
		  // 	? `url(${this.currentMusic.image}?param=300y300)`
		  // 	: "url("+bgUrl+")"
		},
	},
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
		-moz-user-select: none;/*火狐*/
		-webkit-user-select: none;/*webkit浏览器*/
		-ms-user-select: none;/*IE10*/
		-khtml-user-select: none;/*早期浏览器*/
		user-select: none;
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
			background-repeat: no-repeat;
			background-size: 100% 100%;
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

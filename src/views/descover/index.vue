<template>
	<div class="descover-page">
		<music-swiper></music-swiper>
		
		<div class="title">
			<span>精选歌单</span>
			<Icon icon="icon-iconset0420" isHover></Icon>
		</div>
		<div class="sheet-list">
			<music-sheet class="item-sheet" v-for="i in 5" :key="i"></music-sheet>
		</div>
		
		<music-list></music-list>
		
		<div class="title">
			<span>推荐MV</span>
			<Icon icon="icon-iconset0420" isHover></Icon>
		</div>
		<div class="sheet-list">
			<music-mv class="item-mv" v-for="i in 4" :key="i"></music-mv>
		</div>
	</div>
</template>

<script>
import musicSwiper from './components/music-swiper.vue';
import musicSheet from './components/music-sheet.vue';
import musicMv from './components/music-mv.vue';
import Icon from '@/components/music-left/Icon.vue';
import musicList from './components/music-list.vue';
export default {
	components: {
		musicSwiper, musicSheet, Icon, musicList, musicMv
	}
}
</script>

<style scoped="scoped" lang="less">
	.descover-page{
		padding: 0 10px;
		box-sizing: border-box;
		.sheet-list{
			display: flex;
			justify-content: space-between;
			padding: 10px;
		}
		
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30PX 10PX 5PX 10PX;
			border-bottom: 1PX solid #ededed;
			span{
				color: #333;
				font-size: 16PX;
				font-weight: bold;
			}
		}
	}
</style>

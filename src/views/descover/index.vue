<template>
	<div class="descover-page">
		<music-swiper></music-swiper>
		
		<div class="title">
			<span>精选歌单</span>
			<Icon icon="icon-iconset0420" isHover></Icon>
		</div>
		<div class="sheet-list">
			<music-sheet class="item-sheet" v-for="(item, index) in sheets" :key="index + 'sheet'" :sheetDetail="item"></music-sheet>
		</div>
		
		<music-list></music-list>
		
		<div class="title">
			<span>推荐MV</span>
			<Icon icon="icon-iconset0420" isHover></Icon>
		</div>
		<div class="sheet-list">
			<music-mv class="item-mv" v-for="(item, index) in mvList" :key="index + 'mv'" :mvDetails="item"></music-mv>
		</div>
	</div>
</template>

<script>
import musicSwiper from './components/music-swiper.vue';
import musicSheet from './components/music-sheet.vue';
import musicMv from './components/music-mv.vue';
import Icon from '@/components/music-left/Icon.vue';
import musicList from './components/music-list.vue';
import { getPersonalized, getPersonlMv } from '@/api/index.js';
export default {
	components: {
		musicSwiper, musicSheet, Icon, musicList, musicMv
	},
	
	data() {
		return{
			sheets: [],
			mvList: []
		}
	},
	
	mounted() {
		this.getSheet();
		this.getMv();
	},
	
	methods: {
		getSheet() { // 获取推荐歌单
			getPersonalized({
				limit: 5
			}).then(res => {
				if (res.code == 200) {
					this.sheets = res.result
				}
			})
		},
		
		getMv() { // 获取推荐mv
			getPersonlMv().then(res => {
				if (res.code == 200) {
					this.mvList = res.result.length > 3 ? res.result.slice(0, 4) : res.result;
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../assets/css/common.less');
	.descover-page{
		padding: 0 10px;
		box-sizing: border-box;
		.sheet-list{
			.flexbox(space-between);
			padding: 10px;
		}
		
		.title{
			padding: 30PX 10PX 5PX 10PX;
			border-bottom: 1PX solid #ededed;
			.flexbox(space-between, center);
			span{
				.fontStyle(16px, #333, bold);
			}
		}
	}
</style>

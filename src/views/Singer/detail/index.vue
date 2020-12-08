<template>
	<div class="sheet-detail">
		<singer-top :singerDetails="singerDetails"></singer-top>
		
		<el-tabs v-model="activeName">
			<el-tab-pane label="专辑" name="first">专辑</el-tab-pane>
			<el-tab-pane label="歌曲" name="second">
				<music-list :songList="songList"></music-list>
			</el-tab-pane>
			<el-tab-pane label="MV" name="third">MV</el-tab-pane>
			<el-tab-pane label="相似歌手" name="fourth">
				<simi-singer></simi-singer>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import singerTop from './singer-top.vue';
import musicList from '../../Music/music-list.vue';
import simiSinger from './simi-singer.vue';
import singerMv from './singer-mv.vue';
import { getSingerDetail, getMusicDetail, getSimiSheet } from '@/api';
import { createSheetToSong } from '@/utils';
export default {
	components: {
		singerTop, musicList, simiSinger, singerMv
	},
	
	data() {
		return {
			activeName: 'second',
			songList: [], // 歌曲列表
			simiSingers: [], // 相似歌手
			singerDetails: '', // 歌手详情
		};
	},
	
	computed: {
	  singerId() { // 歌单id
	    return Number(this.$route.params.id)
	  },
	},
	
	watch: {
	  singerId: {
	    handler() {
	      this.getDetail(); // 获取歌手详情
				this.getRelatedSinger(); // 相关歌手推荐
	    },
	    immediate: true
	  },
	},
	
	methods: {
		getDetail() {
			getSingerDetail({
				id: this.singerId
			}).then(res => {
				if (res.code == 200) {
					console.log(res)
				}
			})
		},
		
		getRelatedSinger() {
			
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../../assets/css/common.less');
	.sheet-detail{
		.title{
			font-size: 20px;
			font-weight: bold;
		}
		.sheet-list{
			.flexbox(flex-start, stretch, row, wrap);
			margin: 20px 0;
			.sheet{
				margin: 0 8px 15px 8px;
			}
		}
	}
</style>

<style lang="less">
	.sheet-detail{
		.el-tabs{
			padding: 0 20px;
		}
		.el-tabs__item.is-active{
			color: #5965ED;
		}
		.el-tabs__active-bar{
			background-color: #5965ED;
		}
		.el-tabs__item:hover{
			color: #5965ED;
		}
		.el-tabs__nav-wrap::after{
			height: 0;
		}
	}
</style>
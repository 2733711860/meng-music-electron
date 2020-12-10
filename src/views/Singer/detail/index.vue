<template>
	<div class="sheet-detail">
		<singer-top :singerDetails="singerDetails"></singer-top>
		
		<el-tabs v-model="activeName">
			<el-tab-pane label="专辑" name="first">专辑</el-tab-pane>
			<el-tab-pane label="歌曲" name="second">
				<music-list :songList="songList"></music-list>
			</el-tab-pane>
			<el-tab-pane label="MV" name="third">
				<div class="mv-list">
					<music-mv class="item-mv" v-for="(item, index) in mvList" :key="index + 'mv'" :mvDetails="item"></music-mv>
				</div>
			</el-tab-pane>
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
import musicMv from '../../descover/components/music-mv.vue';
import { getSingerDetail, getMusicDetail, getSimiSheet, getSingerSong, getSingerMv, getSingerAlbum } from '@/api';
import { createSheetToSong } from '@/utils';
export default {
	components: {
		singerTop, musicList, simiSinger, musicMv
	},
	
	data() {
		return {
			activeName: 'second',
			songList: [], // 歌曲列表
			mvList: [], // mv列表
			simiSingers: [], // 相似歌手
			singerDetails: {}, // 歌手详情
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
				this.getMusic(); // 获取歌手单曲
				this.getMv(); // 获取歌手mv
	      // this.getDetail(); // 获取歌手详情
				this.getRelatedSinger(); // 相关歌手推荐
	    },
	    immediate: true
	  },
	},
	
	methods: {
		getMusic() { // 获取歌手单曲
			getSingerSong({
				id: this.singerId
			}).then(res => {
				console.log(res)
				if (res.code == 200) {
					this.singerDetails = res.artist;
					this.songList = this._formatSongs(res.hotSongs);
				}
			})
		},
		
		getMv() { // 获取歌手mv
			getSingerMv({
				id: this.singerId
			}).then(res => {
				if (res.code == 200) {
					this.mvList = res.mvs;
				}
			})
		},
		
		getDetail() {
			getSingerDetail({
				id: this.singerId
			}).then(res => {
				if (res.code == 200) {
				}
			})
		},
		
		getRelatedSinger() {
			
		},
		
		_formatSongs(list) { // 歌曲数据处理
		  let ret = []
		  list.forEach(item => {
		    const musicData = item
		    if (musicData.id) {
		      ret.push(createSheetToSong(musicData))
		    }
		  })
		  return ret
		},
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
		.mv-list{
			display: flex;
			flex-wrap: wrap;
			.item-mv{
				margin: 5px 9px 5px 9px;
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
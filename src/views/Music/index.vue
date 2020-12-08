<template>
	<div class="sheet-detail">
		<sheet-top :sheetDetails="sheetDetails"></sheet-top>
		
		<el-tabs v-model="activeName">
			<el-tab-pane label="歌曲" name="first">
				<music-list :songList="songList"></music-list>
				<div class="title">相关歌单</div>
				<div class="sheet-list">
					<simi-sheet
						class="sheet"
						v-for="(item, index) in simiSheets"
						:key="index + 'simi'"
						:sheetDetail="item"></simi-sheet>
				</div>
			</el-tab-pane>
			<el-tab-pane label="评论" name="third">敬请期待</el-tab-pane>
			<el-tab-pane label="收藏者" name="fourth">
				<sheet-user></sheet-user>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import sheetTop from './sheet-top.vue';
import musicList from './music-list.vue';
import simiSheet from './simi-sheet.vue';
import sheetUser from './sheet-user.vue';
import { getSheetDetail, getMusicDetail, getSimiSheet } from '@/api';
import { createSheetToSong } from '@/utils';
export default {
	components: {
		sheetTop, musicList, simiSheet, sheetUser
	},
	
	data() {
		return {
			activeName: 'first',
			songList: [], // 歌曲列表
			simiSheets: [], // 相关歌单
			sheetDetails: '', // 歌单详情
		};
	},
	
	computed: {
	  sheetId() { // 歌单id
	    return Number(this.$route.params.id)
	  },
	},
	
	watch: {
	  sheetId: {
	    handler() {
	      this.getDetail(); // 获取歌单详情
				this.getRelatedSheet(); // 相关歌单推荐
	    },
	    immediate: true
	  },
	},
	
	methods: {
		getDetail() { // 获取歌单详情
			getSheetDetail({
				id: this.sheetId
			}).then(async res => {
				if (res.code == 200) {
					this.sheetDetails = res.playlist;
					const trackIds = res.playlist.trackIds.map(({ id }) => id);
					const songDetails = await this.getSongDetail(trackIds.slice(0, 200));
					this.songList = this._formatSongs(songDetails)
				}
			})
		},
		
		getSongDetail(trackIds) { // 获取歌曲详情
			return new Promise((resolve, reject) => {
				getMusicDetail({
					ids: trackIds.join(',')
				}).then(res => {
					if (res.code == 200) {
						resolve(res.songs)
					} else {
						resolve([])
					}
				})
			})
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
		
		getRelatedSheet() { // 相关歌单推荐
			getSimiSheet({
				id: this.sheetId
			}).then(res => {
				if (res.code == 200) {
					this.simiSheets = res.playlists;
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../assets/css/common.less');
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
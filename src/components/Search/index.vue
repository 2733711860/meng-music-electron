<template>
	<div class="music-search" :class="{'music-search-active': searchObj.showSearch}">
		<div class="top">搜索“<span>{{searchObj.searchKey}}</span>”的相关结果</div>
		
		<div class="search-result">
			<el-tabs v-model="activeName">
				<el-tab-pane label="单曲" name="first">
					<music-list :songList="songList"></music-list>
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalSong">
					</el-pagination>
				</el-tab-pane>
				
				<el-tab-pane label="歌单" name="second">
					<div class="sheet-list">
						<music-sheet
							class="itemSheet" 
							v-for="(item, index) in sheetList" 
							:key="index + 'sheet'" 
							:sheetDetail="item">
						</music-sheet>
					</div>
					<el-pagination
						class="sheet-pagination"
						@size-change="handleSizeChangeSheet"
						@current-change="handleCurrentChangeSheet"
						:current-page="sheetPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSizeSheet"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalSheet">
					</el-pagination>
				</el-tab-pane>
				
				<el-tab-pane label="MV" name="third">
					<div class="mv-list">
						<music-mv 
							class="item-mv" 
							v-for="(item, index) in mvList" 
							:key="index + 'mv'" 
							:mvDetails="item"
						></music-mv>
					</div>
					<el-pagination
						class="sheet-pagination"
						@size-change="handleSizeChangeMv"
						@current-change="handleCurrentChangeMv"
						:current-page="mvPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSizeMv"
						layout="total, sizes, prev, pager, next, jumper"
						:total="totalMv">
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="专辑" name="fourth">敬请期待</el-tab-pane>
				<el-tab-pane label="歌词" name="fifth">敬请期待</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getSearch } from '@/api';
import { createPlayList } from '@/utils';
import musicList from '@/views/Music/music-list.vue';
import musicSheet from '@/views/descover/components/music-sheet.vue';
import musicMv from '@/views/descover/components/music-mv.vue';
export default{
	components: {
		musicList, musicSheet, musicMv
	},
	
	data() {
		return {
			activeName: 'first',
			currentPage: 1,
			pageSize: 10,
			songList: [], // 单曲列表
			totalSong: 0, // 单曲总数
			sheetPage: 1,
			pageSizeSheet: 10,
			sheetList: [], // 歌单列表
			totalSheet: 0, // 歌单总数
			mvPage: 1,
			pageSizeMv: 10,
			mvList: [], // MV列表
			totalMv: 0, // MV总数
		}
	},
	
	computed: {
	  ...mapGetters([ 'searchObj' ]),
		
		isSearch() { // 是否进行搜索的标志，只要改变就搜索
			return this.searchObj.isPreveEnter
		}
	},
	
	watch: {
		isSearch() {
			this.getSearchSong(1, this.pageSize, this.currentPage);
		},
		
		activeName() { // 监听标签页变化
			if (this.activeName == 'first') { // 单曲
				this.currentPage = 1;
				this.getSearchSong(1, this.pageSize, this.currentPage);
			} else if (this.activeName == 'second') { // 歌单
				this.sheetPage = 1;
				this.getSearchSong(1000, this.pageSizeSheet, this.sheetPage);
			} else if (this.activeName == 'third') { // MV
				this.mvPage = 1;
				this.getSearchSong(1004, this.pageSizeMv, this.mvPage);
			}
		}
	},
	
	methods: {
		getSearchSong(type, size, page) { // 搜索
			getSearch({
				keywords: this.searchObj.searchKey,
				limit: size,
				offset: (page - 1) * size,
				type: type // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
			}).then(res => {
				console.log(res)
				if (type == 1) { // 单曲
					this.totalSong = res.result.songCount;
					this.songList = this._formatSongs(res.result.songs);
				} else if (type == 1000) { // 歌单
					this.totalSheet = res.result.playlistCount;
					this.sheetList = res.result.playlists;
				} else if (type == 1004) { // MV
					this.totalMv = res.result.mvCount;
					this.mvList = res.result.mvs;
				}
			})
		},
		
		_formatSongs(list) { // 歌曲数据处理
		  let ret = []
		  list.forEach(item => {
		    const musicData = item
		    if (musicData.id) {
		      ret.push(createPlayList(musicData))
		    }
		  })
		  return ret
		},
		
		handleSizeChange(val) { // 单曲每页条数
			this.currentPage = 1;
			this.pageSize = val;
			this.getSearchSong(1, this.pageSize, this.currentPage);
		},
		
		handleCurrentChange(val) { // 单曲当前页
			this.currentPage = val;
			this.getSearchSong(1, this.pageSize, this.currentPage);
		},
		
		handleSizeChangeSheet(val) { // 歌单每页条数
			this.sheetPage = 1;
			this.pageSizeSheet = val;
			this.getSearchSong(1000, this.pageSizeSheet, this.sheetPage);
		},
		
		handleCurrentChangeSheet(val) { // 歌单当前页
			this.sheetPage = val;
			this.getSearchSong(1000, this.pageSizeSheet, this.sheetPage);
		},
		
		handleSizeChangeMv(val) { // MV每页条数
			this.mvPage = 1;
			this.pageSizeMv = val;
			this.getSearchSong(1004, this.pageSizeMv, this.mvPage);
		},
		
		handleCurrentChangeMv(val) { // MV当前页
			this.mvPage = val;
			this.getSearchSong(1004, this.pageSizeMv, this.mvPage);
		},
		
		...mapMutations({
			setSearchObj: "SET_SEARCHOBJ"
		})
	}
}
</script>

<style scoped="scoped" lang="less">
.music-search{
	position: absolute;
	top: 75px;
	right: 0;
	bottom: 70px;
	left: 0;
	overflow-y: auto;
	background-color: #fff;
	z-index: 100;
	-os-transform: translateX(100%);
	transform: translateX(100%);
	-webkit-transition: all .5s;
	-moz-transition: all .5s;
	.top{
		padding: 10px 20px;
		span{
			font-weight: bold;
		}
	}
	.search-result{
		padding: 10px 20px;
		.sheet-list{
			display: flex;
			flex-wrap: wrap;
			.itemSheet{
				margin: 5px 7px 15px 9px;
			}
		}
		.mv-list{
			display: flex;
			flex-wrap: wrap;
			.item-mv{
				margin: 5px 9px 15px 9px;
			}
		}
	}
}
.music-search-active{
	-os-transform: translateX(0);
	transform: translateX(0);
}
</style>

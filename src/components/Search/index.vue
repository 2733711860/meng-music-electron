<template>
	<div class="music-search" :class="{'music-search-active': searchObj.showSearch}">
		<div class="top">搜索“<span>{{searchObj.searchKey}}</span>”的相关结果</div>
		
		<div class="search-result">
			<el-tabs v-model="activeName">
				<el-tab-pane label="单曲" name="1">
					<music-list :songList="songList"></music-list>
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-tab-pane>
				
				<el-tab-pane label="歌单" name="1000" v-if="searchObj.searchOrigin != '2'">
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
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="歌单" name="1000" v-if="searchObj.searchOrigin == '2'">敬请期待</el-tab-pane>
				
				<el-tab-pane label="MV" name="1004" v-if="searchObj.searchOrigin != '2'">
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
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</el-tab-pane>
				<el-tab-pane label="MV" name="1004" v-if="searchObj.searchOrigin == '2'">敬请期待</el-tab-pane>
				<el-tab-pane label="专辑" name="10">敬请期待</el-tab-pane>
				<el-tab-pane label="歌词" name="1006">敬请期待</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getSearch, getQQSearch } from '@/api';
import { createPlayList, createQQMusic } from '@/utils';
import musicList from '@/views/Music/music-list.vue';
import musicSheet from '@/views/descover/components/music-sheet.vue';
import musicMv from '@/views/descover/components/music-mv.vue';
const QQobj = {
	'1': 'song', // 单曲
	'10': 'album', // 专辑
	'1000': 'playlist', // 歌单
	'1004': 'mv', // MV
	'1006': 'lyric' // 歌词
}
export default{
	components: {
		musicList, musicSheet, musicMv
	},
	
	data() {
		return {
			activeName: '1',
			currentPage: 1,
			pageSize: 10,
			songList: [], // 单曲列表
			total: 0, // 单曲总数
			sheetList: [], // 歌单列表
			mvList: [], // MV列表
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
			this.getFuncOb();
		},
		
		activeName() { // 监听标签页变化
			this.getFuncOb();
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
				if (type == 1) { // 单曲
					this.total = res.result.songCount;
					this.songList = this._formatSongs(res.result.songs);
				} else if (type == 1000) { // 歌单
					this.total = res.result.playlistCount;
					this.sheetList = res.result.playlists;
				} else if (type == 1004) { // MV
					this.total = res.result.mvCount;
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
			this.getFuncOb();
		},
		
		handleCurrentChange(val) { // 单曲当前页
			this.currentPage = val;
			this.getFuncOb();
		},
		
		getQQmusic(type, size, page) { // 搜索qq音乐
			if (type != '1') {
				this.$message.error('QQ音乐暂只支持单曲查询');
				return;
			}
			getQQSearch({
				key: this.searchObj.searchKey,
				limit: size,
				page: page,
				remoteplace: QQobj[type] // song: 单曲, album: 专辑, user: 歌手, playlist: 歌单, user: 用户, mv: MV, lyric: 歌词
			}).then(res => {
				if (type == 'song') { // 单曲
					this.total = res.response.data.song.totalnum;
					this.songList = this._formatQQSongs(res.response.data.song.list);
				}
			})
		},
		
		_formatQQSongs(list) { // 歌曲数据处理
		  let ret = []
		  list.forEach(item => {
		    const musicData = item
		    if (musicData.id) {
		      ret.push(createQQMusic(musicData))
		    }
		  })
		  return ret
		},
		
		getFuncOb() {
			if (this.searchObj.searchOrigin == '1') { // 网易云
				this.getSearchSong(this.activeName, this.pageSize, this.currentPage);
			} else if (this.searchObj.searchOrigin == '2') { // QQ音乐
				this.getQQmusic(this.activeName, this.pageSize, this.currentPage);
			}
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

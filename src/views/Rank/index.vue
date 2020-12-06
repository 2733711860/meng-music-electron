<template>
	<div class="rank-page">
		<div class="title">官方榜</div>
		<div class="rank-card-div">
			<rank-card 
				class="oneCard" 
				v-for="(item, index) in officailRanks" 
				:key="index+'quan'"
				:rankDetail="item">
			</rank-card>
			
			<rank-singer-card 
				class="oneCard"
				:rankDetail="topArtist"
				 v-if="topArtist">
			</rank-singer-card>
		</div>
		
		<div class="title matop">全球榜</div>
		<div class="rank-card-div">
			<rank-card-two class="twoCard" 
				v-for="item in rest" 
				:key="item.id"
				:rankDetail="item"></rank-card-two>
		</div>
	</div>
</template>

<script>
import rankCard from './rank-card.vue';
import rankCardTwo from './rank-card-two.vue';
import rankSingerCard from './rank-singer-card.vue';
import { getRanks, getRankSinger, getSheetDetail, getMusicDetail } from '@/api/index.js';
import { createSheetToSong } from '@/utils';
export default {
	components: {
		rankCard, rankCardTwo, rankSingerCard
	},
	
	data() {
		return{
			list: [],
			topArtist: ''
		}
	},
	
	computed: {
	  officailRanks () { // 官方榜列表
	    return this.list.slice(0, 4)
	  },
    rest () { // 全球榜
      return this.list.slice(4)
    }
	},
	
	created() {
		this.getRankList();
		this.getSinger();
	},
	
	methods: {
		getRankList() { // 获取排行榜列表
			getRanks().then(async res => {
				if (res.code == 200) {
					this.list = res.list;
					this.list.forEach(async item => {
					  if ( item.ToplistType ) {
					    let trackIds = await this.getDetail(item.id);
							const songDetails = await this.getSongDetail(trackIds.slice(0, 7));
							item.tracks = this._formatSongs(songDetails);
					  }
					})
				}
			})
		},
		
		getDetail(idx) { // 获取榜单详情
			return new Promise((resolve, reject) => {
				getSheetDetail({
					id: idx
				}).then(async res => {
					if (res.code == 200) {
						const trackIds = res.playlist.trackIds.map(({ id }) => id);
						resolve(trackIds);
					}
				})
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
		
		getSinger() { // 获取歌手榜
			getRankSinger().then(res => {
				if (res.code == 200) {
					this.topArtist = res.list;
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.rank-page{
		padding: 0 20px;
		box-sizing: border-box;
		.title{
			font-size: 16px;
			font-weight: bold;
			padding: 10px 0;
			border-bottom: 1px solid #e7e7e7;
		}
		.matop{
			margin-top: 20px;
		}
		.rank-card-div{
			margin-top: 20px;
			display: flex;
			flex-wrap: wrap;
			.oneCard{
				margin: 0 5px 20px 5px;
			}
			.twoCard{
				margin: 0 15px 20px 12px;
			}
		}
	}
</style>

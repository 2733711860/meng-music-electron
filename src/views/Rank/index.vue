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
import { getRanks, getRankDetail, getRankSinger } from '@/api/index.js';
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
					    let playList = await this.getDetail(item.id);
							item.tracks = playList.slice(0, 7).map(track => {
							  return createSheetToSong(track)
							})
					  }
					})
				}
			})
		},
		
		getDetail(idx) { // 获取榜单详情
			return new Promise((resolve, reject) => {
				getRankDetail({
					id: idx
				}).then(res => {
					if (res.code == 200) {
						resolve(res.playlist.tracks);
					} else {
						resolve([]);
					}
				})
			})
		},
		
		getSinger() { // 获取歌手榜
			getRankSinger().then(res => {
					console.log(res)
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

<template>
	<div class="rank-card">
		<img :src="`${imgs[rankDetail.ToplistType]}`" />
		<i class="iconfont icon-iconset0481" title="播放全部"></i>
		<span class="texts">{{ rankDetail.updateTime | toDate('MM月DD日') }} 更新</span>
		<div class="music-list">
			<div class="one-music" v-for="(item, index) in rankDetail.tracks" :key="index + 'tracks'">
				<span>{{`0${index + 1}`}}</span>
				<span class="musicName" :title="item.name">{{item.name}}</span>
				<span class="singer" :title="item.singer">{{item.singer}}</span>
			</div>
			<div class="card-btn" @click="seeAll">查看全部></div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default{
	data () {
		return{
			imgs: {
			  A: require('../../assets/image/rankA_bg.jpg'),
			  H: require('../../assets/image/rankH_bg.jpg'),
			  N: require('../../assets/image/rankN_bg.jpg'),
			  O: require('../../assets/image/rankO_bg.jpg'),
			  S: require('../../assets/image/rankS_bg.jpg')
			},
		}
	},
	
	props: {
		rankDetail: {
			type: Object,
			default: () => {}
		}
	},
	
	filters: {
		toDate(val, format) {
			return moment(val).format(format || 'YYYY-MM-DD')
		}
	},
	
	methods: {
		seeAll() {
			this.$router.push({
				path: `/playlist/${this.rankDetail.id}`
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.rank-card{
		width: 240px;
		border: 1px solid #e7e7e7;
		position: relative;
		.icon-iconset0481{
			position: absolute;
			right: 10px;
			top: 50px;
			color: #ececec;
			font-size: 20px;
			cursor: pointer;
		}
		.texts{
			position: absolute;
			top: 50px;
			left: 60px;
			color: #e1e1e1;
			font-size: 9px;
		}
		img{
			width: 100%;
			height: 80px;
		}
		.music-list{
			.one-music{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 10px;
				height: 35px;
				cursor: pointer;
				.singer{
					width: 60px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: right;
				}
				.musicName{
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 10px;
				}
			}
			.one-music:nth-of-type(even), .card-btn{
				background: #f4f4f4;
			}
			.one-music:hover{
				background-color: #e7e7e7;
			}
			.card-btn{
				height: 40px;
				line-height: 40px;
				text-align: right;
				padding: 0 10px;
				cursor: pointer;
			}
		}
	}
</style>

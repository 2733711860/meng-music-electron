<template>
	<div class="rank-card">
		<img src="../../assets/image/rankA_bg.jpg" />
		<span class="texts">{{ rankDetail.updateTime | toDate('MM月DD日') }} 更新</span>
		<div class="music-list">
			<div class="one-music" v-for="(item, index) in rankDetail.artists.slice(0, 7)" :key="index + 'singer'">
				<span>{{`0${index + 1}`}}</span>
				<span class="musicName" :title="item.name">{{item.name}}</span>
			</div>
			<div class="card-btn">查看全部></div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default{
	data () {
		return{
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
	}
}
</script>

<style scoped="scoped" lang="less">
	.rank-card{
		width: 240px;
		border: 1px solid #e7e7e7;
		position: relative;
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

<template>
	<div class="rank-card">
		<img src="../../assets/image/rankA_bg.jpg" />
		<span class="texts">{{ rankDetail.updateTime | toDate('MM月DD日') }} 更新</span>
		<div class="music-list">
			<div class="one-music flex-center" v-for="(item, index) in rankDetail.artists.slice(0, 7)" :key="index + 'singer'">
				<span>{{`0${index + 1}`}}</span>
				<span class="musicName ellipsis" :title="item.name">{{item.name}}</span>
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
	@import url('../../assets/css/common.less');
	.rank-card{
		width: 240px;
		border: 1px solid #e7e7e7;
		position: relative;
		.texts{
			.css-position(absolute, 50px, auto, auto, 60px);
			.fontStyle(9px, #e1e1e1);
		}
		img{
			.wh(100%, 80px);
		}
		.music-list{
			.one-music{
				padding: 0 10px;
				height: 35px;
				cursor: pointer;
				.musicName{
					flex: 1;
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

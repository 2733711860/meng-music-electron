<template>
	<div class="rank-card">
		<img :src="`${imgs[rankDetail.ToplistType]}`" />
		<i class="iconfont icon-iconset0481" title="播放全部"></i>
		<span class="texts">{{ rankDetail.updateTime | toDate('MM月DD日') }} 更新</span>
		<div class="music-list">
			<div class="one-music flex-center" v-for="(item, index) in rankDetail.tracks" :key="index + 'tracks'" @dblclick="playThis(item, rankDetail.tracks)">
				<span>{{`0${index + 1}`}}</span>
				<span class="musicName ellipsis" :title="item.name">{{item.name}}</span>
				<span class="singer ellipsis" :title="item.singer">{{item.singer}}</span>
			</div>
			<div class="card-btn" @click="seeAll">查看全部></div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { music } from '@/mixin/music.js';
export default{
	mixins: [ music ],
	
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
	@import url('../../assets/css/common.less');
	.rank-card{
		width: 240px;
		border: 1px solid #e7e7e7;
		position: relative;
		.icon-iconset0481{
			.fontStyle(20px, #ececec);
			.css-position(absolute, 50px, 10px);
			cursor: pointer;
		}
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
				.singer{
					width: 60px;
					text-align: right;
				}
				.musicName{
					flex: 1;
					padding: 0 10px;
				}
			}
			.one-music:nth-of-type(even), .card-btn{
				background: #fafafa;
			}
			.one-music:hover{
				background-color: #f0f0f0;
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

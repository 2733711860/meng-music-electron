<template>
	<div class="music-sheet" @click="goDetail">
		<div class="top">
			<img :src="`${sheetDetail.picUrl ? sheetDetail.picUrl : sheetDetail.coverImgUrl}?param=125y125`" />
			<i class="iconfont icon-iconset0481"></i>
			<div class="mask"></div>
		</div>
		
		<div class="text">{{sheetDetail.name}}</div>
	</div>
</template>

<script>
import { addChineseUnit } from '@/utils/song.js';
export default {
	props: {
		sheetDetail: {
			type: Object,
			default: () => {}
		}
	},
	
	filters: {
		addChineseUnit
	},
	
	methods: {
		goDetail () {
			this.$router.push({
				path: `/playlist/${this.sheetDetail.id}`
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../assets/css/common.less');
	.music-sheet{
		display: inline-block;
		cursor: pointer;
		border-radius: 5px;
		.top{
			.wh(125px, 125px);
			position: relative;
			overflow: hidden;
			border-radius: 5px;
			box-shadow: 0 6PX 18PX #9d9d9d;
			opacity: .8;
			transform: translateZ(0) scale(1, 1);
			-webkit-transform: translateZ(0) scale(1, 1);
			-moz-transform: translateZ(0) scale(1, 1);
			-webkit-transition: transform .5s;
			-moz-transition: transform .5s;
			img{
				.wh(100%, 100%);
			}
			.icon-iconset0481{
				.fontStyle(40px, #fff);
				.css-position(absolute, 50%, auto, auto, 50%);
				z-index: 2;
				transform: translate(-50%, -50%);
				opacity: 0;
				-webkit-transition: opacity .5s;
				-moz-transition: opacity .5s;
			}
			.mask{
				.css-position(absolute, 0, 0, 0, 0);
				background: rgba(0, 0, 0, .5);
				z-index: 1;
				opacity: 0;
				border-radius: 5px;
			}
		}
		.text{
			.textoverflow(2);
			padding: 8px 5px 0 5px;
			text-align: center;
			width: 125px;
		}
	}
	.music-sheet:hover{
		.top{
			transform: scale(1.05);
			opacity: 1;
			.icon-iconset0481{
				opacity: 1;
			}
			.mask{
				opacity: 1;
			}
		}
	}
</style>

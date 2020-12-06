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
	.music-sheet{
		display: inline-block;
		cursor: pointer;
		border-radius: 5px;
		.top{
			width: 125px;
			height: 125px;
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
				width: 100%;
				height: 100%;
			}
			.icon-iconset0481{
				color: #fff;
				font-size: 40PX;
				position: absolute;
				z-index: 2;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				opacity: 0;
				-webkit-transition: opacity .5s;
				-moz-transition: opacity .5s;
			}
			.mask{
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, .5);
				z-index: 1;
				opacity: 0;
				border-radius: 5px;
			}
		}
		.text{
			padding: 8px 5px 0 5px;
			text-align: center;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
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

<template>
	<div class="music-sheet">
		<div class="top">
			<img :src="`${mvDetails.picUrl ? mvDetails.picUrl : (mvDetails.imgurl ? mvDetails.imgurl : mvDetails.cover)}?param=170y95`" />
			<span class="msg">
				<i class="iconfont icon-iconset0269"></i>
				<span>{{mvDetails.playCount | addChineseUnit}}</span>
			</span>
			<i class="iconfont icon-iconset0481"></i>
		</div>
		
		<div class="text ellipsis">{{mvDetails.name}}</div>
	</div>
</template>

<script>
import { addChineseUnit } from '@/utils/song.js';
export default {
	props: {
		mvDetails: {
			type: Object,
			default: () => {}
		}
	},
	
	filters: {
		addChineseUnit
	},
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../../assets/css/common.less');
	.music-sheet{
		display: inline-block;
		cursor: pointer;
		border-radius: 5px;
		.top{
			.wh(170px, 95px);
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
				.fontStyle(20px, #fff);
				.css-position(absolute, auto, 10px, 10px, auto);
				opacity: 0;
				-webkit-transition: opacity .5s;
				-moz-transition: opacity .5s;
			}
			.msg{
				.wh(100%, 30px);
				.css-position(absolute, 0, 0);
				.fontStyle(10px, #fff);
				background-image: linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				text-align: right;
				box-sizing: border-box;
				padding: 5px 10px 0 0;
				.icon-iconset0269{
					font-size: 10px;
					margin-right: 5px;
				}
			}
		}
		.text{
			width: 170px;
			padding: 8px 0;
			text-align: center;
		}
	}
	.music-sheet:hover{
		.top{
			transform: scale(1.05);
			opacity: 1;
			.icon-iconset0481{
				opacity: 1;
			}
		}
	}
</style>

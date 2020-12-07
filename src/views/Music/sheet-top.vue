<template>
	<div class="sheet-top" v-if="sheetDetails">
		<img :src="`${sheetDetails.coverImgUrl}?param=180y180`" />
		<div class="right">
			<div class="line-one marbott flex-center">
				<span class="title ellipsis">{{sheetDetails.name}}</span>
				<span class="playNum colorDan">播放量：{{ sheetDetails.playCount | addChineseUnit }}</span>
			</div>
			
			<div class="line-two marbott">
				<img :src="`${sheetDetails.creator.avatarUrl}?param=30y30`" />
				<span>{{sheetDetails.creator.nickname}}</span>
				<span class="colorDan">{{sheetDetails.updateTime | changeTime}}</span>
			</div>
			
			<div class="line-three marbott colorDan ellipsis">
				分类：{{tagsText}}
			</div>
			
			<div class="line-three colorDan ellipsis">
				简介：{{sheetDetails.description}}
			</div>
			
			<div class="line-btn">
				<el-button round icon="el-icon-caret-right" size="small">播放全部（{{sheetDetails.trackCount | addChineseUnit}}）</el-button>
				<el-button round icon="el-icon-star-on" size="small">收藏（{{sheetDetails.subscribedCount | addChineseUnit}}）</el-button>
				<el-button round icon="el-icon-share" size="small">分享（{{sheetDetails.shareCount | addChineseUnit}}）</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { addChineseUnit } from '@/utils/song.js';
export default {
	props: {
		sheetDetails: {
			type: [Object, String],
			default: ''
		}
	},
	
	computed: {
	  tagsText() {
	    return this.sheetDetails.tags.join("/")
	  },
	},
	
	filters: {
		changeTime(val) {
			return moment(val).format("YYYY-MM-DD")
		},
		addChineseUnit
	}
}
</script>

<style scoped="scoped" lang="less">
	.sheet-top{
		display: flex;
		padding: 10px 20px;
		img{
			width: 180px;
			height: 180px;
			border-radius: 5px;
			margin-right: 10px;
		}
		
		.right{
			flex: 1;
			overflow: hidden;
			.marbott{
				margin-bottom: 10px;
			}
			.colorDan{
				color: #969696;
			}
			.line-one{
				.title{
					font-size: 20px;
					font-weight: bold;
					flex: 1;
				}
			}
			.line-two{
				display: flex;
				align-items: center;
				img{
					width: 30px;
					height: 30px;
					border-radius: 50%;
				}
				span{
					margin-right: 10px;
				}
			}
			.line-btn{
				margin-top: 20px;
			}
		}
	}
</style>

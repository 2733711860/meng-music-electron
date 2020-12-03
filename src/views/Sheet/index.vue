<template>
	<div class="sheet-page">
		<div class="more-tag">
			<span @click="showType = !showType">全部歌单</span>
			<i class="el-icon-arrow-down" @click="showType = !showType"></i>
			<more-type 
				v-model="showType"
				@choose="choose"></more-type>
		</div>
		
		<div class="hot-tags">
			<span>热门标签：</span>
			<span class="item-tag"><span>华语</span><i></i></span>
			<span class="item-tag"><span>流行</span><i></i></span>
			<span class="item-tag"><span>摇滚</span><i></i></span>
			<span class="item-tag"><span>民谣</span><i></i></span>
			<span class="item-tag"><span>电子</span><i></i></span>
			<span class="item-tag"><span>另类/独行</span><i></i></span>
			<span class="item-tag"><span>轻音乐</span><i></i></span>
			<span class="item-tag"><span>综艺</span><i></i></span>
		</div>
		
		<div class="sheet-list">
			<music-sheet class="itemSheet" v-for="i in 30"></music-sheet>
		</div>
	</div>
</template>

<script>
import musicSheet from '../descover/components/music-sheet.vue';
import moreType from './more-type.vue';
export default {
	components: {
		musicSheet, moreType
	},
	
	data() {
		return {
			showType: false
		}
	},
	
	methods: {
		choose(val) {
			console.log(val)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.sheet-page{
		padding: 0 20Px;
		box-sizing: border-box;
		.more-tag{
			display: inline-block;
			padding: 5px 10px;
			border-radius: 5px;
			border: 1px solid #dedede;
			position: relative;
			cursor: pointer;
			.el-icon-arrow-down{
				margin-left: 3px;
			}
		}
		
		.hot-tags{
			display: flex;
			padding: 10px 0 20px 0;
			.item-tag{
				color: #909090;
				display: flex;
				align-items: center;
				cursor: pointer;
				span{
					padding: 0 15px;
				}
				i{
					height: 10px;
					width: 1px;
					background-color: #dedede;
				}
			}
			.item-tag:last-child{
				i{
					display: none;
				}
			}
		}
		
		.sheet-list{
			display: flex;
			flex-wrap: wrap;
			.itemSheet{
				margin: 5px 17px 5px 10px;
			}
		}
	}
</style>

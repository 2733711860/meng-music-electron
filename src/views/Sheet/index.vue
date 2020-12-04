<template>
	<div class="sheet-page">
		<div class="more-tag">
			<span @click="showType = !showType">{{cat}}</span>
			<i class="el-icon-arrow-down" @click="showType = !showType"></i>
			<more-type 
				v-model="showType"
				@choose="chooseTag"
				:allTags="sheetTypes"></more-type>
		</div>
		
		<div class="hot-tags">
			<span>热门标签：</span>
			<span class="item-tag" v-for="(item, index) in hotSheetTypes" :key="index + 'hot'">
				<span @click="chooseTag(item.name)">{{item.name}}</span><i></i>
			</span>
		</div>
		
		<div class="sheet-list">
			<music-sheet 
				class="itemSheet" 
				v-for="(item, index) in sheetList" 
				:key="index + 'sheet'" 
				:sheetDetail="item"></music-sheet>
		</div>
		
		<el-pagination
			class="sheet-pagination"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[30, 50, 70, 100]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
import musicSheet from '../descover/components/music-sheet.vue';
import moreType from './more-type.vue';
import { getHotSheetType, getSheetType, getTopSheet } from '@/api/index.js';
export default {
	components: {
		musicSheet, moreType
	},
	
	data() {
		return {
			showType: false,
			sheetTypes: [], // 歌单分类
			hotSheetTypes: [], // 热门歌单分类
			sheetList: [], // 歌单列表
			currentPage: 1,
			cat: '全部',
			total: 0, // 总共多少条数据
			pageSize: 30, // 每页30条数据
		}
	},
	
	created() {
		this.getTypes();
		this.getHotTypes();
		this.getSheets();
	},
	
	methods: {
		getTypes() { // 获取歌单分类
			getSheetType().then(res => {
				if (res.code == 200) {
					this.sheetTypes = res.sub;
				}
			})
		},
		
		getHotTypes() { // 获取热门歌单分类
			getHotSheetType().then(res => {
				if (res.code == 200) {
					this.hotSheetTypes = res.tags;
				}
			})
		},
		
		getSheets() { // 获取歌单
			this.sheetList = [];
			getTopSheet({
				order: 'hot', // new最新，hot最热
				cat: this.cat,
				limit: this.pageSize,
				offset: (this.currentPage - 1) * this.pageSize
			}).then(res => {
				if (res.code == 200) {
					this.sheetList = res.playlists;
					this.total = res.total;
				}
			})
		},
		
		chooseTag(name) { // 选择热门标签
			this.cat = name;
			this.currentPage = 1;
			this.getSheets();
		},
		
		handleSizeChange(val) { // 每页数量发生变化
			this.currentPage = 1;
			this.pageSize = val;
			this.getSheets();
		},
		
		handleCurrentChange(val) { // 页码发生变化
			this.currentPage = val;
			this.getSheets();
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
				margin: 5px 7px 15px 10px;
			}
		}
		
		.sheet-pagination{
			margin: 20px;
		}
	}
</style>

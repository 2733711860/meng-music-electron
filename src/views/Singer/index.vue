<template>
	<div class="singer-page">
		<div class="one-type">
			<div class="left">语种：</div>
			<div class="right">
				<div class="item-type" v-for="(item, index) in languageType" :key="index + '10'">
					<span :class="[languageValue == item.id ? 'choosed' : '']" @click="selectThisS(item)">{{item.name}}</span>
					<i></i>
				</div>
			</div>
		</div>
		
		<div class="one-type">
			<div class="left">分类：</div>
			<div class="right">
				<div class="item-type" v-for="(item, index) in sexType" :key="index + '11'">
					<span :class="[sexValue == item.id ? 'choosed' : '']" @click="selectThisO(item)">{{item.name}}</span>
					<i></i>
				</div>
			</div>
		</div>
		
		<div class="one-type borbot">
			<div class="left">筛选：</div>
			<div class="right">
				<div class="item-type" v-for="(item, index) in initials" :key="index + '12'">
					<span :class="[initialValue == item.id ? 'choosed' : '']" @click="selectThis(item)">{{item.name}}</span>
					<i></i>
				</div>
			</div>
		</div>
		<div class="singer-list">
			<div class="item-singer" v-for="(item, index) in singerList" :key="index + 'art'" @click="goDetail(item)">
				<img :src="`${item.img1v1Url}?param=100y100`" />
				<div class="ellipsis">{{item.name}}</div>
			</div>
		</div>
		
		<div style="text-align: right;padding: 20px;">
			<el-button size="medium" icon="el-icon-arrow-left" @click="prevPage" :disabled="currentPage==1 ? true : false">上一页</el-button>
			<el-button size="medium" @click="nextPage" :disabled="!hasMore">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
		</div>
	</div>
</template>

<script>
import { languageType, sexType, initials } from './data.js';
import { getSingerByType } from '@/api/index.js';
export default {
	data () {
		return {
			initialValue: '-1', // 选择的首字母
			sexValue: '-1', // 选择的分类
			languageValue: '-1', // 选择的语种
			languageType: languageType,
			sexType: sexType,
			initials: initials,
			singerList: [],
			currentPage: 1,
			cat: '全部',
			pageSize: 30, // 每页30条数据
			hasMore: true, // 是否有更多数据
		}
	},
	
	mounted() {
		this.getSinger()
	},
	
	methods: {
		getSinger() {
			this.singerList = [];
			getSingerByType({
				limit: this.pageSize,
				offset: (this.currentPage - 1) * this.pageSize,
				type: this.sexValue,
				area: this.languageValue,
				initial: this.initialValue
			}).then(res => {
				if (res.code == 200) {
					this.singerList = res.artists;
					this.hasMore = res.more;
				}
			})
		},
		
		selectThis(item) {
			this.initialValue = item.id;
			this.currentPage = 1;
			this.getSinger();
		},
		
		selectThisO(item) {
			this.sexValue = item.id;
			this.currentPage = 1;
			this.getSinger();
		},
		
		selectThisS(item) {
			this.languageValue = item.id;
			this.currentPage = 1;
			this.getSinger();
		},
		
		prevPage() {
			this.currentPage--;
			this.getSinger();
		},
		
		nextPage() {
			this.currentPage++;
			this.getSinger();
		},
		
		goDetail(item) {
			this.$router.push({
				path: `/detail/${item.id}`
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.singer-page{
		padding: 0 20px;
		box-sizing: border-box;
		.borbot{
			border-bottom: 1px solid #e7e7e7;
			margin-bottom: 10px;
		}
		.one-type{
			display: flex;
			.right{
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				.item-type{
					margin-bottom: 10px;
					span{
						padding: 2px 5px;
						border-radius: 3px;
						cursor: pointer;
					}
					.choosed{
						background-color: #e5e5e5;
					}
					i{
						width: 1.5px;
						height: 10px;
						background-color: #dedede;
						margin: 0 10px;
						display: inline-block;
					}
				}
				.item-type:last-child{
					i{
						display: none;
					}
				}
			}
		}
		.singer-list{
			display: flex;
			flex-wrap: wrap;
			padding: 10px 0;
			.item-singer{
				margin: 0 18px 20px 8px;
				img{
					width: 100px;
					height: 100px;
					border-radius: 50%;
					-webkit-transition: transform .5s;
					-moz-transition: transform .5s;
					transform: translateZ(0) scale(1, 1);
					cursor: pointer;
				}
				img:hover{
					transform: scale(1.1);
				}
				div{
					width: 100px;
					text-align: center;
					margin-top: 8px;
				}
			}
		}
		.sheet-pagination{
			margin: 20px;
		}
	}
</style>

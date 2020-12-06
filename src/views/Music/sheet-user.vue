<template>
	<div>
		<div class="singer-list">
			<div class="item-singer" v-for="(item, index) in likeUsers" :key="index + 'art'">
				<img :src="`${item.avatarUrl}?param=80y80`" />
				<div>{{item.nickname}}</div>
			</div>
		</div>
		
		<div style="text-align: right;padding: 20px;">
			<el-button size="medium" icon="el-icon-arrow-left" @click="prevPage" :disabled="currentPage==1 ? true : false">上一页</el-button>
			<el-button size="medium" @click="nextPage" :disabled="!hasMore">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
		</div>
	</div>
</template>

<script>
import { getLikeUsers } from '@/api';
export default {
	data() {
		return {
			likeUsers: [], // 收藏者
			currentPage: 1,
			pageSize: 21, // 每页30条数据
			hasMore: true, // 是否有更多数据
		}
	},
	
	computed: {
	  sheetId() { // 歌单id
	    return Number(this.$route.params.id)
	  },
	},
	
	watch: {
	  sheetId: {
	    handler() {
				this.getUsers(); // 获取歌单收藏者
	    },
	    immediate: true
	  },
	},
	
	methods: {
		getUsers() { // 歌单收藏者
			this.likeUsers = [];
			getLikeUsers({
				id: this.sheetId,
				limit: this.pageSize,
				offset: (this.currentPage - 1) * this.pageSize,
			}).then(res => {
				if (res.code == 200) {
					this.likeUsers = res.subscribers;
					this.hasMore = res.more;
				}
			})
		},
		
		prevPage() {
			this.currentPage--;
			this.getUsers();
		},
		
		nextPage() {
			this.currentPage++;
			this.getUsers();
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.singer-list{
		display: flex;
		flex-wrap: wrap;
		padding: 10px 0;
		.item-singer{
			margin: 0 17px 20px 10px;
			img{
				width: 80px;
				height: 80px;
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
				width: 80px;
				text-align: center;
				margin-top: 8px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>

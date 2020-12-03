<template>
	<div class="musicTabs">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="个性推荐" name="descover/index"></el-tab-pane>
			<el-tab-pane label="歌单" name="descover/sheet"></el-tab-pane>
			<el-tab-pane label="排行榜" name="descover/rank"></el-tab-pane>
			<el-tab-pane label="歌手" name="descover/singer"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	computed: {
		activeName: {
			get() {
				return this.$route.name
			},
			set() {}
		}
	},
	methods: {
		handleClick(tab) {
			this.$router.push({
				path: `/${tab.name}`
			})
		}
	}
};
</script>

<style lang="less">/* #5965ED */
	.musicTabs{
		width: 800px;
		padding: 0 20px;
		.el-tabs__nav-scroll{
			display: flex;
			justify-content: center;
		}
		.el-tabs__item.is-active{
			color: #5965ED;
		}
		.el-tabs__active-bar{
			background-color: #5965ED;
		}
	}
</style>

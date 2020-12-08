<template>
	<div class="header">
		<el-input
			class="search"
			placeholder="搜素音乐"
			prefix-icon="el-icon-search"
			v-model="searchKey">
		</el-input>
		
		<div class="right">
			<Icon icon="icon-iconset0343" isHover title="刷新" class="marrig" @click="refresh"></Icon>
			<Icon icon="icon-iconset0419" isHover title="返回" class="marrig" @click="goBack"></Icon>
			<Icon icon="icon-clothes" isHover title="换肤" class="marrig"></Icon>
			<Icon icon="icon-iconset0177" isHover title="设置"></Icon>
		</div>
	</div>
</template>

<script>
import Icon from './music-left/Icon.vue'
export default {
	components: {
		Icon
	},
	
	data () {
		return {
			searchKey: ''
		}
	},
	
	methods: {
		goBack() {
			history.go(-1);
		},
		
		refresh() {
			location.reload();
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.header{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 20px;
		background-color: #fff;
		-webkit-app-region: drag;
		.search{
			width: 300px;
			-webkit-app-region: no-drag;
		}
		.right{
			-webkit-app-region: no-drag;
			.marrig{
				margin-right: 5px;
			}
		}
	}
</style>
<style lang="less">
	.header{
		.search{
			.el-input__inner{
				border-radius: 100px;
				height: 35PX;
				line-height: 35PX;
				font-size: 13PX;
			}
			.el-input__icon{
				line-height: 35PX;
			}
		}
	}
</style>
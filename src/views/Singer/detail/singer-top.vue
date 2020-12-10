<template>
	<div class="singer-top">
		<img :src="`${singerDetails.picUrl}?param=200y200`" />
		<div class="right">
			<div class="name">{{singerDetails.name}}</div>
			<div>单曲数：{{singerDetails.musicSize}}</div>
			<div>专辑数：{{singerDetails.albumSize}}</div>
			<div>视频数：{{singerDetails.mvSize}}</div>
		</div>
		<el-button size="small" icon="el-icon-folder-add" round class="btn">收藏</el-button>
	</div>
</template>

<script>
export default {
	props: {
		singerDetails: {
			type: Object,
			default: () => {}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.singer-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 50px;
		img{
			border-radius: 50%;
			margin-right: 40px;
		}
		.right{
			display: flex;
			flex-direction: column;
			flex: 1;
			.name{
				color: #000;
				font-size: 20px;
				line-height: 50px;
			}
			div{
				line-height: 30px;
			}
		}
	}
</style>

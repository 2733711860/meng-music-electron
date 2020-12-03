<template>
	<div class="rank-page">
		<div class="title">官方榜</div>
		<div class="rank-card-div">
			<rank-card class="oneCard" v-for="i in 5"></rank-card>
		</div>
		
		<div class="title matop">全球榜</div>
		<div class="rank-card-div">
			<rank-card-two class="twoCard" v-for="i in 18"></rank-card-two>
		</div>
	</div>
</template>

<script>
import rankCard from './rank-card.vue';
import rankCardTwo from './rank-card-two.vue';
export default {
	components: {
		rankCard, rankCardTwo
	}
}
</script>

<style scoped="scoped" lang="less">
	.rank-page{
		padding: 0 20px;
		box-sizing: border-box;
		.title{
			font-size: 16px;
			font-weight: bold;
			padding: 10px 0;
			border-bottom: 1px solid #e7e7e7;
		}
		.matop{
			margin-top: 20px;
		}
		.rank-card-div{
			margin-top: 20px;
			display: flex;
			flex-wrap: wrap;
			.oneCard{
				margin: 0 5px 20px 5px;
			}
			.twoCard{
				margin: 0 15px 20px 12px;
			}
		}
	}
</style>

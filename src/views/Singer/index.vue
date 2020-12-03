<template>
	<div class="singer-page">
		<div class="one-type">
			<div class="left">语种：</div>
			<div class="right">
				<div class="item-type" v-for="i in 6">
					<span :class="[languageValue == i ? 'choosed' : '']">华语</span>
					<i></i>
				</div>
			</div>
		</div>
		
		<div class="one-type">
			<div class="left">分类：</div>
			<div class="right">
				<div class="item-type" v-for="i in 4">
					<span :class="[typeValue == i ? 'choosed' : '']">男歌手</span>
					<i></i>
				</div>
			</div>
		</div>
		
		<div class="one-type borbot">
			<div class="left">筛选：</div>
			<div class="right">
				<div class="item-type" v-for="i in initials" :key="i">
					<span :class="[initialValue == i ? 'choosed' : '']" @click="selectThis(i)">{{i}}</span>
					<i></i>
				</div>
			</div>
		</div>
		<div class="singer-list">
			<div class="item-singer" v-for="i in 20">
				<img src="../../assets/image/11.jpg" />
				<div>许嵩</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			languageValue: '全部', // 选择的语种
			typeValue: '全部', // 选择的分类
			initials: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			initialValue: '全部', // 选择的首字母
		}
	},
	
	methods: {
		selectThis(val) {
			this.initialValue = val;
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
				}
				img:hover{
					transform: scale(1.1);
				}
				div{
					text-align: center;
					margin-top: 8px;
				}
			}
		}
	}
</style>

<template>
	<div class="more-type" v-if="show">
		<div class="title">选择标签</div>
		
		<div class="tags">
			<div class="all">全部</div>
			
			<div class="one-type">
				<div class="left">语种</div>
				<div class="right">
					<span v-for="i in 5">华语</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">风格</div>
				<div class="right">
					<span v-for="i in 23">华语</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">场景</div>
				<div class="right">
					<span v-for="i in 12">华语</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">情感</div>
				<div class="right">
					<span v-for="i in 12">华语</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">主题</div>
				<div class="right">
					<span v-for="i in 18">华语</span>
				</div>
			</div>
		</div>
		
		<div class="mask" @click="closeType"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: this.value
		}
	},
	
	props: {
		value: {}
	},
	
	watch: {
		value() {
			this.show = this.value;
		},
		show() {
			this.$emit('input', this.show)
		}
	},
	
	methods: {
		closeType() {
			console.log(1111)
			this.show = false
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.more-type{
		position: absolute;
		width: 500px;
		height: 350px;
		box-shadow: 0 4px 10px 1px #9d9d9d;
		background-color: #FFFFFF;
		z-index: 100;
		top: 40px;
		left: -5px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		.title{
			height: 40px;
			line-height: 40px;
			padding: 0 20px;
			border-bottom: 1px solid #e7e7e7;
		}
		.tags{
			padding: 10px 20px;
			flex: 1;
			overflow-y: auto;
			.all{
				padding: 5px 0;
				text-align: center;
				border: 1px solid #e7e7e7;
			}
			.one-type{
				padding: 10px 0;
				display: flex;
				.left{
					font-weight: bold;
					width: 60px;
					text-align: center;
					padding: 8px 10px;
				}
				.right{
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					span{
						padding: 8px 23px;
						border: 1px solid #e7e7e7;
						// margin: 0 0 10px 0;
					}
				}
			}
		}
		.mask{
			position: absolute;
			width: 100vw;
			height: 100vh;
			z-index: -1;
		}
	}
</style>

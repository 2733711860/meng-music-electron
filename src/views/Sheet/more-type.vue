<template>
	<div class="more-type" v-if="show">
		<div class="title">选择标签</div>
		
		<div class="tags">
			<div class="all" @click="checkThis('全部')">全部</div>
			
			<div class="one-type">
				<div class="left">语种</div>
				<div class="right">
					<span v-for="(item, index) in allTags.filter(aa => aa.category == '0')" :key="index + 'lan'" @click="checkThis(item.name)">{{item.name}}</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">风格</div>
				<div class="right">
					<span v-for="(item, index) in allTags.filter(aa => aa.category == '1')" :key="index + 'fen'" @click="checkThis(item.name)">{{item.name}}</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">场景</div>
				<div class="right">
					<span v-for="(item, index) in allTags.filter(aa => aa.category == '2')" :key="index + 'cha'" @click="checkThis(item.name)">{{item.name}}</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">情感</div>
				<div class="right">
					<span v-for="(item, index) in allTags.filter(aa => aa.category == '3')" :key="index + 'qin'" @click="checkThis(item.name)">{{item.name}}</span>
				</div>
			</div>
			
			<div class="one-type">
				<div class="left">主题</div>
				<div class="right">
					<span v-for="(item, index) in allTags.filter(aa => aa.category == '4')" :key="index + 'zhu'" @click="checkThis(item.name)">{{item.name}}</span>
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
		value: {},
		allTags: {
			type: Array,
			default: () => []
		}
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
		closeType() { // 关闭标签选择框
			this.show = false
		},
		
		checkThis(name) {
			this.$emit('choose', name);
			this.closeType();
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../assets/css/common.less');
	.more-type{
		.css-position(absolute, 40px, auto, auto, -5px);
		.wh(500px, 350px);
		.flexbox(flex-start, stretch, column);
		box-shadow: 0 4px 10px 1px #9d9d9d;
		background-color: #FFFFFF;
		z-index: 100;
		border-radius: 5px;
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
					.flexbox(flex-start, stretch, row, wrap);
					flex: 1;
					span{
						padding: 8px 0;
						width: 73px;
						text-align: center;
						border: 1px solid #e7e7e7;
					}
				}
			}
		}
		.mask{
			.wh(100vw, 100vh);
			position: absolute;
			z-index: -1;
		}
	}
</style>

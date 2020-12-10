<template>
	<div class="btn2" :class="[isActive ? 'active' : '']" @click="ckickThis">
		<span class="btn-inner">
			<i class="iconfont" :class="icon"></i>
			<span>{{text}}</span>
		</span>
		<div class="btnbg-x"></div>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		isActive: {
			type: Boolean,
			default: false
		}
	},
	
	methods: {
		ckickThis() {
			this.$emit('click');
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.btn2 {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		position: relative;
		width: 100%;
		height: 35PX;
		line-height: 35PX;
		cursor: pointer;
	}

	.btn2 .btnbg-x {
		position: absolute;
		left: -1px;
		width: 0;
		top: -1px;
		bottom: -1px;
		transition: all 0.2s;
		-moz-transition: all 0.2s;
		-webkit-transition: all 0.2s;
	}

	.btn2:hover .btnbg-x, .active .btnbg-x {
		width: 100%;
		width: calc(100% + 2px);
		background: rgba(255, 255, 255, .5);
		border-left: 5px solid #5965ED;
		color: #333;
	}

	.btn2 .btn-inner {
		position: relative;
		z-index: 1;
		.iconfont{
			margin: 0 10px 0 20px;
		}
	}
	
	.btn2:hover .btn-inner, .active .btn-inner {
		color: #333;
	}
</style>

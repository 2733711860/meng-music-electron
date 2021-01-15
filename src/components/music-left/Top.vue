<template>
	<div class="left-tops">
		<div class="mac-btn-div">
			<div class="mac-but red" title="关闭" @click="closeWin">
				<i class="iconfont icon-iconset0127"></i>
			</div>
			<div class="mac-but orange" title="最小化" @click="minimizeWin">
				<i class="iconfont icon-zuixiaohua"></i>
			</div>
			<div class="mac-but grren" title="最大化" @click="maximizeWin">
				<i class="iconfont icon-iconset0441"></i>
			</div>
		</div>
		
		<div class="user">
			<i class="iconfont icon-iconset01100"></i>
			<div>未登录</div>
		</div>
	</div>
</template>

<script>
const {ipcRenderer: ipc} = require('electron');
export default {
	methods: {
		closeWin() {
			ipc.send('close');
		},
		
		minimizeWin() {
			ipc.send('min');
		},
		
		maximizeWin() {
			ipc.send('max');
		},
	}
}
</script>

<style scoped="scoped" lang="less">
	.left-tops{
		.mac-btn-div{
			display: flex;
			align-items: center;
			padding: 10px;
			.mac-but{
				width: 14PX;
				height: 14PX;
				border-radius: 50%;
				margin-right: 7PX;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				.iconfont{
					color: #000;
					font-size: 8PX;
					font-weight: bold;
					display: none;
				}
			}
			.red{
				background-color: #ed655a;
			}
			.orange{
				background-color: #e0c04c;
			}
			.grren{
				background-color: #72be47;
			}
		}
		.mac-btn-div:hover{
			.iconfont{
				display: block;
			}
		}
		
		.user{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 10PX 0 20PX 0;
			cursor: pointer;
			.icon-iconset01100{
				font-size: 40PX;
				margin-bottom: 10PX;
				color: #dadada;
			}
		}
	}
</style>

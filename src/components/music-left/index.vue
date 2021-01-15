<template>
	<div class="music-left" id="musicLft">
		<Top></Top>
		
		<div class="left-cont">
			<div class="title">推荐</div>
			<Button text="个性推荐" icon="icon-icon-" :isActive="active == '/descover/index'" @click="changeMenu('/descover/index')"></Button>
			<Button text="歌单" icon="icon-iconset0164" :isActive="active == '/descover/sheet'" @click="changeMenu('/descover/sheet')"></Button>
			<Button text="榜单" icon="icon-iconset0132" :isActive="active == '/descover/rank'" @click="changeMenu('/descover/rank')"></Button>
			<Button text="歌手" icon="icon-iconset0202" :isActive="active == '/descover/singer'" @click="changeMenu('/descover/singer')"></Button>
			
			<Button text="视频" icon="icon-iconset0225" :isActive="active == '2'" @click="changeMenu('2')"></Button>
			
			<div class="title martop">我的音乐</div>
			<Button text="默认列表" icon="icon-iconset0164" :isActive="active == '3'" @click="changeMenu('3')"></Button>
			<Button text="下载管理" icon="icon-wefill" :isActive="active == '4'" @click="changeMenu('4')"></Button>
			<Button text="我的收藏" icon="icon-likefill" :isActive="active == '5'" @click="changeMenu('5')"></Button>
		</div>
	</div>
</template>

<script>
import Button from './Button.vue';
import Top from './Top.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	components: {
		Top, Button
	},
	
	computed: {
		...mapGetters([ 'themeObj' ]),
		
		active: {
			get() {
				return this.$route.path
			},
			set() {}
		}
	},
	
	mounted() {
		let bgUrl = require(`../../assets/image/${this.themeObj.bgCoverIndex}.jpg`);
		document.styleSheets[0].addRule('.music-left::before', `background-image: url(${bgUrl});`)
	},
	
	methods: {
		changeMenu(path) {
			if (this.active != path) {
				this.$router.push({
					path: path
				})
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.music-left{
		position: relative;
		color: #dadada;
		background: hsla(0, 0%, 100%, .1) border-box;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		// border-radius: 8px;
		
		.left-cont{
			flex: 1;
			overflow-y: auto;
			.title{
				height: 30PX;
				line-height: 30PX;
				padding-left: 20PX;
			}
			.martop{
				margin-top: 20PX;
			}
		}
	}
	.music-left::before {
		content:'';
		position:absolute;
		top:0;
		right:0;
		bottom:0;
		left:0;
		margin:-30px;
		z-index:-1;
		-webkit-filter:blur(5px);
		filter:blur(5px);
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>

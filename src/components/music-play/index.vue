<template>
	<div>
		<div class="music-play-div" :class="[showHisAndPlay ? 'showdiv' : '']">
			<div class="top">
				<div :class="[active == '1' ? 'active' : '']" @click="getData('1')">播放列表</div>
				<div :class="[active == '2' ? 'active' : '']" @click="getData('2')">历史记录</div>
			</div>
			<music-list class="list-div" v-if="active == '1'"></music-list>
			<music-history class="list-div" v-if="active == '2'"></music-history>
		</div>
		<div class="mask" @click="closeHis" v-if="showHisAndPlay"></div>
	</div>
</template>

<script>
import musicList from './music-list.vue';
import musicHistory from './music-history.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	components: {
		musicList, musicHistory
	},
	
	data() {
		return {
			active: '1', // 1-播放列表   2-历史记录
		}
	},
	
	computed: {
		...mapGetters(["showHisAndPlay"])
	},
	
	mounted() {
	},
	
	methods: {
		getData(value) {
			this.active = value;
		},
		
		closeHis() {
			this.setShowHisAndPlay();
		},
		
		...mapMutations({
			setShowHisAndPlay: "SET_SHOWHISANDPLAY"
		}),
	}
}
</script>

<style scoped="scoped" lang="less">
	.music-play-div{
		position: absolute;
		width: 0;
		height: 0;
		bottom: 70px;
		right: 0;
		overflow: hidden;
		background-color: #fff;
		z-index: 10;
		box-shadow: 0 6px 18px #9d9d9d;
		display: flex;
		flex-direction: column;
		-webkit-transition: all .5s;
		-moz-transition: all .5s;
		
		.top{
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #e7e7e7;
			padding: 7px 0;
			div{
				height: 28px;
				line-height: 28px;
				width: 100px;
				text-align: center;
				border: 1px solid #e7e7e7;
				border-radius: 5px;
				background-color: #fff;
				cursor: pointer;
			}
			.active{
				background-color: #7f7f7f;
				color: #fff;
			}
		}
		
		.list-div{
			flex: 1;
			overflow-y: auto;
		}
	}
	.showdiv{
		width: 500px;
		height: 580px;
	}
	.mask{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 70px;
		z-index: 9;
	}
</style>

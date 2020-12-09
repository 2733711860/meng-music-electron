<template>
	<div class="music-list">
		<div class="one-line borbott">
			<i class="iconfont icon-like visiHideDiv"></i>
			<span class="title colorDan">歌曲名</span>
			<span class="btn visiHideDiv">
				<i class="iconfont icon-iconset0481"></i>
				<i class="iconfont icon-download"></i>
				<i class="iconfont icon-gengduo"></i>
			</span>
			<span class="singer colorDan">歌手</span>
			<span class="album colorDan">专辑</span>
			<span class="time colorDan">时间</span>
		</div>
		
		<div class="one-line borbott" v-for="(item, index) in songList" :key="index + 'song'" @dblclick="playThis(item, index)">
			<i class="iconfont icon-like"></i>
			<span class="title ellipsis" @click="playThis(item, index)">{{item.name}}</span>
			<span class="btn visiHideDiv">
				<i class="iconfont icon-iconset0481" title="播放" @click="playThis(item, index)"></i>
				<i class="iconfont icon-download" title="下载"></i>
				<i class="iconfont icon-gengduo" title="更多"></i>
			</span>
			<span class="singer ellipsis">{{item.singer}}</span>
			<span class="album ellipsis">{{item.album}}</span>
			<span class="time ellipsis">{{item.duration | format}}</span>
		</div>
	</div>
</template>

<script>
import { format } from '@/utils';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	props: {
		songList: {
			type: Array,
			default: () => []
		}
	},
	
	filters: {
		format
	},
	
	methods: {
		playThis(music, index) { // 播放音乐
			this.selectPlay({
			  list: this.songList,
			  index,
				music
			});
		},
		
		...mapActions([
		  "selectPlay"
		])
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../assets/css/common.less');
	.music-list{
		padding-bottom: 30px;
		.iconfont{
			cursor: pointer;
		}
		.one-line{
			.flexbox(flex-start, center);
			padding: 0 10px;
			height: 40px;
			span{
				padding: 0 10px;
				box-sizing: border-box;
			}
			.title{
				flex: 1;
				cursor: pointer;
			}
			.singer{
				width: 100px;
			}
			.album{
				width: 150px;
			}
			.time{
				width: 60px;
				text-align: center;
			}
			.btn{
				.flexbox(space-between);
				width: 100px;
				display: flex;
				justify-content: space-between;
			}
		}
		.one-line:not(:first-child):hover{
			background-color: #f5f5f5;
			.btn{
				visibility: visible;
			}
		}
	}
</style>

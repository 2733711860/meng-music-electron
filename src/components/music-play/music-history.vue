<template>
	<div class="list-div">
		<div class="header">
			<div class="left">{{`共${historyList.length}首`}}</div>
			<div class="right">
				<div>
					<i class="iconfont icon-iconset0212" title="清空"></i>
					<span>清空</span>
				</div>
			</div>
		</div>
		
		<div class="item-music" v-for="(item, index) in historyList" :key="index + 'play'" @dblclick="playThis(item, index)">
			<i class="iconfont" :class="[currentMusic.id == item.id ? '' : 'visiHideDiv', playing ? 'icon-zanting1' : 'icon-caret-right']"></i>
			<span class="name ellipsis">{{item.name}}</span>
			<span class="singer ellipsis">{{item.singer}}</span>
			<span class="time">{{item.duration | format}}</span>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { format } from '@/utils';
export default {
	filters: {
		format
	},
	
	computed: {
	  ...mapGetters([ 'currentMusic', 'historyList', 'playing' ]),
	},
	
	methods: {
		playThis(music, index) { // 播放音乐
			this.selectPlay({
			  list: this.historyList,
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
	.list-div{
		.header{
			display: flex;
			justify-content: space-between;
			padding: 5px 20px;
			border-bottom: 1px solid #e7e7e7;
			.right{
				display: flex;
				div{
					display: flex;
					align-items: center;
					cursor: pointer;
					.iconfont{
						margin-right: 5px;
					}
				}
				.one{
					margin-right: 10px;
					padding: 0 10px;
					border-right: 1px solid #e7e7e7;
				}
			}
		}
		
		.item-music{
			display: flex;
			align-items: center;
			padding: 5px 8px;
			.iconfont{
				color: #5965ED;
			}
			span{
				padding: 0 5px;
			}
			.name{
				flex: 1;
			}
			.singer{
				width: 100px;
			}
			.time{
				width: 50px;
				text-align: center;
			}
		}
		.item-music:nth-of-type(odd){
			background-color: #f7f7f7;
		}
		.item-music:hover{
			background-color: #e2e2e2;
		}
	}
</style>

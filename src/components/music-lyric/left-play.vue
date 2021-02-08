<template>
	<div class="left-list" :class="[showLeftList ? 'leftshow' : '']">
		<div class="header ellipsis">播放队列</div>
		
		<div class="list">
			<div class="item-music" v-for="(item, index) in musicList" :key="index + 'ply'" @dblclick="playThisTwo(item, index)">
				<div class="left ellipsis">
					<span class="name ellipsis">{{item.name}}</span>
					<music-load class="load" v-if="currentMusic.id == item.id"></music-load>
				</div>
				<div class="right">{{item.duration | format}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import musicLoad from './music-load.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { format } from '@/utils';
import { music } from '@/mixin/music.js';
export default {
	mixins: [music],
	
	components: {
		musicLoad
	},
	
	filters: {
		format
	},
	
	computed: {
	  ...mapGetters([ 'currentMusic', 'playlist', 'historyList', 'showLeftList' ]),
		
		musicList() {
			return this.playlist.length == 0 ? this.historyList : this.playlist
		}
	},
	
	methods: {
		playThisTwo(music, index) { // 播放音乐
			this.selectPlay({
			  list: this.musicList,
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
	.left-list{
		width: 300px;
		background-color: rgba(0, 0, 0, .05);
		display: flex;
		flex-direction: column;
		-webkit-transition: all .5s;
		-moz-transition: all .5s;
		overflow: hidden;
		.header{
			padding: 20px;
			color: #fff;
			font-size: 20px;
		}
		
		.list{
			flex: 1;
			overflow-y: auto;
			color: #aaaaaa;
			.item-music{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 30px;
				padding: 0 20px;
				cursor: pointer;
				.left{
					flex: 1;
					display: flex;
					align-items: center;
					position: relative;
					.load{
						width: 20px;
						height: 10px;
						margin: 0 10px;
					}
				}
			}
			.item-music:hover{
				background-color: rgba(255, 255, 255, .1);
			}
		}
	}
	.leftshow{
		width: 0;
	}
</style>

<template>
	<div class="music-list">
		<div class="title flex-center">
			<span>新歌推荐</span>
			<div class="right flex-center">
				<Icon class="prevBtn" icon="icon-iconset0419" isHover @click="prevFunc"></Icon>
				<div class="list-pagination"></div>
				<Icon class="nextBtn" icon="icon-iconset0420" isHover @click="nextFunc"></Icon>
			</div>
		</div>
		
		<div class="swiper-container" id="musicList" ref="mySwiper">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide" v-for="(item, index) in newMusics" :key="index + '1'">
					<div class="item-music flex-center" v-for="(one, i) in item" :key="i + '2'" @dblclick="playThis(one, newMusics)">
						<div class="item-index ellipsis">{{one.num+1 < 10 ? ('0' + (one.num+ 1)) : one.num+1}}</div>
						<div class="img ellipsis">
							<img :src="`${one.image}?param=40y40`" />
							<i class="iconfont icon-iconset0482"></i>
						</div>
						<div class="music-name ellipsis" @click="playThis(one, newMusics)">{{one.name}}</div>
						<div class="music-singer ellipsis">{{one.singer}}</div>
						<div class="music-album ellipsis">{{one.album}}</div>
						<div class="music-btn ellipsis visiHideDiv">
							<i class="iconfont icon-like"></i>
							<i class="iconfont icon-download"></i>
							<i class="iconfont icon-gengduo"></i>
						</div>
						<div class="music-time ellipsis">{{one.duration | format}}</div>
					</div>
				</div>
		  </div>
		</div>
	</div>
</template>

<script>
import Icon from '@/components/music-left/Icon.vue';
import Swiper from 'swiper';
import { getNewSongs } from '@/api/index.js';
import { createPlayList, format } from '@/utils';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { music } from '@/mixin/music.js';
export default {
	mixins: [ music ],
	
	components: {
		Icon
	},
	
	data () {
		return {
			newMusics: []
		}
	},
	
	filters: {
		format
	},
	
	computed:{
		swiper() {
			return this.$refs.mySwiper.swiper
		}
	},
	
	mounted() {
		this.getNewMusic();
	},
	
	methods: {
		getNewMusic() {
			getNewSongs().then(res => {
				if(res.code == 200) {
					this.newMusics = this.sliceArr(this._formatSongs(res.result));
					new Swiper ('#musicList', {
						pagination: '.list-pagination',
						paginationType : 'fraction',
						navigation: {
						  nextEl: '.nextBtn',
						  prevEl: '.prevBtn',
						},
					})
				}
			})
		},
		
		_formatSongs(list) { // 歌曲数据处理
		  let ret = []
		  list.forEach(item => {
		    const musicData = item
		    if (musicData.id) {
		      ret.push(createPlayList(musicData.song))
		    }
		  })
		  return ret
		},
		
		prevFunc() {
			this.swiper.slidePrev();
		},
		
		nextFunc() {
			this.swiper.slideNext();
		},
		
		sliceArr(arr) { // 拆分数组，每五个一组
		  arr = arr.map((item, index) => {
				item.num = index;
				return item
			});
			var result = [];
			for (var i=0; i<arr.length; i+=5) {
				result.push(arr.slice(i, i+5));
			}
			return result;
		},
		
		...mapActions([
		  "selectPlay"
		])
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../../assets/css/common.less');
	.music-list{
		.title{
			padding: 30PX 10PX 5PX 10PX;
			border-bottom: 1PX solid #ededed;
			.right{
				.list-pagination{
					width: 50px;
					text-align: center;
				}
			}
			span{
				.fontStyle(16px, #333, bold);
			}
		}
		.item-music{
			padding: 10PX 30PX 10PX 20PX;
			border-radius: 5PX;
			.item-index{
				padding-right: 20PX;
			}
			.img{
				.wh(40px, 40px);
				position: relative;
				img{
					.wh(100%, 100%);
					border-radius: 5PX;
				}
				.icon-iconset0482{
					.css-position(absolute, 50%, auto, auto, 50%, translate(-50%, -50%));
					.fontStyle(22px, #fff, 300);
					cursor: pointer;
				}
			}
			.music-singer, .music-name, .music-album{
				flex: 1;
				padding: 0 10PX;
				cursor: pointer;
			}
			.music-btn{
				display: flex;
				padding: 0 10PX;
				.iconfont{
					margin: 0 10PX;
					font-size: 18px;
					cursor: pointer;
				}
			}
		}
		.item-music:hover{
			background-color: #f5f5f5;
			.music-btn{
				visibility: visible;
			}
		}
	}
</style>

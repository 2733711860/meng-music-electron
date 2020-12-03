<template>
	<div class="music-list">
		<div class="title">
			<span>新歌推荐</span>
			<div class="right">
				<Icon class="prevBtn" icon="icon-iconset0419" isHover @click="prevFunc"></Icon>
				<div class="list-pagination"></div>
				<Icon class="nextBtn" icon="icon-iconset0420" isHover @click="nextFunc"></Icon>
			</div>
		</div>
		
		<div class="swiper-container" id="musicList" ref="mySwiper">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide" v-for="m in 3">
					<div class="item-music" v-for="i in 5">
						<div class="item-index">{{i < 10 ? ('0' + i) : i}}</div>
						<div class="img">
							<img src="../../../assets/image/11.jpg" />
							<i class="iconfont icon-iconset0482"></i>
						</div>
						<div class="music-name">半城烟沙</div>
						<div class="music-singer">许嵩</div>
						<div class="music-album">所属专辑</div>
						<div class="music-btn">
							<i class="iconfont icon-like"></i>
							<i class="iconfont icon-download"></i>
							<i class="iconfont icon-gengduo"></i>
						</div>
						<div class="music-time">03:41</div>
					</div>
				</div>
		  </div>
		</div>
	</div>
</template>

<script>
import Icon from '@/components/music-left/Icon.vue';
import Swiper from 'swiper';
export default {
	components: {
		Icon
	},
	
	data () {
		return {
		}
	},
	
	computed:{
		swiper() {
			return this.$refs.mySwiper.swiper
		}
	},
	
	mounted() {
		new Swiper ('#musicList', {
			pagination: '.list-pagination',
			paginationType : 'fraction',
			navigation: {
			  nextEl: '.nextBtn',
			  prevEl: '.prevBtn',
			},
		})
	},
	
	methods: {
		prevFunc() {
			this.swiper.slidePrev();
		},
		
		nextFunc() {
			this.swiper.slideNext();
		},
		
		sliceArr() { // 拆分数组，每五个一组
			let arr = [0, 1, 2, 3, 4, 5, 6];
			var result = [];
			for(var i=0;i<arr.length;i+=5){
				result.push(arr.slice(i,i+5));
			}
			console.log(result)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	.music-list{
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30PX 10PX 5PX 10PX;
			border-bottom: 1PX solid #ededed;
			.right{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.list-pagination{
					width: 50px;
					text-align: center;
				}
			}
			span{
				color: #333;
				font-size: 16PX;
				font-weight: bold;
			}
		}
		.item-music{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10PX 30PX 10PX 20PX;
			border-radius: 5PX;
			div{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.item-index{
				padding-right: 20PX;
			}
			.img{
				width: 40PX;
				height: 40PX;
				position: relative;
				img{
					width: 100%;
					height: 100%;
					border-radius: 5PX;
				}
				.icon-iconset0482{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: #fff;
					font-size: 22PX;
					font-weight: 300;
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
				visibility: hidden;
				.iconfont{
					margin: 0 10PX;
					font-size: 18PX;
					cursor: pointer;
				}
			}
			.music-time{
			}
		}
		.item-music:hover{
			// box-shadow: 0 0px 5px 0px #9d9d9d;
			color: #333;
			font-weight: bold;
			.music-btn{
				visibility: visible;
			}
		}
	}
</style>

<template>
		<div class="swiper-container ry-swiper" id="rySwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in banners" :key="index + 'banner'">
					<a href="javascript:;" class="ry-item">
						<dl>
							<dt>
								<img :src="item.imageUrl" class="ry-cert" /></dt>
						</dl>
					</a>
				</div>
			</div>
		</div>
</template>

<script>
import Swiper from 'swiper';
import { getBanner } from '@/api/index.js';
export default {
	data() {
		return {
			banners: []
		}
	},
	
	mounted() {
		this.getData();
	},
	
	methods: {
		getData() {
			getBanner().then(res => {
				if (res.code == 200) {
					this.banners = res.banners;
					this.$nextTick(() => {
						new Swiper ('#rySwiper', {
							autoplay: 4000,
							loop: true,
							slidesPerView: 'auto',
							centeredSlides: true,
						})
					})
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url('../../../assets/css/common.less');
	a {
		text-decoration: none;
	}

	.ry-swiper {
		cursor: pointer;
		padding: 10PX 0;
	}

	.ry-swiper .swiper-slide {
		.wh(350px, 170px);
		opacity: .7;
		transform: scale(0.7);
		-webkit-transform: scale(0.7);
		-moz-transform: scale(0.7);
		-webkit-transition: transform 1.0s;
		-moz-transition: transform 1.0s;
	}

	.ry-swiper .swiper-slide-active {
		transform: scale(1);
		opacity: 1;
		z-index: 10;
	}

	.ry-item {
		display: block;
		overflow: hidden;
	}

	.ry-swiper .swiper-slide-active .ry-item {
		box-shadow: 0 6PX 18PX rgba(55, 139, 236, 0.29);
	}

	.ry-item dt {
		display: block;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.ry-item,
	.ry-item dl,
	.ry-item dt,
	.ry-item img{
		.wh(100%, 100%);
		border-radius: 5PX;
	}
</style>

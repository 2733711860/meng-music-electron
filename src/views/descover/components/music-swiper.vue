<template>
		<div class="swiper-container ry-swiper" id="rySwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="i in 6">
					<a href="javascript:;" class="ry-item">
						<dl>
							<dt>
								<img src="../../../assets/image/11.jpg" class="ry-cert" /></dt>
						</dl>
					</a>
				</div>
			</div>
		</div>
</template>

<script>
import Swiper from 'swiper';
export default {
	mounted() {
		new Swiper ('#rySwiper', {
			autoplay: 4000,
			loop: true,
			slidesPerView: 'auto',
			centeredSlides: true,
		})
	}
}
</script>

<style scoped="scoped" lang="less">
	a {
		text-decoration: none;
	}

	.ry-swiper {
		cursor: pointer;
		padding: 10PX 0;
	}

	.ry-swiper .swiper-slide {
		width: 350px;
		height: 170px;
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
		height: 100%;
		width: 100%;
		border-radius: 5PX;
	}
</style>

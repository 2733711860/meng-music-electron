<template>
	<div class="index-page">
		<music-tabs></music-tabs>
		<router-view class="index-content"></router-view>
	</div>
</template>

<script>
import musicTabs from '@/components/music-tabs.vue';
export default {
	components: {
		musicTabs
	}
}
</script>

<style scoped="scoped" lang="less">
	.index-page{
		display: flex;
		flex-direction: column;
		align-items: center;
		.index-content{
			width: 800px;
		}
	}
</style>

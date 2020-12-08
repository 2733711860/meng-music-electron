<template>
	<div class="music-play-div">
		<div class=""></div>
	</div>
</template>

<script>
import playingList from './playing-list.vue';
import historyList from './history.vue';
export default {
	components: {
		playingList, historyList
	}
}
</script>

<style scoped="scoped" lang="less">
	.music-play-div{
		position: relative;
	}
</style>

<template>
	<div class="lyric-page">
		<lyric-component></lyric-component>
	</div>
</template>

<script>
import lyricComponent from './lyric-component.vue';
export default {
	components: {
		lyricComponent
	},
	
	data() {
		return {
		}
	},
	
	mounted() {
	},
	
	methods: {
	}
}
</script>

<style scoped="scoped" lang="less">
	.lyric-page{
		position: absolute;
		z-index: 2000;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
</style>

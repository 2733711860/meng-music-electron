<template>
	<div class="rank-card">
		<img src="../../assets/image/11.jpg" />
		<i class="iconfont icon-iconset0481" title="播放全部"></i>
		<div class="music-list">
			<div class="one-music" v-for="i in 7">
				<span>{{`0${i}`}}</span>
				<span class="musicName" title="过气偶像">过气偶像</span>
				<span class="singer" title="隔壁老樊">隔壁老樊</span>
			</div>
			<div class="card-btn">查看全部></div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.rank-card{
		width: 240px;
		border: 1px solid #e7e7e7;
		position: relative;
		.icon-iconset0481{
			position: absolute;
			right: 10px;
			top: 70px;
			color: #ececec;
			font-size: 20px;
			cursor: pointer;
		}
		img{
			width: 100%;
			height: 100px;
		}
		.music-list{
			.one-music{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 10px;
				height: 35px;
				cursor: pointer;
				.singer{
					width: 60px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: right;
				}
				.musicName{
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 10px;
				}
			}
			.one-music:nth-of-type(even), .card-btn{
				background: #f4f4f4;
			}
			.one-music:hover{
				background-color: #e7e7e7;
			}
			.card-btn{
				height: 40px;
				line-height: 40px;
				text-align: right;
				padding: 0 10px;
				cursor: pointer;
			}
		}
	}
</style>

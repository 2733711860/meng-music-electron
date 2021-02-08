<template>
	<div class="header">
		<el-input placeholder="大天蓬" v-model="searchKey" class="search" 
			prefix-icon="el-icon-search" 
			clearable
			@keyup.enter.native="focus"
		>
			<el-select v-model="selectValue" slot="prepend" placeholder="请选择">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-input>
		
		<div class="right">
			<Icon icon="icon-iconset0343" isHover title="刷新" class="marrig" @click="refresh"></Icon>
			<Icon icon="icon-iconset0419" isHover title="返回" class="marrig" @click="goBack"></Icon>
			<Icon icon="icon-clothes" isHover title="换肤" class="marrig"></Icon>
			<Icon icon="icon-iconset0177" isHover title="设置"></Icon>
		</div>
	</div>
</template>

<script>
import Icon from './music-left/Icon.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	components: {
		Icon
	},
	
	computed: {
	  ...mapGetters([ 'searchObj' ]),
	},
	
	data () {
		return {
			searchKey: '',
			selectValue: '1',
			options: [
				{value: '1', label: '网易云音乐'}, {value: '2', label: 'QQ音乐'}
			]
		}
	},
	
	methods: {
		goBack() { // 返回上一页
			if (this.searchObj.showSearch) { // 如果搜索框有显示
				let searchObjCopy = JSON.parse(JSON.stringify(this.searchObj));
				searchObjCopy.showSearch = false;
				this.setSearchObj(searchObjCopy);
			} else {
				history.go(-1);
			}
		},
		
		refresh() { // 刷新
			location.reload();
		},
		
		focus() { // 搜索框enter键
			let searchObjCopy = JSON.parse(JSON.stringify(this.searchObj));
			searchObjCopy.showSearch = true;
			searchObjCopy.searchKey = this.searchKey ? this.searchKey : '大天蓬';
			searchObjCopy.isPreveEnter++;
			searchObjCopy.searchOrigin = this.selectValue;
			this.setSearchObj(searchObjCopy);
		},
		
		...mapMutations({
			setSearchObj: "SET_SEARCHOBJ"
		})
	}
}
</script>

<style scoped="scoped" lang="less">
	.header{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 20px;
		background-color: #fff;
		-webkit-app-region: drag;
		.search{
			width: 400px;
			-webkit-app-region: no-drag;
		}
		.right{
			-webkit-app-region: no-drag;
			.marrig{
				margin-right: 5px;
			}
		}
	}
</style>
<style lang="less">
	.header{
		.search{
			.el-input__inner{
				height: 35PX;
				line-height: 35PX;
				font-size: 13PX;
			}
			.el-input__icon{
				line-height: 35PX;
			}
		}
		.input-with-select .el-input-group__prepend {
			background-color: #fff;
		}
		.el-select .el-input {
			width: 125px;
		}
	}
</style>
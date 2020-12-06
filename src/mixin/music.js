import { mapGetters, mapMutations, mapActions } from 'vuex';
export const music = {
	data() {
		return{
			
		}
	},
	
	computed: {
	  ...mapGetters([ 'audioEle', 'currentMusic', 'playlist' ]),
	},
	
	created() {
		// 设置audio元素
		this.$nextTick(() => {
			this.setAudioele(this.$refs.ddPlayer) // 设置audio元素
		})
	},
	
	methods: {
		playThis(music, newMusics) { // 播放音乐
			let list = [].concat(...newMusics);
			let index = list.findIndex(item => item.id == music.id);
			this.selectPlay({
			  list,
			  index
			});
		},
		
		
		...mapMutations({
		  setAudioele: 'SET_AUDIOELE',
			setPlaying: "SET_PLAYING",
			setCurrentIndex: "SET_CURRENTINDEX"
		}),
		
		...mapActions([
		  "selectPlay"
		])
	}
}
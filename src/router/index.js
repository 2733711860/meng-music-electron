import Vue from 'vue'
import Router from 'vue-router'
import music from './music'
import store from '../store'
Vue.use(Router)
const router = new Router({
  routes: [
		...music,
  ]
})

router.beforeEach((to, from, next) => {
	let { title } = to.meta;
	document.title = title;
	if (store.state.searchObj.showSearch) {
		let searchObjCopy = JSON.parse(JSON.stringify(store.state.searchObj));
		searchObjCopy.showSearch = false;
		store.commit('SET_SEARCHOBJ', searchObjCopy)
	}
	next();
});

export default router;


export default [
	{
	  path: '/',
	  redirect: '/descover'
	},
  {
		path: '/descover',
		component: resolve => {
			require(['@/views/index.vue'], resolve)
		},
		redirect: '/descover/index',
		children: [
			{
				path: '/descover/index',
				name: 'descover/index',
				component: resolve => {
					require(['@/views/descover/index.vue'], resolve)
				},
				meta: {
					title: '发现'
				}
			}, {
				path: '/descover/sheet',
				name: 'descover/sheet',
				component: resolve => {
					require(['@/views/Sheet/index.vue'], resolve)
				},
				meta: {
					title: '歌单'
				}
			}, {
				path: '/descover/rank',
				name: 'descover/rank',
				component: resolve => {
					require(['@/views/Rank/index.vue'], resolve)
				},
				meta: {
					title: '排行榜'
				}
			}, {
				path: '/descover/singer',
				name: 'descover/singer',
				component: resolve => {
					require(['@/views/Singer/index.vue'], resolve)
				},
				meta: {
					title: '歌手'
				}
			}, {
				path: '/descover/new',
				name: 'descover/new',
				component: resolve => {
					require(['@/views/New/index.vue'], resolve)
				},
				meta: {
					title: '最新音乐'
				}
			}
		]
  }
]

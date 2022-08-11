import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: { //存放状态
		classId: -1
	},
	//同步
	mutations: {
		setClassId(state, val) {
			// 变更状态
			state.classId = val
		}
	}
})

export default store

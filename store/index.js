import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		openId: '',
		token: '',
		appId: 'wxe0fba0e001eeeccf'
	},
	mutations: {
		setToken(state, openId, token) {
			state.openId = openId;
			state.token = token;
		},
		login(state, userName) {
			state.userName = userName;
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store

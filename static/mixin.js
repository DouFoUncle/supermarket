import {
	login,
	insertUserInfo
} from "../api/user.js"

export const checkLogin = {
	methods: {
		checkLogin() {
			let that = this
			uni.showToast({
				icon: 'loading',
				title: "正在请求登陆",
				duration: 1000 * 60
			})
			return new Promise((resolve, reject) => {
				uni.getStorage({
					key: 'openid',
					success: function(res) {
						uni.checkSession({
							success: function(res) {
								uni.hideToast()
								resolve()
							},
							fail: function(res) {
								uni.removeStorageSync('userInfo');
								uni.removeStorageSync('openid');
								uni.removeStorageSync('avatarUrl');
								uni.removeStorageSync('name');
								that.userlogin().then(() => {
									resolve()
								})
							}
						})
					},
					fail: function(res) {
						that.userlogin().then(() => {
							resolve()
						})
					}
				})
			})
		},
		userlogin() {
			return new Promise((resolve, reject) => {
				uni.getUserProfile({
					desc: '登陆后使用',
					success: async (obj) => {
						uni.hideToast()
						uni.showToast({
							icon: 'loading',
							title: "正在登陆",
							duration: 1000 * 60
						})
						uni.login({
							provider: 'weixin',
							success: (res) => {
								if (res.errMsg == 'login:ok') {
									login({
										code: res.code
									}).then(loginRes => {
										insertUserInfo({
											name: obj.userInfo
												.nickName,
											openId: loginRes.data
												.openid,
											headImg: obj.userInfo
												.avatarUrl
										}).then(res => {
											uni.setStorage({
												key: 'userId',
												data: res
													.data
													.id
											})
											uni.setStorage({
												key: 'openid',
												data: res
													.data
													.openId
											})
											uni.hideToast()
											resolve()
										})
									}).catch(err => {
										uni.removeStorageSync('userInfo');
										uni.removeStorageSync('openid');
										uni.removeStorageSync('avatarUrl');
										uni.removeStorageSync('name');
										uni.hideToast()
										reject(err)
									})
								}
							},
							fail: (err) => {
								uni.hideToast()
								reject(err)
							}
						});
					},
					fail: (err) => {
						uni.hideToast()
						uni.showToast({
							title: '授权已取消',
							icon: 'error',
							mask: true,
						});
					},

				});

			})
		}
	}
}

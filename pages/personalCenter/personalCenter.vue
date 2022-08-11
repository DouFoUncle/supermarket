<template>
	<view class="page-person">
		<u-navbar title="个人中心" bgColor="#fc4f36" titleStyle="color:#fff" placeholder>
			<text slot="left"></text>
		</u-navbar>
		<view class="user-info">
			<view class="bc"></view>
			<view class="info" @click="login">
				<image :src="userInfo.avatarUrl" mode=""></image>
				<text>{{userInfo.name}}</text>
			</view>
			<u-skeleton rows="2" :loading="loading" :title="false">
				<view class="tabBar">
					<u-grid :border="false">
						<u-grid-item @click="click(item.title)" v-for="(item,index) in navList" :key="index">
							<image class="ico" :src="item.src" mode=""></image>
							<text class="grid-text">{{item.title}}</text>
						</u-grid-item>
					</u-grid>
					<u-toast ref="uToast" />
				</view>
			</u-skeleton>
			<button type="default" class="logout" @click="logout" v-if="showLogout">
				<u-icon name="person-delete-fill" color="#fff" size="50"></u-icon>
			</button>
		</view>
		<tabbar :index="index" :isBuyers="isBuyers"></tabbar>
	</view>
</template>

<script>
	import {getUserDetailInfoById} from "@/api/user.js"
	import tabbar from "../../components/tabbar/tabbar.vue"
	import {
		checkLogin
	} from '../../static/mixin.js'
	import photo from '../../static/images/photo.png'
	import dingdanliebiao from '../../static/images/dingdanliebiao.png'
	import gerenzhongxindizhiguanli from '../../static/images/gerenzhongxindizhiguanli.png'
	import waimai from '../../static/images/waimai.png'
	import sahngcheng from '../../static/images/shangcheng.png'
	import jiedanjilumian2 from '../../static/images/jiedanjilumian2.png'
	export default {
		data() {
			return {
				index: 3,
				isBuyers: true,
				loading: true,
				showLogout:false,
				userInfo: {
					avatarUrl: photo,
					name: '点击授权登陆'
				},
				navList: [{
						src: dingdanliebiao,
						title: '查看订单'
					},
					{
						src: gerenzhongxindizhiguanli,
						title: '地址管理'
					},
					{
						src: waimai,
						title: '申请骑手'
					}
				],
				buyersNavist: [{
						src: dingdanliebiao,
						title: '查看订单'
					},
					{
						src: gerenzhongxindizhiguanli,
						title: '地址管理'
					},
					{
						src: waimai,
						title: '申请骑手'
					}
				],
				riderNavList: [{
						src: dingdanliebiao,
						title: '查看订单'
					},
					{
						src: gerenzhongxindizhiguanli,
						title: '地址管理'
					},
					{
						src: jiedanjilumian2,
						title: '接单'
					}
				],
				riderAdminNavList: [{
						src: dingdanliebiao,
						title: '管理订单'
					},
					{
						src: sahngcheng,
						title: '返回商城'
					}
				]
			};
		},
		components: {
			tabbar
		},
		mixins: [checkLogin],
		onShow() {
			uni.getStorage({
				key: 'openid',
				success: () => {
					this.getUserInfo()
				},
				fail: (err) => {

				}
			})
		},
		methods: {
			logout() {
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('openid');
				uni.removeStorageSync('userId');
				uni.removeStorageSync('avatarUrl');
				uni.removeStorageSync('name');
				this.userInfo= {
					avatarUrl: photo,
					name: '点击授权登陆'
				}
				this.loading=true
				this.showLogout = false
				uni.showToast({
					icon:"none",
					title:"退出登陆",
					duration:2000
				})
			},
			click(name) {
				switch (name) {
					case "接单":
						this.navList = this.riderAdminNavList
						this.isBuyers = false
						this.index = 1
						break
					case "返回商城":
						this.navList = this.riderNavList
						this.isBuyers = true
						this.index = 3
						break
					case "地址管理":
						uni.navigateTo({
							url: '/pages/addlist/addlist'
						})
						break
					case "管理订单":
						uni.navigateTo({
							url: '/pages/ordering/ordering?title=管理订单&isBuy=false'
						})
						break
					case "查看订单":
						uni.navigateTo({
							url: '/pages/ordering/ordering?title=查看订单&isBuy=true'
						})
						break
					case "申请骑手":
						uni.navigateTo({
							url: '/pages/applyForRider/applyForRider'
						})
						break
					default:
						uni.showToast({
							icon: "none",
							title: "没有这个选项",
							duration: 2000
						})
						break
				}
			},
			getUserInfo(){
				uni.getStorage({
					key:"userId",
					success: (res) => {
						if(res.errMsg=="getStorage:ok"){
							getUserDetailInfoById({id:res.data}).then(res=>{
								
								this.userInfo.avatarUrl = res.data.headImg
								this.userInfo.name = res.data.name
								
								// 骑手
								if (res.data.userType == "1") {
									if (this.isBuyers) {
										this.navList = this.riderNavList
									} else {
										this.navList = this.riderAdminNavList
									}
								} else {
									this.navList = this.buyersNavist
								}
								//显示菜单
								this.loading = false
								// 显示退出登陆
								this.showLogout = true
								
								uni.setStorage({
									key: "userInfo",
									data: JSON
										.stringify(
											res.data
											)
								})
								uni.setStorage({
									key: 'userType',
									data: res
										.data
										.userType
								})
								uni.setStorage({
									key: 'avatarUrl',
									data: res
										.data
										.headImg
								})
								uni.setStorage({
									key: 'name',
									data: res
										.data
										.name
								})
							})
						}
					}
				})
			},
			login() {
				this.checkLogin().then(res => {
					this.getUserInfo()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-person {
		height: 100vh;
		background-color: #f5f5f5;
	}
	.user-info {
		position: relative;
		height: 440rpx;

		.bc {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 400%;
			z-index: 1;
			background-color: #fc4f36;
			border-bottom-left-radius: 50vw 50rpx;
			border-bottom-right-radius: 50vw 50rpx;
		}

		.info {
			display: flex;
			position: absolute;
			left: 0;
			right: 0;
			width: 200rpx;
			margin: 60rpx auto 0;
			flex-direction: column;
			align-items: center;
			z-index: 2;

			image {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				background-color: #eee;
				border: 2px solid #F0AD4E;
			}

			text {
				color: #fff;
				margin-top: 30rpx;
			}
		}

		.logout {
			position: absolute;
			z-index: 2;
			right: 20rpx;
			top: 50rpx;
			background-color: transparent;

			&::after {
				border: none;
			}
		}

	}

	.ico {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 20rpx;
	}

	.tabBar {
		position: absolute;
		z-index: 2;
		left: 0;
		right: 0;
		top: 330rpx;
		margin: 0 20rpx;
		padding: 20rpx 0;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx #ccc;
		background-color: #fff;
	}


	::v-deep .u-grid-item:nth-child(n + 4) {
		margin-top: 40rpx;
	}
</style>

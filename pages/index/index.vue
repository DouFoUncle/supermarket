<template>
	<view class="page-index">
		<u-navbar title="外卖" bgColor="#fc4f36" titleStyle="color:#fff" placeholder>
			<text slot="left"></text>
		</u-navbar>
		<view class="search-box">
			<u--input placeholder="请输入你想搜索的美食" v-model="goodsName" border="none" clearable shape="circle"
				@clear="clearSearch" suffixIcon="search" prefixIconStyle="font-size: 22rpx;color: #666"
				@confirm="getShaoppingLists(goodsName)" suffixIconStyle="font-size:30rpx"></u--input>
		</view>
		<view class="classfy">
			<view class="classfy-bc"></view>
			<view class="classfy-content">
				<u-swiper :list="bannerList" radius="10rpx" indicator indicatorMode="line" height="302rpx" circular>
				</u-swiper>
				<view class="classfy-menu">
					<view class="classfy-menu-item" v-for="(item,index) in classList" :key="item.id" @click="switchTab(item.id)">
						<view class="classfy-menu-item-ico" :class="`bc-`+(index+1)">
							<image src="../../static/images/kuaizifanwan.png" mode=""></image>
						</view>
						<text>{{item.typeName}}</text>
					</view>
					<view class="classfy-menu-item" @click="switchTab(-1)">
						<view class="classfy-menu-item-ico bc-1">
							<image src="../../static/images/gengduo.png" mode=""></image>
						</view>
						<text>更多</text>
					</view>
				</view>
			</view>
		</view>


		<view class="hot">
			<view class="header">
				<text class="title">热卖食品</text>
			</view>
			<shaopping-list :list="shaoppingList"></shaopping-list>
		</view>

		<u-loadmore fontSize="36" marginTop="30" :status="status" />
		<tabbar></tabbar>
	</view>
</template>

<script>
	import shaoppingList from '../../components/shaoppingList/shaoppingList.vue'
	import tabbar from "../../components/tabbar/tabbar.vue"
	import {
		getshaoppingList,
		getListInfo
	} from '../../api/shaopping.js'
	
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				count: 0,
				goodsName: '',
				shaoppingList: [],
				classList:[],
				status: 'loadmore',
				bannerList: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				list: [{
					thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/2.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/3.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/4.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/5.jpg"
				}]
			}
		},
		components: {
			shaoppingList,
			tabbar
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			let allTotal = this.page * this.limit
			//this.page为加载次数，this.pageSize为每一次加载的数据条数
			if (allTotal < this.count) {
				//this.count为请求数据的总条数。只要现有条数小于总条数就就执行一下代码
				this.status = 'loading';
				this.page++;
				//加载次数递加
				this.getShaoppingLists(); //请求更多数据列表
			} else {
				this.status = "nomore";
			}
		},
		async onLoad() {
			this.getShaoppingLists()
			this.getNavList()
		},
		methods: {
			clearSearch() {
				this.shaoppingList = []
				this.page = 1
				this.limit = 10
				this.getShaoppingLists()
			},
			getNavList() {
				getListInfo().then(res => {
					if (res.data.length > 0) {
						this.classList = res.data.slice(0,3)
					}
				})
			},
			getShaoppingLists(name) {
				let fromDate = {
					page: this.page,
					limit: this.limit
				}
				if (name || '' != '') {
					this.shaoppingList = []
					this.page = 1
					this.limit = 10
					fromDate.page = 1
					fromDate.limit = 10
					fromDate.goodsName = name
				}
				getshaoppingList(fromDate).then(res => {
					this.status = 'loadmore';
					this.count = res.count

					this.shaoppingList.push(...res.data)
					if (this.shaoppingList.length == res.count){
						this.status = "nomore";
					}
				})
			},
			switchTab(id) {
				this.$store.commit("setClassId",id)
				
				uni.switchTab({
					url: '/pages/classify/classify'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-index {
		background-color: #f5f5f5;
		padding-bottom: 20px;
	}

	.search-box {
		position: relative;
		z-index: 1;
		padding: 20rpx 20rpx 0;

		&::v-deep .u-input {
			background-color: #fff;
			height: 62rpx;
			padding: 0 30rpx !important;
		}
	}

	.classfy {
		position: relative;
		padding-top: 32rpx;

		.classfy-bc {
			position: absolute;
			bottom: 320rpx;
			left: 0;
			width: 100%;
			height: 400%;
			z-index: 0;
			background-color: #fc4f36;
			border-bottom-left-radius: 50vw 30rpx;
			border-bottom-right-radius: 50vw 30rpx;
		}

		.classfy-content {
			margin: 0 20rpx;
			background-color: #fff;
			border-bottom-left-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			box-shadow: 0 4rpx 10rpx #eee;
		}


		.classfy-menu {
			display: flex;
			justify-content: space-around;
			height: 143rpx;
			padding-top: 22px;

			.classfy-menu-item {
				text-align: center;

				text {
					font-size: 24rpx;
				}
			}

			.classfy-menu-item-ico {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-bottom: 10rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.bc-1 {
				background: linear-gradient(315deg, #fd7a20, #fcc66e);
			}

			.bc-2 {
				background: linear-gradient(315deg, #504cd9, #889efb);
			}

			.bc-3 {
				background: linear-gradient(315deg, #f1395d, #fb7d81);
			}
		}
	}

	.header {
		padding: 20rpx;

		.title {
			font-weight: bold;
			font-size: 34rpx;
		}
	}
</style>

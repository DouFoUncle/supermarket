<template>
	<view class="page-shaopping">
		<u-navbar title="购物车" bgColor="#fc4f36" titleStyle="color:#fff" placeholder>
			<text slot="left"></text>
		</u-navbar>
		<view class="content" :style="{top:`${navHeight}px`,height: `calc(100vh - 324rpx - ${navHeight}px)`}">
			<text v-if="!isEmpty">共{{cartCount}}件商品</text>
			<u-empty v-if="isEmpty" width="320rpx" textSize="30" mode="car"
				icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
			<view v-else class="card">
				<u-swipe-action>
					<u-swipe-action-item v-for="(item,index) in shaoppingList" :key="item.cartId" :name="item.cartId"
						@click="removeItem" :options="options">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<image :src="item.fileUrl" mode=""></image>
								<view class="info">
									<view class="name">
										{{item.goodsName}}
									</view>
									<view class="detail">
										<text>库存</text>
										<text>{{item.stock}}</text>
									</view>
									<view class="detail">
										<text>商品规格</text>
										<text>{{item.norms}}</text>
									</view>

									<view class="pic">
										<text>&yen; {{item.price}}</text>
										<u-number-box :name="index" button-size="50" inputWidth="60"
											:disabledInput="true" :value="item.num" @change="valChange"></u-number-box>
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>

			<view v-if="!isEmpty" class="bottom">
				<view>合计：<text>&yen;{{totalPic}}</text></view>
				<button @click="submit">结算</button>
			</view>
		</view>
		<tabbar :index="2"></tabbar>
	</view>
</template>

<script>
	import {
		getCartListByUserId,
		cartSaveOrUpdate,
		deleteCartById
	} from '../../api/shaopping.js'
	import tabbar from "../../components/tabbar/tabbar.vue"
	export default {
		data() {
			return {
				shaoppingList: [],
				totalPic: 0,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				cartCount: 0,
				navHeight: 0,
				isEmpty: true
			};
		},
		components: {
			tabbar
		},
		onShow() {
			this.init()
		},
		methods: {
			init() {
				this.getCartList()
				const res = uni.getSystemInfoSync()
				const system = res.platform
				const statusBarHeight = res.statusBarHeight
				if (system === 'android') {
					this.navHeight = (48 + statusBarHeight)
				} else {
					this.navHeight = (44 + statusBarHeight)
				}
			},
			getCartList() {
				let userId = uni.getStorageSync('userId')
				if (userId || '' != '') {
					getCartListByUserId({
						userId
					}).then(res => {
						this.shaoppingList = res.data.cartDetailList
						this.cartCount = res.data.cartCount
						if (this.cartCount > 0) {
							this.isEmpty = false
						}else{
							this.isEmpty = true
						}
						this.calculate()
					})
				} else {
					this.isEmpty = true
				}
			},
			calculate() {
				let num = 0
				this.shaoppingList.forEach(item => {
					num += item.count * item.price
					num = Math.floor(num * 100) / 100
				})
				this.totalPic = num
			},
			valChange(obj) {
				let oldCount = this.shaoppingList[obj.name].count
				let id = this.shaoppingList[obj.name].goodsId
				let type = oldCount < obj.value ? 1 : 0
				this.cartSaveOrUpdates(id, type)
			},
			cartSaveOrUpdates(id, type) {
				let userId = uni.getStorageSync('userId')
				if (userId || '' != '') {
					let fromData = {
						userId,
						goodsId: id,
						type
					}
					cartSaveOrUpdate(fromData).then(res => {
						if (!(res.msg.indexOf('操作成功') < 0)) {
							this.shaoppingList = res.data.cartDetailList
							this.cartCount = res.data.cartCount
							this.calculate()
						}
					})
				}
			},
			removeItem(params) {
				let cartId = params.name
				deleteCartById({
					id: cartId
				}).then(res => {
					if (!(res.msg.indexOf('操作成功') < 0)) {
						this.getCartList()
					}
				})
			},
			submit() {
				uni.navigateTo({
					url:"/pages/createOrder/createOrder"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-shaopping {
		background-color: #f5f5f5;
		height: 100vh;
		overflow-y: auto;

		.content {
			padding: 20rpx;
			padding-bottom: 0;
			overflow-y: auto;
		}

		.card {
			margin-top: 20rpx;
			border-radius: 10rpx;
			overflow: hidden;
			box-shadow: 0 0 10rpx #eee;
		}
	}

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			display: flex;
			padding: 25rpx 0 25rpx 20rpx;
			height: 200rpx;

			image {
				flex-shrink: 0;
				margin-left: 10rpx;
				width: 240rpx;
				height: 200rpx;
			}

			.info {
				position: relative;
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
			}

			.name {
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.detail {
				margin-top: 10rpx;
				color: #999;
				font-size: 24rpx;

				text {
					margin-right: 10rpx;
				}
			}

			.pic {
				display: flex;
				position: absolute;
				bottom: 0;
				width: calc(100% - 60rpx);
				margin-top: 20rpx;
				justify-content: space-between;
				color: #fc4f36;
			}
		}
	}

	.bottom {
		display: flex;
		position: fixed;
		align-items: center;
		justify-content: space-between;
		bottom: 174rpx;
		left: 0;
		width: 100vw;
		height: 120rpx;
		padding: 0 30rpx;
		background-color: #fff;
		box-sizing: border-box;


		text {
			color: #fc4f36;
		}

		button {
			border: none;
			padding: 0 40rpx;
			height: 80rpx;
			color: #fff;
			margin: 0;
			border-radius: 40rpx;
			font-weight: bold;
			background: linear-gradient(45deg, #ef8578, #eb5b4a);
		}
	}
</style>

<template>
	<view class="item-content">
		<view class="item" v-for="item in data" :key="item.id">
			<view class="item-head">
				<view class="item-head-tag">
					<u-icon name="order"></u-icon>{{item.orderNum}}
				</view>
				<text>{{item.createDate}}</text>
			</view>
			<view class="type">
				<text>{{item.deliveryMode == 0 ?'自提':"外卖"}}</text>
				<text>{{item.status == '1' ?'已支付':item.status == '2'?'已接单':'已送达'}}</text>
			</view>
			<view class="item-content" v-if="item.deliveryMode == 1">
				<view class="customer-info">
					<text>{{item.name}}</text>
					<text>{{item.phone}}</text>
				</view>
				<view>
					<text>{{item.areaInfo}}</text>
					<text>{{item.address}}</text>
				</view>
			</view>
			
			<template v-if="!isBuy">
				<view class="item-control" v-if="isOrder">
					<button type="default" class="complete" @click="orderComplete(item.id)">完成</button>
					<button type="warn" v-if="item.status == '3'" @click="orderDelete(item.id)">删除</button>
				</view>
				<button v-else type="default" class="item-foot" @click="order(item.id)">接单</button>
			</template>
			<template v-else>
				<button class="buy-delete" v-if="item.status == '3'"  type="warn" @click="orderDelete(item.id)">删除</button>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		applyOrder,
		updateStatusInfo,
		deleteOrder
	} from "../../api/user.js"
	export default {
		name: "orderList",
		props: {
			data: {
				type: Array,
				default: () => []
			},
			isOrder: {
				type: Boolean,
				default: false
			},
			isBuy: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		methods: {
			order(orderId) {
				let userId = uni.getStorageSync("userId")
				let fromData = {
					userId,
					orderId
				}
				applyOrder(fromData).then(res => {
					if (res.msg.indexOf("操作成功") >= 0) {
						uni.showToast({
							title: "接单成功",
							duration: 2000
						})
						this.$emit("updateList")
					}
				})
			},
			orderComplete(id) {
				updateStatusInfo({
					id,
					status: 3
				}).then(res => {
					if (res.msg.indexOf("操作成功") >= 0) {
						uni.showToast({
							title: "订单完成",
							duration: 2000
						})
						this.$emit("updateList")
					}
				})
			},
			orderDelete(id) {
				console.log(this.data)
				deleteOrder({
					id
				}).then(res => {
					console.log(res)
					if (res.msg.indexOf("操作成功") >= 0) {
						uni.showToast({
							title: "删除成功",
							duration: 2000
						})
						this.$emit("updateList")
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		background-color: #fff;
		border-radius: 16rpx;

		&+.item {
			margin-top: 30rpx;
		}

		.item-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			border-bottom: 1px solid #eee;
			line-height: 80rpx;
			font-size: 26rpx;
			color: #666;

			.item-head-tag {
				display: flex;
				flex-shrink: 0;
				width: 60%;

				&::v-deep .u-icon {
					margin-right: 10rpx;
				}
			}
		}

		.type {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx 0;
			font-size: 36rpx;
			font-weight: bold;
		}

		.item-content {
			padding: 20rpx;


			.customer-info {
				margin-bottom: 10rpx;

				text {
					margin-right: 20rpx;
				}
			}
		}

		.item-foot {
			background-color: #fff;
			border-top: 1px solid #eee;

			&::after {
				border: none;
			}
		}

		.item-control {
			display: flex;

			button {
				width: 100%;
				border-radius: 0;

				&::after {
					border: none;
				}
			}

			.complete {
				color: #fff;
				background-color: #579af7;
			}
		}

		.buy-delete {
			margin-top: 20rpx;
			border-radius: 0;

			&::after {
				border: none;
			}
		}
	}
</style>

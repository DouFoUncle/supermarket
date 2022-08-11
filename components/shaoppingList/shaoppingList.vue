<template>
	<view>
		<view class="shaopping" v-for="item in list" :key="item.id">
			<view class="left" :class="{'width-240':showIco}">
				<image :src="item.fileUrl" mode=""></image>
			</view>
			<view class="info">
				<text class="name">{{item.goodsName}}</text>
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
					<button v-if="!showIco" class="btn" @click="addCart(item.id)">加入购物车</button>
					<button v-else class="btn-radius" @click="addCart(item.id)">
						<u-icon name="plus" color="#fff"></u-icon>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartSaveOrUpdate
	} from "../../api/shaopping.js"
	import {
		checkLogin
	} from '../../static/mixin.js'
	export default {
		name: "shaoppingList",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			showIco: {
				type: Boolean,
				default: false
			}
		},
		mixins: [checkLogin],
		data() {
			return {

			};
		},
		methods: {
			addCart(id) {
				this.checkLogin().then(res => {
					this.cartSaveOrUpdates(id, 1)
				})
			},
			cartSaveOrUpdates(id, type) {
				let userId = uni.getStorageSync('userId')
				let fromData = {
					userId,
					goodsId: id,
					type
				}
				cartSaveOrUpdate(fromData).then(res => {
					if (!(res.msg.indexOf('操作成功')<0)) {
						uni.showToast({
							title: "添加成功",
							duration: 2000
						})
					} else {
						uni.showToast({
							icon: "error",
							title: "添加失败",
							duration: 2000
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shaopping {
		&+.shaopping {
			margin-top: 20rpx;
		}

		display: flex;
		justify-content: flex-start;
		margin: 0 20rpx;
		background-color: #fff;
		border-radius: 25rpx;
		box-shadow: 0 0 10rpx #eee;

		.left {
			flex-shrink: 0;
			width: 312rpx;
			height: 205rpx;
			border-bottom-left-radius: 25rpx;
			border-top-left-radius: 25rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			position: relative;
			padding-left: 20rpx;
			padding-top: 10rpx;
			width: 100%;
			padding-right: 20rpx;

			.name {
				font-size: 34rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
			}

			.detail {
				color: #7b7b7b;
				font-size: 24rpx;
				margin-top: 10rpx;

				text {
					margin-right: 20rpx;
				}
			}

			.pic {
				display: flex;
				position: absolute;
				bottom: 14rpx;
				width: calc(100% - 40rpx);
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 32rpx;
					color: #a63f41;
					font-weight: bold;
				}

				.btn-radius {
					padding: 0;
					width: 48rpx;
					height: 48rpx;
					border-radius: 50%;
					background-color: #f1413b;
					color: #fff;
					margin: 0;
				}

				.btn {
					width: 132rpx;
					line-height: 48rpx;
					background-color: #f1413b;
					padding: 0 20rpx;
					font-size: 22rpx;
					border: none;
					outline: none;
					color: #fff;
					margin: 0;
					box-sizing: content-box;
					border-radius: 24rpx;
				}
			}
		}
	}



	.width-240 {
		width: 240rpx !important;
	}
</style>

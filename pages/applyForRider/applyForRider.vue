<template>
	<view class="page-apply">
		<u-navbar title="申请骑手" leftIconColor="#fff" leftIconSize="30rpx" :autoBack="true" bgColor="#fc4f36"
			titleStyle="color:#fff" placeholder>
		</u-navbar>
		<view class="from">
			<view class="item">
				<view class="label">姓名</view>
				<u--input maxlength="5" placeholder="请填写骑手的姓名" border="bottom" v-model="from.name">
				</u--input>
			</view>
			<view class="item">
				<view class="label">手机号</view>
				<u--input maxlength="11" type="number" placeholder="请填写骑手的手机号" border="bottom" v-model="from.tel">
				</u--input>
			</view>
			<view class="item">
				<view class="label">身份证号</view>
				<view @click="show=true">
					<u--input maxlength="18" type="number" readonly placeholder="请填写骑手的身份证号" border="bottom" v-model="from.id">
					</u--input>
				</view>
			</view>

			<button @click="save">提交申请</button>
		</view>
		<u-keyboard safeAreaInsetBottom ref="uKeyboard" @close="show=false" mode="card" @confirm="show=false" @cancel="show=false" @change="valChange" @backspace="backspace" :show="show">
		</u-keyboard>
	</view>
</template>

<script>
	import {applyTakeout} from "../../api/user.js"
	export default {
		data() {
			return {
				show: false,
				from: {
					name: '',
					tel: '',
					id: ''
				}
			};
		},
		methods: {
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中
				this.from.id += val;
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.from.id.length) this.from.id = this.from.id.substr(0, this.from.id.length - 1);
			},
			checkFrom() {
				let regTel = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9]|19[4|5])\d{8}$/g
				let regId = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/g
				if (this.from.name.trim() == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写骑手的姓名',
						duration: 2000
					});
					return false
				}
				if (this.from.tel == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写骑手电话',
						duration: 2000
					});
					return false
				}

				if (!regTel.test(this.from.tel)) {
					uni.showToast({
						icon: 'none',
						title: '骑手电话不正确',
						duration: 2000
					});
					return false
				}
				if (this.from.id == '') {
					uni.showToast({
						icon: 'none',
						title: '请填写骑手的身份证号',
						duration: 2000
					});
					return false
				}

				if (!regId.test(this.from.id)) {
					uni.showToast({
						icon: 'none',
						title: '骑手身份证号不正确',
						duration: 2000
					});
					return false
				}
				return true
			},
			save() {
				let userId = uni.getStorageSync("userId")
				if (this.checkFrom()) {
					let fromData = {
						id:userId,
						cardNum:this.from.id,
						phone:this.from.tel,
						realName:this.from.name
					}
					applyTakeout(fromData).then(res=>{
						uni.showToast({
							title: '申请已提交',
							duration: 1000
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-apply {
		background-color: #f5f5f5;
		height: 100vh;
		overflow-y: auto;
	}

	.from {
		padding: 20rpx;
		margin: 50rpx 20rpx 0;
		background-color: #fff;
		border-radius: 16rpx;

		.item {
			display: flex;
			align-items: center;

			.label {
				flex-shrink: 0;
				width: 160rpx;
				font-weight: bold;
			}

			&::v-deep .u-input {
				height: 80rpx;
				border-color: #efefef !important;
			}
		}

		button {
			border: none;
			padding: 0 40rpx;
			height: 80rpx;
			color: #fff;
			margin-top: 100rpx;
			border-radius: 40rpx;
			font-weight: bold;
			background: linear-gradient(45deg, #ef8578, #eb5b4a);
		}
	}
</style>

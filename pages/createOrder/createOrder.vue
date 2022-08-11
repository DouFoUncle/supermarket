<template>
	<view>
		<u-navbar title="新增地址" leftIconColor="#fff" leftIconSize="30rpx" :autoBack="true" bgColor="#fc4f36"
			titleStyle="color:#fff" placeholder>
		</u-navbar>
		<view class="content">
			<view class="item">
				<text>取货方式</text>
				<view style="display: flex;align-items: center;">
					<u-radio-group v-model="deliveryMode" @change="id=-1">
						<u-radio activeColor="#fc4f36" size="30" labelSize="32rpx" label="自提" :name="0">
						</u-radio>
						<u-radio :customStyle="{marginLeft: '20rpx'}" activeColor="#fc4f36" size="30" labelSize="32rpx" label="外卖" :name="1">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item" v-if="deliveryMode==1" style="margin-top: 50rpx;">
				<text>收获地址</text>
				<view @click="show=true">
					<u-picker :show="show" @confirm="selectAddress" @close="show=false" @cancel="show=false" closeOnClickOverlay @change="selectAddress" :columns="addlist" keyName="address"></u-picker>
					<u--input
					    placeholder="请输入内容"
					    border="bottom"
					    v-model="site"
						readonly
					  ></u--input>
				</view>
			</view>
			<button type="default" @click="submit">下单</button>
		</view>
	</view>
</template>

<script>
	import {
		addressSaveOrUpdate,
		getAddressListByUserId,
		createOrder
	} from "../../api/user.js"
	export default {
		data() {
			return {
				deliveryMode: 0,
				site:'',
				show: false,
				id:-1,
				addlist: [],
			};
		},
		mounted() {

		},
		onLoad(){
			this.getAddressList()
		},
		methods: {
			submit(){
				let userId = uni.getStorageSync("userId")
				let fromData = {
					userId,
					deliveryMode:this.deliveryMode
				}
					
				if(this.deliveryMode == 1){
					if(this.id>0){
					fromData.addressId = this.id
					}else{
						uni.showToast({
							icon:"error",
							title:"请选择收货地址",
							duration:2000
						})
						return
					}
				}
				createOrder(fromData).then(res=>{
					if(res.msg.indexOf("操作成功")>=0){
						uni.showToast({
							icon:"success",
							title:"下单成功"
						})
						setTimeout(()=>{
							uni.hideToast()
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				})
			},
			selectAddress(arr){
				this.site = arr.value[0].address
				this.id =arr.value[0].id
				this.show=false
			},
			getAddressList() {
				let userId = uni.getStorageSync("userId")
				let fromData = {
					userId
				}
				getAddressListByUserId(fromData).then(res => {
					this.addlist.push(res.data)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 40rpx 30rpx 0;
	}
	.item{
		display: flex;
		text{
			flex-shrink: 0;
			margin-right: 20rpx;
			font-weight: bold;
		}
		view{
			width: 100%;
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
</style>

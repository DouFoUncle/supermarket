<template>
	<view class="page-order">
		<u-navbar title="接单" bgColor="#fc4f36" titleStyle="color:#fff" placeholder>
			<text slot="left"></text>
		</u-navbar>

		<view>
			<order-list :data="list" @updateList="getList"></order-list>
		</view>

		<tabbar :index="index" :isBuyers="isBuyers"></tabbar>
	</view>
</template>

<script>
	import {getListByDelivery} from '../../api/user.js'
	import tabbar from "../../components/tabbar/tabbar.vue"
	import orderList from "../../components/orderList/orderList.vue"
	export default {
		data() {
			return {
				index: 0,
				isBuyers: false,
				navHeight: 0,
				list: []
			};
		},
		components: {
			tabbar,
			orderList
		},
		onShow() {
			this.getList()
		},
		methods:{
			getList(){
				getListByDelivery().then(res=>{
					this.list = res.data
				})
			},
			order(){
				setTimeout(()=>{
					uni.showToast({
						title:"接单成功",
						duration:2000
					})
				},1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-order {
		padding: 20rpx;
		padding-bottom: 40rpx;
		background-color: #f5f5f5;
		height: calc(100vh - 174rpx);
	}

	
</style>

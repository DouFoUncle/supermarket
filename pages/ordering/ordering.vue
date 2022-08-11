<template>
	<view class="page-order">
		<u-navbar :title="title" leftIconColor="#fff" leftIconSize="30rpx" :autoBack="true" bgColor="#fc4f36"
			titleStyle="color:#fff" placeholder>
		</u-navbar>

		<view>
			<order-list :data="list" :isBuy="isBuy" @updateList="selectOrderList" :isOrder="true"></order-list>
		</view>
	</view>
</template>

<script>
	import {getListInfoByUserId} from "../../api/user.js"
	import tabbar from "../../components/tabbar/tabbar.vue"
	import orderList from "../../components/orderList/orderList.vue"
	export default {
		data() {
			return {
				title:'订单管理',
				isBuy:false,
				navHeight: 0,
				list: []
			};
		},
		onLoad(params) {
			try{
				this.title = params.title
				this.isBuy = params.isBuy == "true" ? true : false
				this.selectOrderList()
			}catch(e){
				//TODO handle the exception
			}
		},
		components: {
			tabbar,
			orderList
		},
		methods:{
			selectOrderList(){
				let userId = uni.getStorageSync('userId')
				let fromData={
					userId
				}
				
				if(!this.isBuy){
					fromData.status = 2
				}
				getListInfoByUserId(fromData).then(res=>{
						this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-order {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	
</style>

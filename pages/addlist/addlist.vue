<template>
	<view class="page-addlist">
		<u-navbar title="地址管理" leftIconColor="#fff" leftIconSize="30rpx" :autoBack="true" bgColor="#fc4f36"
			titleStyle="color:#fff" placeholder>
		</u-navbar>

		<view class="content" :style="{height: `calc(100vh - 174rpx - ${navHeight}px)`}">
			<u-swipe-action>
				<u-swipe-action-item v-for="(item,index) in addlist" :key="index" :name="item.id" @click="deleteItem" :options="options">
					<view class="swipe-action u-border-top u-border-bottom">
						<view class="swipe-action__content">
							<view class="info">
								<view class="name">
									<text>{{ item.areaInfo }}{{ item.address }}</text>
								</view>
								<view class="detail">
									<text>{{item.name}}</text>
									<text>{{item.phone | geTel}}</text>
								</view>
								<button @click="edit(item)" class="edit" type="default">
									<u-icon size="46rpx" name="edit-pen"></u-icon>
								</button>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
			<u-loadmore fontSize="36" marginTop="30" :status="status" />
		</view>
		<u-tabbar :value="0" activeColor="#666">
			<u-tabbar-item text="新增地址" @click="addAddress"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import {
		getAddressListByUserId,
		addressDeleteById
	} from "../../api/user.js"
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				addlist: [],
				navHeight: 0,
				page: 1,
				limit: 20,
				count: 0,
				status: 'loadmore',
				isback:true
			};
		},
		onLoad() {
			this.init()
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
				this.isback = false
				this.getAddressList(); //请求更多数据列表
			} else {
				this.status = "nomore";
			}
		},
		methods: {
			init() {
				this.isback = true
				this.getAddressList()
				const res = uni.getSystemInfoSync()
				const system = res.platform
				const statusBarHeight = res.statusBarHeight
				if (system === 'android') {
					this.navHeight = (48 + statusBarHeight)
				} else {
					this.navHeight = (44 + statusBarHeight)
				}
			},
			deleteItem(obj){
				let id = obj.name
				addressDeleteById({id}).then(res=>{
					if(res.msg.indexOf("操作成功")>=0){
						uni.showToast({
							icon:"success",
							title:"删除成功"
						})
						this.reset()
					}
				})
			},
			reset(){
				this.page = 1
				this.limit = 20
				this.getAddressList()
			},
			getAddressList() {
				let userId = uni.getStorageSync("userId")
				let fromData = {
					userId,
					page: this.page,
					limit: this.limit
				}
				getAddressListByUserId(fromData).then(res => {
					if(this.isback){
						this.addlist=res.data
					}else{
						this.addlist.push(...res.data)
					}
					this.count = res.count
					
					if (this.addlist.length >= res.count) {
						this.status = "nomore";
					}
				})
			},
			addAddress() {
				uni.navigateTo({
					url: '/pages/createAddress/createAddress'
				})
			},
			edit(item) {
				let params = ''
				Object.keys(item).forEach((i, n) => {
					if (n < 1) {
						params += `?${i}=${item[i]}`
					} else {
						params += `&${i}=${item[i]}`
					}
				})
				uni.navigateTo({
					url: '/pages/createAddress/createAddress' + params
				})
			}
		},
		filters: {
			geTel(tel) {
				var reg = /^(\d{3})\d{4}(\d{4})$/;
				return tel.replace(reg, "$1****$2");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-addlist {
		background-color: #fff;
		height: 100vh;

		.content {
			position: relative;
			overflow-y: auto;
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
			box-sizing: content-box;

			.info {
				position: relative;
				width: 100vw;
			}

			.name {
				max-width: 80%;
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.detail {
				margin-top: 10rpx;
				color: #999;
				font-size: 26rpx;

				text {
					margin-right: 20rpx;
				}
			}

			.edit {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				height: 60rpx;
				width: 60rpx;
				right: 30rpx;
				top: calc((100% - 60rpx) / 2);
				background-color: #fff;

				&::after {
					border: none;
				}
			}
		}
	}
</style>

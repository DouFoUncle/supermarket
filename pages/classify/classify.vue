<template>
	<view class="page-classfy" :style="{top:`${navHeight}px`,height: `calc(100vh - 174rpx - ${navHeight}px)`}">
		<u-navbar title="分类" bgColor="#fc4f36" titleStyle="color:#fff" placeholder>
			<text slot="left"></text>
		</u-navbar>
		<view class="main">
			<view class="left-item" :style="{top:`${navHeight}px`,height: `calc(100vh - 174rpx - ${navHeight}px)`}">
				<view class="class-name" v-for="item in classList" :key="item.id" :class="{'active':active==item.id}"
					@click="openClass(item.id)">{{item.typeName}}</view>
			</view>
			<view class="shaopping">
				<shaopping-list :list="list" :showIco="true"></shaopping-list>
				<u-loadmore fontSize="36" marginTop="30" :status="status" />
			</view>
		</view>

		<tabbar :index="1"></tabbar>
	</view>
</template>

<script>
	import {
		getListInfo,
		getshaoppingList
	} from '../../api/shaopping.js'
	import shaoppingList from '../../components/shaoppingList/shaoppingList.vue'
	import tabbar from "../../components/tabbar/tabbar.vue"
	export default {
		data() {
			return {
				active: 1,
				navHeight: 0,
				classList: [],
				list: [],
				page: 1,
				limit: 10,
				count: 0,
				status: 'loadmore',
			};
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
		onLoad() {
			this.init()
		},
		components: {
			shaoppingList,
			tabbar
		},
		onShow() {
			this.goTag()
		},
		methods: {
			init(){
				this.getNavList()
				const res = uni.getSystemInfoSync()
				const system = res.platform
				const statusBarHeight = res.statusBarHeight
				if (system === 'android') {
					this.navHeight = (48 + statusBarHeight)
				} else {
					this.navHeight = (44 + statusBarHeight)
				}
			},
			goTag() {
				let id = this.$store.state.classId
				if (id > 0) {
					this.openClass(id)
				}
			},
			getShaoppingLists(typeId) {
				let fromDate = {
					page: this.page,
					limit: this.limit,
					typeId
				}
				getshaoppingList(fromDate).then(res => {
					this.status = 'loadmore';
					this.count = res.count
					this.list.push(...res.data)
					if (this.list.length == res.count) {
						this.status = "nomore";
					}
				})
			},
			getNavList() {
				getListInfo().then(res => {
					if (res.data.length > 0) {
						let id = this.$store.state.classId
						this.active = id < 0 ? res.data[0].id : id
						this.getShaoppingLists(res.data[0].id)
						this.classList = res.data
					}
				})
			},
			checkTab(id) {
				this.page = 1
				this.limit = 10
				this.list = []
				this.getShaoppingLists(id)
			},
			openClass(num) {
				this.active = num
				this.checkTab(num)
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-icon {
		justify-content: center !important;
		height: 100% !important;
	}

	.page-classfy {
		position: relative;
		background-color: #f5f5f5;
	}

	.main {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		background-color: #fff;

		.left-item {
			position: fixed;
			top: 0;
			float: left;
			width: 200rpx;
			overflow-y: auto;
			background-color: #fff;
		}

		.class-name {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 34rpx;
			padding: 10rpx 0;
			text-align: center;
		}

		.active {
			color: #fc4f36;
			background-color: #f5f5f5;
		}

		.shaopping {
			float: right;
			padding: 20rpx 0;
			width: calc(100% - 200rpx);
			background-color: #f5f5f5;
			padding-bottom: 194rpx;
		}

		&::after {
			display: block;
			content: "";
			clear: both;
		}
	}
</style>

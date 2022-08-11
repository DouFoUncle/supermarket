<template>
	<view>
		<u-tabbar :value="index" :border="false" :placeholder="true" activeColor="#fc4f36">
			<template v-if="isBuyers">
				<u-tabbar-item v-for="(item,index) in BuyersTabbarList" :key='item.key' :text="item.text"
					@click="checkPage(item.pagePath,index)">
					<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath">
					</image>
				</u-tabbar-item>
			</template>
			<template v-else>
				<u-tabbar-item v-for="(item,index) in tabbarList" :key='item.key' :text="item.text"
					@click="checkPage(item.pagePath,index)">
					<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath">
					</image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath">
					</image>
				</u-tabbar-item>
			</template>
		</u-tabbar>
	</view>
</template>

<script>
	import shouye from '../../static/images/shouye.png'
	import shouyefill from '../../static/images/shouyefill.png'
	import fenlei from '../../static/images/fenlei.png'
	import fenleiactive from '../../static/images/fenleiactive.png'
	import gouwuche from '../../static/images/gouwuche.png'
	import gouwuchefill from '../../static/images/gouwuchefill.png'
	import wode from '../../static/images/wode.png'
	import wodefill from '../../static/images/wodefill.png'
	import jiedanjiluxian from '../../static/images/jiedanjiluxian.png'
	import jiedanjilumian from '../../static/images/jiedanjilumian.png'
	export default {
		name: "tabbar",
		props: {
			index: {
				type: Number,
				default: 0
			},
			isBuyers: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				BuyersTabbarList: [{
					key: 'page-1',
					pagePath: "/pages/index/index",
					iconPath: shouye,
					selectedIconPath: shouyefill,
					text: "首页"
				}, {
					key: 'page-2',
					pagePath: "/pages/classify/classify",
					iconPath: fenlei,
					selectedIconPath: fenleiactive,
					text: "分类"
				}, {
					key: 'page-3',
					pagePath: "/pages/shoppingCart/shoppingCart",
					iconPath: gouwuche,
					selectedIconPath: gouwuchefill,
					text: "购物车"
				}, {
					key: 'page-4',
					pagePath: "/pages/personalCenter/personalCenter",
					iconPath: wode,
					selectedIconPath: wodefill,
					text: "个人中心"
				}],
				tabbarList: [{
					key: 'page-1',
					pagePath: "/pages/order/order",
					iconPath: jiedanjiluxian,
					selectedIconPath: jiedanjilumian,
					text: "接单"
				}, {
					key: 'page-2',
					pagePath: "/pages/personalCenter/personalCenter",
					iconPath: wode,
					selectedIconPath: wodefill,
					text: "个人中心"
				}]
			};
		},
		methods: {
			checkPage(pagePath) {
				uni.switchTab({
					url: pagePath,
					success: () => {

					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page__item__slot-icon {
		width: 50rpx;
		height: 50rpx;
	}
</style>

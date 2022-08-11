const http = uni.$u.http

/**
* @description: 获取商品分类
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getListInfo(params) {
	return http.get('/goodsType/getListInfo', {
		params
	})
}
/**
* @description: 获取商品列表
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getshaoppingList(params) {
	return http.get('/goods/getListInfo', {
		params
	})
}
/**
* @description: 加入/删除购物车
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function cartSaveOrUpdate(params) {
	return http.post('/cart/saveOrUpdate', params)
}
/**
* @description: 查看购物车
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getCartListByUserId(params) {
	return http.get('/cart/getListByUserId', {
		params
	})
}
/**
* @description: 删除购物车
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function deleteCartById(params) {
	return http.post('/cart/deleteById', params)
}

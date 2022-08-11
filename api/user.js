const http = uni.$u.http

/**
* @description: 登陆
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function login(params,config={}){
	return http.post('/user/login', params, config)
}
/**
* @description: 更新保存用户信息
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function insertUserInfo(params,config={}){
	return http.post('/user/insertUserInfo', params, config)
}

/**
* @description: 获取用户信息
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getUserDetailInfoById(params){
	return http.get('/user/getUserDetailInfoById',{params})
}


/**
* @description: 申请骑手
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function applyTakeout(params,config={}){
	return http.post('/user/applyTakeout', params, config)
}

/**
* @description: 获取用户收货列表
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getAddressListByUserId(params) {
	return http.get('/address/getListByUserId', {
		params
	})
}

/**
* @description: 保存/修改用户收货地址
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function addressSaveOrUpdate(params,config={}){
	return http.post('/address/saveOrUpdate', params, config)
}
/**
* @description: 删除地址
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function addressDeleteById(params,config={}){
	return http.post('/address/deleteById', params, config)
}

/**
* @description: 下单
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function createOrder(params,config={}){
	return http.post('/order/createOrder', params, config)
}

/**
* @description: 查询订单
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getListInfoByUserId(params) {
	return http.get('/order/getListInfoByUserId', {
		params
	})
}

/**
* @description: 查询可接订单
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function getListByDelivery(params) {
	return http.get('/order/getListByDelivery', {
		params
	})
}

/**
* @description: 骑手接单
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function applyOrder(params,config={}){
	return http.post('/delivery/saveInfo', params, config)
}

/**
* @description: 修改订单状态
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function updateStatusInfo(params,config={}){
	return http.post('/order/updateStatusInfo', params, config)
}

/**
* @description: 删除订单
* @param {*}
* @return: {*}
* @author: 首抵宪
*/
export function deleteOrder(params,config={}){
	return http.post('/order/deleteById', params, config)
}
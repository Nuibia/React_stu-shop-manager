import { post,get,del,put } from "../utils/request"


/**
 *
 *获取列表
 * @export
 * @param {number} [page=1]
 * @returns
 */
export function listApi(page=1){
    return get("/api/v1/admin/products",{page,per:2})
}

/**
 *创建数据
 *
 * @export
 * @param {*} data
 * @returns
 */
export function createApi(data){
    return post("/api/v1/admin/products",data);
}

/**
 *根据id获取数据
 *
 * @export
 * @param {*} id
 * @returns
 */
export function getOnebyId(id){
    return get(`/api/v1/admin/products/${id}`);
}
/**
 *修改记录
 *
 * @export
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function modifyOne(id,data){
    return put(`/api/v1/admin/products/${id}`,data);
}

/**
 *删除记录
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delAOne(id){
    return del(`/api/v1/admin/products/${id}`);
}
import { post } from "../utils/request"

/**
 *
 *用户登录
 * @export
 * @param {*} user
 * @returns
 */
export function loginApi(user) {
    return post("api/v1/auth/manager_login", user);
}
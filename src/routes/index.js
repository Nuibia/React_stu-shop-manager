import Login from '../pages/Login'
import Index from '../pages/admin/dashboard'
import List from '../pages/admin/products/List'
import Edit from '../pages/admin/products/Edit'
import PageNotFind from '../pages/PageNotFind'
import Notice from "../pages/admin/notices/index"
//路由页面--项目的所有路由都在此
//主要路由
export const mainRoutes=[{
    path:'/login',
    component:Login
},{
    path:'/404',
    component:PageNotFind
}]
//后台路由
export const adminRoutes=[{
    path:'/admin/dashboard',
    component:Index,
    isShow:true,
    title:'看板',
    icon:"area-chart"
},{
    path:"/admin/products",
    component:List,
    isShow:true,
    exact:true,
    title:"商品管理",
    icon:"shop"
},{
    path:'/admin/products/edit/:id?',
    component:Edit,
    isShow:false
},{
    path:'/admin/notices',
    component:Notice,
    isShow:false
}
]
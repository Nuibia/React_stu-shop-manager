import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Popconfirm } from "antd";
import { connect } from 'react-redux'
import { loadProduct } from '../../../store/actions/products'
import { listApi, delAOne, modifyOne } from '../../../services/products'
import "./list.css"
import { serverUrl } from "../../../utils/config"
//商品列表展示页面
function List(props) {
    console.log(props)
    //定义局部状态
    // const [dataSource, setDataSource] = useState([]);
    // const [total, setTotal] = useState([0])
    // const [currentPage, setCurrentPage] = useState([1])
    const { list, page, total } = props
    useEffect(() => {
        props.dispatch(
            loadProduct({
                page: 1,
                // name: "小米"
            })
        )
    }, []);
    const loadData = () => {
        props.dispatch(loadProduct({
            page: page,
        }))

    };
    //组件初始化执行
    const columns = [{
        title: "序号",
        key: '_id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    }, {
        title: '名字',
        dataIndex: 'name',
    }, {
        title: "主图",
        dataIndex: "converImg",
        render: (txt, record) => record.coverImg ? <img src={serverUrl + record.coverImg} alt={record.name} style={{ width: '120px', height: '120px' }} /> : "暂无图片"
    }, {
        title: '价格',
        dataIndex: 'price'
    }, {
        title: "是否在售",
        dataIndex: "onSale",
        render: (txt, record) => record.onSale ? "在售" : "已下架"
    }, {
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small" onClick={() => {
                        //跳转到edit页面，进行编辑
                        props.history.push(`/admin/products/edit/${record._id}`)
                    }}>修改</Button>
                    <Popconfirm
                        title="确定删除此项"
                        onCancel={() => { console.log("取消") }}
                        onConfirm={() => {
                            delAOne(record._id).then(res => {
                                loadData();
                            })
                        }}
                    >
                        <Button style={{ margin: '0 1rem' }} type="danger" size="small">删除</Button>
                    </Popconfirm>
                    <Button size="small" onClick={() => {
                        //修改在售状态
                        modifyOne(record._id, { onSale: !record.onSale }).then(res => {
                            loadData();
                        })
                    }}>{record.onSale ? "下架" : "上架"}</Button>
                </div>
            )
        }
    }
    ]
    return (
        <Card title="商品列表" extra={<Button type="primary" size="small" onClick={() => { props.history.push('/admin/products/edit') }}>新增</Button>}>
            <Table
                rowClassName={record => record.onSale ? "" : 'bg'}
                rowKey="_id" pagination={{
                    total, defaultPageSize: 2, onChange: (p) => {
                        props.dispatch(loadProduct({ page: p }));
                    }
                }}
                columns={columns}
                bordered
                dataSource={list} />
        </Card>
    )
}
export default connect(state => state.product)(List)


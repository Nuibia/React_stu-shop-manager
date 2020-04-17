import React, { useState, useEffect } from 'react';
import { Form, Card, Input, Button, message, Upload, Icon } from 'antd'
import { createApi, getOnebyId, modifyOne } from "../../../services/products"
import { serverUrl } from "../../../utils/config";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
//商品操作页面
function Edit(props) {
    console.log(props)
    //props.match.params.id 存在的话表示修改，否则为新增
    const { getFieldDecorator } = props.form;
    const [currentData, setCurrentData] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))
    //初始化的时候执行
    useEffect(() => {
        if (props.match.params.id) {
            getOnebyId(props.match.params.id).then(res => {
                setCurrentData(res);
                setImageUrl(res.coverImg);
                setEditorState(BraftEditor.createEditorState(res.content));
            })
        }
    }, []);
    const uploadButton = (
        <div>
            <Icon type={loading ? "loading" : "plus"} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    //图片上传
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {//上传成功
            // Get this url from response in real world.
            setLoading(false);
            console.log(info);
            setImageUrl(info.file.response.info);
        }
    };
    //富文本编辑器上传
    const handleEditorChange = (v) => {
        setEditorState(v);
    }
    const priceValidate = (rule, value, callback) => {
        if (value * 1 > 100) {
            callback("价格不能大于100");
        } else {
            callback();
        }
    }
    const handleSubmit = e => {
        //editorState.toHTML()获取当前富文本编辑器的内容
        // console.log(editorState.toHTML());
        e.preventDefault();
        //验证
        props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                // console.log("提交")
                if (props.match.params.id) {
                    modifyOne(props.match.params.id, { ...value, coverImg: imageUrl, content: editorState.toHTML() })
                        .then(res => {
                            props.history.push('/admin/products')
                        }).catch(res => {
                            console.log(res)
                        })
                } else {
                    createApi({ ...value, coverImg: imageUrl, content: editorState.toHTML() })
                        .then(res => {
                            // console.log(res)
                            props.history.push('/admin/products')
                        }).catch(res => {
                            console.log(res)
                        })
                }
            } else {
                message.error("请输入正确的内容");
            }
        })
    }
    return (
        <Card title="商品编辑">
            <Form onSubmit={e => handleSubmit(e)} >
                <Form.Item label="名字">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: "请输入商品名字"
                        }
                        ],
                        initialValue: currentData.name
                    })(<Input placeholder="请输入商品名" />)}
                </Form.Item>
            </Form>
            <Form onSubmit={e => handleSubmit(e)} >
                <Form.Item label="价格">
                    {getFieldDecorator('price', {
                        rules: [{
                            required: true,
                            message: "请输入商品价格"
                        }, {
                            validator: priceValidate
                        }
                        ],
                        initialValue: currentData.price
                    })(<Input placeholder="请输入商品价格" />)}
                </Form.Item>
                <Form.Item label="主图">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={serverUrl + "/api/v1/common/file_upload"}
                        onChange={(info) => handleChange(info)}
                    >
                        {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item lable="详情">
                    <BraftEditor
                        value={editorState}
                        onChange={(e) => handleEditorChange(e)}
                    />
                </Form.Item>
                <Form.Item><Button htmlType="submit" type="primary">保存</Button></Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({ name: 'productEdit' })(Edit)

import React from 'react'
import { Card, Statistic, Row, Col, Button } from 'antd'
function index() {
    return (
        <Card title="看板">
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                        Recharge
      </Button>
                </Col>
            </Row>,
        </Card>
    )
}

export default index

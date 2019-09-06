import React, { Component } from 'react'
import './layout.less'
import ProTypes from 'prop-types'
import { Layout, Row, Col, BackTop } from 'antd'
import Header from '../header/header.jsx'
import Sider from '../sider/sider.jsx'

class AppLayout extends Component {
  static propTypes = {
    children: ProTypes.node
  }

  render () {
    const siderLayout = {
      xxl: 4,
      xl: 5,
      lg: 5,
      sm: 0,
      xs: 0
    }
    const contentLayout = {
      xxl: 20,
      xl: 19,
      lg: 19,
      sm: 24
    }

    return (
      <Layout className="app-container">
        <Header/>
        <Row className="main-wrapper">
          <Col {...siderLayout}>
            <Sider></Sider>
          </Col>
          <Col {...contentLayout}>
            <div className="content-wrapper">
              {this.props.children}
            </div>
          </Col>
        </Row>
        <BackTop target={() => document.querySelector('.content-wrapper')}></BackTop>
      </Layout>
    )
  }
}
export default AppLayout
import React, { useEffect, useState } from 'react'
import './about.less'
import AuthorAvatar from '@/component/AuthorAvatar.jsx'
import { connect } from 'react-redux'
import { generateColorMap } from '@/store/common/common-actions'

import { Divider, Rate } from 'antd'

import Comment from '@/component/common/common.jsx'
import axios from '@/lib/axios'

function About(props) {
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    const fetchList = () => {
      axios.get('/comments').then(res => {
        props.generateColorMap(res.data.rows) // 生成头像的颜色匹配
        setCommentList(res.data.rows)
      })
    }
    fetchList()
  }, [])
  

  return (
    <div className="content-inner-wrapper about">
      <AuthorAvatar />
      <span className="desc">开发工程师</span>
      <Divider orientation="left">博客简述</Divider>
      {/* <p>主要是用来记录博主学习而作！</p> */}
      <p>本博客使用的技术为 react  + antd + koa2 + mysql</p>
      <p>
        源码地址为{' '}
        <a target="_blank" rel="noreferrer noopener" href="https://github.com/zhangwinwin/react-my-blog">
          github
        </a>
        ，仅供参考
      </p>
      <Divider orientation="left">关于我</Divider>
      <ul className="about-list">
        <li>姓名：张</li>
        <li>学历：本科</li>
        {/* <li>
          联系方式：
          <Icon type="qq" /> 
          <Divider type="vertical" />
          <i className="iconfont icon-email" />
          <a href="#">#</a>
        </li> */}
        <li>坐标：广州市</li>
        <li>
          其他博客地址：
        </li>
        <li>
          技能
          <ul>
            <li>
              HTML、CSS、Javascript：能熟练开发符合 W3C 标准的页面！
              <Rate defaultValue={4} disabled />
            </li>
            <li>
              react vue 框架：熟练掌握使用！
              <Rate defaultValue={4} disabled />
            </li>
            <li>
              es6：日常开发必备，以及掌握基本面向对象编程实现！
              <Rate defaultValue={4} disabled />
            </li>
            <li>
              webpack: 入门级别，可以对脚手架进行针对性的配置！
              <Rate defaultValue={3} disabled />
            </li>
            <li>
              node mysql：针对需求可以做到简单的数据库设计、接口的开发与设计！
              <Rate defaultValue={3} disabled />
            </li>
          </ul>
        </li>
        <li>
          其他
          <ul>
            <li>常用开发工具： vscode、webstorm、git</li>
            <li>熟悉的 UI 工具： antd、element-ui</li>
            <li>良好的代码习惯： 注释规范 jsdoc</li>
          </ul>
        </li>
      </ul>

      <Comment articleId={-1} commentList={commentList} setCommentList={setCommentList} />
    </div>
  )
}

export default connect(
  null,
  { generateColorMap }
)(About)

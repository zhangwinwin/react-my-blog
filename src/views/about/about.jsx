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
  }, [props])
  

  return (
    <div className="content-inner-wrapper about">
      <AuthorAvatar />
      <span className="desc">前端开发工程师</span>
      <Divider orientation="left">博客简述</Divider>
      {/* <p>主要是用来记录博主学习而作！</p> */}
      <p>本博客使用的技术为 react  + antd + koa2 + mysql</p>
      <p>
        源码地址为
        <a target="_blank" rel="noreferrer noopener" href="https://github.com/zhangwinwin/react-my-blog">
          github
        </a>
        ，仅供参考
      </p>
      <Divider orientation="left">关于我</Divider>
      <ul className="about-list">
        <li>姓名：张</li>
        <li>学历：本科</li>
        <li>坐标：广州市</li>
        <li>
          其他论坛：
          <a target="_blank" rel="noreferrer noopener" href="https://juejin.im/user/5c6b66e9e51d4539a642640c">
            掘金
          </a>
        </li>
        <li>
          技能
          <ul>
            <li>
              熟练掌握JavaScript、CSS、HTML，可以脱离框架独立进行复杂项目的开发；
              <Rate defaultValue={4} disabled />
            </li>
            <li>
              熟练掌握Vue、React等前端库或框架以及相关的全家桶，有基于全家桶构建通用前端框架的经验；
              <Rate defaultValue={4} disabled />
            </li>
            <li>
              有typeScript与nodejs编写经验以及独立开发系统的经验；
              <Rate defaultValue={3} disabled />
            </li>
            <li>
              有webpack优化构建的经验；熟悉git等代码管理工具；
              <Rate defaultValue={3} disabled />
            </li>
            <li>
              了解http、浏览器工作原理与性能优化；
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

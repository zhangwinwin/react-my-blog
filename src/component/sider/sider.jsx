import React, { Component } from 'react'
import { connect } from 'react-redux'
import avatar from '@/assets/admin_avatar.png'
import { Link } from 'react-router-dom'
import { Divider, Tag, Icon } from 'antd'
import './sider.less'

function random(colorList) {
  const len = colorList.length
  return Math.floor(Math.random() * len)
}

const mapStateToProps = state => ({
  tagList: state.article.tagList,
  colorList: state.common.colorList
})

@connect(mapStateToProps)
class BlogSider extends Component {
  state = { showList: []}

  async componentDidMount() {
    let showList = []
    const list = await this.fetchList(2)
    showList = list.length > 0 ? list : await this.fetchList(1)
    this.setState({ showList })
  }

  /**
   * mode 1 获取最近的列表
   * mode 2 获取置顶文章列表
   */
  fetchList = async mode => {
    const queryParams = mode === 1 ? {
      params: {
        page: 1,
        pageSize: 6
      }
    } : {
      params: {
        page: 1,
        pageSize: 100,
        fetchTop: true
      }
    }
    const result = await this.axios.get('/articles', queryParams)
    return result.rows
  }
  
  render () {
    const { tagList, colorList } = this.props
    const { showList } = this.state
    let title = showList[0] && showList[0].showOrder ? '热门文章' : '最近文章'

    return (
      <div className="sider-wrapper">
        <img src={avatar} className="sider-avatar" alt=""/>
        <h2 className="name">Mr.zhang</h2>
        <div className="title">开发工程师</div>
        <ul className="link-list">
          <li>
            <Icon type='github' />
            <a href="https://github.com/zhangwinwin" target="_blank" rel="noreferrer noopener">github</a>
          </li>
        </ul>
        <Divider orientation="left">{title}</Divider>
        <ul className="show-list">
          {showList.map(d => (
            <li key={d.id}>
              <Link to={`/article/${d.id}`}>{d.title}</Link>
            </li>
          ))}
        </ul>
        <Divider orientation="left">标签</Divider>
        <div className="tags-content">
          {tagList.map((tag, i) => (
            <Tag key={i} color={colorList[i] ? colorList[i] : colorList[random(colorList)]}>
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
          ))}
        </div>
      </div>
    )
  }
}

export default BlogSider
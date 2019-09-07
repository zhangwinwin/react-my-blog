import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Divider, Empty, Drawer } from 'antd'
import { translateMarkdown, decodeQuery, getCommentsCount } from '@/lib'
import { openDrawer, closeDrawer } from '@/store/common/common-actions'
import './home.less'
import axios from '@/lib/axios'
import Loading from '@/component/loading'
import Tags from '../tags'
import BlogPagination from '@/component/blogPagination'
import Preview from './preview'


const NoDataDesc = ({ keyword }) => (
  <Fragment>
    不存在标题中含有<span className='keyword'>{keyword}</span>的文章！
  </Fragment>
)

function Home(props) {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    props.closeDrawer()
    return () => {
    }
  })

  /**
   * 当地址栏发生变化
   */
  useEffect(() => {
    const fetchList = ({page, keyword}) => {
      setLoading(true)
      axios
        .get('/articles', {params: {page, pageSize: 10, title: keyword}})
        .then(res => {
          const list = res.rows
          list.forEach(item => {
            let index = item.content.indexOf('<!--more-->')
            item.description = translateMarkdown(item.content.slice(0, index))
          })
          setList(list)
          setTotal(res.count)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
        })
    }
    const params = decodeQuery(props.location.search)
    fetchList(params)
    return () => {
    }
  }, [props.location.search])

  /**
   * 跳转到文章详情
   */
  function jumpTo(id) {
    props.history.push(`/article/${id}`)
  }

  function handlePageChange(page) {
    document.querySelector('.content-warpper').scrollTop = 0
    let params = { ...decodeQuery(props.location.search), page }
    let url = null
    Object.entries(params).forEach(item => {
      url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
    })
    props.history.push(url)
  }

  const { page, keyword } = decodeQuery(props.location.search)
  return (
    <div className='content-innet-wrapper home'>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Fragment>
          <ul className="ul-list">
            {list.map(item => (
              <li key={item.id} className="ul-list-item">
                <Divider orientation="left">
                  <span className="title" onClick={() => jumpTo(item.id)}>
                    {item.title}
                  </span>
                  <span className="create-time">
                    {item.createdAt.slice(0, 10)}
                  </span>
                </Divider>

                <div onClick={() => jumpTo(item.id)}
                className="article-detail description"
                dangerouslySetInnerHTML={{ __html: item.description }}></div>
                <div className="list-item-action">
                  <Icon type="message" style={{marginRight: 7}}></Icon>
                  {getCommentsCount(item.comments)}
                  <Tags type="tags" list={item.tags}></Tags>
                  <Tags type="categories" list={item.categories}></Tags>
                </div>
              </li>
            ))}
          </ul>
          {list.length > 0 ? (
            <Fragment>
              {list.length < total && (
                <BlogPagination current={parseInt(page) || 1} onChange={handlePageChange} total={total}></BlogPagination>
              )}
              {props.windowWidth > 1300 ? (
                <Preview list={list}></Preview>
              ) : (
                <Fragment>
                  <div className="drawer-btn" onClick={props.openDrawer}>
                    <Icon type="menu-o" className="nav-phone-icon"></Icon>
                  </div>
                  <Drawer
                    title="文章布局"
                    placement="right"
                    closable={false}
                    onClose={props.closeDrawer}
                    visible={props.drawerVisible}>
                    <Preview list={list}></Preview>
                  </Drawer>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <div className="no-data">
              <Empty description={<NoDataDesc keyword={keyword}/>}/>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
export default connect(
  state => ({
    drawerVisible: state.commonReducer.drawerVisible,
    windowWidth: state.commonReducer.windowWidth
  }),
  { openDrawer, closeDrawer }
)(Home)
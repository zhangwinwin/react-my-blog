import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Timeline, Spin } from 'antd'
import BlogPagination from '@/component/blogPagination.jsx'
import './list.less'

const TimeLineList = ({ list, name, type }) => {
  return (
    <div className='timeline'>
      <Timeline>
        <Timeline.Item>
          <h1 className="list-title">
            {name}
            <small className='type-name'>{type === 'categories' ? 'Category' : 'Tag'}</small>
          </h1>
          <br></br>
        </Timeline.Item>
        {list.map(item => (
          <Timeline.Item key={item.id}>
            <span style={{fontSize: '13px', marginRight: '16px'}}>{item.createdAt.slice(5, 10)}</span>
            <Link to={`/article/${item.id}`}>{item.title}</Link>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

@connect(state => ({
  windowWidth: state.commonReducer.windowWidth
}))
class List extends Component {
  state = {
    list: [],
    page: 1,
    total: 0,
    type: 'categories',
    name: '',
    loading: false
  }
  componentDidMount () {
    const params = this.decodeQuery(this.props)
    this.setState({ type: params.type }, this.fetchList({ page: 1, ...params }))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const params = this.decodeQuery(nextProps)
      this.fetchList({page: 1, ...params})
    }
  }

  decodeQuery = props => {
    const type = props.location.pathname.includes('categories') ? 'categories' : 'tags'
    const name = props.match.params.name
    return {
      type,
      name
    }
  }

  fetchList = ({ page = 1, name, type }) => {
    this.setState({ loading: true })
    this.$axios.get(`/${type}/article`, {
      params: {
        page,
        pageSize: 15,
        name
      }
    }).then(res => {
      this.setState({ list: res.data.rows, total: res.data.count, loading: false})
    }).catch(err => {
      this.setState({loading: false})
    })
  }

  handlePageChange = page => {
    const params = this.decodeQuery(this.props)
    this.setState({page}, this.fetchList({page, ...params}))
  }

  render () {
    const { list, type, page, total, loading } = this.state
    const { name } = this.props.match.params.name
    return (
      <div className="content-inner-wrapper list-page">
        <Spin tip="loading..." spinning={loading}>
          <TimeLineList list={list} name={name} type={type} />
        </Spin>
        {list.length < total && (
          <BlogPagination current={parseInt(page || 1) }onChange={this.handlePageChange} total={total} pageSize={15} />
        )}
      </div>
    )
  }
}

export default List
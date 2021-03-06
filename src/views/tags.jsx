import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Tag, Divider } from 'antd'

@connect(state => ({
  colorList: state.commonReducer.colorList
}))
@withRouter
class Tags extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }
  static defaultProps = {
    type: 'tags',
    list: []
  }

  render () {
    const {type, list, colorList} = this.props
    return (
      <Fragment>
        <Divider type="vertical"/>
        {type === 'tags' ? (
          <i className="iconfont icon-tags" style={{marginRight: 7, verticalAlign: 'middle' }}></i>
        ) : (
          <Icon type="folder" style={{marginRight: 7}}></Icon>
        )}
        {list.map((item, i) => (
          <Tag color={type === 'tags' ? colorList[i] : '#2DB7F5'} key={item.name}>
            <Link to={`/${type}/${item.name}`}>{item.name}</Link>
          </Tag>
        ))}
      </Fragment>
    )
  }
}

export default Tags
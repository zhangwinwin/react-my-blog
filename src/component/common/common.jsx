import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import axios from '@/lib/axios'
import { connect } from 'react-redux'
import AuthorAvatar from '@/component/AuthorAvatar'
import { getCommentsCount } from '@/lib'
import { openAuthModal } from '@/store/common/common-actions'
import { logout } from '@/store/user/user-action'

import { Comment, Avatar, Form, Button, Divider, Input, Icon, Dropdown, message, Menu } from 'antd'
import CommentList from './list'
import './common.less'

const { TextArea } = Input
const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} placeholder="说点什么" onChange={onchange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className="controls">
        <i className="iconfont icon-tips"></i>
        <span className="support-tip">支持 Markdown 语法</span>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">{articleId !== -1 ? '添加评论' : '留言'}</Button>
      </div>
    </Form.Item>
  </div>
)

function ArticleComment(props) {
  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!value) return
    if (!props.usename) return message.warn('您未登录，请登录后再试')
    setSubmitting(true)

    axios.post('/comments', { articleId: props.articleId, content: value }).then(res => {
      submitting(false)
      setValue('')
      props.setCommentList(res.data.rows)
    }).catch(err => setSubmitting(false))
  }

  const handleMenuClick = e => {
    switch (e.key) {
      case 'login':
        props.openAuthModal('login')
        break
      case 'register':
        props.openAuthModal('register')
        break
      case 'updateUser':
        props.openAuthModal('updateUser')
        break
      case 'logout':
        props.logout()
        break
      default:
        break
    }
  }

  const renderDropdownMenu = () => {
    const { username } = props
    return username ? (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="updateUser">修改账户信息</Menu.Item>
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    )
  }

  const { username, articleId, userId, commentList } = props

  return (
    <div className="comment-wrapper">
      <div className="comment-header">
        <span className='count'>{getCommentsCount(commentList)}</span>{articleId !== -1 ? '条评论' : '条留言'}
        <span className="menu-wrap">
          <Dropdown overlay={renderDropdownMenu()} trigger={['click', 'hover']}>
            <span>
              {username ? username : '未登录用户'}<Icon type='down'/>
            </span>
          </Dropdown>
        </span>
        <Divider className='hr'/>
      </div>
      <Comment avatar={
        username ? (
          <Fragment>
            {userId !== -1 ? (
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            ) : (
              <AuthorAvatar />
            )}
          </Fragment>
        ) : (
          <Icon type='github' theme='filled' style={{fontSize: 40, margin: '5px 5px 0 0'}} />
        )
      }
      content={
        <Editor
          onChange={e => setValue(e.targer.value)}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
          articleId={articleId}
        />
      } />
      <CommentList commentList={commentList} articleId={articleId} setCommentList={props.setCommentList} />
    </div>
  )
}

ArticleComment.propTypes = {
  articleId: PropTypes.number,
  commentList: PropTypes.array,
  setCommentList: PropTypes.func
}

export default connect(
  state => state.userReducer,
  { openAuthModal, logout }
)(ArticleComment)
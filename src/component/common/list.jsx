import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AuthorAvatar from '@/component/AuthorAvatar'

import { translateMarkdown } from '@/lib'
import { Comment, Avatar, Button, Tooltip, Input, Icon, Popconfirm, message} from 'antd'
import moment from 'moment'

const { TextArea } = Input

const CommentItem = (
  {
    children,
    item,
    openReply,
    fatherId,
    levelOneId,
    levelTwoId,
    handleChange,
    handleKeyUp,
    onSubmit,
    renderAvatar,
    delComment,
    auth,
    value
  }
) => {
  const level = item.replies ? 1 : 2
  function handleClick (level) {
    if (level === 1) openReply(level, item.id)
    else openReply(level, item.id, fatherId)
  }
  const content = translateMarkdown(item.content, true)
  return (
    <Comment actions={[
      <span onClick={() => handleClick(level)}>Reply to</span>,
      <Fragment>
        {auth === 1 && (
          <Popconfirm
            title={'是否删除该评论？'}
            cancelText='取消'
            okText="确认"
            onConfirm={() => delComment(item.fatherId)}>
            <Icon type="delete" className="icon-delete"></Icon>
          </Popconfirm>
        )}
      </Fragment>
    ]}
    author={<span>{item.user && item.user.usernane}</span>}
    avatar={renderAvatar(item)}
    content={<div className="article-detail" dangerouslySetInnerHTML={{__html: content}}></div>}
    datetime={
      <Tooltip title={item.createdAt}>
        <span>{moment(item.createdAt).fromNow()}</span>
      </Tooltip>
    }>
      {((level === 1 && levelOneId === item.id) || (level === 2 && levelTwoId === item.id)) && (
        <div className="reply-form">
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}>
          </TextArea>
          <div className='reply-form-controls'>
            <span className='tip'>⌘ + Enter</span>
            <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>回复</Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  )
}

@connect(state => ({
  username: state.userReducer.username,
  userId: state.userReducer.userId,
  email: state.userReducer.email,
  auth: state.userReducer.auth,
  colorMap: state.commonReducer.colorMap
}))
class CommentList extends Component {
  static propTypes = {
    commentList: PropTypes.array,
    articleId: PropTypes.number,
    setCommentList: PropTypes.func
  }
  state = {
    commentList: [],
    colorMap: {},
    commentId: 0,
    levelOneId: 0,
    levelTwoId: 0,
    value: ''
  }

  renderAvatar = item => {
    const { userId, colorMap } = this.props
    if (item.userId === 1) return <AuthorAvatar />
    if (item.userId === userId) {
      return <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    } else {
      return (
        <Avatar className="user-avatar" size="default" style={{ backgroundColor: colorMap[item.userId] || '#ccc' }}>
          {item.user && item.user.username}
        </Avatar>
      )
    }
  }

  openReply = (level, id, commentId) => {
    if (level === 1) {
      this.setState({ commentId: id, levelTwoId: 0, levelOneId: id })
    } else {
      this.setState({ levelOneId: 0, levelTwoId: id, commentId })
    }
  }
  handleChange = e => {
    this.setState({ value: e.target.value })
  }

  handleKeyUp = e => {
    if (e.ctrlKey && e.keycode === 13) {
      this.onSubmit()
    }
  }

  onSubmit = () => {
    const content = this.state.value.trim()
    if (!this.props.username) return message.warn('您未登录，请登录后再试')
    const { articleId } = this.props
    this.$axios.post('/commonts/reply', {
      content,
      articleId,
      commentId: this.state.commentId
    })
    .then(res => {
      this.props.setCommentList(res.data.rows)
      this.setState({ commentId: 0, levelOneId: 0, levelTwoId: 0, value: ''})
    })
  }

  delComment = (item, commentId) => {
    if (item.replies) {
      this.$axios.delete('/comments', { params: {commentId: item.id} }).then(res => {
        if (res.code !== 200) return message.error(res.message)
        const list = this.props.commentList.filter(d => d.id !== item.id)
        this.props.setCommentList(list)
        message.success(res.message)
      })
    } else {
      this.$axios.delete('commonts', { params: { replyId: item.id } }).then(res => {
        if (res.code !== 200) return message.error(res.message)

        const list = [...this.props.commentList]
        list.forEach(d => {
          if (d.id === commentId) d.replies = d.replies.filter(v => v.id !== item.id)
        })
        this.props.setCommentList(list)
        message.success(res.message)
      })
    }
  }

  render () {
    const { commentList, auth } = this.props
    const { levelOneId, value, levelTwoId } = this.state

    const commonProps = {
      value,
      auth,
      renderAvatar: this.renderAvatar,
      openReply: this.openReply,
      handleChange: this.handleChange,
      handleKeyUp: this.handleKeyUp,
      onSubmit: this.onSubmit,
      delComment: this.delComment
    }

    return (
      <div>
        {commentList.map(comment => (
          <CommentItem key={comment.id} item={comment}
          levelOneId={levelOneId} {...commonProps}>
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} item={reply} levelTwoId={levelTwoId} fatherId={comment.id} {...commonProps}/>
            ))}
          </CommentItem>
        ))}
      </div>
    )
  }
}

export default CommentList
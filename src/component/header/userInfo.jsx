import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { register, logout } from '@/store/user/user-action.js'
import { openAuthModal } from '@/store/common/common-actions.js'
import { Button, Dropdown, Avatar, Menu } from 'antd'


const mapStateToProps = state => ({
  username: state.userReducer.username,
  avatarColor: state.userReducer.avatarColor
})
const updateUser = (prop) => {
  prop.openAuthModal('updateUser')
}

@connect(
  mapStateToProps,
  { register, logout, openAuthModal }
)
class UserInfo extends Component {
  renderAvatarDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span className="user-logout" onClick={updateUser(this.props)}>
            修改账户信息
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className="user-logout" onClick={this.props.logout}>
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
  }
  render () {
    const { username, avatarColor } = this.props
    return (
      <div id="header-userInfo">
        {username ? (
          <Dropdown placement="bottomCenter" overlay={this.renderAvatarDropdownMenu()} trigger={['click', 'hover']}>
            <Avatar className="user-avatar" size="large" style={{backgroundColor: avatarColor}}>
              {username}
            </Avatar>
          </Dropdown>
        ) : (
          <Fragment>
            <Button
              ghost
              type="primary"
              size="small"
              style={{marginRight: 20}}
              onClick={() => this.props.openAuthModal('login')}>
                登录
              </Button>
            <Button ghost type="danger" size="small" onClick={() => this.props.openAuthModal('register')}>
              注册
            </Button>
          </Fragment>
        )}
        {/* <AuthModal/> */}
      </div>
    )
  }
}

export default UserInfo
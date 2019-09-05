import React from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import './header.less'

const HeaderLeft = ({ navList }) => {
  const overlay = (
    <Menu className="header-nav">
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{marginRight: 15}}/>}
            <span className="nav-text"></span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className='header-left'>
      <i className="iconfont icon-airplane" style={{color: '#055796'}}/>
      <span className="blog--name">mr.zhang的博客</span>
      <Dropdown overlayClassName="header-dropdown" trigger={['click']} overlay={overlay}>
        <Icon type="menu-o" className="nav-phone-icon"></Icon>
      </Dropdown>
    </div>
  )
}

export default HeaderLeft
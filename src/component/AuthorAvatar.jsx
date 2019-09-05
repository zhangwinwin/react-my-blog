import React from 'react'
import avatar from '@/assets/admin_avatar.png'
import { Avatar } from 'antd'

const AuthAvatar = ({ size = 'default' }) => {
  return <Avatar src={avatar} size={size} />
}

export default AuthAvatar

import React from 'react'
import { Anchor } from 'antd'
const { Link } = Anchor

/**
 * 根据article来生成锚点列表
 */
function getAnchorList (str) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
  let list = []
  function pushItem(arr, item) {
    const len = arr.length
    const matchItem = arr[len - 1]
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item)
    } else {
      arr.push(item)
    }
  }
  console.log('str', str)
  str.replace(pattern, ($0, $1) => {
    const title = $0.replace(/.*?>/, '')
    let startIndex = $0.indexOf('"')
    let endIndex = $0.indexOf('">')

    const href = `#${$0.slice(startIndex + 1, endIndex)}`
    const currentItem = {
      tag: $1,
      title,
      href,
      children: []
    }
    pushItem(list, currentItem)
  })
  return list
}

const Navigation = (data) => {
  console.log('dataNa', data)
  const list = getAnchorList(data.content)
  function renderLink({ href, title, children }) {
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map(sub => renderLink(sub))}
      </Link>
    )
  }
  return <Anchor affix={false}>{list.map(renderLink)}</Anchor>
}
export default Navigation

import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { Button, Input, Select, message } from 'antd';
import { connect } from 'react-redux';
import { createArticle } from '@/store/article/article-actions.js'
import "react-mde/lib/styles/css/react-mde-all.css";
import './markdown.less'
const { Option } = Select;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

function Write(props) {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [title, setTitle] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [category, setCategory] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const { categoryList, createArticle, history } = props
  function handleTitle (e) {
    setTitle(e.target.value)
  }
  function handleTag (e) {
    setTag(e.target.value)
  }
  function handleCategory (val) {
    setCategory(val)
  }
  function beforeCheck (obj) {
    const keys = Object.keys(obj)
    const check = keys.every(item => obj[item])
    return check
  }
  async function submit () {
    setLoading(true)
    const obj = {
      title: title,
      content: value,
      tags: [],
      categories: category
    }
    obj.tags.push(tag)
    const check = beforeCheck(obj)
    if (check) {
      createArticle(obj).then(() => {
        message.success('发表成功')
        history.push("/")
        setLoading(false)
      }).catch(() => {
        message.success('发表失败')
        setLoading(false)
      })
    } else {
      message.info('请输入完整')
      setLoading(false)
    }
  }
  return (
    <div className="markdown__container">
      <section className='markdown__main'>
        <div className="markdown__item">
          <strong>输入标题：</strong>
          <Input placeholder="输入标题" onChange={handleTitle}/>
        </div>
        <div className="markdown__item">
          <strong>选择目录：</strong>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={handleCategory}>
            {categoryList.map((item, index) => (
              <Option key={index} value={item.name}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <div className="markdown__item">
          <strong>输入标签：</strong>
          <Input placeholder="输入标签" onChange={handleTag}/>
        </div>
      </section>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <div className='markdown__btns'>
        <Button type="primary" size="large" className="markdown__btn" loading={loading} onClick={submit}>发表</Button>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    categoryList: state.articleReducer.categoryList
  }),
  { createArticle }
)(Write)

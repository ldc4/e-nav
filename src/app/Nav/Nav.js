import React from 'react';
import _ from 'lodash';
import { Icon, Tooltip } from 'antd';
import './Nav.css';

class Nav extends React.Component{

  constructor(props){
    super(props);

    /*
    const navData = {
      title: "生态导航",
      categories: [
        {
          name: "类别名",
          groups: [
            {
              name: "类别名",
              links: [
                {
                  name: "链接名",
                  src: "https://github.com/ldc4", // 具体链接
                  description: "链接描述",
                  open: 1, // 打开方式 （0 - 新窗口 | 1 - 当前窗口），默认0
                  new: true,  // 是否标记为New （ false - 不是 | true - 是 ），默认false
                }
              ]
            }
          ]
        }
      ]
    };
    */

    const navData = this.props.data || {};

    this.state = {
      navData
    }

  };

  // 作为一个受控组件
  componentWillReceiveProps(newProps){
    if( 'data' in newProps ){
      const navData = newProps.data || {};
      this.setState({
        navData
      });
    }
  }

  // 得到高亮数据
  getHighlightHTML(value, keyword){
    let arr = value.split(keyword);
    if(arr.length === 2){
      return (
        <span>{arr[0]}<span className="highlight">{keyword}</span>{arr[1]}</span>
      );
    }else{
      return (
        <span>{value}</span>
      )
    }
  }

  // 构造导航HTML
  getNavHTML(){

    const navData = this.state.navData || {};
    const keyword = navData.keyword || '';

    let categories = [];
    if(_.isArray(navData.categories)){  // 第一层：类别
      _.forEach(navData.categories, (category)=>{
        let groups = [];
        if(_.isArray(category.groups)){ // 第二层：分组
          _.forEach(category.groups, (group)=>{
            let links = [];
            if(_.isArray(group.links)){ // 第三层：链接
              _.forEach(group.links, (link)=>{
                // 构造链接HTML
                const linkHtml = (
                  <Tooltip key={link.name} placement="bottomLeft" title={link.description} arrowPointAtCenter={true}>
                    <a href={link.src} target={link.open===1?"_self":"_blank"}>
                      <div className="link_name">
                        {this.getHighlightHTML(link.name, keyword)}
                      </div>
                      {link.new && (<i className="icon-new">New</i>)}
                    </a>
                  </Tooltip>
                );
                // 添加到链接数组中
                links = _.concat(links, linkHtml);
              });
            }
            // 构造分组HTML
            const groupHtml = (
              <div className="group" key={group.name}>
                <div className="group_name">
                  {this.getHighlightHTML(group.name, keyword)}
                </div>
                <div className="group_war">
                  {links}
                </div>
              </div>
            );
            // 添加到分组数组中
            groups = _.concat(groups, groupHtml);
          });
        }
        // 构造类别HTML
        const categoryHtml = (
          <div className="category" key={category.name} id={category.name}>
            <div className="category_title">
              <Icon type="caret-right" />
              <span className="category_title_content">
                {this.getHighlightHTML(category.name, keyword)}
              </span>
            </div>
            <div className="category_main">
              {groups}
            </div>
          </div>
        );
        // 添加到类别数组中
        categories = _.concat(categories, categoryHtml);
      });
    }

    return (
      <div>
        {categories}
      </div>
    );

  }


  render(){

    return(
      <div className="Nav">
        { this.getNavHTML() }
      </div>
    )

  }

}

export default Nav;
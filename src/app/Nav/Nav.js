import React from 'react';
import _ from 'lodash';
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

  // 构造导航HTML
  getNavHTML() {

    const navData = this.state.navData || {};

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
                  <a title={link.description} key={link.name} href={link.src} target={link.open===1?"_self":"_blank"}>
                    <div className="main_classify_list">{link.name}</div>
                  </a>
                );
                // 添加到链接数组中
                links = _.concat(links, linkHtml);
              });
            }
            // 构造分组HTML
            const groupHtml = (
              <div className="main_classify" key={group.name}>
                <div className="main_classify_name">{group.name}</div>
                <div className="main_classify_war">
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
          <div className="content_list" key={category.name}>
            <div className="content_list_title" style={{textAlign:"center"}}>{category.name}</div>
            <div className="content_list_main">
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
        <div className="content">
          <div className="content_war war">
            { this.getNavHTML() }
          </div>
        </div>
      </div>
    )

  }

}

export default Nav;
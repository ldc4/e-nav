import React from 'react';
import _ from 'lodash';
import { Layout, Menu, Input } from 'antd';
const { Header } = Layout;
const { Search } = Input;
import './W2Header.css';

class W2Header extends React.Component {

  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    const menuData = this.props.data || {};

    this.state = {
      menuData
    }
  }

  // 作为一个受控组件
  componentWillReceiveProps(newProps){
    if( 'data' in newProps ){
      const menuData = newProps.data || {};
      this.setState({
        menuData
      });
    }
  }

  handleSearch(value){
    // 交给父组件处理
    this.props.onSearch(value);
  }

  getMenuHTML(){

    const { menuData={} } = this.state;
    let menus = [];
    if(_.isArray(menuData.categories)){
      _.forEachRight(menuData.categories,(category, index)=>{
        const menuHtml = (
          <Menu.Item key={index}><a href={"#"+category.name}>{category.name}</a></Menu.Item>
        );
        menus = _.concat(menus, menuHtml);
      });
    }

    return (
      <div className="menu">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px'}}
        >
          {menus}
        </Menu>
      </div>
    );
  }

  render(){
    return (
      <div className="W2Header">
        <Header>
          <div className="logo">
            <div className="logo-title">
              生态导航(E-Nav)
            </div>
          </div>
          <div className="search">
            <Search
              placeholder="输入关键字过滤..."
              onSearch={ this.handleSearch }
            />
          </div>
          { this.getMenuHTML() }
        </Header>
      </div>
    );
  }
}

export default W2Header;

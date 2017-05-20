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
    console.log(value)
  }

  getMenuHTML(){

    const { menuData={} } = this.state;
    let menus = [];
    if(_.isArray(menuData.categories)){
      _.forEach(menuData.categories,(category, index)=>{
        const menuHtml = (
          <Menu.Item key={index}>{category.name}</Menu.Item>
        );
        menus = _.concat(menus, menuHtml);
      });
    }

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px'}}
      >
        {menus}
        <Search
          placeholder="输入关键字过滤..."
          style={{ width: 200 }}
          onSearch={ this.handleSearch }
        />
      </Menu>
    );
  }

  render(){
    return (
      <div className="W2Header">
        <Header>
          <div className="logo" />
          { this.getMenuHTML() }
        </Header>
      </div>
    );
  }
}

export default W2Header;

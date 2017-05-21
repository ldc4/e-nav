import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Layout, BackTop } from 'antd';
const { Content } = Layout;
import W2Header from './common/W2Header/W2Header';
import W2Footer from './common/W2Footer/W2Footer';
import Nav from './app/Nav/Nav';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      data: {},    // 用于展示
      rawData: {}  // 保留原始数据
    };
  }

  componentDidMount(){
    axios.get(this.props.dataUrl)
      .then(res => {
        const data = res.data;
        this.setState({
          data,
          rawData: data
        });
      });
  }

  handleSearch(value){

    // 如果没有任何输入，就重置。
    if(!value){
      this.setState({
        data: this.state.rawData
      });
      return ;
    }

    let result = []; // 保存最终搜索结果

    // 第一层
    const { categories=[] } = this.state.rawData;

    if(_.isArray(categories)){
      _.forEach(categories, (category)=>{
        let isFound = false; // 标记是否被找到
        let categoryItem = JSON.parse(JSON.stringify(category)); // 复制对象，避免修改原始数据
        if(category.name.indexOf(value) !== -1){
          //categoryItem.isSearched = true; // 设置被搜索到的标记
          isFound = true;
        }

        // 第二层
        categoryItem.groups = [];
        const { groups=[] } = category;

        if(_.isArray(groups)){
          _.forEach(groups, (group)=>{
            let groupItem = JSON.parse(JSON.stringify(group)); // 复制对象，避免修改原始数据
            if(group.name.indexOf(value) !== -1){
              //groupItem.isSearched = true;
              isFound = true;
            }

            // 第三层
            groupItem.links = [];
            const { links=[] } = group;

            if(_.isArray(links)){
              _.forEach(links, (link)=>{
                let linkItem = JSON.parse(JSON.stringify(link)); // 复制对象，避免修改原始数据
                if(link.name.indexOf(value) !== -1){
                  //linkItem.isSearched = true;
                  isFound = true;
                }
                // 无论是否找到都要添加
                groupItem.links.push(linkItem);
              });
            }
            // 无论是否找到都要添加
            categoryItem.groups.push(groupItem);
          });
        }

        if(isFound){ // 如果没有找到的分类，就不添加进去
          result.push(categoryItem);
        }

      });
    }

    //console.log(result);

    // 改变状态，顺便把搜索的关键字keyword保存到数据中。
    this.setState({
      data: _.assign({}, this.state.rawData, { categories: result }, { keyword: value })
    });

  }

  render() {
    return (
      <div className="App">
        <Layout className="layout">

          <W2Header data={this.state.data} onSearch={ this.handleSearch } />

          <Content>
            <div style={{ padding: 24, minHeight: 520 }}>
              <Nav data={this.state.data} />
            </div>
          </Content>

          <W2Footer />

          <BackTop>
            <div className="ant-back-top-inner">↑</div>
          </BackTop>

        </Layout>
      </div>
    );
  }
}

export default App;

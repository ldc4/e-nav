import React from 'react';
import axios from 'axios';
import { Layout, BackTop } from 'antd';
const { Content } = Layout;
import W2Header from './common/W2Header/W2Header';
import W2Footer from './common/W2Footer/W2Footer';
import Nav from './app/Nav/Nav';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    axios.get(this.props.dataUrl)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      });
  }

  render() {
    return (
      <div className="App">
        <Layout className="layout">

          <W2Header data={this.state.data} />

          <Content>
            <div style={{ background: '#3f3f3f', padding: 24, minHeight: 500 }}>
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

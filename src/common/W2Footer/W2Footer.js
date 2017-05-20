import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

import './W2Footer.css';

class W2Footer extends React.Component {
  render() {
    return (
      <div className="W2Footer">
        <Footer style={{ textAlign: 'center' }}>
          <div>Weedustzhao © 2017</div>
        </Footer>
      </div>
    );
  }
}

export default W2Footer;

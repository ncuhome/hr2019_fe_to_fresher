import * as React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class BasicLayout extends React.Component {
  constructor(props: any) {
    super(props);

  }

  render() {
    return (
      <Layout style={{height: "100vh"}}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">这里是</Menu.Item>
          </Menu>
        </Header>
        <Sider 
            width={200} 
            style={{ 
              background: '#fff',
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />用户资料</span>}></SubMenu>
            </Menu>
          </Sider>
        <Layout>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content 
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
              }}
            >hhh</Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

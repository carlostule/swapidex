import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, Image } from 'antd'
import { RocketFilled, FileTextFilled, CodeFilled } from '@ant-design/icons';

import { Home, About, Docs, People, Planets, Films } from './pages/index'
import logo from './assets/sd-logo.png'

import './App.css'

const { Content, Footer, Sider } = Layout

function App() {
  const options = [
    { nav: 'Inicio', icon: RocketFilled },
    { nav: 'Documentación', icon: FileTextFilled },
    { nav: 'Créditos', icon: CodeFilled },
  ]

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          <Image width="100%" src={logo} preview={false} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={options.map(
            (option, index) => ({
              key: String(index + 1),
              icon: React.createElement(option.icon),
              label: <Link to={index === 0 ? '/' : index === 1 ? '/docs' : '/about'}>{option.nav}</Link>,
            }),
          )}
        />
      </Sider>
      <Layout style={{ marginLeft: '200px' }}>
        <Content>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/films" element={<Films />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/people" element={<People />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            }}
        >
          Swapidex ©2023 Desarrollado por Carlos Tule
        </Footer>
      </Layout>
    </Layout>
  )
}

export default App

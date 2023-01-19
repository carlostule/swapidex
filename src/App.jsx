import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Menu, Image } from 'antd'
import { RocketFilled, FileTextFilled, CodeFilled } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'

import { WHITE_COLOR } from './global/GlobalVars'
import { Home, About, Docs, People } from './pages/index'
import logo from './assets/sd-logo.png'

import './App.css'

const { Content, Footer, Sider, Header } = Layout

function App() {
  const options = [
    { nav: 'Inicio', icon: RocketFilled },
    { nav: 'Documentación', icon: FileTextFilled },
    { nav: 'Créditos', icon: CodeFilled },
  ]
  
  return (
    <Layout>
      {!isMobile && (
        <Sider style={styles.sider}>
          <div className="logo">
            <Image width="100%" src={logo} preview={false} />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={options.map(
              (option, index) => ({
                key: String(index + 1),
                icon: React.createElement(option.icon),
                label: <Link to={index === 0 ? '/' : index === 1 ? '/docs' : '/about'}>{option.nav}</Link>,
              }),
            )}
          />
        </Sider>
      )}
      <Layout style={{ marginLeft: !isMobile ? '200px' : '0px' }}>
        {isMobile && (
          <Header>
            <div style={styles.logo}>
              <Image style={styles.imageLogo} src={logo} preview={false} /> 
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              items={options.map(
                (option, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(option.icon),
                  label: <Link to={index === 0 ? '/' : index === 1 ? '/docs' : '/about'}>{option.nav}</Link>,
                }),
              )}
            />
          </Header>
        )}
        <Content style={styles.content}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/people" element={<People />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Content>
        <Footer style={styles.footer}>
          Swapidex ©2023 Desarrollado por Carlos Tule
        </Footer>
      </Layout>
    </Layout>
  )
}

const styles = {
  sider: {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    background: WHITE_COLOR,
    overflowY: 'auto',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  logo: {
    float: 'left',
    width: '120px',
    heigth: '120px',
  },
  imageLogo: {
    height: '50px',
    width: '100px',
  },
}

export default App

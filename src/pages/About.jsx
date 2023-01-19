import { Layout, Typography } from 'antd'
import { isMobile } from 'react-device-detect'

import credits from '../assets/credits.gif'
import { WHITE_COLOR } from '../global/GlobalVars'

const { Content, Header } = Layout
const { Title } = Typography

const About = () => (
    <Layout>
      {!isMobile && (
        <Header style={styles.header}>
          <Title level={2} style={styles.title}>Acerca del desarrollador</Title>
        </Header>
      )}
      <Content style={{ background: WHITE_COLOR }}>
        {isMobile && (
          <Title level={2} style={{ textAlign: 'center' }}>Acerca del desarrollador</Title>
        )}
        <img src={credits} style={styles.image}/>
      </Content>
    </Layout>
  )

const styles = {
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  title: {
    color: WHITE_COLOR,
    margin: '10px',
    padding: '0px',
    textAlign: 'center',
  },
}

export default About
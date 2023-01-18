import { Layout, Typography } from 'antd'

import useBreakpoint from '../hooks/useBreakpoint'
import credits from '../assets/credits.gif'
import { WHITE_COLOR } from '../global/GlobalVars'

const { Content, Header } = Layout
const { Title } = Typography

const About = () => {
  const breakpoint = useBreakpoint()
  return (
    <Layout>
      {breakpoint > 880 && (
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
        >
          <Title level={2} style={{ color: WHITE_COLOR, margin: '10px', padding: '0px', textAlign: 'center' }}>Acerca del desarrollador</Title>
        </Header>
      )}
      <Content style={{ background: WHITE_COLOR }}>
        {breakpoint <= 880 && (
          <Title level={2} style={{ textAlign: 'center' }}>Acerca del desarrollador</Title>
        )}
        <img src={credits} style={styles.image}/>
      </Content>
    </Layout>
  )
}

const styles = {
  image: {
    width: '100%',
    height: '100%',
  }
}

export default About
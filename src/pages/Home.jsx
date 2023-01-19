import React from 'react'
import { Layout, Row, Col, Space } from 'antd'

import { CategoryCard } from '../components'
import { WHITE_COLOR } from '../global/GlobalVars'

const { Content } = Layout

const categories = [
  {
    title: 'Personajes',
    description: '¿Qué tanto sabes de Star wars? Ayudanos a completar la información de cada personaje.',
    image: 'https://images.sellbrite.com/production/152272/P5157/fe69d90a-74f3-52b5-a51e-f8e595d17aa9.jpg',
    route: 'people',
  },
  /* Ya no hubo tiempo de completar esta sección :( {
    title: 'Planetas',
    description: 'Información sobre los planetas de Star Wars.',
    image: 'https://media.istockphoto.com/id/1408934114/es/vector/cohete-pixel-art-de-8-bits-en-el-espacio-exterior.jpg?b=1&s=612x612&w=0&k=20&c=qFPcj8ZpsqbhdB-VgMk4VEUykCP93u2GLVB82zUTyHg=',
    route: 'planets',
  },
  {
    title: 'Películas',
    description: 'Información sobre cada película que forma parte del universo Star Wars.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/c33cff19396913.562d9b346373e.png',
    route: 'films',
  }, */
]

const Home = () => {
  return (
    <Layout style={styles.layoutContainer}>
      <Content style={styles.homeContainer}>
        {/* <Row>
          <Col span={24}>
            <Title>Elige una categoría:</Title>
          </Col>
        </Row> */}
        <Row style={styles.cardsRow} justify="center">
          {categories.map((category, index) => (
            <Space wrap style={styles.spaceCard} key={`category-${index}`}>
              <Col span={8} xs={24} md={12} lg={8} xl={8} style={styles.cardsCol}>
                <CategoryCard title={category.title} description={category.description} image={category.image} route={category.route}/>
              </Col>
            </Space>
          ))}
        </Row>
      </Content>
    </Layout>
  )
}

const styles = {
  layoutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: WHITE_COLOR,
  },
  homeContainer: {
    padding: '2rem',
    width: '80%',
    background: WHITE_COLOR,
  },
  cardsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceCard:{
    display: 'flex',
    flex: 1,
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsCol: {
    minWidth: 250,
    maxWidth: 250,
    heigth: 400,
  }
}

export default Home

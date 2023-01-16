import React from 'react'
import { Layout, Typography, Row, Col, Space } from 'antd'

import { CategoryCard } from '../components'

const { Content } = Layout
const { Title } = Typography

const categories = [
  {
    title: 'Personajes',
    description: 'Información sobre cada personaje que formó parte de Star Wars.',
    image: 'https://images.sellbrite.com/production/152272/P5157/fe69d90a-74f3-52b5-a51e-f8e595d17aa9.jpg',
    route: 'people',
  },
  {
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
  },
]

const Home = () => {
  return (
    <Layout>
      <Content style={styles.homeContainer}>
        <Row>
          <Col span={24}>
            <Title>Elige una categoría:</Title>
          </Col>
        </Row>
        <Row style={styles.cardsRow} justify="space-around">
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
  homeContainer: {
    padding: '2rem',
    width: '80%'
  },
  cardsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
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

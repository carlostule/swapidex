import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'antd'

import logo from '../../assets/sd-logo.png'

const { Meta } = Card

const CategoryCard = ({ image = logo, title = 'Untitled', description = 'No description', route = '/' }) => {
  const navigate = useNavigate()
  return (
    <Card hoverable cover={<img alt={`${title} image`} src={image} width='100px' height='300px'/>} onClick={() => navigate(route)}>
      <Meta title={title} description={description} />
    </Card>
  )
}

export default CategoryCard

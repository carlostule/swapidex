import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Button, Typography, Row, Col, Modal } from 'antd'
import { Formik } from 'formik'

import { findAll, updateCharacter } from '../services/characters.mjs'

import { fetchData } from '../redux/actions/data-actions'
import {
  getSwLoading,
  getSwError,
  getSwData,
} from '../redux/selectors'

import { Tabledex, Spinner } from '../components'
import { WHITE_COLOR } from '../global/GlobalVars'

const { Header, Content } = Layout
const { Title } = Typography

const People = () => {
  const [allData, setAllData] = useState([])
  const [showInfo, setShowInfo] = useState(false)
  const [characterData, setCharacterData] = useState({})
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState([])
  const [showUpdateInfo, setShowUpdateInfo] = useState(false)
  const dispatch = useDispatch()
  const people = useSelector(getSwData)
  const errorPeople = useSelector(getSwError)
  const isLoadingPeople = useSelector(getSwLoading)

  const fetchCharactersFromDB = async () => {
    setLoading(true)
    const res = await findAll()

    setCharacters([...res])
    setLoading(false)
  }

  useEffect(() => {
    dispatch(fetchData({ category: 'people', page: 1 }))
    fetchCharactersFromDB()
  }, [])

  useEffect(() => {
    if (people?.results?.length > 0 && characters.length > 0) {
      let data = []
      people?.results?.forEach((peopleItem, index) => {
        let dbCharacter = characters.filter((character) => character.id === peopleItem.url) ?? []
        data.push({
          key: peopleItem.url,
          name: peopleItem.name,
          description: dbCharacter.length > 0 ? `Nació el ${peopleItem.birth_year}.` : 'Falta completar la información de este personaje.',
        })
      })
      
      setAllData(data)
    }
  }, [isLoadingPeople, loading])

  const getMorePeople = () => {
    setAllData([])
    if (people?.next) {
      dispatch(fetchData({ category: 'people', page: parseInt(people?.next.slice(-1)) }))
    }
  }

  const getLessPeople = () => {
    setAllData([])
    if (people?.previous) {
      dispatch(fetchData({ category: 'people', page: parseInt(people?.previous.slice(-1)) }))
    }
  }

  const handleInfo = (show, name) => {
    setShowInfo(show)
    let character = people?.results.filter(pItem => pItem.name === name)
    setCharacterData(character[0])
  }

  const handleUpdateInfo = (show) => {
    setShowUpdateInfo(show)
  }

  const handleClose = () => {
    setShowInfo(false)
    setShowUpdateInfo(false)
  }

  const moreData = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
        padding: '5px',
      }}
    >
      <Button type="primary" disabled={people?.next === null} onClick={getMorePeople}>Siguiente</Button>
    </div>
  )

  const lessData = (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
        padding: '5px',
      }}
    >
      <Button type="primary" disabled={people?.previous === null} onClick={getLessPeople}>Anterior</Button>
    </div>
  )

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Title level={2} style={{ color: WHITE_COLOR, margin: '10px', padding: '0px', textAlign: 'center' }}>Personajes de Star Wars</Title>
      </Header>
      <Content style={{ padding: '10px 50px' }}>
        <Row style={{ padding: '20px' }}>
          <Col>
            {lessData}
          </Col>
          <Col>
            {moreData}
          </Col>
        </Row>
        {allData && characters.length > 0 ? <Tabledex data={allData} dbCharacters={characters} loading={isLoadingPeople} handleInfo={handleInfo} handleUpdateInfo={handleUpdateInfo}/> : <Spinner />}
      </Content>
      <Modal title={characterData?.name} open={showInfo} onOk={handleClose} onCancel={handleClose}>
        <p>Hola mundo!</p>
      </Modal>
      <Modal title="Modificar información" open={showUpdateInfo} onOk={handleClose} onCancel={handleClose}>
        <p>Hola mundo!</p>
      </Modal>
    </Layout>
  )
}

export default People
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Modal,
  notification,
  Card,
  List,
} from 'antd'

import { findAll, deleteCharacter } from '../services/characters.mjs'

import { fetchData } from '../redux/actions/data-actions'
import {
  getSwLoading,
  getSwError,
  getSwData,
} from '../redux/selectors'

import useBreakpoint from '../hooks/useBreakpoint.js'

import { Tabledex, Spinner, CharacterForm } from '../components'
import { DARK_COLOR, WHITE_COLOR } from '../global/GlobalVars'

const { Header, Content } = Layout
const { Title } = Typography
const { Meta } = Card

const People = () => {
  const [allData, setAllData] = useState([])
  const [showInfo, setShowInfo] = useState(false)
  const [characterData, setCharacterData] = useState({})
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState(null)
  const [showUpdateInfo, setShowUpdateInfo] = useState(false)
  const [showAddInfo, setShowAddInfo] = useState(false)
  const [characterId, setId] = useState('')

  const dispatch = useDispatch()
  const people = useSelector(getSwData)
  const errorPeople = useSelector(getSwError)
  const isLoadingPeople = useSelector(getSwLoading)
  const [api, contextHolder] = notification.useNotification()
  const breakpoint = useBreakpoint()

  const fetchCharactersFromDB = async () => {
    setLoading(true)
    const res = await findAll()

    setCharacters([...res])
    setLoading(false)
  }

  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    })
  }

  useEffect(() => {
    dispatch(fetchData({ category: 'people', page: 1 }))
    fetchCharactersFromDB()
  }, [])

  useEffect(() => {
    let data = []
    let dbCharacter = []

    if (people?.results?.length > 0) {
      people?.results?.forEach((peopleItem) => {
        if (characters && characters.length > 0) {
          dbCharacter = characters.filter((character) => character.characterId === peopleItem.url.replaceAll('/', ''))
        }
        data.push({
          key: peopleItem.url.replaceAll('/', ''),
          name: peopleItem.name,
          description: dbCharacter.length > 0 ? `Nació el ${peopleItem.birth_year}.` : 'Falta completar la información de este personaje.',
        })
      })
    } 

    setAllData(data)
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

  const handleInfo = (show, id) => {
    console.log(show, id)
    setShowInfo(show)
    let character = characters.filter(pItem => pItem.characterId === id)
    setCharacterData(character[0])
  }

  const handleUpdateInfo = (show, id) => {
    setShowUpdateInfo(show)
    setId(id)
  }

  const handleAddInfo = (show, id) => {
    setShowAddInfo(show)
    setId(id)
  }

  const handleDeleteInfo = (id) => {
    deleteCharacter(id)
     .then(() => openNotificationWithIcon('success', 'Personaje eliminado', 'El personaje ha sido eliminado exitosamente.'))
     .then(() => setTimeout(window.location.reload(), 2000))
     .catch(() => openNotificationWithIcon('error', 'Personaje eliminado', 'La información del personaje no pudo ser eliminada.'))
  }

  const handleClose = () => {
    setShowUpdateInfo(false)
    setShowAddInfo(false)

    fetchCharactersFromDB()
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
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

  const addForm = (notificationFunction) => (
    <CharacterForm
      id={characterId}
      notificationFunction={notificationFunction}
      handleClose={handleClose}
      update={false}
    />
  )

  const updateForm = (notificationFunction) => {
    let charData = characters?.filter((character) => character.characterId === characterId)
    return (
      <CharacterForm
        id={characterId}
        name={charData[0]?.name}
        avatar={charData[0]?.avatar}
        miniAvatar={charData[0]?.miniAvatar}
        about={charData[0]?.about}
        gender={charData[0]?.gender}
        birth={charData[0]?.birth}
        homeworld={charData[0]?.homeworld}
        handleClose={handleClose}
        update={true}
        dbId={charData[0]?.id}
        notificationFunction={notificationFunction}
      />
    )
  }

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
        <Title level={2} style={{ color: WHITE_COLOR, margin: '10px', padding: '0px', textAlign: 'center' }}>Personajes de Star Wars</Title>
      </Header>
    )}
      <Content style={{ padding: breakpoint > 880 ? '10px 50px' : '10px', width: breakpoint > 880 ? 'auto' : '100%', background: WHITE_COLOR }}>
        {breakpoint <= 880 && (
          <Title level={2} style={{ textAlign: 'center' }}>Personajes de Star Wars</Title>
        )}
        <Row style={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
          <Col>
            {lessData}
          </Col>
          <Col>
            {moreData}
          </Col>
        </Row>
        {isLoadingPeople && (
          <div style={styles.spinner}>
            <Spinner size="large" />
          </div>
        )}
        {!isLoadingPeople &&
          <Tabledex
            data={allData}
            dbCharacters={characters ?? []}
            loading={isLoadingPeople}
            handleInfo={handleInfo}
            handleUpdateInfo={handleUpdateInfo}
            handleAddInfo={handleAddInfo}
            handleDeleteInfo={handleDeleteInfo}
            notificationInfo={openNotificationWithIcon}  
          />}
        {!isLoadingPeople && (
          <Row style={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <Col>
              {lessData}
            </Col>
            <Col>
              {moreData}
            </Col>
          </Row>
        )}
      </Content>
      <Modal
        title={null}
        open={showInfo}
        onCancel={handleCloseInfo}
        footer={null}
      >
        <Card
          cover={<div style={styles.avatarContent}><img alt={characterData?.name} src={characterData?.avatar} width={300} style={{ borderRadius: 10, margin: '10px' }}/></div>}
        >
          <Meta
            title={characterData?.name}
            description={(
              <List
                itemLayout="vertical"
                dataSource={[
                  { title: 'Acerca de', info: characterData?.about },
                  { title: 'Género', info: characterData?.gender },
                  { title: 'Año de nacimiento', info: characterData?.birth },
                  { title: 'Lugar de nacimiento', info: characterData?.homeworld },
                ]}
                size="small"
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.info}
                    />
                  </List.Item>
                )}
              />
            )}
          />
        </Card>
      </Modal>
      <Modal title="Agregar información" open={showAddInfo} onCancel={handleClose} footer={null}>
        {characters && addForm(openNotificationWithIcon)}
      </Modal>
      <Modal title="Modificar información" open={showUpdateInfo} onCancel={handleClose} footer={null}>
        {characters?.length > 0 && updateForm(openNotificationWithIcon)}
      </Modal>
      {contextHolder}
    </Layout>
  )
}

const styles = {
  avatarContent: {
    display: 'flex',
    width: '100%',
    marginTop: '1px',
    justifyContent: 'center',
    alignItems: 'center',
    background: DARK_COLOR,
  },
  spinner: {
    display: 'flex',
    padding: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export default People
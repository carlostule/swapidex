import { List, Skeleton, Avatar } from 'antd'

import { RED_COLOR, WHITE_COLOR } from '../../global/GlobalVars'

import useBreakpoint from '../../hooks/useBreakpoint'

const Tabledex = ({
  data = [],
  dbCharacters = [],
  loading = false,
  handleInfo = () => {},
  handleUpdateInfo = () => {},
  handleAddInfo = () => {},
  handleDeleteInfo = () => {},
  notificationInfo = () => {},
}) => {
  const breakpoint = useBreakpoint()

  return (
    <List
      itemLayout={breakpoint > 880 ? 'horizontal' : 'vertical'}
      bordered={true}
      dataSource={data}
      style={{ backgroundColor: WHITE_COLOR }}
      renderItem={(item) => {
        let character = dbCharacters?.filter((dbCharacter) => dbCharacter.characterId === item.key.replaceAll('/', '')) ?? []
        return (
        <List.Item
          actions={[
            character.length > 0 ? <a onClick={() => handleUpdateInfo(true, item.key)}>Modificar información</a> : <a onClick={() => handleAddInfo(true, item.key.replaceAll('/', ''))}>Añadir información</a>,
            character.length > 0 ? <a style={{ color: RED_COLOR }} onClick={() => handleDeleteInfo(character[0].id)}>Eliminar Información</a> : null,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar 
                size={{
                  xs: 64,
                  sm: 64,
                  md: 64,
                  lg: 64,
                  xl: 80,
                  xxl: 100,
                }}
                src={character[0]?.miniAvatar ?? "https://www.kindpng.com/picc/m/52-526072_unknown-character-hd-png-download.png"}
              />
            }
            title={<a onClick={() => character[0] ? handleInfo(true, character[0].characterId) : notificationInfo('warning', 'No hay información', 'No hay información sobre el personaje seleccionado.')}>{item.name}</a>}
            description={item.description}
          />
        </List.Item>
      )}}
    />
  )
}

export default Tabledex

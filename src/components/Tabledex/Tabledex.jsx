import { List, Skeleton, Avatar } from 'antd'

import { DARK_COLOR, WHITE_COLOR } from '../../global/GlobalVars'

const Tabledex = ({ data = [], dbCharacters = [], loading = false, handleInfo = () => {}, handleUpdateInfo = () => {} }) => {
  return (
    <List
      itemLayout="horizontal"
      loading={loading}
      bordered={true}
      dataSource={data}
      style={{ backgroundColor: WHITE_COLOR }}
      renderItem={(item) => {
        let character = dbCharacters.filter((dbCharacter) => dbCharacter.id === item.key) ?? []
        return (
        <List.Item
          actions={[character.length > 0 ? <a onClick={() => handleUpdateInfo(true)}>Modificar información</a> : <a>Añadir información</a>]}
        >
          <Skeleton title={false} loading={loading} active>
            <List.Item.Meta
              avatar={
                <Avatar 
                  size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                  }}
                  src={character[0]?.miniAvatar ?? "https://www.kindpng.com/picc/m/52-526072_unknown-character-hd-png-download.png"}
                />
              }
              title={<a onClick={() => handleInfo(true, item.name)}>{item.name}</a>}
              description={item.description}
            />
          </Skeleton>
        </List.Item>
      )}}
    />
  )
}

export default Tabledex

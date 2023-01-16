import { Spin } from 'antd'

const Spinner = () => (
  <div style={style.spinnerContainer}>
    <Spin />
  </div>
)

const style = {
  margin: '20px 0',
  marginBottom: '20px',
  padding: '30px 50px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
}

export default Spinner

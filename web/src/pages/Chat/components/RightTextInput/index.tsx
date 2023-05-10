import { Input, Spin, Tooltip } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useContent } from '../ContentProvider'
import styles from './index.module.less'

const { TextArea } = Input

function RightTextInput() {
  const { openModel1, msg, setMsg, handleSend } = useContent()

  const isPressed = openModel1

  return (
    <div className={styles.containerOut}>
      <div className={styles.container}>
        <TextArea
          placeholder="Send Message..."
          autoSize={{ minRows: 1 }}
          value={msg}
          onChange={(e) => { setMsg(e.target.value) }}
          bordered={false}
          style={{ width: '700px' }}
        />
      </div>
      <div className={styles.send}>
        {
          isPressed
            ? (
            <Spin />
              )
            : (
            <Tooltip title="发送">
              <SendOutlined onClick={handleSend} />
            </Tooltip>
              )
        }
      </div>
    </div>

  )
}

export default RightTextInput

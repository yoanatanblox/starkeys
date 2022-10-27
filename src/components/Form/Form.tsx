import { DownloadOutlined } from '@ant-design/icons'
import { Form as AndtForm, Button, Card, Input, InputNumber, Typography } from 'antd'

import { useAppState } from '../../hooks'
import styles from './Form.module.scss'
import { KeystoreFile } from './KeystoreFile'
import { Operators } from './Operators'

const { Item } = AndtForm
const { Title } = Typography

export function Form() {
  const { actions, operators, ssvAmount } = useAppState()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    console.log('operators', operators)
  }

  return (
    <AndtForm
      className={styles.Form}
      name="basic"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Card className={styles.Card}>
        <Item>
          <Title level={3}>Keystore file</Title>
          <KeystoreFile />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Please input Keystore password' }]}
        >
          <Title level={3}>Keystore password</Title>
          <Input.Password
            placeholder="Input password"
            // onChange={({ target }) => setPassword(target.value)}
            // value={password}
          />
        </Item>
        <Item>
          <Title level={3}>Operators</Title>
          <Operators />
        </Item>
        <Item name="ssv" rules={[{ required: true, message: 'Please input your SSV amount' }]}>
          <Title level={3}>SSV to deposit</Title>
          <InputNumber
            className={styles.InputNumber}
            placeholder="Input SSV amount"
            addonAfter="SSV"
            onChange={(value) => actions.setSsvAmount(value)}
            value={ssvAmount}
            type="number"
          />
        </Item>
      </Card>
      <Button
        className={styles.Submit}
        icon={<DownloadOutlined />}
        size="large"
        type="primary"
        shape="round"
        loading={false}
        htmlType="submit"
      >
        Generate KeyShare file
      </Button>
    </AndtForm>
  )
}

import { Text, View } from '@react-pdf/renderer'
import styles from './styles'
import Divider from './Divider'

export const About = ({ text }: any) => (
  <View>
    <Text
      style={{
        color: '#000',
        fontSize: '15',
      }}
    >
      Professional Summary
    </Text>
    <Divider />
    <Text style={styles.main__text}>{text}</Text>
  </View>
)
import { Text, View } from '@react-pdf/renderer'
import styles from './styles'

export const EmploymentHistoryItem = ({
    title,
    company,
    monthStart,
    yearStart,
    monthEnd,
    yearEnd,
    description,
    responsibilities,
} : any) => (
  <View style={{ paddingBottom: '20px' }}>
    <Text
      style={{
        color: '#000',
        fontSize: '13',
      }}
    >
      {title + ' - ' + company}
    </Text>
    <Text style={{ fontSize: '9', color: '#959ba6', paddingBottom: '5' }}>
      {monthEnd + ' ' + yearEnd + ' ' + '-' + ' ' + monthStart + ' ' + yearStart}
    </Text>
    <Text style={{ fontSize: '11' }}>{description}</Text>
    <Text style={{ fontSize: '11', marginLeft: '15px', marginTop: '4' }}>
      {responsibilities}
    </Text>
  </View>
)
import { PIXEL_FONT } from '@/constants/theme'
import { Text, TextInput } from 'react-native'

const defaultFont = { fontFamily: PIXEL_FONT }

for (const C of [Text, TextInput] as const) {
  C.defaultProps = { ...C.defaultProps, style: defaultFont }
}

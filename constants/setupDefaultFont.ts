import { PIXEL_FONT } from '@/constants/theme'
import { Text, TextInput } from 'react-native'

const defaultFont = { fontFamily: PIXEL_FONT }

type ComponentWithDefaultProps = {
  defaultProps?: { style?: object }
}

for (const C of [Text, TextInput] as const) {
  const comp = C as unknown as ComponentWithDefaultProps
  comp.defaultProps = { ...comp.defaultProps, style: defaultFont }
}

import { StyleSheet, Text, TextInput } from 'react-native'
import type { StyleProp, TextStyle } from 'react-native'

const NUNITO_BY_WEIGHT: Record<string, string> = {
  '200': 'Nunito_200ExtraLight',
  '300': 'Nunito_300Light',
  '400': 'Nunito_400Regular',
  '500': 'Nunito_500Medium',
  '600': 'Nunito_600SemiBold',
  '700': 'Nunito_700Bold',
  '800': 'Nunito_800ExtraBold',
  '900': 'Nunito_900Black',
  normal: 'Nunito_400Regular',
  bold: 'Nunito_700Bold',
}

const resolveNunitoFace = (style: TextStyle): string | null => {
  const family = style.fontFamily
  const mappable = !family || family === 'System' || family.startsWith('Nunito')
  if (!mappable) return null
  return NUNITO_BY_WEIGHT[String(style.fontWeight ?? '400')] ?? 'Nunito_400Regular'
}

// RN ignores fontWeight with custom fonts — wrap render to pick the Nunito face per weight.
type RenderableText = {
  render?: (props: { style?: StyleProp<TextStyle> }, ref: unknown) => unknown
}

for (const C of [Text, TextInput] as const) {
  const comp = C as unknown as RenderableText
  const originalRender = comp.render
  if (!originalRender) continue
  comp.render = function (props, ref) {
    const flat = StyleSheet.flatten(props.style) ?? {}
    const face = resolveNunitoFace(flat)
    if (!face) return originalRender.call(this, props, ref)
    return originalRender.call(
      this,
      {
        ...props,
        style: [props.style, { fontFamily: face, fontWeight: 'normal' as const }],
      },
      ref
    )
  }
}

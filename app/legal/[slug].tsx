import { useLocalSearchParams } from 'expo-router'
import { LegalDocumentBody } from '@/src/features/settings/components/LegalDocumentBody'

export default function LegalDocumentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  return <LegalDocumentBody slug={slug ?? ''} />
}

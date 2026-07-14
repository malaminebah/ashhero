import { Alert, Linking, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlowText } from '@/components/ui/flow-text'
import { useEmailAuthActions } from '@/src/features/auth/hooks/useEmailAuthActions'
import { useSessionStore } from '@/src/features/auth/sessionStore'
import { usePremium } from '@/src/features/premium/hooks/usePremium'
import { SettingsDivider } from './SettingsDivider'
import { SettingsRow } from './SettingsRow'
import { SettingsScreenHeader } from './SettingsScreenHeader'
import { SettingsSection } from './SettingsSection'

const APP_VERSION = Constants.expoConfig?.version ?? '1.0.0'

export const SettingsScreenBody = () => {
  const router = useRouter()
  const { signOut, pending: signOutPending } = useEmailAuthActions()
  const { isPremium } = usePremium()
  const isAnonymous = useSessionStore((s) => s.isAnonymous)

  const openLegal = (slug: 'terms' | 'privacy' | 'rules') => {
    router.push(`/legal/${slug}` as never)
  }

  const doLogout = async () => {
    const ok = await signOut()
    if (ok) router.replace('/auth/login' as never)
  }

  const onLogout = () => {
    if (!isAnonymous) {
      void doLogout()
      return
    }
    Alert.alert(
      'Session invité',
      'Sans compte, ta progression sera perdue en te déconnectant. Crée d\'abord ton compte pour la garder.',
      [
        { text: 'Créer mon compte', onPress: () => router.push('/auth/link-account' as never) },
        { text: 'Me déconnecter quand même', style: 'destructive', onPress: () => void doLogout() },
        { text: 'Annuler', style: 'cancel' },
      ]
    )
  }

  const onSoon = () => {
    Alert.alert('Bientôt disponible', 'Cette option arrive dans une prochaine mise à jour.')
  }

  const onContact = () => {
    void Linking.openURL('mailto:contact@ashhero.app?subject=Support%20AshHero')
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <StatusBar style="light" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-12 pt-2">
          <SettingsScreenHeader title="Réglages" onBack={() => router.back()} />

          <SettingsSection title="Compte">
            {isAnonymous ? (
              <>
                <SettingsRow
                  icon="person-add-alt"
                  label="Créer mon compte"
                  subtitle="Sauvegarde ta progression — e-mail + mot de passe"
                  onPress={() => router.push('/auth/link-account' as never)}
                />
                <SettingsDivider />
              </>
            ) : null}
            <SettingsRow
              icon="workspace-premium"
              label="AshHero Pro"
              subtitle={isPremium ? 'Abonnement actif' : 'Notes, avatars, objectifs perso…'}
              trailing={isPremium ? 'Actif' : undefined}
              onPress={() => router.push('/paywall' as never)}
            />
            <SettingsDivider />
            <SettingsRow
              icon="person-outline"
              label="Mon profil"
              subtitle={isAnonymous ? 'Session invité' : undefined}
              onPress={() => router.push('/(tabs)/profile' as never)}
            />
            <SettingsDivider />
            <SettingsRow
              icon="logout"
              label={signOutPending ? 'Déconnexion…' : 'Se déconnecter'}
              onPress={onLogout}
              disabled={signOutPending}
              showChevron={false}
            />
          </SettingsSection>

          <SettingsSection title="Application">
            <SettingsRow
              icon="notifications-none"
              label="Notifications"
              trailing="Bientôt"
              showChevron={false}
              onPress={onSoon}
            />
            <SettingsDivider />
            <SettingsRow icon="language" label="Langue" trailing="Français" showChevron={false} />
          </SettingsSection>

          <SettingsSection title="Aide">
            <SettingsRow
              icon="menu-book"
              label="Règles du jeu"
              onPress={() => openLegal('rules')}
            />
            <SettingsDivider />
            <SettingsRow icon="help-outline" label="Centre d'aide" onPress={onSoon} />
            <SettingsDivider />
            <SettingsRow icon="mail-outline" label="Nous contacter" onPress={onContact} />
          </SettingsSection>

          <SettingsSection title="Légal">
            <SettingsRow
              icon="description"
              label="Conditions d'utilisation"
              onPress={() => openLegal('terms')}
            />
            <SettingsDivider />
            <SettingsRow
              icon="privacy-tip"
              label="Politique de confidentialité"
              onPress={() => openLegal('privacy')}
            />
          </SettingsSection>

          <SettingsSection title="À propos">
            <SettingsRow icon="info-outline" label="Version" trailing={APP_VERSION} showChevron={false} />
          </SettingsSection>

          <FlowText className="mt-2 px-1 text-center text-[11px] leading-[18px] text-brand-locked">
            AshHero v{APP_VERSION} · accompagnement bienveillant
          </FlowText>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

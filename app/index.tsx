import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { styled } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { api } from '../src/lib/api'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import TimelineLogo from '../src/assets/timeline-logo.svg'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/5350b191957672da3c26',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '5350b191957672da3c26',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'timeline',
      }),
    },
    discovery,
  )

  async function handleGitHubOAuthCode(code: String) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data

    await SecureStore.setItemAsync('token', token)

    router.push('/memories')
  }

  useEffect(() => {
    // get url authentication
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'timeline',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params

      handleGitHubOAuthCode(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-5 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <TimelineLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your Story
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Highlight important moments in your life and share them (if you
            want) with the world!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Create Memory
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Done with 🧡 by Paulo Matos
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}

import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'

import * as SecureStore from 'expo-secure-store'

import { api } from '../src/lib/api'
import TimelineLogo from '../src/assets/timeline-logo.svg'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/5350b191957672da3c26',
}

export default function App() {
  const router = useRouter()

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

  return (
    <View className="flex-1 items-center px-5 py-10">
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
    </View>
  )
}

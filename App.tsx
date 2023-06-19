import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import TimelineLogo from './src/assets/timeline-logo.svg'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

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

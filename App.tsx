import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-950">
      <Text className="text-4xl font-bold text-sky-50">
        Starting Project...
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}

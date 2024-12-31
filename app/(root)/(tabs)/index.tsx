import React, { useEffect, useState } from "react"
import { Link } from "expo-router"
import { Text, View, Image } from "react-native"
import icons from "@/constants/icons"
import { fetchUserInfo } from "@/lib/appwrite"

interface UserInfo {
  $id: string
  name: string
  email: string
  avatar?: string
}

export default function Index() {
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    async function fetchData() {
      const userInfo: UserInfo | null = await fetchUserInfo()
      setUser(userInfo)
    }

    fetchData()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-blue-400 font-rubik text-2xl">
        Welcome to ReState
      </Text>
      {user ? (
        <Text className="text-green-500">Hello, {user.name}!</Text>
      ) : (
        <Text className="text-gray-500">Not logged in</Text>
      )}
      <Link href="/sign-in" className="text-red-500">
        Sign In
      </Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1" className="font-rubik">
        Property
      </Link>
      <Image source={icons.bell} className="size-5" />
    </View>
  )
}

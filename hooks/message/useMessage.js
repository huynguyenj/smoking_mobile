import { useFocusEffect } from "@react-navigation/native"
import { BASE_API_URL } from '@env'
import { useCallback, useState } from "react"
import { io } from "socket.io-client"
import { useEffect } from "react"

export default function useMessage() {
  const [socket, setSocket] = useState(null)
  const [roomId, setRoomId] = useState(null)
  useEffect(() => {
      if (!roomId) return
      const socketConnect = io(BASE_API_URL+'/chat', { query: {roomId}})
      setSocket(socketConnect)
      const cleanUp = () => {
            socketConnect.close()
      }
      return cleanUp
  }, [roomId])
  return { socket, setRoomId }
}
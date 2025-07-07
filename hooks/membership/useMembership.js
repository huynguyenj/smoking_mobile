import { useEffect, useState } from "react"
import privateApiService from "../../services/userPrivateApi"

export default function useMembership() {
  const [membershipInfo, setMembershipInfo] = useState()
  const [membershipId, setMembershipId] = useState()
  useEffect(() => {
      const handleGetMembership = async () => {
            try {
                  const response = await privateApiService.getMemberShipInfo(membershipId)
                  setMembershipInfo(response.data)
            } catch (error) {
                  console.log(error)
            }
      }
      if(membershipId) {
            handleGetMembership()
      }
  }, [membershipId])
  return  {membershipInfo, setMembershipId}
}
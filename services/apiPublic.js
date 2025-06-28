import { apiService } from "./apiConfig"

const publicApiService = {
  login: (loginInfo) =>
    apiService.publicApiClient.post('/v1/users/login', loginInfo),

  register: (registerInfo) =>
    apiService.publicApiClient.post('/v1/users/register', registerInfo),

  getNewToken: () =>
    apiService.publicApiClient.get('/v1/users/token')
}

export default publicApiService
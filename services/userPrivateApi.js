import { apiService } from "./apiConfig"

const privateApiService = {
  logout: () => apiService.privateApiClient.post('v1/users/logout'),

  getUserInfo: () => apiService.privateApiClient.get('/v1/users/info'),

  getMessageHistory: (receiverId) =>
    apiService.privateApiClient.post('/v1/users/message-history', { receiverId }),

  getFriendsList: () => apiService.privateApiClient.get('/v1/users/friend'),

  addFriend: (friendId) =>
    apiService.privateApiClient.post('/v1/users/friend', { friend_id: friendId }),

  searchFriend: (searchTerm) =>
    apiService.privateApiClient.post('/v1/users/info', { search: searchTerm }),

  createPlan: (payload) =>
    apiService.privateApiClient.post('/v1/users/plan', payload),

  getAllPlans: (page = 1, limit = 5) =>
    apiService.privateApiClient.post('/v1/users/plan/pagination', {
      page,
      limit
    }),

  getPlanDetail: (id) =>
    apiService.privateApiClient.get(`/v1/users/plan/edit/${id}`),

  deletePlanById: (id) =>
    apiService.privateApiClient.delete(`/v1/users/plan/edit/${id}`),

  updatePlanById: (id, payload) =>
    apiService.privateApiClient.put(`/v1/users/plan/edit/${id}`, payload),

  getMemberships: () =>
    apiService.privateApiClient.get('/v1/users/membership'),
  getMemberShipInfo: (membershipId) => apiService.privateApiClient.get(`/v1/users/membership/detail/${membershipId}`),

  createBlog: (formData) =>
    apiService.privateApiClient.post('/v1/users/blog', formData),

  getAllBlogs: (page = 1, limit = 6) =>
    apiService.privateApiClient.post('/v1/users/blog/public', {
      page,
      limit
    }),

  getBlogDetail: (id) =>
    apiService.privateApiClient.get(`/v1/users/blog/public/${id}`),

  createComment: (blogId, payload) =>
    apiService.privateApiClient.post(`/v1/users/comment/${blogId}`, payload),

  getCommentsByBlogId: (blogId, page = 1, limit = 5, sort = 'newest') =>
    apiService.privateApiClient.post(`/v1/users/blog/public/${blogId}`, {
      page,
      limit,
      sort: sort === 'oldest' ? 1 : -1
    }),

  deleteComment: (blogId, commentId) =>
    apiService.privateApiClient.delete(`/v1/users/comment/${blogId}/${commentId}`),

  getPaymentUrl: (data) =>
    apiService.privateApiClient.post('/v1/users/payment', data),

  getRankingList: (page, limit, sort) =>
    apiService.privateApiClient.post('/v1/users/rank', {
      page,
      limit,
      sort
    }),

  getMemberShipInfo: (membershipId) =>
    apiService.privateApiClient.get(`/v1/users/membership/detail/${membershipId}`),

  updateInformationCommon: (updateInfo) =>
    apiService.privateApiClient.put('/v1/users/info', updateInfo),

  updateProfile: (updateInfo) =>
    apiService.privateApiClient.put('/v1/users/profile', updateInfo),

  changePassword: (passwordData) =>
    apiService.privateApiClient.post('v1/users/profile', passwordData),

  changeAvatar: (avatar) =>
    apiService.privateApiClient.put('v1/users/profile/avatar', avatar),
  getAchievement: () => apiService.privateApiClient.get('/v1/users/achievement'),
  getUserCurrentRank: () => apiService.privateApiClient.get('/v1/users/rank')
}

export default privateApiService

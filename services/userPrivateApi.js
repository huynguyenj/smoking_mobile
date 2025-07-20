import { create } from "zustand";
import { apiService } from "./apiConfig";

const privateApiService = {
  logout: () => apiService.privateApiClient.post("v1/users/logout"),

  getUserInfo: () => apiService.privateApiClient.get("/v1/users/info"),

  getMessageHistory: (receiverId) =>
    apiService.privateApiClient.post("/v1/users/message-history", {
      receiverId,
    }),

  getFriendsList: () => apiService.privateApiClient.get("/v1/users/friend"),

  addFriend: (friendId) =>
    apiService.privateApiClient.post("/v1/users/friend", {
      friend_id: friendId,
    }),

  searchFriend: (searchTerm) =>
    apiService.privateApiClient.post("/v1/users/info", { search: searchTerm }),

  getInitialState: () =>
    apiService.privateApiClient.get("v1/users/initial-cigarette"),

  checkCompleteStage: (id, payload) =>
    apiService.privateApiClient.post(`v1/users/plan/edit/${id}`, payload),

  createPlan: (payload) =>
    apiService.privateApiClient.post("/v1/users/plan", payload),

  getAllPlans: (page = 1, limit = 5, sort = -1) =>
    apiService.privateApiClient.post("/v1/users/plan/pagination", {
      page,
      limit,
      sort
    }),
  getAllPlanOfUser: () => apiService.privateApiClient.get('/v1/users/plan'),
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
    apiService.privateApiClient.post("/v1/users/blog", formData),

  getAllBlogs: (page = 1, limit = 6) =>
    apiService.privateApiClient.post("/v1/users/blog/public", {
      page,
      limit,
    }),

  getMyBlogs: (page = 1, limit = 6) =>
    apiService.privateApiClient.post("/v1/users/blog/private", {
      page,
      limit,
    }),

  deleteBlog: (id) =>
    apiService.privateApiClient.delete(`/v1/users/blog/private/edit/${id}`),

  updateBlog: (BlogId, payload) =>
    apiService.privateApiClient.put(
      `/v1/users/blog/private/edit/${BlogId}`,
      payload
    ),

  getBlogDetail: (id) =>
    apiService.privateApiClient.get(`/v1/users/blog/public/${id}`),

  createComment: (blogId, payload) =>
    apiService.privateApiClient.post(`/v1/users/comment/${blogId}`, payload),

  getCommentsByBlogId: (blogId, page = 1, limit = 5, sort = "newest") =>
    apiService.privateApiClient.post(`/v1/users/blog/public/${blogId}`, {
      page,
      limit,
      sort: sort === "oldest" ? 1 : -1,
    }),

  deleteComment: (blogId, commentId) =>
    apiService.privateApiClient.delete(
      `/v1/users/comment/${blogId}/${commentId}`
    ),

  getPaymentUrl: (data) =>
    apiService.privateApiClient.post("/v1/users/payment", data),

  getRankingList: (page, limit, sort) =>
    apiService.privateApiClient.post("/v1/users/rank", {
      page,
      limit,
      sort,
    }),

  getAllCigarettes: (page = 1, limit = 5) =>
    apiService.privateApiClient.post("/v1/users/cigarettes/pagination", {
      page,
      limit,
    }),

  createCigarette: (formData) =>
    apiService.privateApiClient.post("/v1/users/cigarette", formData),

  getCiggrateDetail: (id) =>
    apiService.privateApiClient.get(`/v1/users/cigarette/${id}`),

  updateCigarette: (cigaretteId, formData) =>
    apiService.privateApiClient.put(
      `/v1/users/cigarette/${cigaretteId}`,
      formData
    ),
  deleteCigarette: (cigaretteId) =>
    apiService.privateApiClient.delete(`/v1/users/cigarette/${cigaretteId}`),

  getMemberShipInfo: (membershipId) =>
    apiService.privateApiClient.get(
      `/v1/users/membership/detail/${membershipId}`
    ),

  updateInformationCommon: (updateInfo) =>
    apiService.privateApiClient.put("/v1/users/info", updateInfo),

  updateProfile: (updateInfo) =>
    apiService.privateApiClient.put("/v1/users/profile", updateInfo),

  changePassword: (passwordData) =>
    apiService.privateApiClient.post("v1/users/profile", passwordData),

  changeAvatar: (avatar) =>
    apiService.privateApiClient.put('v1/users/profile/avatar', avatar),
  getAchievement: () => apiService.privateApiClient.get('/v1/users/achievement'),
  getUserCurrentRank: () => apiService.privateApiClient.get('/v1/users/rank'),
  createInitialState: (data) => apiService.privateApiClient.post('/v1/users/initial-cigarette', data),
  getInitialStatePagination: (data) => apiService.privateApiClient.post('/v1/users/initial-cigarette/pagination', data),
  getDetailInitialState: (id) => apiService.privateApiClient.get(`/v1/users/initial-cigarette/edit/${id}`),
  updateInitialState: (id, data) => apiService.privateApiClient.put(`/v1/users/initial-cigarette/edit/${id}`, data),
  deleteInitialState: (id) => apiService.privateApiClient.delete(`/v1/users/initial-cigarette/edit/${id}`) 
}

export default privateApiService;

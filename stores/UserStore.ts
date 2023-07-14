export const useUserStore = defineStore("UserStore", {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getIsAdmin: (state) => state.isAdmin,
  },
  actions: {
    setIsAutheticated(state: boolean) {
      this.isAuthenticated = state;
    },
    setIsAdmin(state: boolean) {
      this.isAdmin = state;
    },
    flushUserStore() {
      this.isAuthenticated = false;
      console.log("flushed user store");
    },
  },
});

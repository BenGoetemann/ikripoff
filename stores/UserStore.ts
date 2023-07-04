export const useUserStore = defineStore("UserStore", {
  state: () => ({
    isAuthenticated: false,
  }),
  getters: {
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    setIsAutheticated(state: boolean) {
      this.isAuthenticated = state;
    },
    flushUserStore() {
      this.isAuthenticated = false;
      console.log("flushed user store");
    },
  },
});

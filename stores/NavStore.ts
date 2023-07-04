
export const useNavStore = defineStore("NavStore", {
  state: () => ({ open: true, currentPage: "" }),
  actions: {
    trigger() {
      this.open = !this.open;
    },
    setCurrentPage(slug: string) {
      this.currentPage = slug;
    },
  },
});

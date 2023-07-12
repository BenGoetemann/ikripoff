export const useProjectOverviewStore = defineStore("ProjectOverview", {
  state: () => ({ mode: "list-view", tab: "übersicht" }),
  actions: {
    setMode(slug: string) {
      this.mode = slug;
    },
    setTab(slug: string) {
      this.tab = slug;
    },
  },
});

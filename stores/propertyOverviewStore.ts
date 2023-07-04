export const usePropertyOverviewStore = defineStore("PropertyOverview", {
  state: () => ({ mode: "kanban-board", tab: "übersicht" }),
  actions: {
    setMode(slug: string) {
      this.mode = slug;
    },
    setTab(slug: string) {
      this.tab = slug;
    },
  },
});

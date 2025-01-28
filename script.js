const app = Vue.createApp({
  data() {
    return {
      searchInput: "",
      dataColumns: ["title", "topic", "views"],
      dataset: [
        { title: 'Unity vs Construct 3 | What Is The Best Game Engine?', topic: "Game Development", views: 1 },
        { title: 'Unity vs Unreal Engine 4 | What Is The Ultimate Game Engine?', topic: "Game Development", views: 1 },
        { title: 'Android Studio vs Xcode vs Google Flutter | DEBATE', topic: "App Development", views: 2 },
        { title: 'How to Make Passive Income as a Programmer 🤑', topic: "General Programming", views: 1 },
        { title: 'Is watching videos at 2x speed better for you?', topic: "General Programming", views: 1 },
        { title: 'Unity Asset Store vs Unreal Marketplace | Which Is Better?', topic: "Game Development", views: 1 },
        { title: 'Unity vs Unreal: Which Engine Makes You More Money', topic: "Game Development", views: 2 },
        { title: 'Unity Bought Bolt | Visual Scripting for Game Developers', topic: "Game Development", views: 1 }
      ]
    }
  }
})

app.component("database-website-component", {
  template: '#grid-template',
  props: {
    entries: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    return {
      sortKey: '',
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1, o)), {})
    }
  },
  computed: {
    filteredData() {
      let data = this.entries
      if (this.filterKey) {
        data = data.filter(row =>
          Object.keys(row).some(key =>
            String(row[key]).toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1
          )
        )
      }
      const key = this.sortKey
      if (key) {
        const order = this.sortOrders[key]
        data = data.slice().sort((a, b) => {
          a = a[key]
          b = b[key]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

app.mount("#database-website")
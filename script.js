 const app = Vue.createApp({

  el:"#database-website",
  data(){
    return {
      searchInput:"",
      dataColumns:["title", "topic", "views"],


 dataset:[
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
  template:"#grid-template",
  props:{
    entries: Array,
    columns:Array,
    filterkey: String
  },
  data: function(){
    return {
      sortKey:""
    }
  },
  computed:{
    filteredTitles: function(){
      const sortKey= this.sortKey

      const filterkey= this.filterkey && this.filterkey.toLowerCase()
      
      const order= this.sortColumns[sortKey] || 1

      let entries = this.entries

      if(filterkey){
        entries=entries.filter(function(row){
          return Object.keys(row).some(function(key){
            String(row[key])
            .toLowerCase()
            .indexOf(filterkey) > -1
          })
        })
      }
      if (sortKey){
        entries= entries.slice().sort(function(x,y){
          x=x[sortKey]
          y=y[sortKey]
          return (x === y ? 0 : x > y ? 1 : -1)* order
        })
      }
      return entries
    },

      sortColumns(){
        const sortedColumns = {}

        this.columns.array.forEach(function(key) {
          sortedColumns[key]= 1
          
        })
        return sortedColumns
      },
      methods: {
        capitaliza(insputString){
          return insputString.charAt(0).toUpperCase() + insputString.slice(1)
        },
        sortBy(key) {
          this.sortKey= key
          this.sortColumns[key]= this.sortColumns[key] * -1
        }
      }
    }
  })

  app.mount("#database-website")
<template>
     <div class="pt-2 text-gray-600">
        <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search" name="search" v-model="search" placeholder="Search"
          autocomplete="off">
        <div class="px-5 py-2 pr-16"
        v-if="search !== ''">
          <p class="cursor-pointer bg-gray-200" 
          v-for="(item, index) in filteredList" :key="index" @click="() => selected(item)">
             {{item.name}}
          </p>
        </div>
      </div>
</template>

<script>
import { db } from '../firebaseDB.js';

export default {
  name: 'MealSearch',
  mounted() {
    db.collection('meals').onSnapshot((snapshotChange) => {
      this.meals= [];
      snapshotChange.forEach((doc) => { 
        this.meals.push({
          key: doc.id,
          name: doc.data().name,
          carbonValue: doc.data().carbon_value
        })
      });
    });
  },
  data() {
    return {
      search: '',
      meals: [],
    }
  },
  methods: {
    selected(item) {
      this.$emit('meal-selected', item)
      this.search = ''
    }
  },
  computed: {
    filteredList() {
      let filList = []
      filList = this.meals.filter(meal => {
        return meal.name.toLowerCase().startsWith(this.search.toLowerCase())
      });
      
      if(filList.length === 0) {
        filList.push ({
          key: "custom",
          name: "Create a custom item..",
          carbonValue: 0
        })
      }

      return filList;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

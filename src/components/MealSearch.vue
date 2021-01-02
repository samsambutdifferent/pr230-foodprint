<template>
        <div class="w-full">
          <FullWInput
          nameProp="searchMeals" placeholderProp="Enter the name of your meal.." :valueProp="search"
          v-on:valueChanged="seachMeals"/>
          <div v-if="search !== ''">
              <div class="shadow bg-white w-full px-5 flex"
              v-for="(item, index) in filteredList" :key="index" @click="() => selected(item)">
                
                  <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                      <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                          <div class="w-full items-center flex">
                              <div class="">
                                  <a class="truncate w-full normal-case font-normal -mt-1 text-gray-600">
                                    {{item.name}}
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
</template>

<script>
import { db } from '../firebaseDB.js';
import FullWInput from './FullWInput.vue'

export default {
  name: 'MealSearch',
  components: {
    FullWInput,
  },
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
      filteredList: []
    }  
  },
  methods: {
    selected(item) {
      this.$emit('meal-selected', item)
      this.search = ''
      this.changePage()
    },
    changePage() {
      this.$emit('changePage', 'IngredientEditor') 
    },
    seachMeals(val) {
      this.search = val
      let filList  = []
      filList = this.meals.filter(meal => {
        return meal.name.toLowerCase().includes(this.search.toLowerCase())
      });

      filList.push ({
          key: "custom",
          name: "Create a custom item..",
          carbonValue: 0
      })

      this.filteredList = filList;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

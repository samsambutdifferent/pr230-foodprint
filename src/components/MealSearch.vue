<template>
        <div class="w-full">
                <div class="w-full my-2 p-1 bg-white flex">
                  <input class="w-full border-b-2 border-gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
                  type="text" name="search" v-model="search" @input="seachMeals" placeholder="Let's find that foodprint"
                  autocomplete="off">
                </div>
                <div v-if="search !== ''">
                    <div class="shadow bg-white w-full px-5 flex"
                    v-for="(item, index) in filteredList" :key="index" @click="() => selected(item)">
                      
                        <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
                            <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                                <div class="w-full items-center flex">
                                    <div class="">
                                        <div class="truncate w-full normal-case font-normal -mt-1 text-gray-600">
                                          {{item.name}}
                                        </div>
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
      filteredList: []
    }
  },
  methods: {
    selected(item) {
      this.$emit('meal-selected', item)
      this.search = ''
    },
    seachMeals() {
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

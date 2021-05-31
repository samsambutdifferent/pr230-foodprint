<template>
        <div class="w-full">

        <div class="text-gray-800 relative pb-10">
          <p>
          The most accurate way to find out how sustainable your meal is in 3 easy steps. Find out more about us here <a class="cursor-pointer bg-gray-200" @click="() => goToAboutPage()">About</a>
          </p>

          <StepBox title="Step 1:" text="Enter the name of your meal below:"/>
        </div>

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
import StepBox from './StepBox.vue'

export default {
  name: 'MealSearch',
  components: {
    FullWInput,
    StepBox
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
      let meal = item
      let ingredients = []

      if(meal.key != 'custom' || meal.key != undefined) {
        db.collection('meals').doc(item.key).collection('ingredients').onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
              ingredients.push({
                  name: doc.data().name,
                  weight: doc.data().weight,
                  matched: doc.data().matched
              })
          });
        });
        this.$emit('mealSelected', meal)
        this.$emit('ingredientsSelected', ingredients)
      }
      else {
        this.$emit('mealSelected', meal)
        this.$emit('ingredientsSelected', ingredients)
      }

      this.$emit('searchInput', this.search)
      this.search = ''
      this.changePage()
    },
    changePage() {
      this.$emit('changePage', 'MealOutput') 
    },
    goToAboutPage(){
      this.$emit('changePage', 'AboutPage') 
    },
    seachMeals(val) {
      this.search = val
      let filList  = []
      filList = this.meals.filter(meal => {
        return meal.name.toLowerCase().startsWith(this.search.toLowerCase())
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

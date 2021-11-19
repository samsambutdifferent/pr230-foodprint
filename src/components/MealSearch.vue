<template>
        <div class="w-full">
        <div class="text-gray-800 relative pb-10">
          <p>
          The most accurate way to find out how sustainable your meal is in 2 easy steps. Find out more about us <a class="cursor-pointer bg-gray-200" @click="() => goToAboutPage()">here</a>
          </p>

          <StepBox title="Step 1:" text="Enter the name of your meal below:"/>
        </div>

          <MealSearchBar
          v-on:mealSelected=mealSelected
          v-on:ingredientsSelected=ingredientsSelected
          v-on:updatedSearchValues=updatedSearchValues
          ></MealSearchBar>

        </div>
</template>

<script>
import { db } from '../firebaseDB.js';
import StepBox from './StepBox.vue'
import MealSearchBar from './MealSearchBar.vue'

export default {
  name: 'MealSearch',
  components: {
    StepBox,
    MealSearchBar
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
      meals: [],
      filteredList: [],
      selectedMeal: "",
      selectedIngredients: ""
    }  
  },
  methods: {

    mealSelected(item) {
      this.selectedMeal = item
    },
    ingredientsSelected(ingredients) {
      this.selectedIngredients = ingredients
    },
    updatedSearchValues() {
      this.$emit('mealSelected', this.selectedMeal)
      this.$emit('ingredientsSelected', this.selectedIngredients)
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

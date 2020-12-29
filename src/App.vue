<template>
  <div class="flex flex-col items-center">
    <div class="relative flex flex-col items-center">
      <MealSearch
      class="w-screen my-60 md:my-80 pr-16 pl-16 lg:pr-32 lg:pl-32 mr-8 ml-8 relative"
      v-on:meal-selected="mealSelected"></MealSearch>
      <IngredientEditor
      class="w-screen pr-16 pl-16 lg:pr-32 lg:pl-32 mr-8 ml-8 relative"
      :meal=selectedMeal
      ></IngredientEditor>
    </div>
  </div>
</template>

<script>
import MealSearch from './components/MealSearch.vue'
import IngredientEditor from './components/IngredientEditor.vue'

export default {
  name: 'App',
  components: {
    MealSearch,
    IngredientEditor
  },
  data() {
    return {
      selectedMeal: ""
    }
  },
  methods: {
    mealSelected(item) {
      this.selectedMeal = item
    }
  },
  provide() {
      return {
        selected: "HELLO"
      };
    },
}
</script>

<style>
</style>

<template>
  <div class="container">
    <div class="mx-16 my-8 grid gap-4 grid-cols-1">
      <HeaderComponent class="relative mx-auto"></HeaderComponent>
      <MealSearch class="relative mx-auto"
      v-on:meal-selected="mealSelected"></MealSearch>
      <IngredientEditor class="relative mx-auto"
      :meal=selectedMeal
      ></IngredientEditor>
      <div class="relative mx-auto">
        <button class="bg-green-200  h-10 px-5 pr-16 rounded-lg text-">calculate</button>
      </div>
    </div>
  </div>
</template>

<script>
import MealSearch from './components/MealSearch.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import IngredientEditor from './components/IngredientEditor.vue'

export default {
  name: 'App',
  components: {
    MealSearch,
    HeaderComponent,
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

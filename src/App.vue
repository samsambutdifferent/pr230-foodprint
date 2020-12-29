<template>
  <HeaderComponent></HeaderComponent>
  <div class="flex flex-col items-center">
    <div class="relative flex flex-col items-center">
      <transition name="slide-fade" mode="out-in">
        <component
        class="w-screen my-60 md:my-80 pr-16 pl-16 lg:pr-32 lg:pl-32 mr-8 ml-8 relative"
        v-bind:is=currentScreen
        v-on:meal-selected=mealSelected></component>
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MealSearch from './components/MealSearch.vue'
import IngredientEditor from './components/IngredientEditor.vue'
import { computed } from "vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MealSearch,
    IngredientEditor
  },
  data() {
    return {
      selectedMeal: {},
      currentScreen: "MealSearch",
    }
  },
  methods: {
    mealSelected(item) {
      this.selectedMeal = item
      this.currentScreen = "IngredientEditor"
    },
  },
  provide() {
    return {
      meal: computed(() => this.selectedMeal)
    }
  }
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>

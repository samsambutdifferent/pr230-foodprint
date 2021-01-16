<template>
  <HeaderComponent></HeaderComponent>
    <div class="flex flex-col">
    <div
    class="cursor-pointer text-gray-400 my-5 pr-16 pl-16 lg:pr-32 lg:pl-32 relative">
      <a v-if="currentComponentName != 'MealSearch'" @click="() => backPage()">back</a>
    </div>
    <div class="relative flex flex-col items-center my-40 md:my-60">
      <transition name="slide-fade" mode="out-in">
        <component
        class="w-screen pr-16 pl-16 lg:pr-32 lg:pl-32 mr-8 ml-8 relative"
        v-bind:is=currentComponentName
        v-on:mealSelected=mealSelected
        v-on:ingredientsSelected=ingredientsSelected
        v-on:changePage=changePage
        ></component>
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MealSearch from './components/MealSearch.vue'
import MealOutput from './components/MealOutput.vue'
import { computed } from "vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MealSearch,
    MealOutput
  },
  data() {
    return {
      selectedMeal: {},
      selectedIngredients: [],
      currentComponentName: "MealSearch"
    }
  },
  methods: {
    mealSelected(item) {
      this.selectedMeal = item
    },
    ingredientsSelected(ingredients) {
      this.selectedIngredients = ingredients
    },
    changePage(val) {
      this.currentComponentName = val
    },
    backPage() {
      switch(this.currentComponentName) {
        case "MealOutput":
          this.changePage("MealSearch")
          break
        default:
          // code block
          this.changePage("MealSearch")
          break
      }
    }
  },
  provide() {
    return {
      mealInject: computed(() => this.selectedMeal),
      ingredientsInject: computed(() => this.selectedIngredients)
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

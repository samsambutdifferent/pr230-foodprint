<template>
  <HeaderComponent></HeaderComponent>
  <div class="flex flex-col">
    <div
    class="cursor-pointer text-gray-400 my-5 pr-16 pl-16 lg:pr-32 lg:pl-32 relative">
      <a v-if="componentIndex != 0" @click="() => backPage()">back {{}}</a>
    </div>
    <div class="relative flex flex-col items-center my-60 md:my-80">
      <transition name="slide-fade" mode="out-in">
        <component
        class="w-screen pr-16 pl-16 lg:pr-32 lg:pl-32 mr-8 ml-8 relative"
        v-bind:is=currentComponentName
        v-on:meal-selected=mealSelected
        v-on:carbonValue=carbonValueCalculated
        v-on:forwardPage=forwardPage
        v-on:backPage=backPage></component>
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import MealSearch from './components/MealSearch.vue'
import IngredientEditor from './components/IngredientEditor.vue'
import CarbonOutput from './components/CarbonOutput.vue'
import { computed } from "vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    MealSearch,
    IngredientEditor,
    CarbonOutput
  },
  data() {
    return {
      selectedMeal: {},
      carbonValue: 0,
      componentIndex: 0
    }
  },
  computed: {
    currentComponentName() {
      switch(this.componentIndex) {
        case 0:
          // code block""
          return "MealSearch"
        case 1:
          // code block
          return "IngredientEditor"
        case 2:
          // code block
          return "CarbonOutput"
        default:
          // code block
          return "MealSearch"
      }
    }
  },
  methods: {
    mealSelected(item) {
      this.selectedMeal = item
    },
    carbonValueCalculated(val) {
      this.carbonValue = val
    },
    forwardPage() {
      this.componentIndex++
    },
    backPage() {
      this.componentIndex--
    }
  },
  provide() {
    return {
      meal: computed(() => this.selectedMeal),
      carbonValue: computed(() => this.carbonValue)
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

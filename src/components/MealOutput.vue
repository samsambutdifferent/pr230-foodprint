<template>
    <div class="w-full  "> 
        <IngredientEditor
        v-on:carbonValue="carbonValueCalculated"
        v-on:loadingResults="changeLoadingResults"
        />

        <CarbonOutput
        v-if="carbonValue!=0"
        />
        
        <div v-if="loadingResults" class="flex justify-center pt-20">
          <pulse-loader
            class="align-content: center;"
           :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>

    </div>
</template>

<script>
import IngredientEditor from './IngredientEditor.vue'
import CarbonOutput from './CarbonOutput.vue'
import { computed } from "vue";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
  name: 'MealOutput',
  inject: ['carbonValueInject','loadingResultsInject'],  
  components: {
      CarbonOutput,
      IngredientEditor,
      PulseLoader
  },
  data() {
      return {
        carbonValue: 0,
        loadingResults: false
      }
  },
  methods: {
    carbonValueCalculated(val) {
        this.carbonValue = val
    },
    changeLoadingResults() {
      this.loadingResults = !this.loadingResults
    }
  },
provide() {
    return {
      carbonValueInject: computed(() => this.carbonValue),
      loadingResultsInject: computed(() => this.loadingResults)
    }
  }
}
</script>

<style scoped>
</style>

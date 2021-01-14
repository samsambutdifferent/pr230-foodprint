<template>
    <div class="w-full"> 
        <IngredientEditor
        v-on:carbonValue="carbonValueCalculated"
        />

        <CarbonOutput
        v-if="carbonValue!=0"
        />
carbonValue
    </div>
</template>

<script>
import IngredientEditor from './IngredientEditor.vue'
import CarbonOutput from './CarbonOutput.vue'
import { computed } from "vue";


export default {
  name: 'MealOutput',
  inject: ['carbonValueInject'],  
  components: {
      CarbonOutput,
      IngredientEditor
  },
  data() {
      return {
        carbonValue: 0,
      }
  },
  methods: {
    carbonValueCalculated(val) {
        this.carbonValue = val
    }
  },
provide() {
    return {
      carbonValueInject: computed(() => this.carbonValue)
    }
  }
}
</script>

<style scoped>
</style>

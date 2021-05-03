<template>
    <div v-if="equivalent !== {}">
        is equal to: {{roundTo3decPlaces(equivalentValue)}} {{units}}        
    </div>
</template>

<script>
import roundTo3decPlaces from '../mixins/helper'

export default {
  name: 'CarbonOutput',
  mixins: [roundTo3decPlaces],
  props: ['co2eProp', 'equivalentProp'],
  data() {
    return {
        equivalent: this.equivalentProp
    }
  },
  computed: {
      equivalentValue() {
          return this.co2eProp / this.equivalentProp['value'] 
      },
      units() {
          return this.equivalent['unit']
      }
  },
}
</script>

<style scoped>
</style>

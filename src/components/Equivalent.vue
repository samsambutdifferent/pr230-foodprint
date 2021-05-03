<template>
    <div v-if="equivalent !== {}">
        is equal to: {{numberWithCommas(rounding(equivalentValue))}} {{units}}        
    </div>
</template>

<script>
import rounding from '@/mixins/helper'
import numberWithCommas from '@/mixins/helper'

export default {
  name: 'CarbonOutput',
  mixins: [rounding, numberWithCommas],
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

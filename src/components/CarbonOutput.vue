<template>
    <div>
    <div class="w-full pl-20 pb-10">
        Assuming you eat this meal <input class="w-8 bg-gray-200" type="number" v-model=timesEatenPerWeek> times per week
    </div>
    <div class="pl-20 grid grid-cols-1 sm:grid-cols-8 gap-2">
        <div class="">
            1 meal: <br>
            {{roundTo3decPlaces(co2e)}} co2ekg
        </div>
        <div>
            1 week: <br>
            {{roundTo3decPlaces(co2ePerWeek)}} co2ekg
        </div>
        <div>
            1 year: <br>
            {{roundTo3decPlaces(co2ePerYear)}} co2ekg
        </div>
        <div>
            lifetime ({{avgUKLifespan}} years UK average): <br>
            {{roundTo3decPlaces(co2ePerLifetime)}} co2ekg
        </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'CarbonOutput',
  inject: ['carbonValue'],
  data() {
    return {
        co2e: this.carbonValue,
        timesEatenPerWeek: 2,
        avgUKLifespan: 79.4
    }
  },
  computed: {
      co2ePerWeek() {
          return this.co2e * this.timesEatenPerWeek
      },
      co2ePerYear() {
          return this.co2ePerWeek * 52
      },
      co2ePerLifetime() {
          return this.co2ePerYear * this.avgUKLifespan
      },
  },
  methods: {
      roundTo3decPlaces(val) {
          return parseFloat(val).toFixed(3)
      }
  }
}
</script>

<style scoped>
</style>

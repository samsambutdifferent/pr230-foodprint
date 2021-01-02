<template>
    <div>
        <div class="w-full pl-20 pb-10">

            <div class="pb-2">
                co2ekg of meal:
                <span class="font-bold">{{roundTo3decPlaces(co2e)}}</span>
            </div>

            <div class="pb-2">
                Assuming you eat this meal <input class="w-8 bg-gray-200" type="number" v-model=timesEatenPerWeek> times per week
            </div>

            </div>
            <div class="pl-20 grid grid-cols-1 sm:grid-cols-8 gap-2">
                <div>
                    1 week: <br>
                    <span class="font-bold">{{roundTo3decPlaces(co2ePerWeek)}}</span> co2ekg
                </div>
                <div>
                    1 year: <br>
                    <span class="font-bold">{{roundTo3decPlaces(co2ePerYear)}}</span> co2ekg
                </div>
                <div>
                    lifetime ({{avgUKLifespan}} years UK average): <br>
                     <span class="font-bold">{{roundTo3decPlaces(co2ePerLifetime)}}</span> co2ekg
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

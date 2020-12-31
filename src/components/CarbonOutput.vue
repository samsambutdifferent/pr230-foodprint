<template>
    <div>
    <div class="w-full pl-20 pb-10">
        Assuming you eat this meal <input class="w-8 bg-gray-200" type="number" v-model=timesEatenPerWeek> times per week
    </div>
    <div class="pl-20 grid grid-cols-1 sm:grid-cols-8 gap-2">
        <div class="">
            1 meal: <br>
            {{co2e}} co2ekg
        </div>
        <div>
            1 week: <br>
            {{mealsPerWeek}} co2ekg
        </div>
        <div>
            1 year: <br>
            {{mealsPerYear}} co2ekg
        </div>
        <div>
            lifetime ({{avgUKLifespan}} years UK average): <br>
            {{mealsPerLifetime}} co2ekg
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
      mealsPerWeek() {
          return this.co2e * this.timesEatenPerWeek
      },
      mealsPerYear() {
          return this.mealsPerWeek * 52
      },
      mealsPerLifetime() {
          return this.mealsPerYear * this.avgUKLifespan
      },
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

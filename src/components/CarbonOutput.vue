<template>
    <div>
        <div class="w-full pl-20 pb-10">

            <div class="pb-2 bg-gradient-to-r from-green-400 to-white">
                <span class="font-bold text-xl">{{roundTo3decPlaces(co2e)}}</span> kg CO<sub>2</sub>e 
                <div class="col-span-1" v-if="equivalencies .filter(x => x.key === 'smartphone_average_day').length > 0">
                        <Equivalent
                        :co2eProp=co2ePerYear
                        :equivalentProp="equivalencies.filter(x => x.key === 'smartphone_average_day')[0]"
                        />
                </div>
            </div>

            <div class="pt-6">
                Assuming you eat this meal <input class="w-8 bg-gray-200" type="number" v-model=timesEatenPerWeek> times per week
            </div>

            </div>
            <div class="pl-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <div class="grid-cols-1 ">
                    <div class="col-span-1">
                        <p>1 week:</p>
                        <span class="font-bold text-xl">{{roundTo3decPlaces(co2ePerWeek)}}</span> kg CO<sub>2</sub>e 
                    </div>
                    <div class="col-span-1" v-if="equivalencies.filter(x => x.key === 'bath_hot_gas_boiler').length > 0">
                        <Equivalent
                        :co2eProp=co2ePerWeek
                        :equivalentProp="equivalencies.filter(x => x.key === 'bath_hot_gas_boiler')[0]"
                        />
                    </div>
                </div>
                <div class="grid-cols-1 ">
                    <div class="col-span-1">
                        <p>1 year:</p>
                        <span class="font-bold text-xl">{{roundTo3decPlaces(co2ePerYear)}}</span> kg CO<sub>2</sub>e 
                    </div>
                    <div class="col-span-1" v-if="equivalencies .filter(x => x.key === '1_litre_petrol').length > 0">
                        <Equivalent
                        :co2eProp=co2ePerYear
                        :equivalentProp="equivalencies.filter(x => x.key === '1_litre_petrol')[0]"
                        />
                    </div>
                </div>
                <div>
                    <div class="grid-cols-1 ">
                        <div class="col-span-1">
                            <p>lifetime ({{avgUKLifespan}} years UK average): </p>
                            <span class="font-bold text-xl">{{roundTo3decPlaces(co2ePerLifetime)}}</span> kg CO<sub>2</sub>e 
                        </div>
                        <div class="col-span-1" v-if="equivalencies .filter(x => x.key === 'london_to_glasgow_in_car').length > 0">
                            <Equivalent
                            :co2eProp=co2ePerLifetime
                            :equivalentProp="equivalencies.filter(x => x.key === 'london_to_glasgow_in_car')[0]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { db } from '../firebaseDB.js';
import Equivalent from './Equivalent.vue'
import roundTo3decPlaces from '../mixins/helper'

export default {
  name: 'CarbonOutput',
  inject: ['carbonValue'],  
  mixins: [roundTo3decPlaces],
  components: {
      Equivalent
  },
  mounted() {
    db.collection('equivalency_conversion_factors').onSnapshot((snapshotChange) => {
      this.equivalencies= [];
      snapshotChange.forEach((doc) => { 
        this.equivalencies.push({
          key: doc.id,
          type: doc.data().type,
          unit: doc.data().unit,
          value: doc.data().value
        })
      });
    });
  },
  data() {
    return {
        co2e: this.carbonValue,
        timesEatenPerWeek: 2,
        avgUKLifespan: 79.4,
        equivalencies: []
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
  }
}
</script>

<style scoped>
</style>

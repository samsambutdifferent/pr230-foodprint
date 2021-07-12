<template>
    <div class="w-full"> 

        <StepBox title="Step 2:" text="Enter each ingredients and its quantity to the list below:"/>

        <FullWInput nameProp="ingredientName" placeholderProp="name" :valueProp="mealName"
        v-on:valueChanged="mealNameUpdated"/>
        <div class="pt-2 pb-2 border-gray-300 bg-white h-auto px-5 pr-16">
            <div v-if="ingredients.length == 0" class="pb-10">
                Click<button class="p-1 ml-1 mr-1 bg-green-200 rounded" @click="addIngredient">+</button>to add an ingredient
            </div>
            <div v-else>

                <!-- medium / large screen -->
                <div class="maxmd:hidden">
                    <div class="grid grid-cols-7 gap-4 pb-2">
                        <div class="col-span-4 md:col-span-2 p-2 rounded">
                            ingredient name
                        </div>
                        <div class="col-span-4 md:col-span-2 p-2 rounded">
                            weight (g)
                        </div>
                    </div>
                
                    <div v-for="(ingredient, index) in ingredients" :key="index" >
                        <div class="grid grid-cols-7 gap-4 pb-2">
                            <input class="col-span-2 bg-blue-200 p-2 rounded"
                              type="text" name="name" v-model="ingredient.name" @change="() => matchSemantic(ingredient.name, index)" placeholder="name"
                              autocomplete="off">
                            <input class="col-span-2 bg-blue-200 p-2 rounded"
                              @change="valuesChanged()"
                              type="number" name="weight" v-model="ingredient.weight" placeholder="weight (g)"
                              autocomplete="off">
                            <!-- <div class="col-span-2 bg-blue-200 p-2 rounded">{{ingredient.matched}}</div> -->
                            <div class="col-span-1 p-2">
                                <button class="px-3 py-1 bg-red-200 rounded" @click="removeRow(index)">-</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- small / xsmall screen -->
                <div class="md:hidden">
                    <div v-for="(ingredient, index) in ingredients" :key="index" 
                    class="pb-4">   
                        <div class="grid grid-cols-1 pb-2">
                                <input class="bg-blue-200 p-2 rounded"
                                type="text" name="name" v-model="ingredient.name" @change="() => matchSemantic(ingredient.name, index)" placeholder="name"
                                autocomplete="off">
                        </div>
                        <div class="grid grid-cols-1 pb-2">
                                <input class="bg-blue-200 p-2 rounded"
                                @change="valuesChanged()"
                                type="text" name="weight" v-model="ingredient.weight" placeholder="weight (g)"
                                autocomplete="off">
                        </div>
                        <div class="grid grid-cols-1 pb-2">
                            <button class="px-3 py-1 bg-red-200 rounded" @click="removeRow(index)">-</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-2 grid md:grid-cols-8 gap-1">
                <div class="col-start-1">
                    <div class="w-full p-2"
                    @mouseover="hover = true" @mouseleave="hover = false"  :class="{ active: hover }">
                    <button
                    @click="() => calculateCarbon()"
                    class="bg-purple-200 rounded disabled:opacity-50"
                    :disabled="awaitingSemanticMatch || !valueHasChanged" >
                        calculate CO<sub>2</sub>e
                    </button>

                    </div>
                    <div v-if="hover" style="color: red" id="error-content">
                        {{hoverContent}}
                    </div>
                </div>
                <div class="col-end-9">
                    <button class="p-2 bg-green-200 rounded"
                    @click="addIngredient">
                        +
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FullWInput from './FullWInput.vue'
import StepBox from './StepBox.vue'
import axios from 'axios'

export default {
  name: 'IngredientEditor',
  inject: ["mealInject", "ingredientsInject", "customSearchInject"],
  components: {
      FullWInput,
      StepBox
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: [],
        newIngredients: [],
        loadingResults: false,
        valueHasChanged: true,
        hover: false
    }
  },
  created() {
    this.mealName = this.mealInject.value.name === undefined || this.mealInject.value.key === 'custom' ? this.customSearchInject : this.mealInject.value.name
    this.mealKey = this.mealInject.value.key
    this.ingredients = this.ingredientsInject.value
  },
  computed: {
      awaitingSemanticMatch() {
        return this.ingredients.length === 0 
        || this.ingredients.some(function(element) {
            if(element.matched === '' || element.weight == 0) {
                return true;
            }
            else {
                return false;
            }
        })
      },
      ingredientsWeightIsZero() {
          return this.ingredients.some(x => x.weight == 0)
      },
      hoverContent() {
          if (this.ingredientsWeightIsZero) {
              return "Weight values cannot be 0"
          } else {
              return ""
          }
      }
  },
  methods: {
      removeRow(index) {
        let previousRow = this.ingredients
        this.newIngredients = previousRow
        
        this.ingredients.splice(index, 1)
      },
      valuesChanged() {
        this.valueHasChanged = true
      },
      addIngredient() {
          this.ingredients.push({
              name: "",
              weight: 0,
              matched: ""
          })
          
          this.newIngredients = this.ingredients
      },
      mealNameUpdated(val) {
          this.mealName = val
      },
      async matchSemantic(name, index) {
            this.valuesChanged()

            this.ingredients.splice(index, 1, {
              name: name,
              weight: this.ingredients[index].weight,
              matched: ""
            })

          let mx = await axios.post(process.env.VUE_APP_SEMANTIC_MATCHER_MATCH, {name: name})
            .then(function (response) {
              return response.data;
            });
            this.ingredients.splice(index, 1, {
              name: name,
              weight: this.ingredients[index].weight,
              matched: mx.matched
            })
      },
      async calculateCarbon() {
        this.valueHasChanged = false
        
        this.loadingResults = true
        this.$emit('loadingResults')
        this.$emit('carbonValue', 0)

        let param = this.ingredients.map(x => { return({'name': x.matched, 'weight': x.weight}) })

        axios.post(process.env.VUE_APP_LOG_FOOD_ITEM,
          `name=`+ this.mealName + `&ingredients=` + JSON.stringify(param))
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });

        let val = await axios.post(process.env.VUE_APP_CARBON_CALCULATOR, param)
          .then(function (response) {
            return response.data;
        });

        let set_to_grams = val / 1000

        this.$emit('carbonValue', set_to_grams)
        this.$emit('changePage', 'CarbonOutput')
        this.loadingResults = false
        this.$emit('loadingResults')
      },
  }
}
</script>

<style scoped>
#error-content {
  position: absolute;
}

</style>

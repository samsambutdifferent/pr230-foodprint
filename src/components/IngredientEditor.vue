<template>
    <div class="w-full"> 
        <FullWInput nameProp="ingredientName" placeholderProp="name" :valueProp="mealName"
        v-on:valueChanged="mealNameUpdated"/>
        <div class="pt-2 pb-2 border-gray-300 bg-white h-auto px-5 pr-16">
            <div v-if="ingredients.length > 0"> 
                <div v-for="(ingredient, index) in ingredients" :key="index" >
                    <div class="grid grid-cols-7 gap-4 pb-2">
                        <input class="col-span-4 md:col-span-2 bg-blue-200 p-2 rounded"
                          type="text" name="name" v-model="ingredient.name" @change="() => matchSemantic(ingredient.name, index)" placeholder="name"
                          autocomplete="off">
                        <input class="col-span-2 bg-blue-200 p-2 rounded"
                          type="number" name="weight" v-model="ingredient.weight" placeholder="weight (g)"
                          autocomplete="off">
                        <div class="col-span-2 bg-blue-200 p-2 rounded">{{ingredient.matched}}</div>
                        <div class="col-span-1 p-2">
                            <button class="px-3 py-1 bg-red-200 rounded" @click="removeRow(index)">-</button>
                        </div>
                    </div>
                </div>
            </div>

           <div class="pt-2 justify-end">
               <button class="p-2 bg-green-200 rounded"
               @click="addIngredient">
                +
               </button>
           </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebaseDB.js'
import FullWInput from './FullWInput.vue'
import axios from 'axios'

export default {
  name: 'IngredientEditor',
  inject: ["meal"],
  components: {
      FullWInput
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: [],
        newIngredients: []
    }
  },
  beforeMount() {
    this.mealName = this.meal.value.name === undefined || this.meal.value.key === 'custom' ? "" : this.meal.value.name
    this.mealKey = this.meal.value.key

    if(this.mealKey === undefined || this.mealKey === '' || this.mealKey === 'custom') return;
    this.ingredients = []
    db.collection('meals').doc(this.mealKey).collection('ingredients').onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
            this.ingredients.push({
                name: doc.data().name,
                weight: doc.data().weight,
                matched: doc.data().matched
            })  
        });
    });
  },
  methods: {
      removeRow(index) {
        let previousRow = this.ingredients
        this.newIngredients = previousRow
        
        this.ingredients.splice(index, 1)
        
        console.log(previousRow)
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
  }
}
</script>

<style scoped>
</style>

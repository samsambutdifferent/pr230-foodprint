<template>
    <div
    class="w-full"> 
        <FullWInput nameProp="ingredientName" placeholderProp="name" :valueProp="mealName"
        v-on:valueChanged="mealNameUpdated"/>
        <div class="pt-2 pb-2 border-gray-300 bg-white h-auto px-5 pr-16">
                <Ingredient class="pt-2"
                v-for="(ingredient, index) in ingredients" :key="index" :name=ingredient.name :weight=ingredient.weight :matched=ingredient.matched 
                v-on:remove="removeRow(ingredient)"/>
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
import Ingredient from './Ingredient.vue'
import FullWInput from './FullWInput.vue'

export default {
  name: 'IngredientEditor',
  inject: ["meal"],
  components: {
      Ingredient,
      FullWInput
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: []
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
      removeRow(val) {  
          this.ingredients = this.ingredients.filter(item => item !== val)
      },
      addIngredient() {
          this.ingredients.push({
              name: "",
              weight: 0,
              matched: ""
          })
      },
      mealNameUpdated(val) {
          this.mealName = val
      }
  }
}
</script>

<style scoped>
</style>

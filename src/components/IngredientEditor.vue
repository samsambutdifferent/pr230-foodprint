<template>
    <div v-if="mealKey !== ''"
    class="w-full"> 
        <div class="w-full my-2 p-1 bg-white flex">
          <input class="w-full border-b-2 border-gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
          type="search" name="name" v-model="mealName" placeholder="name"
          autocomplete="off">
        </div>  

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

export default {
  name: 'IngredientEditor',
  props: ['meal'],
  components: {
      Ingredient
  },
  data() {
    return {
        mealName: "",
        mealKey: "",
        ingredients: []
    }
  },
  watch: {
    meal: function (val) {  
        this.mealKey = (val.key === undefined || val.key === '') ? "" : val.key
        this.mealName = (val.name === undefined || val.name === '' || val.key == 'custom') ? "" : val.name 
    },
    mealKey: function(val) {
        this.ingredients = []
        if(val === undefined || val === '') return;
        
        let ing = []
            db.collection('meals').doc(val).collection('ingredients').onSnapshot((snapshotChange) => {
            snapshotChange.forEach((doc) => {
                console.log(doc.data())
                ing.push({
                    name: doc.data().name,
                    weight: doc.data().weight,
                    matched: doc.data().matched
                })  
            });
            this.ingredients = ing
        });
    }
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
      }
  }
}
</script>

<style scoped>
</style>

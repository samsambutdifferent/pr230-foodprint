export default {
    methods: {
        rounding(val) {
          if(Math.round(val) > 0){
            return Math.round(val)
          }
          else {
            return parseFloat(val.toFixed(2))
          }
        },
        roundTo3decPlaces(val) {
          return parseFloat(val.toFixed(3))
        },
        roundTo2decPlaces(val) {
          return parseFloat(val.toFixed(2))
        },
        numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
  };
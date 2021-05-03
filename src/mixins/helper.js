export default {
    methods: {
        rounding(val) {
          return Math.round(val)
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
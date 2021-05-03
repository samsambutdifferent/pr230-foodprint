export default {
    methods: {
        roundTo3decPlaces(val) {
          return parseFloat(val.toFixed(3))
        },
        numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
  };
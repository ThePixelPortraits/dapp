export const rules = {
  lettersNumbers: {
    value: /^[a-zA-Z0-9_ ]*$/g,
    message: 'Please only use letters and numbers',
  },
  email: {
    value:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    message: 'Please enter a valid email address',
  },
  checkBalance: (v, balance) => v < balance || `insufficient ETH balance!`,
  checkMinBid: (v, minBid) =>
    parseFloat(v) >= parseFloat(minBid) ||
    `bid must not be less than the minimum bid!`,
  checkName: (taken, beatable, minPrice, price) => {
    if (taken && !beatable) {
      return `sorry, a commission with that name has already been completed!`
    }
    if (!taken || price > minPrice) return true
    if (taken && beatable && minPrice >= price) {
      return `sorry, that name already has a higher/equal bid of ${minPrice}!`
    }
  },
  checkPriceIncrease: (price, oldPrice) =>
    price > oldPrice || 'price has not been increased!',
}

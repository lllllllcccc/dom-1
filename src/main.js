const div = dom.find('.red', '#test')[0]
console.log(div)
dom.style(div, 'color', 'red')
const divList = dom.find('.red')
dom.each(divList, (n) => console.log(n))
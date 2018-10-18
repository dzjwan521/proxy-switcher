// 删除http代理
module.exports = data => {
  let arr = data.split('\n')
  let index = arr.length
  // console.log(arr)
  while (index--) {
    let e = arr[index].toLowerCase()
    if (e.includes('http_proxy') || e.includes('https_proxy')) {
      arr.splice(index, 1)
    }
  }

  let str = arr.join('\n')
  return str
}

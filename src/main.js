const $web = $("li.web")
const $lastLi = $("li.last")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hashTable = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://bilibili.com" },
]
const simplyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
}
const render = () => {
  $(".li").remove()
  hashTable.forEach((node, index) => {
    const $li = $(`<li class='li'>
          
              <div class="site">
                <div class="logo">${simplyUrl(node.url)[0]}</div>
                <div class="link">${simplyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-shanchu"></use>
                    </svg>
                </div>
              </div>
 
          </li>`).insertBefore($lastLi)
    $li.on("click", () => {
      window.open(node.url)
    })
    $li.on("click", ".close", (e) => {
      e.stopPropagation()
      hashTable.splice(index, 1)
      render()
    })
  })
}

render()
$(".addButton").on("click", () => {
  let url = window.prompt("请输入想要添加的网址")
  if (url.indexOf("http") !== 0) {
    url = "https://" + url
  }
  hashTable.push({
    logo: simplyUrl(url)[0],
    url: url,
  })
  render()
})
window.onbeforeunload = () => {
  console.log("页面要关闭了")
  const string = JSON.stringify(hashTable)
  console.log(typeof hashTable)
  console.log(hashTable)
  console.log(typeof string)
  console.log(string)
  localStorage.setItem("x", string)
}
console.log(hashTable)
$(document).on("keypress", (e) => {
  const { key } = e
  console.log(key)
  console.log(hashTable)
  const hashMap = [
    { logo: "M", url: "https://developer.mozilla.org/zh-CN/" },
    { logo: "E", url: "https://es6.ruanyifeng.com/" },
    { logo: "C", url: "https://cssgradient.io/" },
    { logo: "T", url: "https://css-tricks.com/" },
    { logo: "G", url: "https://github.com/" },
    { logo: "S", url: "https://stackoverflow.com/" },
    { logo: "R", url: "https://reactjs.org/" },
    { logo: "V", url: "https://cn.vuejs.org/" },
    { logo: "J", url: "https://www.jquery123.com/" },
  ]
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
  for (let i = 0; i < hashTable.length; i++) {
    if (hashTable[i].logo.toLowerCase() === key) {
      window.open(hashTable[i].url)
    }
  }
})

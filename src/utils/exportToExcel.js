import { Message } from 'element-ui'
// 数据列表导出
// 列表导出
// res数据源，tHeader表的标题，filterVal表标题对应的属性名称，这些属性要在数据园中存在
export default function exportList(res, tHeader, filterVal) {
  import('@/vendor/Export2Excel').then(excel => {
    // const tHeader = tHeader
    // const filterVal = filterVal
    const list = res
    const data = formatJson(filterVal, list)
    excel.export_json_to_excel({
      header: tHeader, // Header Required
      data, // Specific data Required
      filename: new Date().toDateString(), // Optional
      autoWidth: true, // Optional
      bookType: 'xlsx' // Optional
    })
    Message.success('导出成功')
  })
}
// 导出数据处理
function formatJson(filterVal, jsonData) {
  jsonData = JSON.stringify(jsonData)
  jsonData = JSON.parse(jsonData)
  const list = []
  // 对导出做出处理
  jsonData.forEach(el => {
    const obj = {}
    filterVal.forEach(el1 => {
      obj[el1] = el[el1]
    })
    list.push(obj)
  })
  return list.map(v => filterVal.map(j => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}

// 引入字段过滤器时间过滤
function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

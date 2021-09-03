import moment from "moment"

function elementInViewport(el) {
  var top = el.offsetTop
  var left = el.offsetLeft
  var width = el.offsetWidth
  var height = el.offsetHeight

  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  )
}

export function timelineFormat(date: string) {
  const lastSent = moment(date)
  const diff = moment().diff(lastSent, 'day')
  if (diff > 7) {
    return lastSent.format('DD-MM-YYYY')
  } else if (diff >= 1) {
    return lastSent.format('dddd')
  } else {
    return moment(date).format('hh:mm')
  }
}

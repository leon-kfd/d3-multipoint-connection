/* eslint-disable space-before-function-paren */

class CustomCanvas {
  constructor(el, options) {
    this.canvas = typeof el === 'string' ? document.querySelector(el) : el
    this.ctx = this.canvas.getContext('2d')
    this.on = false
    this.lastX = 0
    this.lastY = 0
    this.pathArr = []
    this.step = -1
    let _options = {
      lineCap: 'round',
      lineWidth: 2,
      lineColor: '#000000',
      adjustAngel: 4,
      ...options
    }
    this.d3Line = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveCardinal)
    this.d3Line.context(this.ctx)
    this.init(_options)
  }
  init (options) {
    const { lineCap, lineWidth, lineColor, adjustAngel, scrollEl } = options
    this.ctx.lineCap = lineCap
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = lineColor
    this.adjustAngel = adjustAngel
    
    let startX, startY, pointArr = []

    const downEvent = (e) => {
      const isTouch = e.type === 'touchstart'
      const touchE = isTouch && e.changedTouches && e.changedTouches[0]
      const scrollX = scrollEl ? scrollEl.scrollLeft : window.scrollX
      const scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY
      console.log(e, touchE)
      this.on = true
      startX = this.lastX = isTouch ? touchE.clientX - touchE.target.offsetLeft + scrollX : e.offsetX
      startY = this.lastY = isTouch ? touchE.clientY - touchE.target.offsetTop + scrollY : e.offsetY
      console.log(startX, startY)
      pointArr = [{
        x: startX,
        y: startY
      }]
    }

    const moveEvent = (e) => {
      if (this.on) {
        const isTouch = e.type === 'touchmove'
        if (isTouch) e.preventDefault()
        const touchE = isTouch && e.changedTouches && e.changedTouches[0]
        const scrollX = scrollEl ? scrollEl.scrollLeft : window.scrollX
        const scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY
        let x = isTouch ? touchE.clientX - touchE.target.offsetLeft + scrollX : e.offsetX
        let y = isTouch ? touchE.clientY - touchE.target.offsetTop + scrollY : e.offsetY
        this.draw(x, y)
        const preAngel = Math.atan2(startX, startY) * 180 / Math.PI
        const currAngel = Math.atan2(x, y) * 180 / Math.PI
        let flag = Math.abs(preAngel - currAngel) > this.adjustAngel
        if (flag) {
          startX = x
          startY = y
          pointArr.push({
            x: startX,
            y: startY
          })
        }
      }
    }

    const upEvent = (e) => {
      if (this.on) {
        const isTouch = e.type === 'touchend'
        const touchE = isTouch && e.changedTouches && e.changedTouches[0]
        const scrollX = scrollEl ? scrollEl.scrollLeft : window.scrollX
        const scrollY = scrollEl ? scrollEl.scrollTop : window.scrollY
        let x = isTouch ? touchE.clientX - touchE.target.offsetLeft + scrollX : e.offsetX
        let y = isTouch ? touchE.clientY - touchE.target.offsetTop + scrollY : e.offsetY
        this.on = false
        this.addPath()

        pointArr.push({
          x: x,
          y: y
        })
        this.adjustCurve(pointArr)
      }
    }

    this.canvas.onmousedown = downEvent
    this.canvas.onmousemove = moveEvent
    this.canvas.onmouseup = upEvent
    this.canvas.ontouchstart = downEvent
    this.canvas.ontouchmove = moveEvent
    this.canvas.ontouchend = upEvent
    this.canvas.onmouseleave = upEvent
    this.addPath()
  }
  draw (x, y) {
    this.ctx.beginPath()
    this.ctx.moveTo(this.lastX, this.lastY)
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
    this.lastX = x
    this.lastY = y
  }
  clear () {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight)
  }
  addPath () {
    this.step++
    if (this.step < this.pathArr.length) this.pathArr.length = this.step
    this.pathArr.push(this.canvas.toDataURL())
  }
  undo () {
    return new Promise((resolve, reject) => {
      if (this.step > 0) {
        this.step--
        const img = new Image()
        img.src = this.pathArr[this.step]
        img.onload = () => {
          this.clear()
          this.ctx.drawImage(img, 0, 0)
          resolve(1)
        }
      } else {
        reject(0)
      }
    })
  }
  redo () {
    return new Promise((resolve, reject) => {
      if (this.step < this.pathArr.length - 1) {
        this.step++
        const img = new Image()
        img.src = this.pathArr[this.step]
        img.onload = () => {
          this.clear()
          this.ctx.drawImage(img, 0, 0)
          resolve(1)
        }
      } else {
        reject(0)
      }
    })
  }
  setLineColor (val) {
    this.ctx.strokeStyle = val
  }
  setLineWidth (val) {
    this.ctx.lineWidth = val
  }
  setAdjustAngel (val) {
    this.adjustAngel = val
  }

  adjustCurve(pointArr) {
    this.undo().then(() => {
      this.d3Line(pointArr)
      this.ctx.stroke()
      this.addPath()
    })
  }
}

export default CustomCanvas

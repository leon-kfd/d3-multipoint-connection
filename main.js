function setAttribute(el, attr) {
  Object.keys(attr).map(key => {
    el.setAttribute(key, attr[key])
  })
}

class PointManager {
  constructor (el) {
    this.el = el
    this.movingCircleEl = this.el.querySelector('.fake-point')
    this.centerPoint = {
      x: 300,
      y: 300
    }
    this.index = 0
    this.R = 5
    this.lineType = 'curveCardinal'
    this.lineTypeControlValue = 0
    this.lineTypeControlMap = {
      curveBundle: {
        name: 'beta',
        default: 0.85
      },
      curveCardinal: {
        name: 'tension',
        default: 0
      },
      curveCatmullRom: {
        name: 'alpha',
        default: 0.5
      }
    }

    this.moveTarget = null

    this.isDraging = false
    this.el.addEventListener('mousedown', (e) => {
      const { target } = e
      if (target.dataset['point']) {
        // 命中点
        this.moveTarget = target
        setAttribute(this.movingCircleEl, {
          cx: target.getAttribute('cx'),
          cy: target.getAttribute('cy')
        })
        this.movingCircleEl.classList.remove('hidden')
        this.isDraging = true
      }
    })

    this.el.addEventListener('mousemove', (e) => {
      if (!this.isDraging) return
      const { offsetX, offsetY } = e
      setAttribute(this.movingCircleEl, {
        cx: offsetX,
        cy: offsetY
      })
    })

    this.el.addEventListener('mouseup', (e) => {
      this.isDraging = false
      this.movingCircleEl.classList.add('hidden')
      const { offsetX, offsetY } = e
      if (this.moveTarget) {
        setAttribute(this.moveTarget, {
          cx: offsetX,
          cy: offsetY
        })
        setAttribute(this.moveTarget.nextElementSibling, {
          x: offsetX,
          y: offsetY + this.R + 15
        })
        this.linkPoint()
      }
      this.moveTarget = null
    })
  }

  setLineType (value) {
    this.lineType = value
    const typeControl = Object.keys(this.lineTypeControlMap).find(key => this.lineType.includes(key))
    if (typeControl) {
      this.lineTypeControlValue = this.lineTypeControlMap[typeControl].default
    }
    this.linkPoint()
  }

  setLineTypeControlValue (value) {
    this.lineTypeControlValue = value
    this.linkPoint()
  }

  addRandomPoint(RandomOffset = 500) {
    const cx = this.centerPoint.x + (Math.random() - 0.5) * RandomOffset
    const cy = this.centerPoint.y + (Math.random() - 0.5) * RandomOffset
    this.addPoint(cx, cy)
  }

  addPoint (cx, cy) {
    const index = ++this.index
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    setAttribute(circle, {
      cx,
      cy,
      r: this.R,
      fill: '#262626',
      id: `_point${index}`,
      class: `point`,
      'data-point': index
    })
    this.el.appendChild(circle)

    // text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    setAttribute(text, {
      x: cx,
      y: cy + this.R + 15,
      'text-anchor': 'middle',
      'font-size': 12
    })
    text.textContent = index
    this.el.appendChild(text)
    this.linkPoint()
  }

  linkPoint () {
    const pointArr = []
    document.querySelectorAll('[data-point]').forEach(item => {
      pointArr.push({
        x: ~~item.getAttribute('cx'),
        y: ~~item.getAttribute('cy')
      })
    })
    if (pointArr.length <= 2) return
    const curve = this.getCurrentCurve()
    d3.select('#line')
        .datum(pointArr)
          .attr("d", 
            d3.line()
              .x(d => d.x)
                .y(d => d.y)
                  .curve(curve)
          )
  }

  getCurrentCurve () {
    const typeControl = Object.keys(this.lineTypeControlMap).find(key => this.lineType.includes(key))
    if (typeControl) {
      return d3[this.lineType][this.lineTypeControlMap[typeControl].name](this.lineTypeControlValue)
    } else {
      return d3[this.lineType]
    }
  }
}

const $ = (selector) => document.querySelector(selector)
const ctx = new PointManager($('#main'))
ctx.addPoint(300, 150)
ctx.addPoint(150, 450)
ctx.addPoint(450, 450)

function renderTypeControl () {
  const typeControl = Object.keys(ctx.lineTypeControlMap).find(key => ctx.lineType.includes(key))
  if (typeControl) {
    $('#lineTypeControlWrapper').classList.remove('hidden')
    $('#lineTypeControlValue').value = ctx.lineTypeControlValue
    $('#lineTypeControlLabel').innerText = ctx.lineTypeControlMap[typeControl].name
  } else {
    $('#lineTypeControlWrapper').classList.add('hidden')
  }
}
renderTypeControl()

$('#add').addEventListener('click', () => {
  ctx.addRandomPoint()
})

$('#lineType').addEventListener('change', (e) => {
  ctx.setLineType(e.target.value)
  renderTypeControl()
})

$('#lineTypeControlValue').addEventListener('change', (e) => {
  ctx.setLineTypeControlValue(e.target.value)
})

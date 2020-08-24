import CustomCanvas from './custom-canvas'

const $ = (selecotr) => document.querySelector(selecotr)
const mgr = new CustomCanvas('#canvas')
$('#adjustAngel').addEventListener('change', (e) => {
  mgr.adjustAngel = ~~e.target.value
})
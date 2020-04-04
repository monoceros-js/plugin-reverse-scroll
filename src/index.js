import defaultOptions from './config'
import { version } from '../package.json'
import { ReverseScrollPluginError } from './errors'

const ReverseScrollPlugin = function (cluster, overrides) {
  this.name = 'ReverseScrollPlugin'
  this.version = version
  this.cluster = cluster.createCluster()
  this.instances = []
  this.dom = this.cluster.resolve('dom')
  this.options = this.cluster.resolve('options.create')(
    this.cluster.resolve('options'),
    defaultOptions,
    overrides
  )
  this.log = this.cluster.resolve('utils.log')
  this.logError = error => console.error(error)

  this.getScrollTop = el => {
    return el.getBoundingClientRect().top
  }

  this.updateScroller = index => {
    console.log(this.instances, index)
    const instance = this.instances[index]
    const el = instance.el

    const scrollTop = this.getScrollTop(
      el.closest(this.options.selectors.section)
    )

    const aboveContainer = scrollTop > 0
    const belowContainer =
      !aboveContainer &&
      Math.abs(scrollTop) > el.scrollHeight - this.dom.viewport.clientHeight
    const inContainer = !aboveContainer && !belowContainer

    const scrollY = Math.abs(scrollTop)
    if (inContainer) {
      const next = scrollY + scrollY * this.options.speed
      instance.coordinates.y.current = next
      instance.coordinates.y.end = scrollY
      el.style.transform = `translate(0, ${next}px) translateZ(0)`

      if (!instance.inView) {
        if (this.options.debug) {
          this.log(
            'ReverseScrollingPlugin: Entered reverse-scrolling element.',
            this.instances[index]
          )
        }
        this.instances[index].inView = true
      }
    } else if (aboveContainer && instance.inView) {
      el.style.transform = 'translate(0, 0) translateZ(0)'
      if (this.options.debug) {
        this.log(
          'ReverseScrollingPlugin: Left reverse-scrolling instance.',
          this.instances[index]
        )
      }
      this.instances[index].inView = false
    } else if (belowContainer && instance.inView) {
      el.style.transform = `translate(0, ${instance.coordinates.y.current}px) translateZ(0)`
      if (this.options.debug) {
        this.log(
          'ReverseScrollingPlugin: Left reverse-scrolling instance',
          this.instances[index]
        )
      }
      this.instances[index].inView = false
    }
  }

  this.createScrollerGhost = el => {
    const ghost = document.createElement('div')
    ghost.style.height =
      el.scrollHeight * (1 / this.options.speed) -
      this.dom.viewport.clientHeight * (1 / this.options.speed - 1) +
      'px'
    el.parentNode.appendChild(ghost)
    return ghost
  }

  this.initScroller = el => {
    const container = el.closest(this.options.selectors.section)
    if (!container) {
      this.logError(
        new ReverseScrollPluginError(
          `Missing ${this.options.selectors.section} parent for ${this.options.selectors.reverse} element. Canceling plugin initialization.`
        )
      )
      return
    }
    const childNodes = [...container.childNodes].filter(n => n.nodeType == 1)
    if (childNodes.length > 1) {
      this.logError(
        new ReverseScrollPluginError(
          `${this.options.selectors.reverse} should be only child of ${this.options.selectors.section} element. Canceling plugin initialization.`
        )
      )
      return
    }

    el.style = `
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      position: absolute;
    `
    const createIndex = this.cluster.resolve('monoceros.createInstance')

    this.instances.push(createIndex(this.options.base.reverse, el))

    const offset =
      container.scrollHeight > this.dom.viewport.clientHeight
        ? this.dom.viewport.clientHeight
        : container.scrollHeight

    el.style.top = -1 * el.scrollHeight + offset + 'px'

    this.createScrollerGhost(el, this.dom.viewport)
  }

  this.onScroll = () => {
    this.instances.forEach((_, instanceIndex) => {
      this.updateScroller(instanceIndex)
    })
  }

  this.init = () => {
    if (this.options.speed < 0 || this.options.speed > 1) {
      console.warn(
        new this.ReverseScrollPluginError(
          'options.speed should be a value between 0 and 1. Reverted to 1.'
        )
      )
      this.options.speed = 1
    }
    const elements = Array.from(
      document.querySelectorAll(this.options.selectors.reverse)
    )
    if (elements.length === 0) {
      this.logError(
        new ReverseScrollPluginError(
          `Missing ${this.options.selectors.reverse} element. Canceling plugin intialization.`
        )
      )
      return
    }
    elements.forEach((element, index) => {
      this.initScroller(element, index)
    })

    this.dom.viewport.addEventListener('scroll', this.onScroll)
  }
}

export default ReverseScrollPlugin

import defaultOptions from './config'
import { version } from '../package.json'
import { ReverseScrollPluginError } from './errors'

const ReverseScrollPlugin = function (cluster, overrides) {
  this.name = 'ReverseScrollPlugin'
  this.version = version
  this.cluster = cluster
  this.instances = []
  this.options = this.cluster.resolve('createOptions')(
    this.cluster.resolve('options'),
    defaultOptions,
    overrides
  )
  this.dom = this.cluster.resolve('dom')
  this.log = this.cluster.resolve('log')
  this.logError = error => console.error(error)

  this.getScrollTop = el => {
    return el.getBoundingClientRect().top
  }

  this.updateScroller = index => {
    const instance = this.instances[index]
    const el = instance.el

    const scrollTop = this.getScrollTop(
      el.closest(this.options.selectors.container)
    )

    const aboveContainer = scrollTop > 0
    const belowContainer =
      !aboveContainer &&
      Math.abs(scrollTop) > el.scrollHeight - this.dom.viewport.clientHeight
    const inContainer = !aboveContainer && !belowContainer

    const scrollY = Math.abs(scrollTop)
    if (inContainer) {
      const next = scrollY + scrollY * this.options.speed
      instance.y.current = next
      instance.y.end = scrollY
      gsap.to(el, 0, { y: next })

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
      gsap.to(el, 0, { y: 0 })
      if (this.options.debug) {
        this.log(
          'ReverseScrollingPlugin: Left reverse-scrolling instance.',
          this.instances[index]
        )
      }
      this.instances[index].inView = false
    } else if (belowContainer && instance.inView) {
      gsap.to(el, 0, { y: instance.y.current })
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
    const container = el.closest(this.options.selectors.container)
    if (!container) {
      this.logError(
        new ReverseScrollPluginError(
          `Missing ${this.options.selectors.container} parent for ${this.options.selectors.reverse} element. Canceling instance initialization.`
        )
      )
      return
    }
    const childNodes = [...container.childNodes].filter(n => n.nodeType == 1)
    if (childNodes.length > 1) {
      this.logError(
        new ReverseScrollPluginError(
          `${this.options.selectors.reverse} should be only child of ${this.options.selectors.container} element. Canceling instance initialization.`
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

    const instanceIndex =
      this.instances.push(this.cluster.resolve('createMonocerosInstance')(el)) -
      1
    const instance = this.instances[instanceIndex]

    const offset =
      container.scrollHeight > this.dom.viewport.clientHeight
        ? this.dom.viewport.clientHeight
        : container.scrollHeight

    gsap.to(instance.el, 0, {
      top: -1 * el.scrollHeight + offset,
    })

    this.createScrollerGhost(el, this.dom.viewport)
  }

  this.onScroll = () => {
    this.instances.forEach((_, instanceIndex) => {
      this.updateScroller(instanceIndex)
    })
  }

  this.init = () => {
    const elements = Array.from(
      document.querySelectorAll(this.options.selectors.reverse)
    )
    if (elements.length === 0) {
      throw new ReverseScrollPluginError(
        `Missing ${this.options.selectors.reverse} element. Canceling plugin intialization.`
      )
    }
    elements.forEach((element, index) => {
      this.initScroller(element, index)
    })

    const instancesObserver = this.cluster.resolve('createObserver')({
      root: this.dom.viewport,
      className: this.options.classNames.in_viewport,
    })

    this.instances.forEach(instance => {
      instancesObserver.observe(instance.el)
    })

    this.dom.viewport.addEventListener('scroll', this.onScroll)
  }
}

export default ReverseScrollPlugin

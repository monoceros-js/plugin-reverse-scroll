class MonocerosError extends Error {
  constructor(message) {
    super()
    this.name = this.constructor.name
    this.message = message
  }
}

export class ReverseScrollPluginError extends MonocerosError {
  constructor(message, pluginName) {
    super(message)
    this.pluginName = pluginName
  }
}

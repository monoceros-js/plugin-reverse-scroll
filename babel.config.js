module.exports = function (api) {
  api.cache(true)

  const presets = []
  if (process.env.BUILD === 'browser') {
    console.log('BUILDING BROWSER')
    presets.push([
      '@babel/env',
      {
        targets: '> 0.25%, not dead',
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ])
  } else {
    console.log('BUILDING MODULE')
    presets.push('@babel/env')
  }

  const plugins = []

  return {
    presets,
    plugins,
  }
}

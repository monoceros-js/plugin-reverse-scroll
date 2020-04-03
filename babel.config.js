module.exports = function(api) {
  api.cache(true)

  const presets = []
  if (process.env.BUILD === 'browser_production') {
    console.log('BUILDING BROWSER PRODUCTION')
    presets.push([
      '@babel/env',
      {
        targets: '> 0.25%, not dead',
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ])
  } else if (process.env.BUILD === 'browser_development') {
    console.log('BUILDING BROWSER DEVELOPMENT')
    presets.push([
      '@babel/env',
      {
        targets: '> 0.25%, not dead',
        modules: false,
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

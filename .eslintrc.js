module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  'globals': {
    '$': true,
    'Wilddog': true,
    'VueAsyncData': true,
    'Clipboard': true,
    'marked': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-new': 0,
    'no-useless-escape': 0,
    'camelcase': [0, {properties: 'never'}]
  }
}

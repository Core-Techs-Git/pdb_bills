module.exports = {
  rules: {
    'header-full-stop': [2, 'never'],
    'header-min-length': [2, 'always', 0],
    'header-max-length': [2, 'always', 72],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['🎬', '🎉', '🔄', '📦', '👷', '📚', '🧪', '🐛', '🧩', '💄', '⚡', '🔒', '🔊', '🔗', '♻️', '🎨', '🚧', '⏳', '📜', '👥'],
    ],
    'scope-enum': [2, 'always', ['core', 'error', 'model', 'service']],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'upper-case'],
    'body-min-length': [2, 'always', 0],
    'body-leading-blank': [2, 'always'],
    'body-max-length': [2, 'always', Infinity],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [2, 'always', Infinity],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.+?)(?:\((\w+)\))?!?:\s(.+?)(?:\s\((R-\d+)\))?$/,
      breakingHeaderPattern: /^(.+?)(?:\((\w+)\))?!:\s(.+?)(?:\s\((R-\d+)\))?$/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
      issuePrefixes: ['R-'],
    },
  },
  ignores: [(commit) => commit === '' || commit === 'Add 1 git-crypt collaborator'],
  defaultIgnores: true,
};

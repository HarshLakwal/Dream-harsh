/**
 * In this example, the commit message is required to have a maximum header length
 * of 72 characters, a lowercase type (e.g. `feat`, `fix`, etc.), and a subject line
 * that is at least 10 characters long and does not end with a period.
 */
module.exports = {
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    ],
    'subject-full-stop': [2, 'never'],
    'subject-case': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 10]
  }
}

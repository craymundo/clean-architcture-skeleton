const stylelintReporter = require('stylelint-html-reporter');
const reporter = stylelintReporter({
  filename: "reports/lints-styles.html"
});

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = reporter;

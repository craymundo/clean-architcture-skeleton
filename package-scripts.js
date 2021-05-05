const concurrent = require('nps-utils').concurrent;

const start = {
  default: {
    script: 'ng run front:serve -o',
  },
  init: {
    script: 'nps yalc.prepare && npm i',
    description: '',
  },
};

const web = {
  start: {
    script: 'ng run front:serve -o',
    description: 'Run Angular App application to Browser',
  },
  startuat: {
    script: 'ng run front:serve --configuration=uat -o',
    description: 'Run Angular App application with UAT configuration to Browser'
  },
  startv2mobile: {
    script: 'ng run front:serve --host 192.168.3.2 --port 9050',
    description: 'Run Angular App application with UAT configuration to Browser'
  },
  startuat2: {
    script: 'ng run front:serve --configuration=uat -o --host 192.168.3.2 --port 9050',
    description: 'Run Angular App application with UAT configuration to Browser'
  },
  startint: {
    script: 'ng run front:serve --configuration=int -o',
    description: 'Run Angular App application with UAT configuration to Browser'
  },
  startqas: {
    script: 'ng run front:serve --configuration=qas -o',
    description: 'Run Angular App application with QAS configuration to Browser'
  },
  startprd: {
    script: 'ng run front:serve --configuration=production -o',
    description: 'Run Angular App application with Production configuration to Browser'
  },
  build: {
    script: 'ng build --prod',
    description: '',
  },
  builduat: {
    script: 'ng build --prod --configuration=uat',
    description: '',
  },
  buildint: {
    script: 'ng build --prod --configuration=int',
    description: '',
  },
  builddev: {
    script: 'ng build --prod --configuration=dev',
    description: '',
  },
  buildqas: {
    script: 'ng build --prod --configuration=qas',
    description: '',
  },
  buildprd: {
    script: 'ng build --prod --configuration=production',
    description: '',
  },
  init: {
    script: 'nps yalc.prepare && npm i',
    description: '',
  },
};

const ionic_app = {
  preios: {
    script: 'cd apps/ionic-app && npm run cap.add.ios',
    description: '',
  },
  preandroid: {
    script: 'cd apps/ionic-app && npm run cap.add.android || true',
    description: '',
  },
  start: {
    script: 'ng run ionic-app:serve -o',
    description: 'Run Ionic App application to Browser',
  },
  build: {
    script: 'ng build --prod ionic-app',
    description: '',
  },
  builduat: {
    script: 'ng build --prod ionic-app --configuration=uat',
    description: '',
  },
  buildint: {
    script: 'ng build --prod ionic-app --configuration=int',
    description: '',
  },
  builddev: {
    script: 'ng build --prod ionic-app --configuration=dev',
    description: '',
  },
  platforms_ios: {
    script: 'nps ionic_app.add_ios',
    description: '',
  },
  platforms_android: {
    script: 'nps ionic_app.add_android',
    description: '',
  },
  platforms: {
    script: 'nps ionic_app.add_ios && nps ionic_app.add_android',
    description: '',
  },
  clean: {
    script: 'nps ionic_app.clean_app && nps ionic_app.build',
    description: '',
  },
  ios: {
    script: 'cd apps/ionic-app && npm run cap.sync.ios && npm run cap.ios',
    description: 'Prepare and open Angular application to IOS',
  },
  android: {
    script:
      'cd apps/ionic-app && npm run cap.sync.android && npm run cap.android',
    description: 'Prepare and open Angular application to Android',
  },
  add_ios: {
    script:
      'cd apps/ionic-app && npm run cap.add.ios && cordova-res ios --skip-config --copy',
    description: '',
  },
  add_android: {
    script:
      'cd apps/ionic-app && npm run cap.add.android && cordova-res android --skip-config --copy',
    description: '',
  },
  clean_app: {
    script:
      'cd apps/ionic-app && npx rimraf -- hooks node_modules platforms www plugins ios android package-lock.json && npm i && rimraf -- package-lock.json',
    description: 'Clean ionic-app',
  },
  test: {
    script: 'ng run ionic-app:test --silent && ng run libs:test --silent   && ng run xplat:test --silent',
    description: 'Running unit tests',
  },
  test_coverage: {
    script: 'ng run ionic-app:test --coverage   && ng run libs:test --coverage    && ng run xplat:test  --coverage ',
    description: 'Running unit tests',
  },

};

const typedoc = {
  default: {
    script: '',
    description: '',
  },
  prod: {
    script: 'typedoc --plugin typedoc-plugin-external-module-name',
    description: '',
  },
};

const prettier = {
  default: {
    script: 'nps prettier.code && nps prettier.style',
    description: '',
  },
  code: {
    script: 'prettier-eslint --write "{,!(node_modules)/**/}*.{ts,tsx,jsx}"',
    description: '',
  },
  style: {
    script: 'prettier-stylelint --write src/**/*.{css,scss} --quiet',
    description: '',
  },
};

const lint = {
  default: {
    script: concurrent.nps('lint.code', 'lint.style'),
    description: 'Lint all Code & Style of whole project',
  },
  code: {
    script: 'eslint src/**/*.{ts,tsx,jsx}',
    description: '',
  },
  style: {
    script: 'stylelint src/**/*.{css,scss}',
    description: '',
  },
  staged: {
    script: 'lint-staged',
    description: '',
  },
  libs: {
    script: 'eslint \"libs/{core,features,utils}/**/*.ts\" -f html -o reports/lint-libs.html',
    description: '',
  },
  xplat: {
    script: 'eslint \"xplat/**/*.ts\" -f html -o reports/lint-xplat.html',
    description: '',
  },
  web: {
    script: 'eslint \"apps/front/src/**/*.ts\" -f html -o reports/lint-apps-web.html',
    description: '',
  },
  mobile: {
    script: 'eslint \"apps/ionic-app/src/**/*.ts\" -f html -o reports/lint-apps-mobile.html',
    description: '',
  },
};

const test = {
  default: {
    script: 'nx test',
    description: '',
  },

  coverage: {
    script: 'nx test --codeCoverage --watchAll',
    description: '',
  },
  ci: {
    script: 'nx test --codeCoverage',
    description: '',
  },
  e2e: {
    script: 'nx e2e',
    description: '',
  },
  prod: {
    script: 'nps test && nps test.e2e && nps test.coverage',
    description: '',
  },
  web: {
    script: 'nx run front:test',
    description: '',
  },
};

const version = {
  default: {
    script:
      'conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md',
  },
};

const yalc = {
  default: {
    script: '',
    description: '',
  },
  prepare: {
    script: 'nps yalc.wc && nps yalc.wcangular',
    description: '',
  },
};

module.exports = {
  scripts: {
    start,
    typedoc,
    prettier,
    lint,
    test,
    version,
    yalc,
    web,
    ionic_app,
  },
};

module.exports = (generator, answers) => {

  generator.render('./template', { deployName: answers.deploy })

  generator.extendPackage({
      dependencies: {
        "antd": "^5.3.0",
        "axios": "^1.3.4",
        "init": "^0.1.2",
        "mobx": "^6.8.0",
        "mobx-react": "^7.6.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.8.2",
        "react-scripts": "5.0.1",
        "sass": "^1.58.3",
        "styled-components": "^5.3.8"    
      },
      devDependencies: {
        "@commitlint/cli": "^17.4.4",
        "@commitlint/config-conventional": "^17.4.4",
        "@types/node": "^18.15.3",
        "@types/react": "^18.0.28",
        "@types/react-dom": "^18.0.11",
        "@types/styled-components": "^5.1.26",
        "@typescript-eslint/eslint-plugin": "^5.54.1",
        "commitizen": "^4.3.0",
        "customize-cra": "^1.0.0",
        "cz-conventional-changelog": "^3.3.0",
        "eslint": "^8.35.0",
        "eslint-config-prettier": "^8.7.0",
        "eslint-config-standard-with-typescript": "^34.0.0",
        "eslint-plugin-import": "^2.27.5",
        "eslint-plugin-n": "^15.6.1",
        "eslint-plugin-prettier": "^4.2.1",
        "eslint-plugin-promise": "^6.1.1",
        "eslint-plugin-react": "^7.32.2",
        "husky": "^8.0.3",
        "lint-staged": "13.0.3",
        "prettier": "^2.8.4",
        "react-app-rewired": "^2.2.1",
        "stylelint": "^15.2.0",
        "stylelint-config-standard": "^30.0.1",
        "stylelint-scss": "^4.4.0",
        "typescript": "^4.9.5"
      },
      scripts: {
        "dev": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        "eject": "react-app-rewired eject",
        "commit": "git-cz",
        "lint": "eslint ./src",
        "prepare": "husky install",
        "lintfix": "eslint --fix"
      },
  })

  generator.extendPackage({
      browserslist: {
        "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      },
      eslintConfig: {
        "extends": [
          "react-app"
        ]
      },
      "lint-staged": {
        "src/**/*.{css,less,scss,html,json,jsx,js,ts,tsx}": [
          "prettier --write ."
        ],
        "src/**/*.js": "eslint --fix",
        "src/**/*.{ts,tsx}": "eslint --fix",
        "src/**/*.{css,scss}": "stylelint --fix"
      },
      config: {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
      }
  })
}

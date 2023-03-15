module.exports = (generator, answers) => {

  generator.render('./template/common', { deployName: answers.deploy, spa: answers.SPA })
  
  if(answers.SPA) {
    generator.render('./template/spa', { mobile: answers.Moblie })
    generator.render('./template/modules/src', {}, {}, 'src/')
  } else {
    generator.render('./template/mpa', { mobile: answers.Moblie })
    generator.render('./template/modules/src', {}, {}, 'src/common/')
  }

  generator.extendPackage({
      dependencies: {
        "@vitejs/plugin-vue": "^3.0.3",
        "vite": "3.0.7",
        "vite-plugin-eslint": "^1.8.1",
        "vue": "^3.2.37",
        "unplugin-vue-components": "0.22.4",
        "sass": "^1.49.11",
        "axios": "^0.27.2",
        "glob": "^8.0.3",
        "autoprefixer": "^10.4.4",
        "cross-env": "^7.0.3",
        "typescript": "^4.5.4",
        "@babel/core": "^7.19.1",
        "@babel/eslint-parser": "^7.19.1",
        "@babel/types": "^7.19.0",
      },
      devDependencies: {
        "husky": "^8.0.2",
        "lint-staged": "13.0.3",
        "commitizen": "^4.2.4",
        "cz-conventional-changelog": "^3.3.0",
        "conventional-changelog-cli": "^2.2.2",
        "@commitlint/cli": "^17.3.0",
        "@commitlint/config-conventional": "^17.3.0",
        "@types/node": "^18.7.11",
        "@typescript-eslint/eslint-plugin": "^5.18.0",
        "@typescript-eslint/parser": "^5.18.0",
        "cz-conventional-changelog": "^3.3.0",
        "eslint": "^8.12.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-import": "^2.26.0",
        "eslint-plugin-prettier": "^4.0.0",
        "eslint-plugin-vue": "^8.6.0",
        "postcss": "^8.4.12",
        "postcss-html": "^1.3.0",
        "prettier": "^2.6.2",
        "stylelint": "^14.6.1",
        "stylelint-config-recess-order": "^3.0.0",
        "stylelint-config-standard": "^25.0.0",
        "stylelint-order": "^5.0.0",
        "stylelint-scss": "^4.2.0",      
      },
      scripts: {
        "dev": "vite --mode development",
        "dev:staging": "cross-env vite --mode staging",
        "dev:production": "cross-env vite --mode production",
        "build:test": "vite build  --mode test",
        "build:staging": "vite build  --mode staging",
        "build:production": "vite build  --mode production",
        "preview": "vite preview",
        "lint": "eslint src --ext .ts,.tsx,.vue,.js,.jsx",
        "lint:fix": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
        "stylelint": "stylelint \"src/**/*.{vue,htm,html,css,sss,less,scss}\"",
        "stylelint:fix": "stylelint --fix \"src/**/*.{vue,htm,html,css,sss,less,scss}\"",
        "prettier": "prettier --write ./src",
        "commit": "git-cz",
        "prepare": "husky install",
        "postprepare": "npm run pre-commit && npm run commit-msg",
        "pre-commit": "npx husky add .husky/pre-commit 'npx lint-staged'",
        "commit-msg": "npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'",
        "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
      },
      config: {
        "commitizen": {
          "path": "cz-conventional-changelog"
        }
      },
      commitlint: {
        "extends": [
          "@commitlint/config-conventional"
        ]
      },
      husky: {
        "hooks": {
          "pre-commit": "lint-staged",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
      },
      "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
          "eslint --fix",
          "prettier --write"
        ],
        "*.{css,less,sass,scss,html}": [
          "stylelint --fix"
        ],
        "*.vue": [
          "eslint --fix",
          "prettier --write",
          "stylelint --fix"
        ],
        "*.md": [
          "prettier --write"
        ]
      }
  })

  if(answers.SPA) {
    generator.extendPackage({
      dependencies: {
        "vue-router": "4",
        "pinia": "^2.0.22",
        "vite-plugin-html": "^3.2.0",
      },
    })
  }

  if(answers.Moblie) {
    generator.extendPackage({
      dependencies: {
        "vant": "^4.0.10",
      },
    })
  } else {
    generator.extendPackage({
      dependencies: {
        "element-plus": "^2.2.17",
      },
    })
  }

  generator.extendPackage({
      browserslist: [
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ],
  })
}

# 概要
- Reactテスト学習用REP
- 学習内容は[【Reactテスト入門】React Testing Library/Jest/Vitestで学ぶフロントエンドテスト入門](https://www.udemy.com/course/react-frontend-test-tutorial/)に準ずる


# 環境構築
`$ npm create vite@latest react_vitest`
```
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others

[swc](https://swc.rs/)
? Select a variant: › - Use arrow-keys. Return to submit.
    TypeScript
❯   TypeScript + SWC
    JavaScript
    JavaScript + SWC
    Remix ↗


  `cd react_vitest`
  `npm install`
  `npm run dev`
```

## build・プレビュコマンド
* `$ npm run build`
- distディレクトリにエクスポートされる

* `$ npm run preview`
- 本番環境と同じような環境でpreview


# importパスエリアス設定
`@/components/XXX/XXX`
## tsconfig.json
```
// importパスエリアス設定
"baseUrl": "./",
"paths": {
  "@/*": ["src/*"]
}
// test()でエラーが出る時これを追加
"types": ["vitest/globals"]
```
## vite.config.ts
- こちらも修正する必要があるが、下記モジュールでtsconfig.jsonだけでvite.config.tsにも反映される
    - `$ npm i -D vite-tsconfig-paths`
  ```
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react-swc'
  import tsconfigPaths from "vite-tsconfig-paths"

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react(), tsconfigPaths()],
  })
  ```

# vitest
## 概要
Jestと比べると早く動く
## 導入
`$ npm i -D vitest happy-dom @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom`
(happy-dom: JESTではjs-domでDOMを構築していたが、happy-domの方が早い)

### package.json修正
```
"test": "vitest",
"test:watch": "vitest watch",
"coverage": "vitest run --coverage"
```
### vite.config.ts修正
```
// vitestの型を適応
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    // 環境全体に適応
    setupFiles: ["./vitest-setup.ts"],
    globals: true,
  },
})
```

* vitest-setup.ts
```
import "@testing-library/jest-dom/vitest"
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

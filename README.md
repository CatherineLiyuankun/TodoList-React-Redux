# TodoList-React-Redux
Small demo using React and Redux


1.  [Download this repo](https://github.com/CatherineLiyuankun/TodoList-React-Redux) or `git clone https://github.com/CatherineLiyuankun/TodoList-React-Redux.git`
2.	Switch back to your terminal, From the repo folder run:

    `npm run start`
    
3.	Visit http://localhost:8787/index.html, Enjoy!


Environment
1.	Download Node.js from http://nodejs.org/ and install it. Open your terminal, type `node -v` to make sure you can see the version number. That means you have installed Node successfully.
2. create package.json
3. install Babel：
`npm install --save-dev babel-cli babel-core babel-polyfill babel-preset-es2015 babel-preset-react`
    create .babelrc
    add 
    ```{
        "presets": ["react", "es2015"]
    }```

4. test karma
5. webpack
`npm install --save-dev webpack`
`npm install --save-dev webpack-dev-server`

`npm install --save-dev babel-loader sass-loader style-loader css-loader react-hot-loader`

create webpack.config.dev.js
create  server.js

6. online environment
`npm install --save-dev postcss cssnano extract-text-webpack-plugin postcss-loader`
create webpack.config.prod.js
add main and jsnext:main to package.json
create .gitignore

7. react environment 
`npm install --save react react-dom redux react-redux`



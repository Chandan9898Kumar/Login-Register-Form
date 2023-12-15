# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `Prettier`
`One of the main advantages of using Prettier in your React app is that it helps to automatically format your code. This means that you don't have to spend time manually formatting `
`your code, which can be a tedious task, especially in large projects. Instead, you can focus on writing code and let Prettier handle the formatting.`

`Another advantage of Prettier is its seamless integration with code editors like Visual Studio Code. Once you have installed the Prettier extension in Visual Studio Code, you can easily format your code with a simple command from the command palette or even configure it to format on save. This means every time you save your file, your code gets automatically formatted according to the rules defined in your configuration file.`



### Webpack: Bundle.js - Uncaught ReferenceError: process is not defined.

`1.    For Webpack 5, you can reference "process/browser" from the appropriate plugins part of webpack.config.js:`

Than Run :  
    Then run
`npm install process`





`2. For namespaced environment variables (more secure) check lines 10 - 28 on this StackBlitz page.`

With dotenv package:
    Install dotenv:
`yarn add -D dotenv or npm i -D dotenv`


### Define these variables with webpack.DefinePlugin:

` Inside webpack.config.js`
const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
       'process.env': JSON.stringify(process.env)
    })
  ]
}
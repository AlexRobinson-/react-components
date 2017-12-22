const path = require("path");

module.exports = {
    title: '',
    skipComponentsWithoutExample: false,
    serverPort: 7000,
    styleguideDir: '../../demo/chrome',
    showUsage: true,
    require: [
        'babel-polyfill',
        path.resolve(__dirname, 'setup.js')
    ],
    sections: [{
        name: "Chrome",
        content: "../../packages/chrome/README.md",
        components: "../../packages/chrome/src/**/[A-Z]*.js"
    }],
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.jsx?$/, '.example.md');
    },
    webpackConfig: {
        module: {
            rules: [
                // Babel loader, will use your project’s .babelrc
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                // Other loaders that are needed for your components
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader?modules'
                },
                {
                    test: /\.svg$/,
                    loader: 'raw-loader'
                }
            ]
        }
    }
};

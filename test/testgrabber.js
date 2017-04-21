const testsContext = require.context('.', true, /-test$/);
testsContext.keys().forEach(testsContext);

// front-end
const componentsContext = require.context('../public/src/components/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
var React = require("react");
var ReactDOMServer = require("react-dom/server");

exports.stringify = function (obj) {
    return obj ? JSON.stringify(obj) : "";
};

exports.generatePage = (Component, Head, scriptURL, pageName) => (state, payload, content, pagename) => {
    var html = ReactDOMServer.renderToString(
        React.createElement(Component, { serverState: state, pageName: pagename, payload, content, Head, scriptURL })
    );
    
    return html;
}

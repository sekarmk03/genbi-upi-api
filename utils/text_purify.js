const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const textPurify = (text) => {
    return DOMPurify.sanitize(text);
};

module.exports = textPurify;
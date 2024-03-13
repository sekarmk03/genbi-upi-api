const convert = (html) => {
    let plainText = html.replace(/<[^>]*>|&nbsp;|\n|&rsquo;|&ldquo;|&rdquo;/g, function(match) {
        return match === '&nbsp;' ? ' ' : match === '&rsquo;' ? "'" : match === '&ldquo;' ? '"' : match === '&rdquo;' ? '"' : '';
    });

    plainText = plainText.trim().substring(0, 150);
    plainText = plainText.replace(/\s+\S*$/, '');

    return plainText + ' ...';
}

module.exports = convert;

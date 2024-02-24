const convert = (html) => {
    let plainText = html.replace(/<[^>]*>|&nbsp;|\n|&rsquo;|&ldquo;/g, function(match) {
        return match === '&nbsp;' ? ' ' : match === '&rsquo;' ? "'" : match === '&ldquo;' ? '"' : '';
    });

    plainText = plainText.trim().substring(0, 150);
    plainText = plainText.replace(/\s+\S*$/, '');

    return plainText + ' ...';
}

module.exports = convert;

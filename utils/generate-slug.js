const generateSlug = (title) => {
    const slug = title
    .toLowerCase()                  // Convert to lowercase
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove non-word characters
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
    .replace(/['"()]/g, '')         // Remove quotes and parentheses
    .replace(/[^a-z0-9-]/g, ' ')    // Replace non-alphanumeric characters with space
    .trim()                         // Trim leading and trailing spaces
    const dateStr =  + "_" + new Date().toISOString().split('T')[0].replace(/-/g, '');

    return `${slug}_${dateStr}`;
}

module.exports = generateSlug;
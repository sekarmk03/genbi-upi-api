const cleanText = (sentence) => {
    // Remove non-alphanumeric characters
    const txt = sentence.replace(/[^a-zA-Z0-9\s]/g, '');
    // Remove HTML tags
    const cleanedHTML = txt.replace(/<[^>]*>/g, '');
    // Remove JavaScript code (between <script> tags)
    const cleanedJS = cleanedHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    // Remove non-alphanumeric characters, including specified characters
    const cleaned = cleanedJS.replace(/[^\w\s"':!?]+/g, ' ');
    return cleaned.trim();
}

module.exports = cleanText;
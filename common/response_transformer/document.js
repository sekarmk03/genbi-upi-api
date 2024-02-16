module.exports = {
    documentList: (documents) => {
        return documents.map((document) => {
            let newdocument = {
                id: document.id,
                category: document.category,
                file_name: document.file.file_name,
                file_url: document.file.imagekit_url
            }

            return newdocument;
        });
    },
};
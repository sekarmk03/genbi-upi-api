module.exports = {
    documentList: (documents) => {
        if (documents.length == 0) return [];
        return documents.map((document) => {
            let newdocument = {
                id: document.id,
                file_name: document.file.file_name,
                file_url: document.file.imagekit_url
            }

            if (document.category) newdocument.category = document.category;

            return newdocument;
        });
    },

    documentDetail: (document) => {
        if (!document) return null;
        let newdocument = {
            id: document.id,
            file_name: document.file.file_name,
            file_url: document.file.imagekit_url
        }

        if (document.category) newdocument.category = document.category;

        return newdocument;
    }
};
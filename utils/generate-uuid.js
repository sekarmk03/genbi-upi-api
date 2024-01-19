const { v4: uuidv4 } = require('uuid');

const generateUUIDs = (count) => {
    const uuids = [];

    for (let i = 0; i < count; i++) {
        uuids.push(uuidv4());
    }

    return uuids;
}

const uuids = generateUUIDs(80);
console.log(uuids);
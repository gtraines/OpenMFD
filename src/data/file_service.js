/**
 * Created by graham on 7/2/17.
 */

var fs = require('fs');

module.exports = {
    getJsonFile: getJsonFile,
    getDirectoryContents: getDirectoryContents
};

function getJsonFile(fileLocation) {
    var openedFile = fs.readFileSync(fileLocation);
    var fileJson = JSON.parse(openedFile);

    return fileJson;
}

function getDirectoryContents(directory) {
    var filesInDirectory = fs.readdirSync(directory);

    return filesInDirectory;
}
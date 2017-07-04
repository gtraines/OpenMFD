/**
 * Created by graham on 7/1/17.
 */

var fs = require('fs');
var fileService = require('../data/file_service.js');

module.exports = {
    getPagesForProfile: getPagesForProfile,
    getProfiles: getProfiles
};

function setUpProfileSelection() {

    _.each(profilesObj.profiles, function (profile) {
        profiles.push()
    });
}

function getProfiles() {
    var profileFiles = fileService.getDirectoryContents("./profiles/");
    var profiles = [];

    _.each(profileFiles, function (profileFile) {
        var profile = fileService.getJsonFile('./profiles/' + profileFile);

        profiles.push({
            profileId: profile.profileId,
            displayText: profile.displayName,
            filename: profileFile
        });
    });

    return profiles;
}

function getPagesForProfile(fileName) {
    var profileFileObj = fileService.getJsonFile('./profiles/' + fileName);

    return profileFileObj.pages;
}

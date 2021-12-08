const util = require("../util");
const db = require("../db");

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function dbInit(){
    try {
        util.log("Initializing database");
        await db.init();
    } catch (error) {
        console.error(error);
    }
}
dbInit();

async function setup(){
    try {
        // Wait 10 seconds before starting setup
        await sleep(10000);

        util.log("Here we are");

        const auth = require("../auth");
        const challengeUtil = require("./challengeUtil");

        util.log("Registering local user 'dojouser' with password: 'SecureCodingDojo'");
        //cleanup the account if it exists
        await db.getConn().queryPromise("DELETE FROM users WHERE accountId = 'Local_dojouser'");
        //create the dev account
        let dojoUserInfo = {accountId:"Local_dojouser",familyName:"User", givenName:"Dojo",role: "student"};
        await db.getPromise(db.insertUser, dojoUserInfo);
        auth.createUpdateUserInternal("dojouser", dojoUserInfo, "SecureCodingDojo", false);

        util.log("Registering local user 'dojouser2' with password: 'SecureCodingDojo'");
        //cleanup the account if it exists
        await db.getConn().queryPromise("DELETE FROM users WHERE accountId = 'Local_dojouser2'");
        //create the dev account
        let dojoUserInfo2 = {accountId:"Local_dojouser2",familyName:"User", givenName:"Dojo", role: "student"};
        await db.getPromise(db.insertUser, dojoUserInfo2);
        auth.createUpdateUserInternal("dojouser2", dojoUserInfo2, "SecureCodingDojo", true);

        util.log("Unlocking all challenges for 'dojouser'");
        let user = await db.getPromise(db.getUser,"Local_dojouser");
        // await challengeUtil.passChallenges("securityCodeReviewMaster",user,["codereview101_indirectReferences"]);
        await challengeUtil.passChallenges("blackBelt",user,["cwe502"]);

        let user2 = await db.getPromise(db.getUser,"Local_dojouser2");
        await challengeUtil.passChallenges("blackBelt",user2,["cwe134"]);

    } catch (error) {
        console.error(error);
    }

}

setup();

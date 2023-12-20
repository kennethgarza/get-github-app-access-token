import core     from "@actions/core";
import jwt      from "jsonwebtoken";
import axios    from "axios";

const { getInput, 
        setOutput, 
        exportVariable, 
        info, 
        setFailed } = core;
const { sign } = jwt;
const { post } = axios;

const ghAppId       = getInput("gh_app_id");
const ghInstallId   = getInput("gh_install_id");
const ghPemFile     = getInput("gh_pem_file") || Buffer.from(getInput("gh_pem_64")) || "";

let main = async () => {
    let payload = {
        iat: Math.floor(new Date().getTime() / 1000) - 60,
        exp: Math.floor(new Date().getTime() / 1000) + (5 * 60),
        iss: ghAppId
    };

    let signingOptions = {
        algorithm:  "RS256"
    };

    let token = sign(payload, ghPemFile, signingOptions);

    let url = `https://api.github.com/app/installations/${ghInstallId}/access_tokens`;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    let accessTokenResults = await post(url, null, config)
        .then((result) => {
            return result.data;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });

    let accessToken = accessTokenResults.token;

    if (accessToken === null || accessToken === "") {
        throw "Access Token is empty... please check your settings"
    }

    setOutput('TOKEN', accessToken);

    // new and improved, set this as an environment variable
    exportVariable("GH_APP_ACCESS_TOKEN", accessToken);

}

main().then(() => {
    info("Retrieved github access token")
})
.catch((err) => {
    setFailed(err);
});
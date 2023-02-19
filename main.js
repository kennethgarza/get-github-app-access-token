import core     from "@actions/core";
import jwt      from "jsonwebtoken";
import axios    from "axios";

const { getInput, setOutput, info, setFailed } = core;
const { sign } = jwt;
const { post } = axios;

// variables
const ghAppId       = getInput("gh_app_id");
const ghInstallId   = getInput("gh_install_id");
const ghPemFile     = getInput("gh_pem_file");

let main = async () => {
    let payload = {
        iat: Math.floor(new Date().getTime() / 1000) - 60,
        exp: Math.floor(new Date().getTime() / 1000) + (2 * 60),
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

    setOutput('TOKEN', accessToken);
}

main().then(() => {
    info("Retrieved github access token")
})
.catch((err) => {
    setFailed(err);
});
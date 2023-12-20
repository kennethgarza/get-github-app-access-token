# Get Github App Access Token

## Changes from v1 to v2

* Removed passing in the PEM file in favor of using a base64encoded string
* Added Output Environment Variable
* Deprecating Output Token in favor of environment variable.  Still useable for now

## Usages

### Using Environment VALUE (recommended)

    -   name: Get Github Token
        uses: acces_token_module_version
        with:
            gh_app_id     : ${{ secrets.GH_APP_ID }}  
            gh_install_id : ${{ secrets.GH_INSTALL_ID }}
            gh_pem_64     : ${{ secrets.GH_PEM_64 }} ## the base64 encoded value of the secret pem

    -   name: Use the token somehow
        env: ${{ env.GITHUB_APP_ACCESS_TOKEN }}
        run: echo "Im using the token"


### Using OUTPUT Token (Deprecated)

    -   name: Get Github Token
        uses: acces_token_module_version
        with:
            gh_app_id     : ${{ secrets.GH_APP_ID }}  
            gh_install_id : ${{ secrets.GH_INSTALL_ID }}
            gh_pem_64     : ${{ secrets.GH_PEM_64 }} ## the base64 encoded value of the secret pem
        id: GITHUB_TOKEN

    -   name: Use the token somehow
        env: ${{ steps.GITHUB_TOKEN.outputs.TOKEN }}
        run: echo "Im using the token"


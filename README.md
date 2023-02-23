# Get Github App Access Token

## Usage

    -   name: Get Github Token
        uses: acces_token_module_version
        with:
            gh_app_id     : ${{ secrets.GH_APP_ID }}  
            gh_install_id : ${{ secrets.GH_INSTALL_ID }}
            gh_pem_file   : ${{ secrets.GH_PEM_FILE }}
        id: GITHUB_TOKEN

    -   name: Use the token somehow
        env: ${{ steps.GITHUB_TOKEN.outputs.TOKEN }}
        run: echo "Im using the token"
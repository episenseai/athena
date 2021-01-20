# episense AI frontend app

---

# To start your app

1. Install `node` (if not already installed)
   - `sudo apt install nodejs npm` (for ubuntu)
2. Install `yarn` (javascript package manager) to install dependencies for the project (on
   ubuntu)

   - `sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
   - `sudo sh -c "echo 'deb https://dl.yarnpkg.com/debian/ stable main' >> /etc/apt/sources.list"`
   - `sudo apt update`
   - `sudo apt --no-install-recommends install yarn`

3. `cd` into the project directory
4. Install project dependencies
   - `yarn install --dev`
5. Build the project
   - `yarn build`
6. Run the app
   - `yarn prod`

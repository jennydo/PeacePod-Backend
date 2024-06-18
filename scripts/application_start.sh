#!/bin/bash
sudo chmod -R 777 /home/ec2-user/PeacePod-Backend
# navigate into working directory where we have all our github files
cd /home/ec2-user/PeacePod-Backend

#add npm and node path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash completion

#install node modules
npm install

#start our node app in the background
node app.js > app.out.log 2> app.err.log < /dev/null &

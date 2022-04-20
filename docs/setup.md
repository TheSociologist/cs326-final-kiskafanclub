link: https://kiska-fan-club-1.herokuapp.com/

To build project from VSCode, use the following series of commands: 
1) npm install
2) npm run deploy
3) cd deploy
4) git init
5) git add . && git commit -m "deployment"
6) heroku login
7) heroku create -a (app-name)
8) heroku git:remote -a (app name)
9) git push heroku (master)/(main)
10) heroku open

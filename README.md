# TypeAi.de
Site to practise typing skills. Currently in development, once the first working version is finished I'll add a link here.


With this project I'm aiming to make a minimalist site with quality texts, a simple UI, and a straightforward text window. The quotes will go through a strict spell checker, as well as tests to make sure that there aren't any extra spaces, a grammar checker, etc. Anything that could help ensure quality. The timer should start exactly when a user starts typing (instead of the countdowns from other sites). Creating an account will be optional, if a user logs in then their progress will be tracked, but there won't be any prompts to log in.


## Running it:
Haven't finished completely automating everything yet. But for now it works like this:

### Backend
Simply clone the project onto a machine with docker installed, and run docker-compose up --build.
To use a previous database dump, copy it into mongodb/default_content before starting, and delete mongodb/db-data.

### Frontend
Run the npm build script, then deploy the build folder with some tool like netlify. Change the URL that the frontend uses to access the backend, include the backend's IP.

(Ideally it would host everything from one server, and spin up with just the one docker-compose call, but there's OS network configuration to be done and lots of stuff that I currently don't have the time to deal with).

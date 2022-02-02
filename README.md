# typingLite
Site to practise typing skills. Currently in development, once the first working version is finished I'll add a link here.

## What motivates this project
There are already quite a few sites for this same purpose, however they all have certain rather annoying flaws.

keyma.sh has way too many spelling errors in their texts, and it's riddled with ads.

keyhero.com relies on user-submitted quotes and allows users to edit quotes. This solves the typo problem, but the quotes are just bad. There are more texts about typing and submitting texts (such as "hey I'm submitting a quote, I don't really know what to submit but I want the achievement points for 10 submitted quotes") than anything else, and an equal amount of texts complaining about these other texts. 

typeracer.com is awesome in terms of quote quality, it just bothers me that in order to get from one quote to the next, you have to click the next button with your mouse (instead of the enter key). I don't like their UI, and the fact that you have to wait for a countdown before you can start typing.

nitrotype.com is... just bad. Games take way too long to load, sometimes it even gets stuck on a loading screen, they keep prompting users to log in, and because it doesn't let users type a letter they're not supposed to type or fix mistakes, it doesn't improve real typing speed, just speed on that particular site.

monkeytype.com: Good overall, but it only lets users type lists of words from the dictionary, not real sentences with punctuation. I also dislike that the entire rest of the text in the typing window moves when the user makes a mistake.

Others: On most of them the scoring system is off, mistakes aren't penalized, the typing window is often confusing, or your mistakes aren't clearly highlighted in a distinguishable color to make it easier to fix them.


## What makes this different
With this project I'm aiming to make a minimalist site with quality texts, a simple UI, and a straightforward text window. The quotes will go through a strict spell checker, as well as tests to make sure that there aren't any extra spaces, a grammar checker, etc. Anything that could help ensure quality. The timer should start exactly when a user starts typing (instead of the countdowns from other sites). Creating an account will be optional, if a user logs in then their progress will be tracked, but there won't be any prompts to log in.

Basically this is an attempt to combine all the positive aspects of those other sites, while avoiding their obvious flaws.

## Running it:
Simply copy the project onto a machine with docker installed, and run docker-compose up --build.
To use a previous database dump, copy it into mongodb/default_content before starting.

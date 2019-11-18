Hello Russ! These are notes I have for you as I edit this shared back-end. I have commented the phrase /* RUSS */ in files I have updated near anything I had changed along with an explanation.

I have two sections for notes, Packages and Files. Packages will be any npm packages I install, uninstall, or edit. Files will be any files I change, add, or remove. 

## Packages

### Packages Installed
-pg (short for postgres): Needed in order to run postgres 
-knex-cleaner: resets primary keys and cleans up our tables (resets back to seed data)

### Packages Updated
Sometimes packages have vulnerabilities, if I find any, I will fix those vulnerabilities here!

### Pacakges Uninstalled
I don't think I will be removing any packages, but just in case, I will leave this here!

## Files

### Files Changed
server.js:
-switched the initial GET request to something that can be parsed by a browser
-added dotenv to the beginning of the file to use environment variables in the server js file.

package.json:
-removed MAIN and TEST script files, MAIN currently doesn't do anything and TEST is something I will add on my own later.
-added START script to the file so Heroku can use it to properly deploy.
** I was not able to note these changes in the file itself **

### Files Added

### Files Removed
I don't plan on removing any files, but just in case, I will leave this here!


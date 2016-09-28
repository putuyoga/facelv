# we need bundle our assets
npm build
# remove the last line of .gitignore
# we need the `public` directory on deployment
head -n -1 .gitignore > temp_gitignore ; mv temp_gitignore .gitignore
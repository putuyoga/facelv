# we need bundle our assets
echo "Build Webpack!"
npm build

# remove the last line of .gitignore
# we need the `public` directory on deployment
echo "Remove Last Line of .gitignore!"
sed -i '$ d' .gitignore

#updated git
git add .
git commit
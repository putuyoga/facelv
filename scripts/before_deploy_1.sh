# we need bundle our assets
echo "Build Webpack!"
webpack -p --progress

ls -R ./client | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'

# remove the last line of .gitignore
# we need the `public` directory on deployment
echo "Remove Last Line of .gitignore!"
sed -i '$ d' .gitignore

# updated git author
git config --global user.email "putuyoga@gmail.com"
git config --global user.name "I Putu Yoga Permana"

# updated git
git add .
git commit -a --allow-empty-message -m ''
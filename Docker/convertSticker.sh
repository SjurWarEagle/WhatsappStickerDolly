# App Logo
ANDROID_ASSETS_BASEDIR=../../../Android/app/src/main/assets
cd originalImages/sticker


pwd
touch /tmp/test
touch /tmp/test
ls -al /tmp

# Delete previous generated Sticker
for imageFile in $(find . \( ! -regex '\.' \) -maxdepth 1 -type d ); do
  rm -rf "${ANDROID_ASSETS_BASEDIR}/$(basename ${imageFile})"/*
done

# Generate Normal Sticker
for imageFile in $(find . \( ! -regex '\.' \) \( ! -regex '.*tray_.*' \) -maxdepth 2 -type f ); do
  convert -background none -adaptive-resize 512x512 -gravity center -crop 512x512+0+0 +repage -fill transparent ${imageFile} "${ANDROID_ASSETS_BASEDIR}/${imageFile%.*}_tmp.webp"
  convert -background none -size 512x512! -extent 512x512 -gravity South +repage -fill transparent "${ANDROID_ASSETS_BASEDIR}/${imageFile%.*}_tmp.webp" "${ANDROID_ASSETS_BASEDIR}/${imageFile%.*}.webp"
  rm "${ANDROID_ASSETS_BASEDIR}/${imageFile%.*}_tmp.webp"
done

# Generate Tray Icon
for imageFile in $(find . -iname tray*png \( ! -regex '\.' \) -maxdepth 2 -type f ); do
  convert -background none -adaptive-resize 96x96^ ${imageFile} "${ANDROID_ASSETS_BASEDIR}/${imageFile}"
done

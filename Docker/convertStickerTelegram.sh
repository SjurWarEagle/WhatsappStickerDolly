# App Logo
ANDROID_ASSETS_BASEDIR=../../../Android/app/src/main/assets

mkdir -p telegram/normal
cd originalImages/sticker

# Delete previous generated Sticker
for imageFile in $(find . \( ! -regex '\.' \) -maxdepth 1 -type d ); do
  rm -rf "../../telegram/$(basename ${imageFile})"/*
done

# Generate Normal Sticker
for imageFile in $(find . -maxdepth 2  -type f \( ! -regex '.*tray_.*' \)  ); do
  convert -background none -adaptive-resize 512x512 -gravity center -crop 512x512+0+0 +repage -fill transparent ${imageFile} "../../telegram/${imageFile%.*}_tmp.png"
  convert -background none -size 512x512! -extent 512x512 -gravity South +repage -fill transparent "../../telegram/${imageFile%.*}_tmp.png" "../../telegram/${imageFile%.*}.png"
  rm "../../telegram/${imageFile%.*}_tmp.png"
done

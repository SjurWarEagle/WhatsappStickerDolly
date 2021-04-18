# App Logo
ANDROID_RES_BASEDIR=../../../Android/app/src/main/res
cd originalImages/appLogo

convert -background none -resize 72x72 ic_launcher.png "${ANDROID_RES_BASEDIR}/mipmap-hdpi/ic_launcher.png"
convert -background none -resize 72x72 ic_launcher_round.png "${ANDROID_RES_BASEDIR}/mipmap-hdpi/ic_launcher_round.png"
convert -background none -resize 162x162 ic_launcher_foreground.png "${ANDROID_RES_BASEDIR}/mipmap-hdpi/ic_launcher_foreground.png"

convert -background none -resize 48x48 ic_launcher.png "${ANDROID_RES_BASEDIR}/mipmap-mdpi/ic_launcher.png"
convert -background none -resize 48x48 ic_launcher_round.png "${ANDROID_RES_BASEDIR}/mipmap-mdpi/ic_launcher_round.png"
convert -background none -resize 108x108 ic_launcher_foreground.png "${ANDROID_RES_BASEDIR}/mipmap-mdpi/ic_launcher_foreground.png"

convert -background none -resize 96x96 ic_launcher.png "${ANDROID_RES_BASEDIR}/mipmap-xhdpi/ic_launcher.png"
convert -background none -resize 96x96 ic_launcher_round.png "${ANDROID_RES_BASEDIR}/mipmap-xhdpi/ic_launcher_round.png"
convert -background none -resize 216x216 ic_launcher_foreground.png "${ANDROID_RES_BASEDIR}/mipmap-xhdpi/ic_launcher_foreground.png"

convert -background none -resize 144x144 ic_launcher.png "${ANDROID_RES_BASEDIR}/mipmap-xxhdpi/ic_launcher.png"
convert -background none -resize 144x144 ic_launcher_round.png "${ANDROID_RES_BASEDIR}/mipmap-xxhdpi/ic_launcher_round.png"
convert -background none -resize 324x324 ic_launcher_foreground.png "${ANDROID_RES_BASEDIR}/mipmap-xxhdpi/ic_launcher_foreground.png"

convert -background none -resize 192x192 ic_launcher.png "${ANDROID_RES_BASEDIR}/mipmap-xxxhdpi/ic_launcher.png"
convert -background none -resize 192x192 ic_launcher_round.png "${ANDROID_RES_BASEDIR}/mipmap-xxxhdpi/ic_launcher_round.png"
convert -background none -resize 432x432 ic_launcher_foreground.png "${ANDROID_RES_BASEDIR}/mipmap-xxxhdpi/ic_launcher_foreground.png"

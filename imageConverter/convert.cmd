docker build -f ../Docker/Dockerfile-convert .. -t whatsapp-convert
docker run --rm  --volume C:/IdeaProjects/whatsappstickercohhcarnage:/projectDir/ whatsapp-convert sh -c /scripts/convertAppLogo.sh
docker run --rm  --volume C:/IdeaProjects/whatsappstickercohhcarnage:/projectDir/ whatsapp-convert sh -c /scripts/convertSticker.sh

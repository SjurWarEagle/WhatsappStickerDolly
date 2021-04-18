docker build -f ../docker/Dockerfile-checker .. -t whatsapp-checker
docker run --rm whatsapp-checker sh ./runChecker.sh

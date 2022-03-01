#!/bin/bash

REPOSITORY=~/polypoli/polypoli

echo "> 프로젝트 저장소로 이동!"
cd $REPOSITORY

echo "> Git Pull !!!"
git fetch --all
git reset --hard origin/master
git pull origin master

chmod +x gradlew

echo ">/gradlew clean build"
./gradlew clean build

echo ">/gradlew build start!"
./gradlew build

echo "> 실행중인 프로세스 확인!"
CURRENT_PID=$(pgrep -f polypoli-app)

echo "> 실행중인 프로세스 아이디 : $CURRENT_PID"
if [ -z $CURRENT_PID ]; then
        echo "> 현재 실행중인 어플리케이션이 없으므로 종료하지 않습니다!"
else
        echo "> 현재 실행중인 어플리케이션 종료! Kill -9 $CURRENT_PID"
        kill -9 $CURRENT_PID
        sleep 5
fi

echo "> 새 어플리케이션 배포 !!!"
nohup java -jar $REPOSITORY/polypoli-app/build/libs/polypoli-app.jar &

echo "> npm module download!"
cd polypoli-web
npm i

echo "> pm2 delete all"
pm2 delete all

echo "> pm2 start"
pm2 start --name "polypoli-web" npm -- start
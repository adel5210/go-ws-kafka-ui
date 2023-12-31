# React websocket basics
### Deployment docker
- docker build -t go-ws-kafka-ui .
- docker run -p 3000:3000 go-ws-kafka-ui
### Push to docker hub
- docker images
- docker tag go-ws-kafka-ui adel5210/go-ws-kafka-ui:1.0.0
- docker push adel5210/go-ws-kafka-ui:1.0.0
FROM arm64v8/openjdk:8
COPY backend/target/backend-0.0.1-SNAPSHOT.jar /usr/bin/DepartureBoard.jar
WORKDIR /usr/bin
EXPOSE 8080/tcp
CMD ["java", "-jar", "DepartureBoard.jar"]

# DepartureBoard
This is a Java, Spring Boot and React web app that uses the National Rail Enquiries API to create a UK Railway Departure Board:

![Departure Board](frontend/src/images/departureboard.png)

## To start the back-end from an IDE
Navigate to the 'departureboard' directory and then run:
```bash
mvn clean compile
```
Then run the 'DepartureboardApplication' from the IDE to start the back-end listening upon port 8080.
You can create a run configuration within your IDE that passes in your personal NRE key as a 'VM option':
```bash
-Dnational.rail.enquiries.access.token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## To start the front-end
Navigate to the 'frontend' directory and then run:
```bash
yarn install
yarn start
```

## To start the entire application from the compiled JAR file
Create the JAR file for the application:
```bash
mvn package
```
Then run the application, passing in your personal NRE key:
```bash
cd backend/target
java -Dnational.rail.enquiries.access.token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx -jar backend-0.0.1-SNAPSHOT.jar
```
The application will be available at the following location:
```http request
http://localhost:8080
```


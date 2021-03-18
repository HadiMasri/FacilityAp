FROM maven:3.6-jdk-11 as maven

# copy the project files
COPY pom.xml ./pom.xml

# build all dependencies
RUN mvn dependency:go-offline -B

# copy your other files
COPY src ./src

# build for release
RUN mvn package

# create JRE-Container
FROM openjdk:11-jre-slim

# set source directory
WORKDIR /target

# copy over the built artifact from the maven image
COPY --from=maven target/*.jar ./

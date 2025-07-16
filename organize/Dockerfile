# Usa uma imagem base oficial do OpenJDK (Java Development Kit)
# Recomendado usar uma versão LTS (Long-Term Support) como 17 ou 21
# e uma imagem "slim" ou "alpine" para um tamanho menor
FROM openjdk:17-jdk-slim

# Define um argumento para o nome do arquivo JAR.
# Voce pode mudar o 'organize-0.0.1-SNAPSHOT.jar' para o nome exato do seu JAR.
ARG JAR_FILE=target/organize-0.0.1-SNAPSHOT.jar

# Copia o JAR da sua maquina local para dentro do conteiner.
# O 'target/' e o diretorio onde o Maven coloca o JAR. Se você usa Gradle,
# o caminho pode ser 'build/libs/organize-0.0.1-SNAPSHOT.jar'.
COPY ${JAR_FILE} app.jar

# Expoe a porta em que sua aplicação Spring Boot escuta (geralmente 8080).
# Isso informa ao Docker que esta porta sera usada, mas não a "publica" ainda.
EXPOSE 8080

# Define o comando que sera executado quando o conteiner for iniciado.
# 'java -jar app.jar' executa sua aplicacao Spring Boot.
ENTRYPOINT ["java", "-jar", "app.jar"]
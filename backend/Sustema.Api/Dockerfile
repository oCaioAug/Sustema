# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia e restaura dependências
COPY ["Sustema.Api.csproj", "./"]
RUN dotnet restore "Sustema.Api.csproj"

# Copia todos os arquivos e constrói a aplicação
COPY . .
RUN dotnet publish "Sustema.Api.csproj" -c Release -o /app/publish

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# Copia os arquivos publicados da etapa anterior
COPY --from=build /app/publish .

# Definir o ambiente explicitamente
ENV ASPNETCORE_ENVIRONMENT=Development
# Expõe a porta padrão
EXPOSE 80

# Define o ponto de entrada
ENTRYPOINT ["dotnet", "Sustema.Api.dll"]
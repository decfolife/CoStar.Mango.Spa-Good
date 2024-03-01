#Builds good but doesnt show swagger or angular in docker?
#FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
#WORKDIR /app
#EXPOSE 8000
#
#FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
#ARG BUILD_CONFIGURATION=Release
#WORKDIR /src
#COPY ["MangoSPA.csproj", "."]
#
#RUN dotnet restore "./././MangoSPA.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "./MangoSPA.csproj" -c $BUILD_CONFIGURATION -o /app/build
#
#FROM build AS publish
#ARG BUILD_CONFIGURATION=Release
#RUN dotnet publish "./MangoSPA.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "MangoSPA.dll"]


FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS base
WORKDIR /app
EXPOSE 8000
ENV ASPNETCORE_URLS=http://*:8000

FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS restore
WORKDIR /src
COPY ["MangoSPA.csproj", "."]

RUN dotnet restore "./././MangoSPA.csproj"

FROM restore AS publish
COPY . .
RUN dotnet publish "./MangoSPA.csproj" -c Release -o /app/publish

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MangoSPA.dll"]

ARG USERNAME=mangospa-server
ARG GROUPNAME=mangospa-group

# -g is the GID
RUN addgroup -g 1000 ${GROUPNAME}

# -u is the UID
# -D permits to create an user without password
RUN adduser -u 1000 -G ${GROUPNAME} -D ${USERNAME}

USER ${USERNAME}
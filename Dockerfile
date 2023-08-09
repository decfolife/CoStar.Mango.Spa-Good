FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 8000
ENV ASPNETCORE_URLS=http://*:8000

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Web/MangoSPA/MangoSPA.csproj", "Web/MangoSPA/"]
COPY ["BuildingBlocks/WebHost/WebHost.Customization/WebHost.Customization.csproj", "BuildingBlocks/WebHost/WebHost.Customization/"]
RUN dotnet restore "Web/MangoSPA/MangoSPA.csproj"
COPY . .
WORKDIR "/src/Web/MangoSPA"
RUN dotnet build "MangoSPA.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MangoSPA.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MangoSPA.dll"]
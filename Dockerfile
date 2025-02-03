FROM costarrem/crem_aspnet8.0_alpine AS base
WORKDIR /app
EXPOSE 8000
ENV ASPNETCORE_HTTP_PORTS=8000

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS restore
WORKDIR /src
COPY ["MangoSPA.csproj", "."]

RUN dotnet restore "./././MangoSPA.csproj"

FROM restore AS publish
COPY . .
RUN dotnet publish "./MangoSPA.csproj" -c Release -o /app/publish

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MangoSPA.dll"]
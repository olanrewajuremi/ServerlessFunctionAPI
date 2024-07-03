{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    },
    {
      "type": "cosmosDB",
      "direction": "out",
      "name": "outputDocument",
      "databaseName": "ReportsDatabase",
      "collectionName": "ReportsCollection",
      "connectionStringSetting": "CosmosDBConnectionString"
    }
  ],
  "disabled": false
}

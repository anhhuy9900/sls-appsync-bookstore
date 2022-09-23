export default {
  booksTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "sls-bookstore-books",
      AttributeDefinitions: [
        {
          AttributeName: "bookId",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      KeySchema: [
        {
          AttributeName: "bookId",
          KeyType: "HASH",
        },
      ],
      Tags: [
        {
          Key: "Name",
          Value: "books-table",
        },
      ],
    },
  },
  ordersTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "sls-bookstore-orders",
      AttributeDefinitions: [
        {
          AttributeName: "userId",
          AttributeType: "S",
        },
        {
          AttributeName: "orderId",
          AttributeType: "S",
        },
        {
          AttributeName: "bookId",
          AttributeType: "S",
        },
        {
          AttributeName: "createdAt",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      KeySchema: [
        {
          AttributeName: "userId",
          KeyType: "HASH",
        },
        {
          AttributeName: "orderId",
          KeyType: "RANGE",
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "byOrder",
          KeySchema: [
            { AttributeName: "bookId", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" },
          ],
          Projection: {
            // attributes to project into the index
            ProjectionType: "ALL", // (ALL | KEYS_ONLY | INCLUDE)
          },
        },
      ],
      Tags: [
        {
          Key: "Name",
          Value: "orders-table",
        },
      ],
    },
  },
};

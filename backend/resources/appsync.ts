const mappingTemplates = [
  {
    Type: "AWS::AppSync::Resolver",
    Properties: {
      DataSourceName: "booksTable",
      FieldName: "getBookById",
      TypeName: "Query",
    },
  },
  {
    Type: "AWS::AppSync::Resolver",
    Properties: {
      DataSourceName: "booksTable",
      FieldName: "listBooks",
      TypeName: "Query",
    },
  },
  {
    Type: "AWS::AppSync::Resolver",
    Properties: {
      DataSourceName: "booksTable",
      FieldName: "createBook",
      TypeName: "Mutation",
    },
  },
];

const graphQLApi = {
  Type: "AWS::AppSync::GraphQLApi",
  Properties: {
    Name: "slsAppSyncApi",
    AuthenticationType: "AMAZON_COGNITO_USER_POOLS",
    AdditionalAuthenticationProviders: {
      AuthenticationType: "AWS_IAM",
    },
    UserPoolConfig: {
      AwsRegion: "us-east-2",
      DefaultAction: "ALLOW",
      UserPoolId: { Ref: "cognitoUserPool" },
    },
  },
};

const functionConfiguration = {
  RequestMappingTemplateS3Location: "../mapping-templates",
  ResponseMappingTemplateS3Location: "../mapping-templates",
};

const dataSources = {
  Type: "AWS::AppSync::DataSource",
  Properties: {
    DynamoDBConfig: {
      TableName: { Ref: "booksTable" },
    },
    Type: "AMAZON_DYNAMODB",
  },
};

export default {
  ...graphQLApi,
  ...functionConfiguration,
  ...mappingTemplates,
  ...dataSources,
};

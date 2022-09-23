export default {
  // Cognito user pool
  cognitoUserPool: {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UsernameAttributes: ["email"],
      UserPoolName: "SLSBookStoreUserPool",
    },
  },

  // Cognito user pool client
  cognitoUserPoolClient: {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      ClientName: "web",
      UserPoolId: { Ref: "cognitoUserPool" },
    },
  },

  // Cognito user pool admin group
  cognitoAdminGroup: {
    Type: "AWS::Cognito::UserPoolGroup",
    Properties: {
      Description: "Admin users belong to this group",
      GroupName: "admin",
      Precedence: 0,
      RoleArn: { "Fn::GetAtt": "cognitoAdminIAMRole.Arn" },
      UserPoolId: { Ref: "cognitoUserPool" },
    },
  },

  // Cognito admin IAM role
  cognitoAdminIAMRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      RoleName: "sls-bookstore-admin-role",
      Description: "IAM role for admin users",
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: {
          Effect: "Allow",
          Principal: {
            Federated: "cognito-identity.amazonaws.com",
          },
          Action: "sts:AssumeRoleWithWebIdentity",
        },
      },
      Policies: [
        {
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: "dynamodb:*",
                Resource: "*",
              },
            ],
          },
          PolicyName: "sls-bookstore-admin-group-policy",
        },
      ],
    },
  },

  // Cognito user pool user group
  cognitoCustomerGroup: {
    Type: "AWS::Cognito::UserPoolGroup",
    Properties: {
      Description: "Customers belong to this group",
      GroupName: "customer",
      Precedence: 1,
      RoleArn: { "Fn::GetAtt": "cognitoCustomerIAMRole.Arn" },
      UserPoolId: { Ref: "cognitoUserPool" },
    },
  },

  // Cognito admin IAM role
  cognitoCustomerIAMRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      RoleName: "sls-bookstore-customer-role",
      Description: "IAM role for customers",
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Federated: "cognito-identity.amazonaws.com",
            },
            Action: "sts:AssumeRoleWithWebIdentity",
          },
        ],
      },
      Policies: [
        {
          PolicyName: "sls-bookstore-customer-group-policy",
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: "dynamodb:*",
                Resource: [{ "Fn::GetAtt": "ordersTable.Arn" }],
              },
              {
                Effect: "Allow",
                Action: [
                  "dynamodb:GetItem",
                  "dynamodb:BatchGetItem",
                  "dynamodb:Query",
                ],
                Resource: [{ "Fn::GetAtt": "booksTable.Arn" }],
              },
            ],
          },
        },
      ],
    },
  },
};

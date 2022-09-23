import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';
import resources from './index';
import appSync from './appsync'

const serverlessConfiguration: AWS = {
  service: 'sls-appsync-bookstore-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-appsync-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-east-2',
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    appSync: {
      ...appSync
    }
  },
  resources: {
    Resources: {
      ...resources
    }
  }
};

export default serverlessConfiguration;

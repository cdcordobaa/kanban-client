import { ResourcesConfig } from "aws-amplify";

export const awsConf = {
  s3: {
    REGION: "YOUR_REGION",
    BUCKET: "YOUR_S3_BUCKET_NAME",
  },
  apiGateway: {
    REGION: "YOUR_REGION",
    URL: "https://YOUR_API_GATEWAY_ID.execute-api.YOUR_REGION.amazonaws.com/dev",
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_gm01BCHdJ",
    APP_CLIENT_ID: "3q4to1gvaoafucbcjvgt92r8o",
    IDENTITY_POOL_ID: "eu-west-1:355c5549-fcbe-4770-83cf-9cc6ca19ff02",
  },
};
export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: awsConf.cognito.APP_CLIENT_ID,
      userPoolId: awsConf.cognito.USER_POOL_ID,
      identityPoolId: awsConf.cognito.IDENTITY_POOL_ID,
    },
  },
  API: {
    REST: {
      api: {
        endpoint: awsConf.apiGateway.URL,
        region: awsConf.apiGateway.REGION,
      },
    },
  },
};

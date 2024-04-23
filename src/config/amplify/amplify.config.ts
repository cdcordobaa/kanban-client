import { ResourcesConfig } from "aws-amplify";

const apiUrl = import.meta.env.VITE_GATEWAY_API_URL;
const region = import.meta.env.VITE_AWS_REGION;
const userPoolId = import.meta.env.VITE_AWS_USER_POOL_ID;
const appClientId = import.meta.env.VITE_AWS_USER_POOL_APP_CLIENT_ID;
const identityPoolId = import.meta.env.VITE_AWS_IDENTITY_POOL_ID;

export const awsConf = {
  s3: {
    REGION: region,
    BUCKET: "YOUR_S3_BUCKET_NAME",
  },
  apiGateway: {
    REGION: region,
    URL: apiUrl,
  },
  cognito: {
    REGION: region,
    USER_POOL_ID: userPoolId,
    APP_CLIENT_ID: appClientId,
    IDENTITY_POOL_ID: identityPoolId,
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

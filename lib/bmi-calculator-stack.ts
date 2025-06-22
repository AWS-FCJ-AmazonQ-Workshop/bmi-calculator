import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

export class BmiCalculatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bmiFunction = new NodejsFunction(this, 'BmiCalculatorFunction', {
      entry: 'src/index.ts',
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'handler',
    })

    const functionUrl = bmiFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [lambda.HttpMethod.GET],
        allowedHeaders: ['*']
      }
    })

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: functionUrl.url,
      description: 'BMI Calculator Function URL'
    })
  }
}
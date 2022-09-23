import cognito from "./cognito";
import dynamodb from "./dynamodb";

export default {
    ...cognito,
    ...dynamodb
}
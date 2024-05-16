import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
export class GoogleCloudPlugin {
    sercertManagerServiceClient: SecretManagerServiceClient
    constructor() {
        // Instantiates a client
        const client = new SecretManagerServiceClient()
        this.sercertManagerServiceClient = client
        // this.grantAccess({
        //     GOOGLE_APPLICATION_CREDENTIALS: 'projects/449033690264/secrets/GOOGLE_APPLICATION_CREDENTIALS',
        //     OPENAI_API_KEY: 'projects/449033690264/secrets/OPENAI_API_KEY'
        // })
    }
    async accessLatestSecretVersion(name: string = '') {
        const [version] = await this.sercertManagerServiceClient.accessSecretVersion({
            name: `projects/449033690264/secrets/${name}/versions/latest`,
        })
        if (version.payload?.data) {
            // Extract the payload as a string.
            const payload = version.payload.data.toString();

            // WARNING: Do not print the secret in a production environment - this
            // snippet is showing how to access the secret material.
            const parsedValue = JSON.parse(payload)
            return parsedValue
        } else {
            throw `accessSecretVersion failed. ${name}`
        }
    }
    async grantAccess(privateKeys: any) {
        const member = 'user:chuiantw1212@gmail.com'

        for (let key in privateKeys) {
            const secretResource = privateKeys[key]
            // Get the current IAM policy.
            const [policy] = await this.sercertManagerServiceClient.getIamPolicy({
                resource: secretResource,
            });
            // Add the user with accessor permissions to the bindings list.
            if (policy?.bindings) {
                policy.bindings.push({
                    role: 'roles/secretmanager.secretAccessor',
                    members: [member],
                });
            }
            // Save the updated IAM policy.
            await this.sercertManagerServiceClient.setIamPolicy({
                resource: secretResource,
                policy: policy,
            });
            console.log(`Updated IAM policy for ${key}`);
        }
    }
}
const googleCloud = new GoogleCloudPlugin()
export default googleCloud

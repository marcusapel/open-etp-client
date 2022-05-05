# Install Reservoir DMS on Azure

## Planning and prerequisites

* Setup Reservoir Open Etp Server, should be up and running

## Install in AKS

### Manual installation (Helm charts)

1. Edit your values in `values.yaml` files.
    * Follow the next instructions to generate your `values.yaml` file accordingly [osdu-ddms](https://community.opengroup.org/osdu/platform/deployment-and-operations/helm-charts-azure/-/blob/master/osdu-ddms/README.md).
2. Install using Helm:

```shell
NAMESPACE=reservoir-ddms
kubectl create ns ${NAMESPACE}
helm install reservoir . -f values.yaml -n ${NAMESPACE}
```

### Azure DevOps pipeline installation

1. Create and clone repo to your azure devops
2. Clone and sync community open-etp-client with azure devops repo
3. Create and launch pipeline.

```bash
export ADO_PROJECT=<ado-project>
export ADO_ORGANIZATION=<ado-organization>
export SERVICE=open-etp-client
az repos create --name $SERVICE --organization https://dev.azure.com/${ADO_ORGANIZATION} --project $ADO_PROJECT -ojson

git clone --mirror https://community/platform/domain-data-mgmt-services/reservoir/open-etp-client.git  open-etp-client.git
git -C open-etp-client.git push --mirror https://${ADO_PAT}@dev.azure.com/${ADO_ORGANIZATION}/${ADO_PROJECT}/_git/open-etp-client

# clone and sync your repo
az pipelines create \
  --name 'reservoir-open-etp-client'  \
  --repository open-etp-client  \
  --branch feature/azure-devops  \
  --repository-type tfsgit  \
  --yaml-path /devops/azure/pipeline.yml  \
  --skip-first-run true \
  -ojson
```

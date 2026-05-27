# Install Reservoir DMS on Azure

## Prerequisites

* Set up [Reservoir Open Etp Server](../../../open-etp-server/). It should be up and running.

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

1. Create and clone the repo to your Azure DevOps.
2. Clone and sync community open-etp-client with Azure DevOps repo.
3. Create and launch the pipeline.

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


### NOTE

The installation using [/devops/azure/chart](https://community.opengroup.org/osdu/platform/domain-data-mgmt-services/reservoir/open-etp-client/-/tree/main/devops/azure/chart) has been deprecated. 

Installation using Istio + Application Gateway has been deprecated. Istio Gateway and Virtual Services are used in its place. 
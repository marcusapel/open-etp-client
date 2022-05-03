# Install Reservoir DMS on Azure

## Planning and prerequisites

* Setup partition infrastructure and reservoir database.

Additional parameters will be introduced in the [infra-azure-provisioning](https://community.opengroup.org/osdu/platform/deployment-and-operations/infra-azure-provisioning) in data partition. 

* [reservoir.tf](./infra/templates/osdu-r3-mvp/data_partition_epamdp3/reservoir.tf)

## Install in AKS

## Manual installation

Install the Reservoir DMS with flux:

1. Edit your values in `values.yaml` files.
  * Follow the next instructions to generate your `values.yaml` file accordingly [osdu-ddms](https://community.opengroup.org/osdu/platform/deployment-and-operations/helm-charts-azure/-/blob/master/osdu-ddms/README.md).
2. Install using Helm:

```shell
NAMESPACE=reservoir-ddms
kubectl create ns ${NAMESPACE}
helm install reservoir . -f values.yaml -n ${NAMESPACE}
```

## Partition Service

Next, we need to register the secret of the database in the Partition Service:

`PUT /api/partition/v1/partitions/<partitionname>`

```json
{
    "properties": {
        "compliance-ruleset": {
            "value": "shared"
        },
        <...>
        "reservoir-connection": {
            "sensitive": true,
            "value": "reservoir-conn"
        }
    }
}
```

## Azure DevOps pipeline installation

### Preconditions

Since Azure DevOps does not support ninja natively and C++ does not build with the open-etp-server dependencies, you should set up your own agent and reuse the variable from the Azure DevOps.

1. [Set up Azure DevOps Agent Linux](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/v2-linux?view=azure-devops)
2. Install the open-etp-server dependencies:

```shell
apt-get update && \
                # Define DEBIAN_FRONTEND to allow non interactive installation of some packages
                    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
                    ca-certificates libc6-dev=2.33* gcc=4:10.3* g++=4:10.3* ninja-build=1.10* \
                    libgomp1=11* cmake=3.* gdb wget libboost-iostreams-dev=${BOOST_VER} libboost-program-options-dev=${BOOST_VER} libsnappy-dev=1.1* \
                    libboost-filesystem-dev=${BOOST_VER} libboost-regex-dev=${BOOST_VER} libboost-system-dev=${BOOST_VER} \
                    libboost-thread-dev=${BOOST_VER} libboost-test-dev=${BOOST_VER} libcurl4-openssl-dev=${CURL_VER} \
                    libhdf5-dev=1.10.6* nlohmann-json3-dev=3.9* libssl-dev=1.1.1* openssl=1.1.1* \
                    libwebsocketpp-dev=0.8* postgresql-server-dev-${POSTGRESQL_VER} \
                    gcovr figlet \
                    && apt-get clean && rm -rf /var/lib/apt/lists/*

# RHEL based systems
sudo dnf install -y cmake ca-certificates glibc-devel gcc-c++
```

3. Use the personal access token to log in to Azure DevOps:

```bash
export ADO_PROJECT=<ado-project>
export ADO_ORGANIZATION=<ado-organization>
export SERVICE=open-etp-server
az repos create --name $SERVICE --organization https://dev.azure.com/${ADO_ORGANIZATION} --project $ADO_PROJECT -ojson

# clone and sync your repo
az pipelines create \
  --name 'reservoir-open-etp-server'  \
  --repository open-etp-server  \
  --branch master  \
  --repository-type tfsgit  \
  --yaml-path /devops/azure/pipeline.yml  \
  --skip-first-run true \
  -ojson
```

## Docker image for open-etp-server on Azure - Mariner

If you need a docker image to use and submit to Azure Container Registry, use a multi-step [Dockerfile.azure](../../Dockerfile.azure).

The image will only build and copy the build content to a lighter Ubuntu image (will be changed to Mariner soon), instead of using docker-compose. This approach will not use unit-test or integration-test.

```bash
cd open-etp-server/
docker build . -t <msft-acr>/open-etp-server:epam --file Dockerfile.azure
```

## Istio and Application Gateway

Helm charts also contain configuration for the envoy filter on the Reservoir DDMS installation namespace. This will not allow requests without authentication or with appropriate audiences [envoyfilter.yaml](./chart/templates/istio/envoyfilter.yaml).

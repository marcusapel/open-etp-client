# Deploy helm chart

## Introduction

This chart installs a deployment on a [Kubernetes](https://kubernetes.io) cluster using [Helm](https://helm.sh) package manager.

## Prerequisites

The code was tested on **Kubernetes cluster** (v1.24.12) with **Istio** (1.13.3)
> It is possible to use other versions, but it hasn't been tested

### Operation system

The code works in Debian-based Linux (Debian 10 and Ubuntu 20.04) and Windows WSL 2. Also, it works but is not guaranteed in Google Cloud Shell. All other operating systems, including macOS, are not verified and supported.

### Packages

Packages are only needed for installation from a local computer.

* **HELM** (version: v3.11.2 or higher) [helm](https://helm.sh/docs/intro/install/)
* **Kubectl** (version: v1.24.12 or higher) [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

## Installation

First you need to set variables in **values.yaml** file using any code editor. Some of the values are prefilled, but you need to specify some values as well. You can find more information about them below.

### Global variables

| Name | Description | Type | Default |Required |
|------|-------------|------|---------|---------|
**global.domain** | your domain for the external endpoint, ex `example.com` | string | - | yes
**global.onPremEnabled** | whether on-prem is enabled | boolean | false | yes
**global.limitsEnabled** | whether CPU and memory limits are enabled | boolean | true | yes

### Configmap variables

| Name | Description | Type | Default |Required |
|------|-------------|------|---------|---------|
**data.cloudProvider** | variable for using clients and configuration for Google Cloud provider | string | `google` | yes
**data.rdmsRestRootPath** | api endpoint inside url | string | `/Reservoir/v2` | yes
**data.rdmsRestPort** | port of api in container | string | `8003` | yes
**data.rdmsEtpHost** | name of kubernetes service for `oetp-server`| string | `oetp-server` | yes
**data.rdmsEtpPort** | port of `oetp-server` | string | `9002` | yes
**data.rdmsEtpProtocol** | websocket protocol | string | `ws` | yes
**data.logLevel** | logging level | string | `error` | yes

### Deployment variables

| Name | Description | Type | Default |Required |
|------|-------------|------|---------|---------|
**data.requestsCpu** | amount of requested CPU | string | `5m` | yes
**data.requestsMemory** | amount of requested memory | string | `250Mi` | yes
**data.limitsCpu** | CPU limit | string | `1` | only if `global.limitsEnabled` is true
**data.limitsMemory** | memory limit | string | `1G` | only if `global.limitsEnabled` is true
**data.image** | service image | string | - | yes
**data.imagePullPolicy** | when to pull image | string | `IfNotPresent` | yes
**data.serviceAccountName** | name of service account for deployment | string | `oetp-client` | yes

### Configuration variables

| Name | Description | Type | Default |Required |
|------|-------------|------|---------|---------|
**conf.appName** | application name | string | `oetp-client` | yes
**conf.configmap** | configmap to be used | string | `oetp-client-config` | yes
**conf.oetpClientSecret** | secret for connection to `oetp-server` | string | `oetp-client-secret` | yes

### Install the helm chart

Run this command from within this directory:

```console
helm install gc-oetp-client-deploy .
```

## Uninstalling the Chart

To uninstall the helm deployment:

```console
helm uninstall gc-oetp-client-deploy
```

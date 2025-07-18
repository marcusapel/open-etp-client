<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Deploy helm chart](#deploy-helm-chart)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
    - [Operation system](#operation-system)
    - [Packages](#packages)
  - [Installation](#installation)
    - [Global variables](#global-variables)
    - [Configmap variables](#configmap-variables)
    - [Deployment variables](#deployment-variables)
    - [Configuration variables](#configuration-variables)
    - [Horizontal Pod Autoscaling (HPA) variables (works only if tier=PROD and autoscaling=true)](#horizontal-pod-autoscaling-hpa-variables-works-only-if-tierprod-and-autoscalingtrue)
    - [Limits variables](#limits-variables)
    - [Install the helm chart](#install-the-helm-chart)
  - [Uninstalling the Chart](#uninstalling-the-chart)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Deploy helm chart

## Introduction

This chart installs a deployment on a [Kubernetes](https://kubernetes.io) cluster using [Helm](https://helm.sh) package manager.

## Prerequisites

The code was tested on **Kubernetes cluster** (v1.24.12) with **Istio** (1.13.3)

> It is possible to use other versions, but it hasn't been tested

### Operation system

The code works in a Debian-based Linux (Debian 10 and Ubuntu 20.04) and Windows WSL 2. Also, it works but is not guaranteed in Google Cloud Shell. All other operating systems, including macOS, are not verified and supported.

### Packages

Packages are only needed for installation from a local computer.

- **HELM** (version: v3.11.2 or higher) [helm](https://helm.sh/docs/intro/install/)
- **Kubectl** (version: v1.24.12 or higher) [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)

## Installation

First you need to set variables in **values.yaml** file using any code editor. Some of the values are prefilled, but you need to specify some values as well. You can find more information about them below.

### Global variables

| Name                     | Description                                             | Type    | Default | Required |
|--------------------------|---------------------------------------------------------|---------|---------|----------|
| **global.domain**        | your domain for the external endpoint, ex `example.com` | string  | -       | yes      |
| **global.limitsEnabled** | whether CPU and memory limits are enabled               | boolean | true    | yes      |
| **global.tier** | tier defines the number of replicas for the service to ensure the service HA; values are `DEV`, `STAGE`, `PROD` | string | "" | no |
| **global.autoscalingMode** | enables horizontal pod autoscaling on cluster spot nodes; values are `none`, `cpu`, `requests` | string | `cpu` | yes |
| **global.logLevel**         | logging level                                                          | string | `error`         |

### Configmap variables

| Name                      | Description                                                            | Type   | Default         | Required |
|---------------------------|------------------------------------------------------------------------|--------|-----------------|----------|
| **data.cloudProvider**    | variable for using clients and configuration for Google Cloud provider | string | `google`        | yes      |
| **data.rdmsRestRootPath** | api endpoint inside url                                                | string | `/Reservoir/v2` | yes      |
| **data.rdmsRestPort**     | port of api in container                                               | string | `8003`          | yes      |
| **data.rdmsEtpHost**      | name of kubernetes service for `oetp-server`                           | string | `oetp-server`   | yes      |
| **data.rdmsEtpPort**      | port of `oetp-server`                                                  | string | `9002`          | yes      |
| **data.rdmsEtpProtocol**  | websocket protocol                                                     | string | `ws`            | yes      |
| **data.logLevel**         | logging level                                                          | string | `error`         | yes      |

### Deployment variables

| Name                        | Description                            | Type   | Default        | Required                               |
|-----------------------------|----------------------------------------|--------|----------------|----------------------------------------|
| **data.requestsCpu**        | amount of requested CPU                | string | `5m`           | yes                                    |
| **data.requestsMemory**     | amount of requested memory             | string | `250Mi`        | yes                                    |
| **data.limitsCpu**          | CPU limit                              | string | `1`            | only if `global.limitsEnabled` is true |
| **data.limitsMemory**       | memory limit                           | string | `1G`           | only if `global.limitsEnabled` is true |
| **data.image**              | service image                          | string | -              | yes                                    |
| **data.imagePullPolicy**    | when to pull image                     | string | `IfNotPresent` | yes                                    |
| **data.serviceAccountName** | name of service account for deployment | string | `oetp-client`  | yes                                    |

### Configuration variables

| Name                      | Description                            | Type    | Default              | Required |
|---------------------------|----------------------------------------|---------|----------------------|----------|
| **conf.appName**          | application name                       | string  | `oetp-client`        | yes      |
| **conf.configmap**        | configmap to be used                   | string  | `oetp-client-config` | yes      |
| **conf.oetpClientSecret** | secret for connection to `oetp-server` | string  | `oetp-client-secret` | yes      |

### Horizontal Pod Autoscaling (HPA) variables

| Name | Description | Type | Default |Required |
|------|-------------|------|---------|---------|
| **hpa.minReplicas** | minimum number of replicas | integer | 6 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.maxReplicas** | maximum number of replicas | integer | 15 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.targetType** | type of measurements: AverageValue or Value | string | "AverageValue" | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.targetValue** | threshold value to trigger the scaling up | integer | 140 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleUpStabilizationWindowSeconds** | time to start implementing the scale up when it is triggered | integer | 10 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleUpPoliciesValue** | the maximum number of new replicas to create (in percents from current state)| integer | 50 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleUpPoliciesPeriodSeconds** | pause for every new scale up decision | integer | 15 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleDownStabilizationWindowSeconds** | time to start implementing the scale down when it is triggered | integer | 60 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleDownPoliciesValue** | the maximum number of replicas to destroy (in percents from current state) | integer | 25 | only if `global.autoscaling` is true and `global.tier` is PROD |
| **hpa.behaviorScaleDownPoliciesPeriodSeconds** | pause for every new scale down decision | integer | 60 | only if `global.autoscaling` is true and `global.tier` is PROD |

### Limits variables

| Name                     | Description                                     | Type    | Default | Required                                       |
|--------------------------|-------------------------------------------------|---------|---------|------------------------------------------------|
| **limits.maxTokens**     | maximum number of requests per fillInterval     | integer | `12`    | only if `global.autoscalingMode` is `requests` |
| **limits.tokensPerFill** | number of new tokens allowed every fillInterval | integer | `12`    | only if `global.autoscalingMode` is `requests` |
| **limits.fillInterval**  | time interval                                   | string  | `"1s"`  | only if `global.autoscalingMode` is `requests` |

### Autoscaling

By default, autoscaling is configured for deployments targeting spot nodes. Pods will attempt to schedule on nodes with specific labels indicating they are spot instances. To adjust how pods are scheduled, you can update the `data.affinityLabelsSpot` in your values.yaml file.

Example:

```yml
data:
  affinityLabelsSpot:
    mylabel:
      - value1
      - test
    newLabel:
      - newValue
```

Each label, along with its values, will be translated into a separate `- matchExpressions` block within the `nodeAffinity` section of your deployment. This configuration operates with OR logic, meaning pods will be scheduled on any node that possesses at least one of the specified labels with one of its defined values.

The chart uses the `global.autoscalingMode` parameter in your `values.yaml` to control how autoscaling behaves. This parameter accepts three possible string values:

* **cpu** (default): Autoscaling is enabled and is based on CPU utilization. This is the default setting.
* **requests**: Autoscaling is enabled and is based on resource requests (custom metrics). **NOTE**: Prometheus should be installed in your cluster, custom metrics are used for this type of autoscaling.
* **none**: Autoscaling is entirely disabled for the application. Setting `global.autoscalingMode` to **none** also prevents the creation of the spot deployment.

The `global.tier` parameter controls the number of replicas based on the environment:

* **DEV**: 1-5 replicas
* **STAGE**: 2-7 replicas  
* **PROD**: 3-10 replicas
* **"" (empty)**: Uses `hpa.minReplicas` and `hpa.maxReplicas` values

### Methodology for Parameter Calculation variables: **hpa.requests.targetValue**, **limits.maxTokens** and **limits.tokensPerFill**

The parameters **hpa.requests.targetValue**, **limits.maxTokens** and **limits.tokensPerFill** were determined through empirical testing during load testing. These tests were conducted using the N2D machine series, which can run on either AMD EPYC Milan or AMD EPYC Rome processors. The values were fine-tuned to ensure optimal performance under typical workloads.

### Recommendations for New Instance Types

When changing the instance type to a newer generation, such as the C3D series, it is essential to conduct new load testing. This ensures the parameters are recalibrated to match the performance characteristics of the new processor architecture, optimizing resource utilization and maintaining application stability.

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

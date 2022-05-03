{{/*
Common Annotations
*/}}
{{- define "reservoir-ddms.commonAnnotations" -}}
commit-id: commit
{{- end}}
{{/*
Common Labels
*/}}
{{- define "reservoir-ddms.commonLabels" -}}
osduapp: reservoir-ddms
{{/* 
include "reservoir-ddms.deploymentTypeLabels" . 
*/}}
{{- end }}

{{/*
 Renders the namespace. 
*/}}
{{- define "reservoir-ddms.namespace" -}}
namespace: {{.Release.Namespace}}
{{- end }}

{{/*
 Renders the pathPrefix and suffix if there is any 
*/}}
{{- define "reservoir-ddms.prefix" -}}
{{ .Values.ingress.hosts.pathPrefix }}{{ include "reservoir-ddms.name-suffix" . }}
{{- end }}


{{/*
 Creates postgres random secret. 
*/}}
{{- define "postgres.user" -}}
{{- printf "postgres" -}}
{{- end -}}
{{- define "postgres.password" -}}
{{- printf "postgres" -}}
{{- end -}}
{{- define "postgres.endpoint" -}}
{{- printf "%s-pgbouncer.%s.svc.cluster.local" (.Release.Name) (.Values.namespace) -}}
{{- end -}}

{{ define "pgbouncer_config_secret" -}}
{{ default (printf "%s-pgbouncer-config" .Release.Name) .Values.pgbouncer.configSecretName }}
{{- end }}
// To parse this data:
//
//   import { Convert, AbstractWPCGroupType } from "./file";
//
//   const abstractWPCGroupType = Convert.toAbstractWPCGroupType(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Generic reference object containing the universal group-type properties of a Work Product
 * Component for inclusion in data type specific Work Product Component objects
 */
export interface AbstractWPCGroupType {
    /**
     * An array of Artefacts - each artefact has a Role, Resource tuple. An artefact is distinct
     * from the file, in the sense certain valuable information is generated during loading
     * process (Artefact generation process). Examples include retrieving location data,
     * performing an OCR which may result in the generation of artefacts which need to be
     * preserved distinctly
     */
    Artefacts?: Artefacts[];
    /**
     * The record id, which identifies this OSDU File or dataset resource.
     */
    Datasets?: string[];
    /**
     * An array of references to content in Domain Data Management Services represented by this
     * work-product-component. The references are formed as URI following
     * https://www.rfc-editor.org/rfc/rfc3986#page-16. This property is exclusively populated by
     * DDMSs. If a work-product-component is represented in more than one DDMS, DDMSs are
     * obliged to find the specific reference by inspecting the URI's authority values matching
     * the DDMS id.
     */
    DDMSDatasets?: string[];
    /**
     * A flag that indicates if the work product component is searchable, which means covered in
     * the search index.
     */
    IsDiscoverable?: boolean;
    /**
     * A flag that indicates if the work product component is undergoing an extended load.  It
     * reflects the fact that the work product component is in an early stage and may be updated
     * before finalization.
     */
    IsExtendedLoad?: boolean;
    /**
     * Alternative names, including historical, by which this work-product-component is/has been
     * known (it should include all the identifiers).
     */
    NameAliases?: AbstractAliasNames[];
    /**
     * Describes a record's overall suitability for general business consumption based on data
     * quality. Clarifications: Since Certified is the highest classification of suitable
     * quality, any further change or versioning of a Certified record should be carefully
     * considered and justified. If a Technical Assurance value is not populated then one can
     * assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssurances?: AbstractTechnicalAssurance[];
}

/**
 * An array of Artefacts - each artefact has a Role, Resource tuple. An artefact is distinct
 * from the file, in the sense certain valuable information is generated during loading
 * process (Artefact generation process). Examples include retrieving location data,
 * performing an OCR which may result in the generation of artefacts which need to be
 * preserved distinctly
 */
export interface Artefacts {
    /**
     * The SRN which identifies this OSDU Artefact resource.
     */
    ResourceID?: string;
    /**
     * The kind or schema ID of the artefact. Resolvable with the Schema Service.
     */
    ResourceKind?: string;
    /**
     * The record id of this artefact's role.
     */
    RoleID?: string;
}

/**
 * A list of alternative names for an object.  The preferred name is in a separate, scalar
 * property.  It may or may not be repeated in the alias list, though a best practice is to
 * include it if the list is present, but to omit the list if there are no other names.
 * Note that the abstract entity is an array so the $ref to it is a simple property
 * reference.
 */
export interface AbstractAliasNames {
    /**
     * Alternative Name value of defined name type for an object.
     */
    AliasName?: string;
    /**
     * A classification of alias names such as by role played or type of source, such as
     * regulatory name, regulatory code, company code, international standard name, etc.
     */
    AliasNameTypeID?: string;
    /**
     * The StandardsOrganisation (reference-data) or Organisation (master-data) that provided
     * the name (the source).
     */
    DefinitionOrganisationID?: string;
    /**
     * The date and time when an alias name becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * The data and time when an alias name is no longer in effect.
     */
    TerminationDateTime?: Date;
}

/**
 * Describes a record's overall suitability for general business consumption based on level
 * of trust.
 */
export interface AbstractTechnicalAssurance {
    /**
     * List of workflows and/or personas that the technical assurance value is valid for (e.g.,
     * This data is trusted for Seismic Processing)
     */
    AcceptableUsage?: AcceptableUsage[];
    /**
     * Any additional context to support the determination of technical assurance
     */
    Comment?: string;
    /**
     * Date when the technical assurance determination for this record has taken place
     */
    EffectiveDate?: Date;
    /**
     * The individuals, or roles, that reviewed and determined the technical assurance value
     */
    Reviewers?: AbstractContact[];
    /**
     * Describes a record's overall suitability for general business consumption based on data
     * quality. Clarifications: Since Certified is the highest classification of suitable
     * quality, any further change or versioning of a Certified record should be carefully
     * considered and justified. If a Technical Assurance value is not populated then one can
     * assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssuranceTypeID: string;
    /**
     * List of workflows and/or personas that the technical assurance value is not valid for
     * (e.g., This data is not trusted for seismic interpretation)
     */
    UnacceptableUsage?: UnacceptableUsage[];
}

/**
 * Describes the workflows and/or personas that the technical assurance value is valid for
 * (e.g., This data has a technical assurance property of "trusted" and it is suitable for
 * Seismic Interpretation).
 */
export interface AcceptableUsage {
    /**
     * The QualityDataRuleSet, which had to pass successfully to achieve this level of technical
     * assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * Name of the role or personas that the record is technical assurance value is valid for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record is technical
     * assurance value is valid for.
     */
    WorkflowUsage?: string;
}

/**
 * An object with properties that describe a specific person or other point-of-contact (like
 * an email distribution list) that is relevant in this context (like a given data set or
 * business project). The contact specified may be either internal or external to the
 * organisation (something denoted via the Organisation object that is referenced). Note
 * that some properties contain personally identifiable information, so it might not be
 * appropriate to populate all properties in all scenarios.
 */
export interface AbstractContact {
    /**
     * Additional information about the contact
     */
    Comment?: string;
    /**
     * The data governance role assigned to this contact if and only if the context has a data
     * governance role (in context of TechnicalAssurance). The value is kept absent in all other
     * cases.
     */
    DataGovernanceRoleTypeID?: string;
    /**
     * Contact email address. Property may be left empty where it is inappropriate to provide
     * personally identifiable information.
     */
    EmailAddress?: string;
    /**
     * Name of the individual contact. Property may be left empty where it is inappropriate to
     * provide personally identifiable information.
     */
    Name?: string;
    /**
     * Reference to the company the contact is associated with.
     */
    OrganisationID?: string;
    /**
     * Contact phone number. Property may be left empty where it is inappropriate to provide
     * personally identifiable information.
     */
    PhoneNumber?: string;
    /**
     * The identifier of a reference value for the role of the contact within the associated
     * organisation, such as Account owner, Sales Representative, Technical Support, Project
     * Manager, Party Chief, Client Representative, Senior Observer.
     */
    RoleTypeID?: string;
    /**
     * The persona in context of workflows associated with this contact, as used in
     * TechnicalAssurance.
     */
    WorkflowPersonaTypeID?: string;
}

/**
 * Describes the workflows and/or personas that the technical assurance value is not valid
 * for (e.g., This data has a technical assurance property of "trusted", but it is not
 * suitable for Seismic Interpretation).
 */
export interface UnacceptableUsage {
    /**
     * The QualityDataRuleSet, which did not pass successfully to achieve this level of
     * technical assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is not acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * Name of the role or personas that the record is technical assurance value is not valid
     * for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record is technical
     * assurance value is not valid for.
     */
    WorkflowUsage?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAbstractWPCGroupType(json: string): AbstractWPCGroupType {
        return cast(JSON.parse(json), r("AbstractWPCGroupType"));
    }

    public static abstractWPCGroupTypeToJson(value: AbstractWPCGroupType): string {
        return JSON.stringify(uncast(value, r("AbstractWPCGroupType")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "AbstractWPCGroupType": o([
        { json: "Artefacts", js: "Artefacts", typ: u(undefined, a(r("Artefacts"))) },
        { json: "Datasets", js: "Datasets", typ: u(undefined, a("")) },
        { json: "DDMSDatasets", js: "DDMSDatasets", typ: u(undefined, a("")) },
        { json: "IsDiscoverable", js: "IsDiscoverable", typ: u(undefined, true) },
        { json: "IsExtendedLoad", js: "IsExtendedLoad", typ: u(undefined, true) },
        { json: "NameAliases", js: "NameAliases", typ: u(undefined, a(r("AbstractAliasNames"))) },
        { json: "TechnicalAssurances", js: "TechnicalAssurances", typ: u(undefined, a(r("AbstractTechnicalAssurance"))) },
    ], "any"),
    "Artefacts": o([
        { json: "ResourceID", js: "ResourceID", typ: u(undefined, "") },
        { json: "ResourceKind", js: "ResourceKind", typ: u(undefined, "") },
        { json: "RoleID", js: "RoleID", typ: u(undefined, "") },
    ], "any"),
    "AbstractAliasNames": o([
        { json: "AliasName", js: "AliasName", typ: u(undefined, "") },
        { json: "AliasNameTypeID", js: "AliasNameTypeID", typ: u(undefined, "") },
        { json: "DefinitionOrganisationID", js: "DefinitionOrganisationID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "AbstractTechnicalAssurance": o([
        { json: "AcceptableUsage", js: "AcceptableUsage", typ: u(undefined, a(r("AcceptableUsage"))) },
        { json: "Comment", js: "Comment", typ: u(undefined, "") },
        { json: "EffectiveDate", js: "EffectiveDate", typ: u(undefined, Date) },
        { json: "Reviewers", js: "Reviewers", typ: u(undefined, a(r("AbstractContact"))) },
        { json: "TechnicalAssuranceTypeID", js: "TechnicalAssuranceTypeID", typ: "" },
        { json: "UnacceptableUsage", js: "UnacceptableUsage", typ: u(undefined, a(r("UnacceptableUsage"))) },
    ], "any"),
    "AcceptableUsage": o([
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
    ], "any"),
    "AbstractContact": o([
        { json: "Comment", js: "Comment", typ: u(undefined, "") },
        { json: "DataGovernanceRoleTypeID", js: "DataGovernanceRoleTypeID", typ: u(undefined, "") },
        { json: "EmailAddress", js: "EmailAddress", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "OrganisationID", js: "OrganisationID", typ: u(undefined, "") },
        { json: "PhoneNumber", js: "PhoneNumber", typ: u(undefined, "") },
        { json: "RoleTypeID", js: "RoleTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersonaTypeID", js: "WorkflowPersonaTypeID", typ: u(undefined, "") },
    ], "any"),
    "UnacceptableUsage": o([
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
    ], "any"),
};

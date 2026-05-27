import PropertyTYpesManifest from "./PropertyTypesManifest.json";

// Dictionary of PropertyTypes from JSON manifest
// For key use the record NameAlias that correspond to the DefinitionOrganisationID containing "reference-data--StandardsOrganisation:Energistics%20RESQML%20201:"
// And for value use the ID of the record
interface IPropertyTypesManifest {
  ReferenceData: {
    kind: string;
    id: string;
    data: {
      ID: string;
      AttributionAuthority: string;
      Code: string;
      NameAlias: {
        AliasName: string;
        DefinitionOrganisationID: string;
      }[];
    };
  }[];
}

export const PropertyTypesIds = new Set<string>();

/**
 * Create the dictionary of PropertyTypes from JSON manifest
 */
const PropertyTypes = (
  PropertyTYpesManifest as IPropertyTypesManifest
).ReferenceData.filter(referenceData => {
  return referenceData.kind === "osdu:wks:reference-data--PropertyType:1.0.0";
}).reduce((obj: { [key: string]: string }, referenceData) => {
  const NameAlias = referenceData.data.NameAlias;

  // Find the NameAlias that correspond to the DefinitionOrganisationID containing "reference-data--StandardsOrganisation:Energistics%20RESQML%20201:"
  // and use the ID of the record as the value
  const resqmlAlias = NameAlias?.find(alias => {
    return alias.DefinitionOrganisationID.includes(
      "reference-data--StandardsOrganisation:Energistics%20RESQML%20201:"
    );
  });

  if (resqmlAlias) {
    obj[resqmlAlias.AliasName] = referenceData.data.ID;
  } else if (referenceData.data.AttributionAuthority === "Energistics PWLS-3") {
    obj[referenceData.data.Code] = referenceData.data.ID;
  }
  PropertyTypesIds.add(referenceData.data.ID);
  return obj;
}, {});

/**
 * Returns the PropertyType ID from the PropertyTypes dictionary
 * @param {string} resqmlAlias - The alias of the PropertyType in the RESQML standard
 * @returns {string} - The ID of the PropertyType
 */
export function getPropertyTypeIDFromResqmlAlias(resqmlAlias: string): string {
  return PropertyTypes[resqmlAlias];
}

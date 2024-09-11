import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlResource } from "./WorkProductComponent";

import {
  Data,
  PropertyType
} from "./Generated/reference-data/PropertyType.1.0.0";
import { getPropertyTypeIDFromResqmlAlias } from "./PropertyTypes";

/**
 * Create OSDU PropertyType from Resqml PropertyKind
 *
 * @export
 * @class PropertyTypeOSDU
 * @extends {ResqmlResource<SimpleJson<resqml20.obj_PropertyKind>>}
 * @implements {PropertyType}
 */
export class PropertyTypeOSDU
  extends ResqmlResource<SimpleJson<resqml20.obj_PropertyKind>>
  implements PropertyType
{
  public data: Data = {
    ParentPropertyTypeID: "",
    UnitQuantityID: ""
  };

  constructor(
    xml: SimpleJson<resqml20.obj_PropertyKind>,
    context: OSDUContext
  ) {
    super(xml, context, "reference-data", "PropertyType.1.0.0");
  }

  public async initData(
    _ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_PropertyKind>
  ): Promise<PropertyTypeOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const localKind =
      xml.ParentPropertyKind.$type === "resqml20.LocalPropertyKind";

    const parentKindId = localKind
      ? (xml.ParentPropertyKind as SimpleJson<resqml20.LocalPropertyKind>)
          .LocalPropertyKind.UUID
      : getPropertyTypeIDFromResqmlAlias(
          (xml.ParentPropertyKind as SimpleJson<resqml20.StandardPropertyKind>)
            .Kind
        );
    this.data = {
      ...(await this.AbstractCommonResources(context)),

      Name: xml.Citation.Title,
      Code: xml.Citation.Title,

      /**
       * Relationship to the parent PropertyType. The root PropertyType is called 'property' and
       * refers to itself as parent.
       */
      ParentPropertyTypeID:
        context.addReferenceData("PropertyType", parentKindId) || "",
      /**
       * The relationship to a UnitQuantity, which connects to frame of reference conversion.
       */
      UnitQuantityID:
        context.addReferenceData("UnitQuantity", xml.RepresentativeUom) || "",

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

/**
 * * Convert RESQML PropertyKind to OSDU PropertyType
 *
 * @param {string} uri
 * @param {SimpleJson<resqml20.obj_PropertyKind>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} _client
 * @return {Promise<PropertyTypeOSDU>}
 */
export const PropertyTypeManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_PropertyKind>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<PropertyTypeOSDU> =>
  new PropertyTypeOSDU(xml, context).initData(uri, xml);

import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
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
 * @class PropertyType23OSDU
 * @extends {ResqmlResource<SimpleJson<eml23.PropertyKind>>}
 * @implements {PropertyType}
 */
export class PropertyType23OSDU
  extends ResqmlResource<SimpleJson<eml23.PropertyKind>>
  implements PropertyType
{
  public data: Data = {
    ParentPropertyTypeID: "",
    UnitQuantityID: ""
  };

  constructor(xml: SimpleJson<eml23.PropertyKind>, context: OSDUContext) {
    super(xml, context, "reference-data", "PropertyType.1.0.0");
  }

  public async initData(
    _ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.PropertyKind>
  ): Promise<PropertyType23OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const kindName = xml.Parent?.Title
      ? getPropertyTypeIDFromResqmlAlias(xml.Parent?.Title)
      : undefined;

    const representativeUom: string | undefined = undefined; //from xml.QuantityClass

    this.data = {
      ...(await this.AbstractCommonResources(context)),

      /**
       * Relationship to the parent PropertyType. The root PropertyType is called 'property' and
       * refers to itself as parent.
       */
      ParentPropertyTypeID:
        context.addReferenceData("PropertyType", kindName) ?? "",
      /**
       * The relationship to a UnitQuantity, which connects to frame of reference conversion.
       */
      UnitQuantityID:
        context.addReferenceData("UnitQuantity", representativeUom) ?? "",

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

/**
 * * Convert EML 2.3 PropertyKind to OSDU PropertyType
 *
 * @param {string} uri
 * @param {SimpleJson<reml23.PropertyKind>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} _client
 * @return {Promise<PropertyType23OSDU>}
 */
export const PropertyType23Manifest = async (
  uri: string,
  xml: SimpleJson<eml23.PropertyKind>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<PropertyType23OSDU> =>
  new PropertyType23OSDU(xml, context).initData(uri, xml);

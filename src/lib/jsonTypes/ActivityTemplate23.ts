import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlResource } from "./WorkProductComponent";

import {
  ActivityTemplate,
  Data,
  ParameterTemplate
} from "./Generated/master-data/ActivityTemplate.1.1.0";

/**
 * Extract OSDU ActivityTemplate information from ActivityTemplate
 *
 * @export
 * @class ActivityTemplate23OSDU
 * @extends {ResqmlResource<SimpleJson<eml23.ActivityTemplate>>}
 * @implements {ActivityTemplate}
 */
export class ActivityTemplate23OSDU
  extends ResqmlResource<SimpleJson<eml23.ActivityTemplate>>
  implements ActivityTemplate
{
  public data: Data = { Parameters: [] };

  constructor(xml: SimpleJson<eml23.ActivityTemplate>, context: OSDUContext) {
    super(xml, context, "master-data", "ActivityTemplate.1.1.0");
  }

  private async getParameters(
    xml: SimpleJson<eml23.ParameterTemplate>[]
  ): Promise<ParameterTemplate[]> {
    const context = this.__context;
    if (context === undefined) {
      return [];
    }

    const Parameters: ParameterTemplate[] = [];

    for (const p of xml) {
      Parameters.push({
        /**
         * If no allowed kind is given, then all kind of data types are allowed.
         */
        AllowedParameterKind: undefined,
        /**
         * Textual description of additional constraint associated with the parameter. (note that it
         * will be better to have a formal description of the constraint)
         */
        Constraint: p.Constraint,
        /**
         * When parameter is limited to data object of given types, describe the allowed types. Used
         * only when ParameterType is dataObject.  String is an OSDU kind of work product component.
         */
        DataObjectContentType: undefined,
        /**
         * Activity Parameter value to use if one not supplied.
         */
        DefaultValue: undefined,
        /**
         * Indicates if the parameter is an input of the activity. If the parameter is a data object
         * and is also an output of the activity, it is strongly advised to use two parameters : one
         * for input and one for output. The reason is to be able to give two different versions
         * strings for the input and output data object which has got obviously the same UUID.
         */
        IsInput: p.IsInput,
        /**
         * Indicates if the parameter is an output of the activity. If the parameter is a data
         * object and is also an input of the activity, it is strongly advised to use two parameters
         * : one for input and one for output. The reason is to be able to give two different
         * versions strings for the input and output data object which has got obviously the same
         * UUID.
         */
        IsOutput: p.IsOutput,
        /**
         * Allows to indicate that, in the same activity, this parameter template must be associated
         * to another parameter template identified by its title. The associated parameter value
         * constrains this parameter.
         */
        KeyConstraints: undefined,
        /**
         * Maximum number of parameters of this type allowed in the activity. If the maximum number
         * of parameters is infinite, use -1 value.
         */
        MaxOccurs: p.MaxOccurs,
        /**
         * Minimum number of parameter of this type required by the activity. If the minimum number
         * of parameters is infinite, use -1 value.
         */
        MinOccurs: p.MinOccurs,
        /**
         * The property type ID and Name, which determines eventually the UnitQuantity of the
         * parameter value. Used to provide a more scoped context than UnitQuantityID. If
         * PropertyType is provided, UnitQuantityID is expected to be omitted.
         */
        PropertyType: undefined,
        /**
         * Name of the parameter in the activity. Key to identify parameter.
         */
        Title: p.Title,
        /**
         * The expected UnitQuantity for the parameter value. A more precise context can be
         * provided by PropertyType. If UnitQuantityID is provided, PropertyType is expected to be
         * omitted.
         */
        UnitQuantityID: undefined
      });
    }
    return Parameters;
  }

  public async initData(
    xml: SimpleJson<eml23.ActivityTemplate>
  ): Promise<ActivityTemplate23OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),

      Parameters: await this.getParameters(xml.Parameter)
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

/**
 * Convert RESQML ActivityTemplate to OSDU type
 *
 * @param {string} _uri
 * @param {SimpleJson<eml23.ActivityTemplate>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} _client
 * @return {Promise<ActivityTemplate23OSDU>}
 */
export const ActivityTemplate23Manifest = async (
  _uri: string,
  xml: SimpleJson<eml23.ActivityTemplate>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<ActivityTemplate23OSDU> =>
  new ActivityTemplate23OSDU(xml, context).initData(xml);

import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
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
 * @class ActivityTemplateOSDU
 * @extends {ResqmlResource<SimpleJson<resqml20.obj_ActivityTemplate>>}
 * @implements {ActivityTemplate}
 */
export class ActivityTemplateOSDU
  extends ResqmlResource<SimpleJson<resqml20.obj_ActivityTemplate>>
  implements ActivityTemplate
{
  public data: Data = { Parameters: [] };

  constructor(
    xml: SimpleJson<resqml20.obj_ActivityTemplate>,
    context: OSDUContext
  ) {
    super(xml, context, "master-data", "ActivityTemplate.1.1.0");
  }

  private async getParameters(
    xml: SimpleJson<resqml20.ParameterTemplate>[]
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
    xml: SimpleJson<resqml20.obj_ActivityTemplate>
  ): Promise<ActivityTemplateOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),

      Parameters: await this.getParameters(xml.Parameter)
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

/**
 * Convert RESQML ActivityTemplate to OSDU type
 *
 * @param {string} _uri
 * @param {SimpleJson<resqml20.obj_ActivityTemplate>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} _client
 * @returns {Promise<ActivityTemplateOSDU>}
 */
export const ActivityTemplateManifest = async (
  _uri: string,
  xml: SimpleJson<resqml20.obj_ActivityTemplate>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<ActivityTemplateOSDU> =>
  new ActivityTemplateOSDU(xml, context).initData(xml);

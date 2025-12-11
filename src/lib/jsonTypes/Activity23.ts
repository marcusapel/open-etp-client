import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  AbstractActivityParameter,
  Activity,
  Data,
  ParameterKey
} from "./Generated/work-product-component/Activity.1.4.0";

/**
 * Extract OSDU Activity information from Activity
 *
 * @export
 * @class Activity23OSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<eml23.Activity>>}
 * @implements {Activity}
 */
export class Activity23OSDU
  extends ResqmlWorkProductComponent<SimpleJson<eml23.Activity>>
  implements Activity
{
  public data: Data = {
    Parameters: []
  };

  constructor(xml: SimpleJson<eml23.Activity>, context: OSDUContext) {
    super(xml, context, "Activity.1.4.0");
  }

  public async getKeys(
    ReservoirDMSUrl: string,
    keys: SimpleJson<eml23.AbstractParameterKey>[],
    client: ResqmlClient
  ): Promise<ParameterKey[]> {
    const context = this.__context;
    if (context === undefined) {
      return [];
    }

    return Promise.all(
      keys.map(async k => {
        if (k.$type === "eml23.ObjectParameterKey") {
          return {
            ObjectParameterKey: (k as SimpleJson<eml23.ObjectParameterKey>)
              .DataObject.Title
          };
        } else {
          const timeIndex = (k as SimpleJson<eml23.TimeIndexParameterKey>)
            .TimeIndex;
          const time = (await Activity23OSDU.getObjectFromDor(
            client,
            ReservoirDMSUrl,
            timeIndex.TimeSeries,
            context
          )) as SimpleJson<eml23.TimeSeries>;
          return {
            TimeParameterKey: time.Time[timeIndex.Index].DateTime.toISOString()
          };
        }
      })
    );
  }

  private getKind(p: SimpleJson<eml23.AbstractActivityParameter>) {
    if (p.$type === "eml23.DataObjectParameter") {
      return "DataObjectParameter";
    } else if (p.$type === "eml23.FloatingPointQuantityParameter") {
      return "FloatingPointQuantityParameter";
    } else if (p.$type === "eml23.IntegerQuantityParameter") {
      return "IntegerQuantityParameter";
    } // else if (p.$type === "eml23.StringParameter") {
    return "StringParameter";
  }

  public async getParameters(
    ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.AbstractActivityParameter>[],
    client: ResqmlClient
  ): Promise<AbstractActivityParameter[]> {
    const context = this.__context;
    if (context === undefined) {
      return [];
    }

    const Parameters = [];

    for (const p of xml) {
      const dop =
        p.$type === "eml23.DataObjectParameter"
          ? (p as SimpleJson<eml23.DataObjectParameter>)
          : undefined;
      const dqp =
        p.$type === "eml23.DoubleQuantityParameter"
          ? (p as SimpleJson<eml23.DoubleQuantityParameter>)
          : undefined;
      const dip =
        p.$type === "eml23.IntegerQuantityParameter"
          ? (p as SimpleJson<eml23.IntegerQuantityParameter>)
          : undefined;
      const dsp =
        p.$type === "eml23.StringParameter"
          ? (p as SimpleJson<eml23.StringParameter>)
          : undefined;

      let Keys: ParameterKey[] | undefined = undefined;
      if (p.Key !== undefined) {
        Keys = await this.getKeys(ReservoirDMSUrl, p.Key, client);
      }

      let StringParameter = dsp?.Value;

      let DataObjectParameter: string | undefined = undefined;
      if (p.$type === "eml23.DataObjectParameter") {
        DataObjectParameter = await Activity23OSDU.dorToSrn(
          ReservoirDMSUrl,
          dop?.DataObject,
          client,
          context
        );
        if (DataObjectParameter === undefined) {
          StringParameter = dop?.DataObject.QualifiedType;
        }
      }

      Parameters.push({
        ParameterKindID:
          context.addReferenceData("ParameterKind", this.getKind(p)) || "",
        Title: p.Title,
        /**
         * Parameter referencing to a top level object.
         */
        DataObjectParameter,
        /**
         * Parameter containing a double value.
         */
        DataQuantityParameter: dqp?.Value,
        /**
         * Identifies unit of measure for floating point value.
         */
        DataQuantityParameterUOMID: context.addReferenceData(
          "UnitOfMeasure",
          dqp?.Uom
        ),
        /**
         * When parameter is an array, used to indicate the index in the array.
         */
        Index: p.Index,
        /**
         * Parameter containing an integer value.
         */
        IntegerQuantityParameter: dip?.Value,
        /**
         * A nested array describing keys used to identify a parameter value. When multiple values
         * are provided for a given parameter, the key provides a way to identify the parameter
         * through its association with an object, a time index or a parameter array member via
         * ParameterKey value.
         */
        Keys,
        /**
         * Reference data describing how the parameter was used by the activity, such as input,
         * output, control, constraint, agent, predecessor activity, successor activity.
         */
        ParameterRoleID: undefined,
        /**
         * Textual description about how this parameter was selected.
         */
        Selection: p.Selection,
        /**
         * Parameter containing a string value.
         */
        StringParameter,
        /**
         * Parameter containing a time index value.  It is assumed that all TimeIndexParameters
         * within an Activity have the same date-time format, which is then described by the
         * FrameOfReference mechanism.
         */
        TimeIndexParameter: undefined
      });
    }
    return Parameters;
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.Activity>,
    client: ResqmlClient
  ): Promise<Activity23OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),

      /**
       * The relation to the ActivityTemplate carrying expected parameter definitions and default
       * values.
       */
      ActivityTemplateID: await Activity23OSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.ActivityDescriptor,
        client,
        context
      ),
      /**
       * General parameter value used in one instance of activity.  Includes reference to data
       * objects which are inputs and outputs of the activity.
       */
      Parameters: await this.getParameters(
        ReservoirDMSUrl,
        xml.Parameter,
        client
      ),
      /**
       * The relationship to a parent activity.
       */
      ParentActivityID: await Activity23OSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.Parent,
        client,
        context
      ),
      /**
       * The relationship to a parent project acting as a parent activity.
       */
      ParentProjectID: undefined,
      /**
       * The activity or activities feeding results into this activity instance.
       */
      PriorActivityIDs: undefined,
      /**
       * Software names and versions used.
       */
      SoftwareSpecifications: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

/**
 * Convert RESQML Activity to OSDU type
 *
 * @param {string} uri
 * @param {SimpleJson<eml23.Activity>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} client
 * @return {Promise<Activity23OSDU>}
 */
export const Activity23Manifest = async (
  uri: string,
  xml: SimpleJson<eml23.Activity>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<Activity23OSDU> =>
  new Activity23OSDU(xml, context).initData(uri, xml, client);

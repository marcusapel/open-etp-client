import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  ColumnBasedTable,
  Data
} from "./Generated/work-product-component/ColumnBasedTable.1.3.0";

export class ColumnBasedTable23OSDU
  extends ResqmlWorkProductComponent<SimpleJson<eml23.ColumnBasedTable>>
  implements ColumnBasedTable
{
  public data: Data = {};

  constructor(xml: SimpleJson<eml23.ColumnBasedTable>, context: OSDUContext) {
    super(xml, context, "ColumnBasedTable.1.3.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.ColumnBasedTable>
  ): Promise<ColumnBasedTable23OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),

      ColumnBasedTableType: context.addReferenceData(
        "ColumnBasedTableType",
        "Facies"
      ),
      KeyColumns: [
        {
          ValueType: "integer",
          ValueCount: 1
        }
      ],
      Columns: xml.Column.map(e => {
        const c = this.arrayInfos(e);
        return {
          ValueType: c.valueType,
          ValueCount: c.valuePerRow
        };
      }),
      ColumnSize: undefined,
      ColumnValues: undefined,
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const ColumnBasedTable23Manifest = async (
  uri: string,
  xml: SimpleJson<eml23.ColumnBasedTable>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<ColumnBasedTable23OSDU> =>
  new ColumnBasedTable23OSDU(xml, context).initData(uri, xml);

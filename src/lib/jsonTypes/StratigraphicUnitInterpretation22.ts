import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicUnitInterpretation
} from "./Generated/work-product-component/StratigraphicUnitInterpretation.1.3.0";

const RESQML20_STRAT_COLUMN_RANK =
  "resqml22.StratigraphicColumnRankInterpretation";

export class StratigraphicUnitInterpretation22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.StratigraphicUnitInterpretation>
  >
  implements StratigraphicUnitInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.StratigraphicUnitInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "StratigraphicUnitInterpretation.1.3.0");
  }

  private async getContacts(
    ReservoirDMSUrl: string,
    client: ResqmlClient
  ): Promise<
    SimpleJson<resqml22.StratigraphicColumnRankInterpretation> | undefined
  > {
    const colRank = await client.getSources(ReservoirDMSUrl, false, [
      RESQML20_STRAT_COLUMN_RANK
    ]);
    const context = this.__context;
    if (colRank.length === 0 || context === undefined) {
      return undefined;
    }
    const rank = await StratigraphicUnitInterpretation22OSDU.getObjects(
      client,
      [colRank[0].uri],
      context
    );

    if (rank.length !== 1) {
      return undefined;
    }
    return rank[0] as SimpleJson<resqml22.StratigraphicColumnRankInterpretation>;
  }

  private hasUUID(
    contact: SimpleJson<resqml22.BinaryContactInterpretationPart>,
    UUID: string
  ): boolean {
    return contact.Subject.Uuid === UUID || contact.DirectObject.Uuid === UUID;
  }

  private async getTopBase(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.StratigraphicUnitInterpretation>,
    client: ResqmlClient
  ) {
    let ColumnStratigraphicHorizonTopID = undefined;
    let ColumnStratigraphicHorizonBaseID = undefined;
    const context = this.__context;

    const rank = await this.getContacts(ReservoirDMSUrl, client);
    if (rank === undefined) {
      return {
        ColumnStratigraphicHorizonTopID,
        ColumnStratigraphicHorizonBaseID
      };
    }

    const index = rank.StratigraphicUnits.findIndex(u => u.Uuid === xml.Uuid);
    if (index === -1 || rank.ContactInterpretation === undefined) {
      return {
        ColumnStratigraphicHorizonTopID,
        ColumnStratigraphicHorizonBaseID
      };
    }
    for (const c of rank.ContactInterpretation) {
      const contact = c as SimpleJson<resqml22.BinaryContactInterpretationPart>;
      if (this.hasUUID(contact, xml.Uuid) && context !== undefined) {
        if (
          index > 0 &&
          this.hasUUID(contact, rank.StratigraphicUnits[index - 1].Uuid)
        ) {
          ColumnStratigraphicHorizonTopID =
            await StratigraphicUnitInterpretation22OSDU.dorToSrn(
              ReservoirDMSUrl,
              contact.PartOf,
              client,
              context
            );
        }
        if (
          index < rank.StratigraphicUnits.length - 1 &&
          this.hasUUID(contact, rank.StratigraphicUnits[index + 1].Uuid)
        ) {
          ColumnStratigraphicHorizonBaseID =
            await StratigraphicUnitInterpretation22OSDU.dorToSrn(
              ReservoirDMSUrl,
              contact.PartOf,
              client,
              context
            );
        }
      }
    }
    return {
      ColumnStratigraphicHorizonTopID,
      ColumnStratigraphicHorizonBaseID
    };
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.StratigraphicUnitInterpretation>,
    client: ResqmlClient
  ): Promise<StratigraphicUnitInterpretation22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const {
      ColumnStratigraphicHorizonTopID,
      ColumnStratigraphicHorizonBaseID
    } = await this.getTopBase(ReservoirDMSUrl, xml, client);

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      ...(await this.AbstractInterpretation(
        ReservoirDMSUrl,
        xml,
        client,
        context
      )),
      ColumnStratigraphicHorizonBaseID,
      ColumnStratigraphicHorizonTopID,

      DepositionGeometryTypeID: context.addReferenceData(
        "DepositionGeometryType",
        this.capitalize(xml.DepositionMode)
      ),

      //TODO: Frame of reference
      MaximumThickness: xml.MaxThickness?._,
      MinimumThickness: xml.MinThickness?._,
      StratigraphicRoleTypeID: context.addReferenceData(
        "StratigraphicRoleType",
        "Chronostratigraphic"
      ),
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const StratigraphicUnitInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.StratigraphicUnitInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<StratigraphicUnitInterpretation22OSDU> =>
  new StratigraphicUnitInterpretation22OSDU(xml, context).initData(
    uri,
    xml,
    client
  );

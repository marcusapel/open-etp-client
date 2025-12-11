import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicUnitInterpretation
} from "./Generated/work-product-component/StratigraphicUnitInterpretation.1.3.0";

const RESQML20_STRAT_COLUMN_RANK =
  "resqml20.obj_StratigraphicColumnRankInterpretation";

export class StratigraphicUnitInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>
  >
  implements StratigraphicUnitInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "StratigraphicUnitInterpretation.1.3.0");
  }

  private async getContacts(
    ReservoirDMSUrl: string,
    client: ResqmlClient
  ): Promise<
    SimpleJson<resqml20.obj_StratigraphicColumnRankInterpretation> | undefined
  > {
    const colRank = await client.getSources(ReservoirDMSUrl, false, [
      RESQML20_STRAT_COLUMN_RANK
    ]);
    const context = this.__context;
    if (colRank.length === 0 || context === undefined) {
      return undefined;
    }
    const rank = await StratigraphicUnitInterpretationOSDU.getObjects(
      client,
      [colRank[0].uri],
      context
    );

    if (rank.length !== 1) {
      return undefined;
    }
    return rank[0] as SimpleJson<resqml20.obj_StratigraphicColumnRankInterpretation>;
  }

  private hasUUID(
    contact: SimpleJson<resqml20.BinaryContactInterpretationPart>,
    UUID: string
  ): boolean {
    return contact.Subject.UUID === UUID || contact.DirectObject.UUID === UUID;
  }

  private async getTopBase(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>,
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

    const index = rank.StratigraphicUnits.findIndex(
      u => u.Unit.UUID === xml.Uuid
    );
    if (index === -1 || rank.ContactInterpretation === undefined) {
      return {
        ColumnStratigraphicHorizonTopID,
        ColumnStratigraphicHorizonBaseID
      };
    }
    for (const c of rank.ContactInterpretation) {
      const contact = c as SimpleJson<resqml20.BinaryContactInterpretationPart>;
      if (this.hasUUID(contact, xml.Uuid) && context !== undefined) {
        if (
          index > 0 &&
          this.hasUUID(contact, rank.StratigraphicUnits[index - 1].Unit.UUID)
        ) {
          ColumnStratigraphicHorizonTopID =
            await StratigraphicUnitInterpretationOSDU.dorToSrn(
              ReservoirDMSUrl,
              contact.PartOf,
              client,
              context
            );
        }
        if (
          index < rank.StratigraphicUnits.length - 1 &&
          this.hasUUID(contact, rank.StratigraphicUnits[index + 1].Unit.UUID)
        ) {
          ColumnStratigraphicHorizonBaseID =
            await StratigraphicUnitInterpretationOSDU.dorToSrn(
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
    xml: SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>,
    client: ResqmlClient
  ): Promise<StratigraphicUnitInterpretationOSDU> {
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

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const StratigraphicUnitInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<StratigraphicUnitInterpretationOSDU> =>
  new StratigraphicUnitInterpretationOSDU(xml, context).initData(
    uri,
    xml,
    client
  );

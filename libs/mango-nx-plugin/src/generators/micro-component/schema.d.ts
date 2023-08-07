export interface MangoNxPluginGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  updateMangoSpaRoute?: boolean;
  addUnitTesting?: boolean;
  addEnd2EndTesting?: boolean;
}

import { MangoNxPluginGeneratorSchema } from '../schema';

export interface NormalizeSchema extends MangoNxPluginGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}
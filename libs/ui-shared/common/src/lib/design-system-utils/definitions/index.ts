// COLOR PALETTE
export interface Color {
  color: string,
  wcagColor: string,
  wcagContrast: string,
  wcagDescription: string,
  name: string,
  description: string,
  examples: string,
}

export interface Palette extends Array<Color>{}

// Single Font
export interface FontDetails {
  name: string,
  description: string,
  size: string,
  root: string,
  lineHeight: string,
}
export interface FontExample {
  weight: string,
  example: string,
}
export interface FontExamples extends Array<FontExample>{}
// Fonts
export interface Font {
  fontDetails: FontDetails,
  examples: FontExamples,
}
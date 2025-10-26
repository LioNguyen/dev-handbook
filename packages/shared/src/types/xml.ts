/**
 * Result structure returned from XML file analysis
 */
export interface XMLAnalysisResult {
  /** Root element tag name */
  root: string
  /** Number of direct child elements */
  childCount: number
  /** List of all unique element names in the XML */
  allElements: string[]
  /** Attributes of the root element */
  attributes: Record<string, string>
}

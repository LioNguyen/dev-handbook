/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Node } from "reactflow";

export type NodeData = {
  expanded: boolean;
  expandable: boolean;
};

export interface ExpandCollapseNode extends Node {
  data: {
    expandable?: boolean;
    expanded?: boolean;
    order?: string;
    value?: string;
    subtext?: string;
    type?: string;
    [key: string]: any;
  };
}

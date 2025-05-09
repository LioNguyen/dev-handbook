/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Node } from "@xyflow/react";

export type NodeData = {
  expanded: boolean;
  expandable: boolean;
  value?: string;
  subtext?: string;
  type?: string;
  order?: string;
  isDragging?: boolean;
  isDropTarget?: boolean;
  dropTargetId?: string | null;
  visible?: boolean;
  [key: string]: any;
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

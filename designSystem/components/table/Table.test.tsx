import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";

import { renderWithTheme } from "@/shared/utils";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "./Table";

describe("Table Component", () => {
  const renderTable = (props = {}) => {
    return renderWithTheme(
      <Table {...props}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell>$150.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>$400.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
  };

  // Basic Rendering Tests
  it("should render all table components", () => {
    renderTable();

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("caption")).toBeInTheDocument();
    expect(screen.getAllByRole("rowgroup")).toHaveLength(3); // header, body, footer
    expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 2 body + 1 footer
    expect(screen.getAllByRole("cell")).toHaveLength(10); // (2 rows × 4 cells) + (1 footer row × 2 cells)
    expect(screen.getAllByRole("columnheader")).toHaveLength(4);
  });

  // Snapshot Tests
  describe("Table Snapshots", () => {
    it("should match snapshot with default props", () => {
      const { container } = renderTable();
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom className", () => {
      const { container } = renderTable({ className: "custom-table" });
      expect(container).toMatchSnapshot();
    });
  });

  // Table Container Tests
  describe("Table Container", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const tableContainer = screen.getByRole("table").parentElement;
      expect(tableContainer).toHaveClass("relative", "w-full", "overflow-auto");
    });
  });

  // Table Tests
  describe("Table", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const table = screen.getByRole("table");
      expect(table).toHaveClass("w-full", "caption-bottom", "text-sm");
    });

    it("should merge custom className with default classes", () => {
      renderTable({ className: "custom-table" });
      const table = screen.getByRole("table");
      expect(table).toHaveClass("w-full", "caption-bottom", "text-sm", "custom-table");
    });
  });

  // TableHeader Tests
  describe("TableHeader", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const headers = screen.getAllByRole("rowgroup");
      expect(headers[0]).toHaveClass("[&_tr]:border-b");
    });

    it("should merge custom className", () => {
      renderWithTheme(
        <Table>
          <TableHeader className="custom-header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );
      const header = screen.getByRole("rowgroup");
      expect(header).toHaveClass("[&_tr]:border-b", "custom-header");
    });
  });

  // TableBody Tests
  describe("TableBody", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const bodies = screen.getAllByRole("rowgroup");
      const body = bodies[1]; // Second rowgroup is TableBody
      expect(body).toHaveClass("[&_tr:last-child]:border-0");
    });
  });

  // TableFooter Tests
  describe("TableFooter", () => {
    it("should render with correct default classes", () => {
      renderTable();

      // Get last rowgroup which is footer
      const footer = screen.getAllByRole("rowgroup")[2];

      // Test individual classes
      expect(footer).toHaveClass("border-t");
      expect(footer).toHaveClass("bg-muted/50");
      expect(footer).toHaveClass("font-medium");
      expect(footer).toHaveClass("[&>tr]:last:border-b-0");
    });
  });

  // TableRow Tests
  describe("TableRow", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveClass(
        "border-b",
        "transition-colors",
        "hover:bg-muted/50",
        "data-[state=selected]:bg-muted",
      );
    });

    it("should render selected state correctly", () => {
      renderWithTheme(
        <Table>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );
      const row = screen.getByRole("row");
      expect(row).toHaveAttribute("data-state", "selected");
    });
  });

  // TableHead Tests
  describe("TableHead", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const headers = screen.getAllByRole("columnheader");
      headers.forEach(header => {
        expect(header).toHaveClass("h-10", "px-2", "text-left", "align-middle", "font-medium", "text-muted-foreground");
      });
    });

    it("should handle checkbox styling correctly", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input type="checkbox" role="checkbox" />
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );
      const header = screen.getByRole("columnheader");
      expect(header).toHaveClass("[&:has([role=checkbox])]:pr-0");
    });
  });

  // TableCell Tests
  describe("TableCell", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const cells = screen.getAllByRole("cell");
      cells.forEach(cell => {
        expect(cell).toHaveClass("p-2", "align-middle");
      });
    });

    it("should handle checkbox styling correctly", () => {
      renderWithTheme(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <input type="checkbox" role="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );
      const cell = screen.getByRole("cell");
      expect(cell).toHaveClass("[&:has([role=checkbox])]:pr-0");
    });
  });

  // TableCaption Tests
  describe("TableCaption", () => {
    it("should render with correct default classes", () => {
      renderTable();
      const caption = screen.getByRole("caption");
      expect(caption).toHaveClass("mt-4", "text-sm", "text-muted-foreground");
    });

    it("should merge custom className", () => {
      renderWithTheme(
        <Table>
          <TableCaption className="custom-caption">Caption Text</TableCaption>
        </Table>,
      );
      const caption = screen.getByRole("caption");
      expect(caption).toHaveClass("mt-4", "text-sm", "text-muted-foreground", "custom-caption");
    });
  });

  // Ref Forwarding Tests
  describe("Ref Forwarding", () => {
    it("should forward ref to table element", () => {
      const ref = React.createRef<HTMLTableElement>();
      renderWithTheme(<Table ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });

    it("should forward ref to header element", () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      renderWithTheme(<TableHeader ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
    });

    // Add similar tests for other components that forward refs
  });
});

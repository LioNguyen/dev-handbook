import type { Meta, StoryObj } from "@storybook/react";
import { addDays, subDays } from "date-fns";
import { Calendar } from "./Calendar";

const meta = {
  title: "Design System/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A flexible and customizable calendar component supporting single and range date selection.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["default", "range"],
      description: "Selection mode for the calendar",
    },
    disabled: {
      control: "boolean",
      description: "Disable date selection",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Show days outside current month",
    },
    fromDate: {
      control: "date",
      description: "Earliest selectable date",
    },
    toDate: {
      control: "date",
      description: "Latest selectable date",
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px] p-4 border rounded-lg shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

// Default Calendar
export const Default: Story = {
  args: {
    mode: "default",
    showOutsideDays: true,
  },
  name: "Default Calendar",
  parameters: {
    docs: {
      description: {
        story: "Basic calendar with default configuration",
      },
    },
  },
};

// Range Selection Calendar
export const RangeSelection: Story = {
  args: {
    mode: "range",
    fromDate: subDays(new Date(), 30),
    toDate: addDays(new Date(), 30),
  },
  name: "Range Selection",
  parameters: {
    docs: {
      description: {
        story: "Calendar supporting date range selection with min/max dates",
      },
    },
  },
};

// Custom Styling Calendar
export const CustomStyled: Story = {
  args: {
    className: "bg-gray-100 rounded-xl p-4",
    classNames: {
      head_cell: "text-red-500 font-bold",
      day_today: "bg-blue-200 text-blue-800",
    },
  },
  name: "Custom Styled",
  parameters: {
    docs: {
      description: {
        story: "Calendar with custom CSS classes for styling",
      },
    },
  },
};

// Disabled Dates Calendar
export const DisabledDates: Story = {
  args: {
    fromDate: new Date(),
    toDate: addDays(new Date(), 15),
    disabled: [{ from: new Date(), to: addDays(new Date(), 5) }],
  },
  name: "Disabled Dates",
  parameters: {
    docs: {
      description: {
        story: "Calendar with specific date ranges disabled",
      },
    },
  },
};

// Week Start Configuration
export const WeekStartMonday: Story = {
  args: {
    mode: "default",
    weekStartsOn: 1, // Monday
  },
  name: "Week Starts Monday",
  parameters: {
    docs: {
      description: {
        story: "Calendar with week starting on Monday",
      },
    },
  },
};

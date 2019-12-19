//These objects CREATE the inputs titles, function, description, and id
//Located in tablejs as a PROP and passed down to table cells 
const FilterObjects = [
  {
    filterId: 1,
    filterName: "Buildings with contact",
    filterHandle: "Toggle",
    filterDescription: "Filter out buildings without contact details."
  },
  {
    filterId: 2,
    filterName: "Function Select",
    filterHandle: "Select",
    filterDescription: "Select function type to show only",
    filterSelect: ["all", "office", "hotel", "residential"]
  },
  {
    filterId: 3,
    filterName: "Building Name",
    filterHandle: "Input",
    filterDescription:
      "Type in the letters of a building name to filter those that do not match. For example, type in the letter 'a' to filter out buildings that dont start with letter 'a'.",
    filterDropDownOptions: [{}]
  },
  // {
  //   filterId: 4,
  //   filterName: "Minimum height",
  //   filterHandle: "Input",
  //   filterDescription:
  //     "Set a value to display buildings with height above the input.",
  //   filterDropDownOptions: [null]
  // },
  {
    filterId: 5,
    filterName: "Building Owner",
    filterHandle: "Input",
    filterDescription: "Displays markers with the according height."
  },
  {
    filterId: 6,
    filterName: "Postal Filter",
    filterHandle: "Input",
    filterDescription: "Displays markers according to their postal code."
  },
  {
    filterId: 7,
    filterName: "Height Range",
    filterHandle: "Range",
    filterDescription: "Select height type to show only",
    filterSelect: ["all", "Low", "Medium", "Tall"]
  }
];

module.exports = {
  FilterObjects
};

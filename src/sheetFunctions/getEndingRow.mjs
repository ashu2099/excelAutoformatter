import { BRANDS } from "../constants.mjs";

export const getEndingRow = (rowCount, brand) => {
  switch (brand) {
    case BRANDS.BAJAJ: {
      return rowCount - 1;
    }

    case BRANDS.GODIGIT: {
      return rowCount;
    }

    default: {
      break;
    }
  }
};

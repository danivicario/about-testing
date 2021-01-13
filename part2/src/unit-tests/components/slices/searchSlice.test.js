import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { searchSliceConfig } from "../../../redux/slices/searchSlice";

configure({ adapter: new Adapter() });

describe("slices", () => {
  describe("search", () => {
    it("SET_SEARCH_TYPE", () => {
      let sliceReducerFn = searchSliceConfig.extraReducers["SET_SEARCH_TYPE"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: "Phrase ID"
          }
        )
      ).toEqual({
        test: true,
        searchType: "Phrase ID"
      });
    });

    it("SET_SEARCH_TERM", () => {
      let sliceReducerFn = searchSliceConfig.extraReducers["SET_SEARCH_TERM"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: "Searching lorem ipsum in a course"
          }
        )
      ).toEqual({
        test: true,
        searchTerm: "Searching lorem ipsum in a course"
      });
    });

    it("SET_SEARCH_INTERFACE_LANGUAGE", () => {
      let sliceReducerFn = searchSliceConfig.extraReducers["SET_SEARCH_INTERFACE_LANGUAGE"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: "Polish"
          }
        )
      ).toEqual({
        test: true,
        searchInterfaceLanguage: "Polish"
      });
    });
  });
});

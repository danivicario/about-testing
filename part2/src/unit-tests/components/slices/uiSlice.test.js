import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { uiSliceConfig } from "../../../redux/slices/uiSlices";

configure({ adapter: new Adapter() });

describe("slices", () => {
  describe("ui", () => {
    it("SHOW_SNACKBAR", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["SHOW_SNACKBAR"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: {
              type: "delete",
              title: "test title",
              body: "test body"
            }
          }
        )
      ).toEqual({
        test: true,
        SnackBar: {
          visible: true,
          type: "delete",
          title: "test title",
          body: "test body"
        }
      });
    });

    it("HIDE_SNACKBAR", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["HIDE_SNACKBAR"];

      expect(sliceReducerFn({ test: true })).toEqual({
        test: true,
        SnackBar: {
          visible: false
        }
      });
    });

    it("COURSES_TABLE_UPDATED", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["COURSES_TABLE_UPDATED"];

      expect(
        sliceReducerFn(
          { test: true },
          { payload: { sortedField: { field: "name", ascending: false } } }
        )
      ).toEqual({
        test: true,
        CoursesTable: {
          field: "name",
          ascending: false
        }
      });
    });

    it("SHOW_METADATA_PANEL", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["SHOW_METADATA_PANEL"];

      expect(
        sliceReducerFn({
          test: true,
          panels: {}
        })
      ).toEqual({
        test: true,
        panels: {
          metadata: {
            visible: true
          }
        }
      });
    });

    it("SHOW_COMMENTS_PANEL", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["SHOW_COMMENTS_PANEL"];

      expect(sliceReducerFn({ test: true, panels: {} })).toEqual({
        test: true,
        panels: {
          comments: {
            visible: true
          }
        }
      });
    });

    it("SHOW_COURSE_PANEL", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["SHOW_COURSE_PANEL"];

      expect(sliceReducerFn({ test: true, panels: {} })).toEqual({
        test: true,
        panels: {
          course: {
            visible: true
          }
        }
      });
    });

    it("SHOW_SEARCH_PANEL", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["SHOW_SEARCH_PANEL"];

      expect(sliceReducerFn({ test: true, panels: {} })).toEqual({
        test: true,
        panels: {
          search: {
            visible: true
          }
        }
      });
    });

    it("HIDE_SIDE_PANEL", () => {
      let sliceReducerFn = uiSliceConfig.extraReducers["HIDE_SIDE_PANEL"];

      expect(
        sliceReducerFn({
          test: true,
          panels: { search: { visible: true }, metadata: { visible: true } }
        })
      ).toEqual({
        test: true,
        panels: {
          search: {
            visible: false
          },
          metadata: {
            visible: false
          }
        }
      });
    });
  });
});

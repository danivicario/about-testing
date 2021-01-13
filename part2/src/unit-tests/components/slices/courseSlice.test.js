import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as common from "../../../common/utils";
import { coursesSliceConfig } from "../../../redux/slices/coursesSlice";

configure({ adapter: new Adapter() });

describe("slices", () => {
  describe("course", () => {
    it("ALL_COURSES_REQUEST_SUCCEEDED", () => {
      let sliceReducerFn = coursesSliceConfig.extraReducers["ALL_COURSES_REQUEST_SUCCEEDED"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: [
              {
                name: "test course 1",
                contents: [1, 2, 3]
              },
              {
                name: "test course 2",
                contents: [4, 5, 6]
              }
            ]
          }
        )
      ).toEqual({
        test: true,
        allCourses: {
          loaded: true,
          courses: [
            {
              name: "test course 1",
              contents: [1, 2, 3]
            },
            {
              name: "test course 2",
              contents: [4, 5, 6]
            }
          ]
        }
      });
    });

    it("COURSE_LOADED", () => {
      let sliceReducerFn = coursesSliceConfig.extraReducers["COURSE_LOADED"];

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: {
              course: [4, 5, 6],
              loaded: false
            }
          }
        )
      ).toEqual({
        test: true,
        course: {
          loaded: false,
          course: [4, 5, 6]
        }
      });
    });

    it("ONE_COURSE_CONTENT_LOADED_SUCCEEDED", () => {
      let sliceReducerFn = coursesSliceConfig.extraReducers["ONE_COURSE_CONTENT_LOADED_SUCCEEDED"];

      common.randMetadata = jest.fn();
      common.randComments = jest.fn();
      common.createRandomContents = jest.fn();

      common.randMetadata.mockReturnValue({
        editHistory: [
          {
            id: 771,
            date: "12/12/12",
            changedBy: "federico",
            change: "Changed as review pending"
          }
        ],
        otherLocations: [
          {
            id: 11,
            location: "Complete English / FR",
            createdBy: "federico",
            type: "Mirrored"
          }
        ],
        cloningHistory: [
          {
            id: 212,
            date: "12/feb/2020 12:34pm",
            clonedBy: "federico",
            contentId: "EN_43873894_23"
          }
        ]
      });

      common.randComments.mockReturnValue([
        {
          id: 122,
          date: "12/feb/2020 12:34pm",
          user: "federico",
          comment: "Comment number 1"
        }
      ]);

      common.createRandomContents.mockReturnValue([
        {
          content: "test",
          date: "22/12/2019 12:05pm",
          id: "68400677",
          status: 1,
          text: "untitled",
          type: "lesson"
        }
      ]);

      expect(
        sliceReducerFn(
          { test: true },
          {
            payload: {
              name: "test course 2",
              contents: [4, 5, 6]
            }
          }
        )
      ).toEqual({
        test: true,
        selectedContent: {
          name: "test course 2",
          contents: [
            [
              {
                content: "test",
                date: "22/12/2019 12:05pm",
                id: "68400677",
                status: 1,
                text: "untitled",
                type: "lesson"
              }
            ]
          ],
          comments: [
            {
              id: 122,
              date: "12/feb/2020 12:34pm",
              user: "federico",
              comment: "Comment number 1"
            }
          ],
          loaded: true,
          metadata: {
            editHistory: [
              {
                id: 771,
                date: "12/12/12",
                changedBy: "federico",
                change: "Changed as review pending"
              }
            ],
            otherLocations: [
              {
                id: 11,
                location: "Complete English / FR",
                createdBy: "federico",
                type: "Mirrored"
              }
            ],
            cloningHistory: [
              {
                id: 212,
                date: "12/feb/2020 12:34pm",
                clonedBy: "federico",
                contentId: "EN_43873894_23"
              }
            ]
          }
        }
      });
    });

    it("COURSE_ABANDONED", () => {
      let sliceReducerFn = coursesSliceConfig.extraReducers["COURSE_ABANDONED"];

      expect(sliceReducerFn({ test: true })).toEqual({
        test: true,
        course: {
          loaded: false,
          course: undefined
        }
      });
    });

    it("GLOBAL_SEARCH_SUCCEEDED", () => {
      let sliceReducerFn = coursesSliceConfig.extraReducers["GLOBAL_SEARCH_SUCCEEDED"];

      const mockedData = { mockedData: true };

      expect(sliceReducerFn({ test: true }, { payload: mockedData })).toEqual({
        test: true,
        searchResultsMock: mockedData
      });
    });

    // it("ADD_COMMENT", () => {
    //   let sliceReducerFn = coursesSliceConfig.extraReducers["ADD_COMMENT"];

    //   const mockedComment1 = { mockedComment1: true };
    //   const mockedComment2 = { mockedComment2: true };

    //   expect(sliceReducerFn({ test: true }, { payload: mockedComment1 })).toEqual({
    //     test: true,
    //     selectedContent: {
    //       comments: [mockedComment1]
    //     }
    //   });
    // });
  });
});

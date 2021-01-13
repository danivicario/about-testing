import { call, put, takeLatest } from "redux-saga/effects";
import {
  allCoursesRequest,
  globalSearchRequest,
  mySaga,
  oneContentRequest,
  oneCourseRequest
} from "../../sagas/sagas";
import API from "../../services/API";

jest.spyOn(API, "fetchCourses");
jest.spyOn(API, "fetchCourse");
jest.spyOn(API, "fetchCourseContent");
jest.spyOn(API, "fetchGlobalSearch");

describe("Sagas", () => {
  const gen = mySaga();

  describe("sagas capturing events", () => {
    it("ALL_COURSES_REQUEST must call to the right fn", () => {
      const generatorValue = gen.next();

      expect(generatorValue.value).toEqual(takeLatest("ALL_COURSES_REQUEST", allCoursesRequest));
    });

    it("ONE_COURSE_REQUEST must call to the right fn", () => {
      const generatorValue = gen.next();

      expect(generatorValue.value).toEqual(takeLatest("ONE_COURSE_REQUEST", oneCourseRequest));
    });

    it("COURSE_CONTENT_REQUEST must call to the right fn", () => {
      const generatorValue = gen.next();

      expect(generatorValue.value).toEqual(takeLatest("COURSE_CONTENT_REQUEST", oneContentRequest));
    });

    it("GLOBAL_SEARCH_REQUEST must call to the right fn", () => {
      const generatorValue = gen.next();

      expect(generatorValue.value).toEqual(
        takeLatest("GLOBAL_SEARCH_REQUEST", globalSearchRequest)
      );
    });
  });

  describe("sagas functions - allCoursesRequest", () => {
    it("testing every step", () => {
      let allCoursesRequestFn = allCoursesRequest();
      let fakeCoursesPayload = { course: 1 };
      let allCoursesRequestHandlerFn = allCoursesRequestFn.next();

      expect(allCoursesRequestHandlerFn.value).toEqual(call(API.fetchCourses, {}));

      let allCoursesRequestFnResponse = allCoursesRequestFn.next(fakeCoursesPayload);

      expect(allCoursesRequestFnResponse.value).toEqual(
        put({
          type: "ALL_COURSES_REQUEST_SUCCEEDED",
          payload: fakeCoursesPayload
        })
      );
    });
  });

  describe("sagas functions - oneCourseRequest", () => {
    it("testing every step", () => {
      API.fetchCourse.mockResolvedValue([{ id: 4 }]);
      let requestedCoursePayload = { id: 3, preopenId: 999 };
      let oneCourseRequestFn = oneCourseRequest(requestedCoursePayload);
      let oneCourseRequestOutput = oneCourseRequestFn.next();

      expect(oneCourseRequestOutput.value).toEqual(call(API.fetchCourse, 3));
    });
  });

  describe("sagas functions - oneContentRequest", () => {
    it("testing every step", () => {
      let requestedCoursePayload = { id: 1 };
      let oneContentRequestFn = oneContentRequest(requestedCoursePayload);
      let oneContentRequestFnHandler = oneContentRequestFn.next();

      expect(oneContentRequestFnHandler.value).toEqual(call(API.fetchCourseContent, 1));

      oneContentRequestFnHandler = oneContentRequestFn.next();
    });
  });

  describe("sagas functions - globalSearchRequest", () => {
    it("testing every step", () => {
      let requestedCoursePayload = { term: "french courses" };
      let oneContentRequestFn = globalSearchRequest(requestedCoursePayload);
      let oneContentRequestFnHandler = oneContentRequestFn.next();

      expect(oneContentRequestFnHandler.value).toEqual(
        call(API.fetchGlobalSearch, { term: "french courses" })
      );

      oneContentRequestFnHandler = oneContentRequestFn.next({ term: "french courses" });

      expect(oneContentRequestFnHandler.value).toEqual(
        put({ type: "GLOBAL_SEARCH_SUCCEEDED", payload: { term: "french courses" } })
      );
    });
  });
});

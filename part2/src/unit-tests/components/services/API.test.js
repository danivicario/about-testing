import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import API from "../../../services/API";

configure({ adapter: new Adapter() });

describe("API", () => {
  beforeEach(() => {
    jest.spyOn(window, "setTimeout");

    window.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) =>
        resolve({
          json: () => {
            return { data: "test" };
          }
        })
      );
    });
  });

  it("fetchCourses", async () => {
    const returnedDataFromAPI = await API.fetchCourses();
    expect(returnedDataFromAPI).toEqual({ data: "test" });
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/json/courses.json");
  });
  it("fetchCourse", () => {
    const courseId = 3;
    expect(API.fetchCourse(courseId));
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/json/course_3.json");
  });
  it("fetchCourseContent", () => {
    const courseContentId = 10;
    API.fetchCourseContent(courseContentId);
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/json/courseContent_10.json");
  });
  it("fetchGlobalSearch", () => {
    API.fetchGlobalSearch();
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/json/searchMock.json");
  });
});

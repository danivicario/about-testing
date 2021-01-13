import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import CourseComposer from "../../../components/CourseComposer/CourseComposer";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<CourseComposer />", () => {
  let wrapper;
  let store;
  let CourseComposerRef;

  const mockStore = configureMockStore();
  const storeStateMock = {
    courses: {
      allCoursesLoaded: true,
      allCourses: [
        {
          id: "1",
          name: "Complete Japanese",
          learningLanguage: "EN",
          interfaceLanguage: "PL"
        },
        {
          id: "99",
          name: "Complete French",
          learningLanguage: "ES",
          interfaceLanguage: "FR"
        }
      ]
    }
  };

  let root;
  let returnedOrderBySpiedSetOrder;

  window.spiedSetOrder = (newOrder) => {
    returnedOrderBySpiedSetOrder = newOrder;
  };

  beforeEach(() => {
    store = mockStore(storeStateMock);
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    jest.spyOn(window, "spiedSetOrder");

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <CourseComposer
            courseItems={[
              {
                id: "1",
                name: "Complete Japanese",
                learningLanguage: "EN",
                interfaceLanguage: "PL"
              },
              {
                id: "2",
                name: "Complete English",
                learningLanguage: "DE",
                interfaceLanguage: "FR"
              }
            ]}
            setOrder={(c) => window.spiedSetOrder(c)}
            status={1}
          ></CourseComposer>
        </Provider>
      </BrowserRouter>,
      { attachTo: root }
    );

    CourseComposerRef = wrapper.find("CourseComposer");
  });

  it("checking sub components are present", () => {
    expect(CourseComposerRef.find(".base-content").length).toBeGreaterThan(1);
  });

  it("drag end testing", () => {
    const onDragEndTest = {
      destination: { index: 1 },
      source: { index: 0 }
    };
    CourseComposerRef.find("DragDropContext").prop("onDragEnd")(onDragEndTest);

    expect(window.spiedSetOrder).toHaveBeenCalled();
    expect(returnedOrderBySpiedSetOrder).toEqual([
      {
        id: "2",
        name: "Complete English",
        learningLanguage: "DE",
        interfaceLanguage: "FR"
      },
      {
        id: "1",
        name: "Complete Japanese",
        learningLanguage: "EN",
        interfaceLanguage: "PL"
      }
    ]);

    const onDragEndTestWithoutDestination = {
      source: { index: 1 }
    };
    CourseComposerRef.find("DragDropContext").prop("onDragEnd")(onDragEndTestWithoutDestination);
  });
});

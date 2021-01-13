import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<coursePanel />", () => {
  let wrapper;
  let store;
  let rootRef;

  const mockStore = configureMockStore();
  const storeStateMock = {
    course: {
      learningLanguage: { code: "EN" },
      uiLanguages: {
        AR: false,
        ZH: false,
        EN: false,
        FR: false,
        DE: false,
        ID: false,
        IT: false,
        JA: false,
        KO: false,
        PL: false,
        PT: false,
        RU: false,
        ES: false,
        TR: false,
        VI: false
      },
      isCreateButtonDisabled: true,
      id: 123,
      name: "test",
      description: undefined
    },
    ui: {
      panels: {
        course: {
          visible: false,
          isCreateButtonDisabled: true,
          stage: 1,
          contentSelectedWithNavigation: {}
        }
      }
    }
  };
  let mockDropdownValues;

  beforeEach(async () => {
    store = mockStore(storeStateMock);
    mockDropdownValues = [
      {
        name: "fake 1",
        code: "1"
      },
      {
        name: "fake 2",
        code: "99"
      }
    ];

    wrapper = mount(
      <Provider store={store}>
        <coursePanel></coursePanel>
      </Provider>
    );

    rootRef = wrapper.find(".new-course-panel-modal");
  });

  it("checking component renders", () => {
    expect(rootRef.find(".new-course-panel-modal__select-course-language").text()).toBe(
      "Select course language"
    );
    expect(rootRef.find(".new-course-panel-modal__select-interface-language").text()).toBe(
      "Select interface languages"
    );
  });

  it("create course button must be disabled to start with", () => {
    expect(
      rootRef.find(".new-course-panel-modal__create-course-button").at(0).prop("disabled")
    ).toBe(true);
  });

  it("toggle all languages must work", () => {
    rootRef.find(".new-course-panel-modal__flag").forEach((language) => {
      expect(language.find("input").prop("checked")).toBe(false);
    });

    // TODO: Reenable these test when we have design

    // rootRef.find(".new-course-panel-modal__select-all input").simulate("change");
    // rootRef = wrapper.find(".new-course-panel-modal");
    // rootRef.find(".new-course-panel-modal__flag").forEach((language) => {
    //   expect(language.find("input").prop("checked")).toBe("checked");
    // });

    // rootRef.find(".new-course-panel-modal__select-all input").simulate("change");
    // rootRef = wrapper.find(".new-course-panel-modal");
    // rootRef.find(".new-course-panel-modal__flag").forEach((language) => {
    //   expect(language.find("input").prop("checked")).toBe(false);
    // });
  });
});

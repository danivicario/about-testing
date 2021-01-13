import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import * as common from "../../../common/utils";
import MetadataPanel from "../../../components/MetadataPanel/MetadataPanel";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

describe("<MetadataPanel />", () => {
  let wrapper;
  let baseRef;
  let store;
  const mockStore = configureMockStore();

  beforeEach(() => {
    const storeStateMock = {
      courses: {
        selectedContent: {
          loaded: true,
          content: {
            id: "1",
            name: "Complete Japanese",
            learningLanguage: "EN",
            interfaceLanguage: "PL"
          },
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
        },
        comments: [
          {
            id: 122,
            date: "12/feb/2020 12:34pm",
            user: "federico",
            comment: "Comment number 1"
          }
        ]
      },
      ui: {
        panels: {
          comments: {
            visible: false
          }
        }
      }
    };
    store = mockStore(storeStateMock);

    wrapper = mount(
      <Provider store={store}>
        <MetadataPanel content={storeStateMock.courses.selectedContent}></MetadataPanel>
      </Provider>
    );

    common.randMetadata = jest.fn();
    common.randComments = jest.fn();

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

    baseRef = wrapper.find(".metadata-panel-modal").at(0);
  });

  it("check closing panel", () => {
    baseRef.find(".modal-header__back").simulate("click");

    expect(store.getActions()[0]).toEqual({
      type: "HIDE_SIDE_PANEL"
    });

    expect(baseRef.find(".table").at(0).find("tbody tr").at(0).find("td").at(0).text()).toBe(
      "12/12/12"
    );
    expect(baseRef.find(".table").at(1).find("tbody tr").at(0).find("td").at(0).text()).toBe(
      "Complete English / FR"
    );
  });
});

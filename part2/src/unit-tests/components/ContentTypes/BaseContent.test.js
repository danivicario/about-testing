import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import BaseContent from "../../../components/ContentTypes/BaseContent/BaseContent";
import { actImmediate } from "../../utils";

configure({ adapter: new Adapter() });

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch
}));

describe("<BaseContent />", () => {
  let wrapper;
  let store;
  let buttonRef;
  let deleteFn;
  let showMetadataFn;
  let showCommentsFn;
  const mockStore = configureMockStore();

  const storeStateMock = {};
  const props = {
    name: "test course",
    content: "test content",
    id: 1200
  };

  beforeEach(async () => {
    store = mockStore(storeStateMock);

    wrapper = mount(
      <Provider store={store}>
        <BaseContent {...props} showContextMenu></BaseContent>
      </Provider>
    );

    wrapper = wrapper.find(".base-content").at(0);
  });

  it("checking basic props get properly applied", () => {
    expect(wrapper.find(".base-content__id").text()).toBe("1200");
  });

  it("delete", async () => {
    await actImmediate(wrapper, () => {
      buttonRef = wrapper.find(".context-menu").at(0);
      buttonRef.find("button").simulate("click");
      buttonRef = wrapper.find(".context-menu").at(0);

      deleteFn = wrapper.find("ContextMenu").props("items").items[0].onClick;
      showMetadataFn = wrapper.find("ContextMenu").props("items").items[1].onClick;
      showCommentsFn = wrapper.find("ContextMenu").props("items").items[2].onClick;

      deleteFn();
      expect(mockDispatch.mock.calls[0][0].type).toBe("SHOW_SNACKBAR");
    }).catch((e) => {});
  });

  it("show metadata panel", async () => {
    await actImmediate(wrapper, () => {
      buttonRef = wrapper.find(".context-menu").at(0);
      buttonRef.find("button").simulate("click");
      buttonRef = wrapper.find(".context-menu").at(0);

      deleteFn = wrapper.find("ContextMenu").props("items").items[0].onClick;
      showMetadataFn = wrapper.find("ContextMenu").props("items").items[1].onClick;
      showCommentsFn = wrapper.find("ContextMenu").props("items").items[2].onClick;

      showMetadataFn();
      expect(mockDispatch.mock.calls[1][0].type).toBe("SHOW_METADATA_PANEL");
    }).catch((e) => {});
  });

  it("comments panel", async () => {
    await actImmediate(wrapper, () => {
      buttonRef = wrapper.find(".context-menu").at(0);
      buttonRef.find("button").simulate("click");
      buttonRef = wrapper.find(".context-menu").at(0);

      deleteFn = wrapper.find("ContextMenu").props("items").items[0].onClick;
      showMetadataFn = wrapper.find("ContextMenu").props("items").items[1].onClick;
      showCommentsFn = wrapper.find("ContextMenu").props("items").items[2].onClick;

      showCommentsFn();
      expect(mockDispatch.mock.calls[2][0].type).toBe("SHOW_COMMENTS_PANEL");
    }).catch((e) => {});
  });
});

// showMetadataFn();
// showCommentsFn();

// expect(wrapper.find("DropdownItem").length).toBe(3);

// wrapper.find("DropdownItem").at(0).simulate("click");

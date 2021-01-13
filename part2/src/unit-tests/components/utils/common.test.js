import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { randComments, randMetadata } from "../../../common/utils";

configure({ adapter: new Adapter() });

describe.only("Common utils", () => {
  it("randComment should return 4 random comments with some specific fields", () => {
    let output = randComments();

    expect(output.length).toBe(4);
    expect(output[0]).toHaveProperty("id");
    expect(output[0]).toHaveProperty("date");
    expect(output[0]).toHaveProperty("user");
    expect(output[0]).toHaveProperty("comment");
  });

  it("randMetadata should return editHistory, otherLocations and cloningHistory", () => {
    let output = randMetadata();

    expect(output).toHaveProperty("editHistory");
    expect(output).toHaveProperty("otherLocations");
    expect(output).toHaveProperty("cloningHistory");

    expect(output.editHistory[0]).toHaveProperty("id");
    expect(output.editHistory[0]).toHaveProperty("date");
    expect(output.editHistory[0]).toHaveProperty("changedBy");
    expect(output.editHistory[0]).toHaveProperty("change");

    expect(output.otherLocations[0]).toHaveProperty("id");
    expect(output.otherLocations[0]).toHaveProperty("location");
    expect(output.otherLocations[0]).toHaveProperty("createdBy");
    expect(output.otherLocations[0]).toHaveProperty("type");

    expect(output.cloningHistory[0]).toHaveProperty("id");
    expect(output.cloningHistory[0]).toHaveProperty("date");
    expect(output.cloningHistory[0]).toHaveProperty("clonedBy");
    expect(output.cloningHistory[0]).toHaveProperty("contentId");
  });
});

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { orderTriangle, sortBy } from "../../../components/Tables/CoursesTableHelpers";

configure({ adapter: new Adapter() });

describe.only("Tables", () => {
  describe("common", () => {
    describe("orderTriangle", () => {
      it("passing fieldname", () => {
        let orderTriangleNodeRef = mount(orderTriangle({ field: "test-field" }, "test-field"));

        expect(orderTriangleNodeRef.text()).toBe("▼");

        orderTriangleNodeRef = mount(
          orderTriangle({ field: "test-field", ascending: true }, "test-field")
        );

        expect(orderTriangleNodeRef.text()).toBe("▲");
      });

      it("passing not passing fieldname", () => {
        let orderTriangleNodeRef = mount(orderTriangle({ field: "" }, "test-field"));

        expect(orderTriangleNodeRef.text()).toBe("");
      });
    });

    describe("sortBy", () => {
      it("number ordering, both ascending and descending", () => {
        const numericElementsToSort = [
          {
            value: 4
          },
          {
            value: 1
          },
          {
            value: 2
          },
          {
            value: 3
          },
          {
            value: 3
          }
        ];

        expect(sortBy(numericElementsToSort, "value", "number", true)).toStrictEqual([
          {
            value: 1
          },
          {
            value: 2
          },
          {
            value: 3
          },
          {
            value: 3
          },
          {
            value: 4
          }
        ]);

        expect(sortBy(numericElementsToSort, "value", "number", false)).toStrictEqual([
          {
            value: 4
          },
          {
            value: 3
          },
          {
            value: 3
          },
          {
            value: 2
          },
          {
            value: 1
          }
        ]);
      });

      it("string ordering, both ascending and descending", () => {
        const stringElementsToSort = [
          {
            value: "a"
          },
          {
            value: "c"
          },
          {
            value: "b"
          },
          {
            value: "d"
          },
          {
            value: "a new"
          }
        ];

        expect(sortBy(stringElementsToSort, "value", "string", true)).toStrictEqual([
          {
            value: "a"
          },
          {
            value: "a new"
          },
          {
            value: "b"
          },
          {
            value: "c"
          },
          {
            value: "d"
          }
        ]);

        expect(sortBy(stringElementsToSort, "value", "string", false)).toStrictEqual([
          {
            value: "d"
          },
          {
            value: "c"
          },
          {
            value: "b"
          },
          {
            value: "a new"
          },
          {
            value: "a"
          }
        ]);
      });

      it("date ordering, both ascending and descending", () => {
        const dateElementsToSort = [
          {
            value: "2013-01-01T00:00:00-13:00"
          },
          {
            value: "2013-01-01T00:00:00-14:00"
          },
          {
            value: "2013-02-01T00:00:00-13:00"
          },
          {
            value: "2012-12-31T00:00:00-13:00"
          },
          {
            value: "2013-03-01T00:00:00-13:00"
          },
          {
            value: "2013-10-01T00:00:00-13:00"
          },
          {
            value: "2013-07-01T00:00:00-13:00"
          }
        ];

        expect(sortBy(dateElementsToSort, "value", "date", true)).toStrictEqual([
          {
            value: "2012-12-31T00:00:00-13:00"
          },
          {
            value: "2013-01-01T00:00:00-13:00"
          },
          {
            value: "2013-01-01T00:00:00-14:00"
          },
          {
            value: "2013-02-01T00:00:00-13:00"
          },
          {
            value: "2013-03-01T00:00:00-13:00"
          },
          {
            value: "2013-07-01T00:00:00-13:00"
          },
          {
            value: "2013-10-01T00:00:00-13:00"
          }
        ]);

        expect(sortBy(dateElementsToSort, "value", "date", false)).toStrictEqual([
          {
            value: "2013-10-01T00:00:00-13:00"
          },
          {
            value: "2013-07-01T00:00:00-13:00"
          },
          {
            value: "2013-03-01T00:00:00-13:00"
          },
          {
            value: "2013-02-01T00:00:00-13:00"
          },
          {
            value: "2013-01-01T00:00:00-14:00"
          },
          {
            value: "2013-01-01T00:00:00-13:00"
          },
          {
            value: "2012-12-31T00:00:00-13:00"
          }
        ]);
      });
    });
  });
});

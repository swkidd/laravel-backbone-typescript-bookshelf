import { BookModel } from "../models/book.model";

describe("tests : models : book.test.ts ", () => {
    it("can construct a book model", () => {
        const author1 = "J.D. Salinger"
        const title1 = "The Catcher in the Rye"
        const author2 = "Kurt Vonnegut"
        const title2 = "Slaughterhouse-Five"

        var book = new BookModel({
            author: author1,
            title: title1
        });

        expect(book.author).toEqual(author1);
        expect(book.title).toEqual(title1);

        book.author = author2;
        expect(book.author).toEqual(author2);

        book.title = title2;
        expect(book.title).toEqual(title2);
    });
});

const request = require("supertest");
const app = require("../app");
const setupTestDB = require("../utils/setupTestDB");
const Book = require("../models/Book.model");
const User = require("../models/user.model");
setupTestDB();

const books = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
    },
    {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
    },
    {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
    },
    {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
    },
];

const users = [
    {
        code: "M001",
        name: "Angga",
    },
    {
        code: "M002",
        name: "Ferry",
    },
    {
        code: "M003",
        name: "Putri",
    },
]

beforeEach(async () => {
    await Book.insertMany(books);
    await User.insertMany(users);
});

describe("Successfull Book Routes", () => {
    describe("GET /v1/book", () => {
        it("should return all books with additional fields", async () => {
            const res = await request(app).get("/v1/book");
            expect(res.status).toBe(200);

            res.body.forEach((book, index) => {
                expect(book).toEqual(
                    expect.objectContaining({
                        code: books[index].code,
                        title: books[index].title,
                        author: books[index].author,
                        stock: books[index].stock,
                        borrowedBy: expect.any(Array),
                        id: expect.any(String),
                    })
                );
            });
        });
    });

    describe("POST /v1/book/borrow", () => {
        it("should successfully borrow a book", async () => {
            const res = await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(200);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ message: "Book borrowed successfully", data: { book: "Twilight", user: "Angga" } });
        });
    });

    describe("POST /v1/book/return", () => {
        it("should successfully return a book", async () => {
            await request(app).post("/v1/book/borrow").send({ bookCode: "TW-11", userCode: "M001" });
            const res = await request(app)
                .post("/v1/book/return")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(200);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ message: "Book returned successfully", data: { book: "Twilight", user: "Angga" } });
        });
    })
});

describe("Unsuccessfull Book Routes", () => {
    describe("POST /v1/book/borrow", () => {
        it("should return 404 if book not found", async () => {
            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-12", userCode: "M001" })
                .expect(404);
        });
    });

    describe("POST /v1/book/borrow", () => {
        it("should return 404 if user not found", async () => {
            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M004" })
                .expect(404);
        });
    })

    describe("POST /v1/book/borrow", () => {
        it("should return 400 if book out of stock", async () => {
            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(200);

            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M002" })
                .expect(400);
        });
    })

    describe("POST /v1/book/borrow", () => {
        it("should return 400 if user is penalized", async () => {
            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(200);

            await User.findOneAndUpdate({ code: "M001" }, { isPenalized: true });

            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M002" })
                .expect(400);
        });
    })

    describe("POST /v1/book/borrow", () => {
        it("should return 400 if user has reached the limit of borrowed books", async () => {
            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(200);

            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "HOB-83", userCode: "M001" })
                .expect(200);

            await request(app)
                .post("/v1/book/borrow")
                .send({ bookCode: "NRN-7", userCode: "M001" })
                .expect(400);
        });
    })

    describe("POST /v1/book/return", () => {
        it("should return 404 if book not found", async () => {
            await request(app)
                .post("/v1/book/return")
                .send({ bookCode: "TW-12", userCode: "M001" })
                .expect(404);
        });
    });

    describe("POST /v1/book/return", () => {
        it("should return 404 if user not found", async () => {
            await request(app)
                .post("/v1/book/return")
                .send({ bookCode: "TW-11", userCode: "M004" })
                .expect(404);
        });
    });

    describe("POST /v1/book/return", () => {
        it("should return 400 if book not borrowed by user", async () => {
            await request(app)
                .post("/v1/book/return")
                .send({ bookCode: "TW-11", userCode: "M001" })
                .expect(400);
        });
    });

    describe("GET /v1/book", () => {
        it("should return 404 if no books found", async () => {
            await Book.deleteMany({});
            await request(app).get("/v1/book").expect(404);
        });
    });
})
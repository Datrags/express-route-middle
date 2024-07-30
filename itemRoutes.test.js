process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let toy = {name: "toy", price: 5.00};

beforeEach(() =>{
    items.push(toy);
})

afterEach(() =>{
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [toy]});

    })

    test("Get one item", async () => {
        const res = await request(app).get("/items/toy");
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty('name', 'toy');
        expect(res.body.item).toHaveProperty('price');
    })
})

describe("POST /items", () => {
    test("Add new item", async () => {
        const soda = {name: "soda", price: 1.00};
        const res = await request(app).post('/items').send(soda);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: soda})
    })
})

describe("PATCH /items/:name", () => {
    test("Update item", async () =>{
        const res = await request(app).patch("/items/toy").send({name: "meme", price: 0.5});
        expect(res.body.updated).toBeDefined();
        expect(res.body.updated).toHaveProperty('name', 'meme');
        expect(res.body.updated).toHaveProperty('price');
    })
})

describe("DELETE /items/:name", () => {
    test("Update item", async () => {
        const res = await request(app).delete("/items/toy");
        expect(res.body).toHaveProperty("message", "Deleted");
    })
})
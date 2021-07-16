const request = require("supertest");
const app = require('./app')

describe("app", () => {


    beforeEach(() => {
        // this will run before each test
    });

    // describe for test suites and test cases
    describe("routes", () => {
        describe("/", () => {

            it('should a 200 status', () => {
                return request(app)
                    .get("/")
                    .expect(200);
            });

            it("should return correct data", async () => {
                const response = await request(app).get('/');

                expect(response.body).toEqual({ message: "FuelCo App" })
            })
        });

        describe("/login", () => {
            
            it("should handle invalid requests", async () => {
                const response = await request(app).post("/login");

                expect(response.statusCode).toBe(400);
            });

            it("should handle requests when username or password is not in the request body", async () => {
                const response = await request(app).post("/login").send({name:"john", password: "password"});

                expect(response.statusCode).toBe(400);
            });

            it("should login with proper user", async () => {

                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});
                const response = await request(app).post("/login").send({username:"mockuser", password: "mockpass"});

                expect(response.statusCode).toBe(200);
            });

            it("should return 404 for invalid user", async () => {

                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});
                const response = await request(app).post("/login").send({username:"mockuser2", password: "mockpass"});

                expect(response.statusCode).toBe(404);
            });
        });

        describe("/profile", () => {
            it("should handle requests if the username param is incorrect", async () => {

                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});

                const response = await request(app).get("/user/non-existing-user/profile");
                expect(response.statusCode).toBe(404);


            })
               
        });


    });

})
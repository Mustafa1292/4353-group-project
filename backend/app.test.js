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
        
        describe("/price/:username/suggestedprice", () => {

            it("should return a correct price per gallon", async () => {
                const response = await request(app).post("/price/mockuser/suggestedprice");
                expect(response.body).toEqual({"result": "price", pricePerGallon: 10})

            })

        });

        describe("/user/:username/profile", () => {

            it("should update the user's profile" , async () => {

                let mockProfileData =  {address1 : "123 updated address", address2 : "address2"}
                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});
                const response = await request(app).post("/user/mockuser/profile").send({profile: mockProfileData});
                // console.log(response.body);
                expect(response.statusCode).toBe(200);
                
                const responsebad = await request(app).post("/user/non-existing-user/profile").send({profile: mockProfileData});
                expect(responsebad.statusCode).toBe(404);
                expect(response.body.user.profile).toEqual(mockProfileData)



            });

            
        });

        describe("/user/:username/address", (req,res) => {
            it("should return the user's address", async() => {
                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});
                const response = await request(app).get("/user/non-existing-user/profile");
                expect(response.statusCode).toBe(404);
            });
            it("should return 404 for invalid user", async () => {

                await request(app).post('/register').send({username: "mockuser", password: "mockpass"});
                const response = await request(app).get("/user/non-existing-user/address");

                expect(response.statusCode).toBe(404);
            });
            it("should return response 200", async () => {
                await request(app).post('/register').send({username: "mockuser3", password: "mockpass"});
                const response = await request(app).get("/user/mockuser3/address");
                expect(response.statusCode).toBe(200);
                
            })
        });

        describe("/quotes_history", () => {
            it("should return response 200", async () => {
                await request(app).post('/register').send({username: "mockuser3", password: "mockpass"});
                const response = await request(app).post('/login').send({username:"mockuser3", password: "mockpass"})
                expect(response.statusCode).toBe(200);
                
            })
        })

    });

})


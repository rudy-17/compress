const assert =require("assert")

describe("checkDb",()=>
{
    describe("#fail",()=>
    {
        it("should return -1 because wrong credentials",(done)=>
        {
            const connectDB = async () => {
                try {
                  const conn = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                  })
              
                  console.log(`MongoDB Connected: ${conn.connection.host}`)
                } catch (err) {
                  console.error(err)
                  process.exit(1)
                }
              }
        })
    })
})
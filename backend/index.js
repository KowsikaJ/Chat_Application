const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors"); // cross origin resource origin securiyt mechanism in node that restricjt acces to resource from different origin control which website can acces their server
const ChatMessage=require("./models/message");
const app=express();
const PORT=5000;
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://kowsikaj05:VllgYl1QXQ22zofZ@chat.mkvcv.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

app.get("/messages", async (req, res)=>{
    try{
        const message=await ChatMessage.find();
        res.json(message);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"});
    }
});
app.post("/messages", async (req, res) => {
	try {
		const { user, message } = req.body;

		if (!user || !message) {
			return res
				.status(400)
				.json({ error: "User and message are required" });
		}

		const chatMessage = new ChatMessage({
			user,
			message,
		});

		await chatMessage.save();

		res.status(201).json(chatMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
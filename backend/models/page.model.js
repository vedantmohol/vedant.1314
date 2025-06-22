import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    skills:{
        type: [String],
        default: [],
    }
});

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
})

const pageSchema = new mongoose.Schema({
    home:{
        image:{
            type: String
        },
        text:{
            type: String
        },
        pdf:{
            type: String,
        }
    },
    about:{
        image:{
            type: String,
        },
        text:{
            type: String
        }
    },
    services:{
        list: [serviceSchema], 
        default: []
    },
    projects:{
        list: [projectSchema], 
        default: []
    },
    contact:{
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }
})

const Page = mongoose.model("Page",pageSchema);
export default Page;
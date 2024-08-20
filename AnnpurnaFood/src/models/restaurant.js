import { Schema } from "mongoose";

// restaurant schema
const restaurantSchema = new Schema(
    {
        name: { type: String, required: true },
        cuisines: [{ type: String, required: true }],
        type: {
            type: String,
            enum: [
                { name: "Vegan", color: ["white", "green", "blue"] },
                { name: "Vegetarian", color: ["green"] },
            ],
            require: true,
        },
        address: {
            locality: { type: String },
            areaName: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, default: "India" },
            pincode: { type: Number, required: true },
        },
        averageDeliveryTime: { type: Number, required: true },
        menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
        rating: { type: Schema.Types.ObjectId, ref: "Rating" },
        review: { type: Schema.Types.ObjectId, ref: "Review" },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
        location: { type: Schema.Types.ObjectId, ref: "Location" },
        thumbnail: [{ type: String }],
        isPromoted: { type: Boolean, default: false },
        gallery: [{ type: String }],
    },
    { timestamp: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;

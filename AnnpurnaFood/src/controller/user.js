import APIError from "../utils/apiError.js";
import APIResponse from "../utils/apiResponse.js";
import { User } from "../models/user.js";

const register = async (req, res) => {
    // get the data from the form/user
    // validate the data - [if all mandatory fields are present]
    // check if user already exist - [check username and email]
    // encrypt the password before saving to the database
    // create a new user object and save it to the database

    // 1. get the data from the form/user
    const { first_name, last_name, email, userId, password, phone, address } =
        req.body;

    // 2. validate the data
    if (
        [first_name, last_name, email, userId, password, address].some(
            (field) => console.log(`Fields: ${field}`)
        )
    ) {
        throw new APIError(400, "All * marked fields are mandatory");
    }

    // 3. Check if the user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { userId }],
    });

    if (existingUser) {
        throw new APIError(
            409,
            "User with this email or user_name already exists"
        );
    }

    // 5. create an object and add the user to the database
    const user = await new User({
        first_name,
        last_name,
        email,
        userId,
        password,
        phone,
        address,
    });

    console.log(`User: ${user}`);
    console.log(`User id: ${user._id}`);

    // check if user created successfully
    // if (!newUser) {
    //     throw new APIError(500, "Failed to register user!");
    // }

    const savedData = user.save();
    console.log(savedData);

    return res
        .status(201)
        .json(new APIResponse(200, user, "User created successfully"));
};

export { register };

import { Schema, model, models } from "mongoose";

const UserSchena = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: true, 'Email is required!',
    },
    username: {
        type: String,
        unique: [true, 'Username already exists!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image: {
        type: String,
    }
});

// const User = model("User", UserSchema);
/* first look into the models.User and see if it's there, and ONLY if it is not there then create a new model
 ( because this route is called everytime when the connection is established every single time from scratch,
   so that is why I have to make this additional check )

*/
const User = models.User || model("User", UserSchena);
 
export default User;
// the route is only going to be createdand running for the time when it gs getting called


// The "models" object is provided by the Mongoose library and stores all the registered models.

/* 
    If a model name "User" already exists in the "models" object, it assigns that existing model 
to the "User" variable.
    This prevents redefining the model and ensures that the existing model is reused.
*/ 
/* 
    If a model named "User" does not exists in the "models" object, the "model" function from Mongoose
is called to create a new model.
    The newly created model is then assigned to the "User" variable.
*/
 
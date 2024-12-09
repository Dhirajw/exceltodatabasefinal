// const User = require("../models/User");

// exports.updateProfile = async(req,res)=>{
//     try{
//         const {name,bio} = req.body;
//         const user = await User.findByPk(req.user.id);
//         console.log("NAME :" ,name);

//     if(!user){
//         return res.status(404).json({error :"User not found"})
//     }

//     user.name = name ;
//     user.bio = bio;

//     console.log("name :" ,name , "bio:",bio);
//     await user.save();
//     }  
//     catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const User = require("../models/User");

exports.updateProfiles = async (req, res) => {
    try {
        console.log("Authenticated User:", req.user); // Log authenticated user details
        
        const { name, bio } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.bio = bio;

        console.log("Updating User - Name:", name, "Bio:", bio);
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
  {
    return res.status(403).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token,'SECRETKEY');  //process.env.JWT_SECRET)
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// const auth =(req , res ,next)=>{
//     const token = req.header.authorization;
//     console.log(token);
//     if(token){
//         token = token.split(" ")[1];
//         let user = token;
//     } 

//     if(!token) return res.status(403).json({error :"No token Provided"});

//     try{
//         const decoded = jwt.verify(token , 'SECURITYKEY');
//         req.user = decoded;
//         next();
//     }catch(error){
//         res.status(401).json({ error: "Unauthorized" });
//     }
// };

// module.exports = auth;
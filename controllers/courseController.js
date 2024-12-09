const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const { Op } = require("sequelize");
const { paginateAndSort } = require("../utils/pagination");


//create course
exports.CreateCourse = async(req,res)=>{
    try{
        const {title, description, syllabus, startdate, enddate} = req.body;
        console.log(title);
        console.log("Role : ",req.user.role) 
        const existionCourse = Course.findOne({where :{title}})
        // console.log(existionCourse);
        if(!existionCourse){
            return res.status(400).json({message : "Course with same title already exist"});
        }
        
        // const user = await User.findByPk(req.user.id);

        
        // if (!user || user.role !== 'teacher') {
        //   return res.status(403).json({ message: "You do not have the authority to create a course" });
        // }

        const user =await  User.findByPk(req.user.id);
        console.log("demo" ,user.role);
        if(user.role == 'student'){
            return res.status(400).json({message : "You have no Authority to create class"});
        }

        const course = await Course.create({title, description, syllabus, startdate, enddate});
        // console.log('course:',course);
        
        // res.status(201).json({
        //     message: "course created",
        //     course: {title: course.title ,description: course.description}
        // });

        //  // Enroll the creator as the instructor
        const EnrollmentData = await Enrollment.create({ CourseId: course.id, UserId: req.user.id, role: "instructor" });
        console.log('EnrollmentData:',EnrollmentData);
        
        res.status(201).json({ 
          message: "Course created", course: {title: course.title ,description: course.description}
        });

    }catch(error){
        res.status(500).json({error : error.message});
    }
};

//enroll for course
exports.EnrollCourse = async(req,res)=>{
    try{
        const{CourseId , role} = req.body;
        console.log("id1 ==",CourseId);
        const course = await Course.findByPk(CourseId);

        if(!course){
            return res.status(400).json({message : "course not found TRY AGAIN"});
        }
        console.log("id ==",course.id);

        //to check user already enroll or not
        console.log("userid ==",req.user.id);
        const existingEnrollment = await Enrollment.findOne({
          where: {
            courseId: CourseId,
            userId: req.user.id,
            
          },
        });
        
    
        if (existingEnrollment) {
          return res.status(400).json({ message: "You are already enrolled in this course." });
        }

        //Enroll the user
        await Enrollment.create({courseId : CourseId ,userId :req.user.id ,role});
        res.json({message: `Enrolled as ${role}`});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update course
exports.UpdateCourse = async(req,res)=>{
    try{
        const user = await User.findByPk(req.user.id);

        if(!user || user.role !== 'instructor'){
            return res.status(402).json({message : "You have no authorization to update course"});
        }

        const {id} = req.params;
        const course = await Course.findByPk(id);

        if(!course){
            return res.status(404).json({ error: "Course not found"});
        }
    

        const { title, description, syllabus, startDate, endDate } = req.body;
        await course.update({ title, description, syllabus, startDate, endDate });

        res.json({ message: "Course updated successfully", course });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

//list course
exports.listCourses = async (req, res) => {
  try {
    const { page = 1, size = 10, sort = "startDate:asc", search = "" } = req.query;

    // Pagination and sorting setup
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    const [sortBy, sortOrder] = sort.split(":");

    // Define search filter
    const whereCondition = {
      title: { [Op.like]: `%${search}%` },
      isDeleted: false
    };

    // Fetch courses with pagination and sorting
    const { count, rows } = await Course.findAndCountAll({
      where: whereCondition,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Retrive specific course details
exports.getCourseDetails = async (req, res) => {
    try {
      const courseId = req.params.id; // Get the course ID from the route parameter
        console.log(courseId);
      // Fetch the course including related syllabus and enrolled users
      const course = await Course.findOne({
        where: { id: courseId, isDeleted: false },
        attributes: ['id', 'title', 'description', 'syllabus'],
        include: [
          {
            model: User, // For enrolled users, ensure correct model association
            attributes: ['id', 'name', 'email'], // Specify the user attributes you want to return
            through: { attributes: [] }, // For many-to-many relationships, exclude join table data
          },
        ],
      });
  
      // If no course is found, return a 404 status
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Return the course details in the response
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //soft deletion

  exports.deletecourse = async(req,res)=>{
    try{
      const course =await Course.findByPk(req.params.id);
      const user = await User.findByPk(req.user.id);
      if(user.role !== 'instructor'){
        return res.status(403).json({message : 'You have no Authority to delete course'});
      }
      if(!course){
        return res.status(404).json({message : 'course not found'});
      }
      await course.destroy();
      res.status(200).json({ message: 'Course deleted successfully' });
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
  };
  
  //restoration of deleted course
  exports.restorecourse = async(req,res)=>{
    try{
      const Id = await req.params.id;
      const course = await Course.findOne({
      where: {Id },
      paranoid: false
    });
      
      // console.log(course.title);
      if(!course){
        return res.status(400).json({message:'Course not deleted or not found'});
      }
      await course.restore();
      res.status(200).json({ message: 'Course restored successfully' });
    }
    catch(error){
      res.status(500).json( {error: error.message});
    }
  }; 



const User = require("../models/User");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const {sendEmail} = require('../utils/email.js');

exports.createAssignment = async(req,res)=>{
    try{
        const { title,description,deadline ,courseId } = req.body;
        const users = await User.findByPk(req.user.id);

        console.log("user name :",users);
        if(!users || users.role !== 'instructor'){
            return res.status(404).json({message :"You have no authorization to create assignment"});
        }
        const course = await Course.findByPk(courseId);
        if(!course){
            return res.status(404).json({message :"course not found"});
        }
        const assignment = await Assignment.create({title ,description,deadline,courseId});
        res.status(201).json(assignment);
        console.log(`assignment createdsuccessfully `);

            try {
                const students = await course.getUsers();
                const emails = students.map(student => student.email);

                // Send emails asynchronously, do not await if it's non-critical
                emails.forEach(email => {
                    sendEmail(email, 'New Assignment Created', `Assignment "${title}" created for course "${course.title}".`)
                        .then(() => console.log(`Email sent successfully to ${email}`))
                        .catch(emailError => console.error(`Failed to send email to ${email}:`, emailError));
                });
            } catch (emailError) {
                console.error("Failed to notify students via email:", emailError);
                // No response call here; only logging
            }
        //}
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitAssignment = async(req,res)=>{
    try{
        const {fileUrl, studentId, assignmentId} = req.body;

        const users = await User.findByPk(req.user.id);
        if(!users || users.role !== 'instructor'){
            return res.status(404).json({message :"You have no authorization to create assignment"});
        }

        const assignment = await Assignment.findByPk(assignmentId);
        if(!assignment){
            return res.status(404).json({message :"assignment not found"});
        }
        if(new Date() > new Date(assignment.deadline)){
            return res.status(400).json({ message: 'Deadline has passed for this assignment' });
        }
        const submission = await AssignmentSubmission.create({ fileUrl, studentId, assignmentId });
        res.status(201).json(submission);

    }
    catch(error){
        res.status(500).json({error : error.message});
    }
};

exports.gradeAssignment = async(req,res)=>{
    try{
        const { submissionId } = req.params;
        const { grade, feedback } = req.body;

        const submission = await AssignmentSubmission.findByPk(submissionId);
        if (!submission) {
          return res.status(404).json({ message: 'Submission not found' });   //client error
        }

        submission.grade = grade;
        submission.feedback = feedback;
        await submission.save();

        res.status(200).json({ message: 'Submission graded successfully', submission });  //succesfull
    }
    catch(error){
        res.status(500).json({ error: error.message }); //server error
    }
}

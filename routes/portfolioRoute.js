const router = require('express').Router();
const {Intro, About, Project, Contact, Experience, Course} = require('../models/portfolioModel');
const User = require('../models/userModel');

// get all portfolio data
router.get('/get-portfolio-data', async(req,res)=>{
    try{
        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const contacts = await Contact.find();
        const experiences = await Experience.find();
        const courses = await Course.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            projects: projects,
            contact: contacts[0],
            experiences: experiences,
            courses: courses,
        })
    }
    catch (error){
        res.status(500).send(error);
    }
});

// update intro 
router.post('/update-intro', async(req,res)=> {
    try{
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true}
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated successfully"
        });
    }catch(error){
        res.status(500).send(error);
    }
})

// update about 
router.post('/update-about', async(req,res)=> { 
    try{
        const about = await About.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        console.log(about._id);
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated successfully"
        });
    }catch(error){
        console.error("Error in update-about route:", error);
        res.status(500).send(error);
    }
})


// add experience 
router.post('/add-experience', async(req,res)=> { 
    try{
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience updated successfully"
        });
    }catch(error){
        console.error("Error in update-about route:", error);
        res.status(500).send(error);
    }
});

//update-experience 
router.post('/update-experience', async(req,res)=> { 
    try{
        const experience = await Experience.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience updated successfully"
        });
    }catch(error){
        console.error("Error in update-experience route:", error);
        res.status(500).send(error);
    }
})

//delete experience 
router.post('/delete-experience', async(req,res)=> { 
    try{
        const experience = await Experience.findOneAndDelete(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience deleted successfully"
        });
    }catch(error){
        console.error("Error in delete-experience route:", error);
        res.status(500).send(error);
    }
})

//add-project
router.post('/add-project', async(req,res)=> { 
    try{
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Porject updated successfully"
        });
    }catch(error){
        console.error("Error in update-about route:", error);
        res.status(500).send(error);
    }
});

//update project
router.post('/update-project', async(req,res)=> { 
    try{
        const project = await Project.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated successfully"
        });
    }catch(error){
        console.error("Error in update-project route:", error);
        res.status(500).send(error);
    }
})


//delete project
router.post('/delete-project', async(req,res)=> { 
    try{
        const project = await Project.findOneAndDelete(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project deleted successfully"
        });
    }catch(error){
        console.error("Error in delete-project route:", error);
        res.status(500).send(error);
    }
})


//add-course
router.post('/add-course', async(req,res)=> { 
    try{
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: "Course updated successfully"
        });
    }catch(error){
        console.error("Error in update-course route:", error);
        res.status(500).send(error);
    }
});

// update course
router.post('/update-course', async(req,res)=> { 
    try{
        const course = await Course.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Course updated successfully"
        });
    }catch(error){
        console.error("Error in update-course route:", error);
        res.status(500).send(error);
    }
})

//delete course
router.post('/delete-course', async(req,res)=> { 
    try{
        const course = await Course.findOneAndDelete(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Project deleted successfully"
        });
    }catch(error){
        console.error("Error in delete-course route:", error);
        res.status(500).send(error);
    }
})


// update contact 
router.post('/update-contact', async(req,res)=> { 
    try{
        const contact = await Contact.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data: contact,
            success: true,
            message: "Course updated successfully"
        });
    }catch(error){
        console.error("Error in update-course route:", error);
        res.status(500).send(error);
    }
})

router.post('/admin-login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password",
            });
        }
        user.password = undefined;

        return res.status(200).send({
            data: user,
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Error in /admin-login:", error);
        return res.status(500).send({
            success: false,
            message: "Something went wrong. Please try again.",
        });
    }
});

module.exports = router;
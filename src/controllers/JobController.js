const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    async save(req, res){
        //req.body = { name: 'a1', 'daily-hours': '1', 'total-hours': '1' }
        await Job.create(
            {                
                name: req.body.name,
                'daily-hours': req.body["daily-hours"], 
                'total-hours': req.body["total-hours"],
                createdAt: Date.now() // Atribuindo data de hj
            }
        );
        
        return res.redirect('/') 
    },

    async show(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.render('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req, res) {        
        const jobId = req.params.id           
        
        const updatedJob = {            
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }
        
        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {        
        const jobId = req.params.id 

        await Job.delete(jobId)

        return res.redirect('/')
    }
}    
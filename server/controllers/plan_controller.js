const Plan = require("../models/plan_model");

const plans = async(req, res) => {
    try {

        const fetchedPlans = await Plan.find();

        if(!fetchedPlans || fetchedPlans.length === 0) return res.status(200).json({ success: false, message: "NO_PLANS_FOUND" });

        return res.status(200).json({ success: true, plans: fetchedPlans });
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

const addPlan = async(req, res) => {
    try {

        const { name, description, planType, amount, currency, duration, features, isPopular, featurePoints } = req.body;

        if(!name || !description || !planType || !amount || !duration || !featurePoints) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        const newPlan = await Plan.create({ name, description, planType, amount, currency, duration, features: { screenLimit: features.screenLimit }, isPopular, featurePoints });

        if(!newPlan) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        return res.status(200).json({ success: true, message: "PLAN_ADDED" });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "INTERNAL_SERVER_ERROR" });
    }
}

module.exports = {
    plans,
    addPlan,
}
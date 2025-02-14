import mongoose from 'mongoose';
import Subscription from '../models/Subscription.js';
import Magazine from '../models/Magazine.js';
import Plan from '../models/Plan.js';

// Get all active subscriptions for a user
export const getUserSubscriptions = async (req, res) => {
    try {
        const user_id = req.user.id;

        const subscriptions = await Subscription.find({
            user_id,
            is_active: true,
        })
            .populate('magazine_id', 'name') // Populate only 'name' field from Magazine
            .populate('plan_id', 'title discount renewalPeriod') // Populate specific fields from Plan
            .exec(); // Ensure execution
            
        res.json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Subscribe a user to a magazine with a plan
export const subscribeToMagazine = async (req, res) => {
    try {
        // Extract user ID from the authenticated request (set by the protect middleware)
        const user_id = req.user.id;
        const { magazine_id, plan_id } = req.body;

        const magazine = await Magazine.findById(magazine_id);
        const plan = await Plan.findById(plan_id);

        if (!magazine || !plan) {
            return res
                .status(404)
                .json({ message: 'Magazine or Plan not found' });
        }
        let price;

        // Calculate discounted price
        if (plan.discount === 0) {
            price = magazine.base_price;
        } else {
            price = magazine.base_price - magazine.base_price * plan.discount;
        }
        const renewalDate = new Date();
        renewalDate.setMonth(renewalDate.getMonth() + plan.renewalPeriod);

        // Deactivate existing subscription if upgrading
        await Subscription.updateMany(
            { user_id, magazine_id, is_active: true },
            { is_active: false }
        );

        // Create new subscription
        const subscription = new Subscription({
            user_id,
            magazine_id,
            plan_id,
            price,
            renewal_date: renewalDate,
        });

        await subscription.save();

        res.status(201).json({
            message: 'Subscription created successfully',
            subscription,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Cancel a subscription
export const cancelSubscription = async (req, res) => {
    try {
        const { subscriptionId } = req.params;

        const subscription = await Subscription.findById(subscriptionId);
        if (!subscription)
            return res.status(404).json({ message: 'Subscription not found' });

        subscription.is_active = false;
        await subscription.save();

        res.json({ message: 'Subscription canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

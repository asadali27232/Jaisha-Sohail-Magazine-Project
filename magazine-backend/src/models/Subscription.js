import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        magazine_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'magazine',
            required: true,
        },
        plan_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'plans',
            required: true,
        },
        price: Number,
        renewal_date: Date,
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Ensure a user can only have one active subscription per magazine
subscriptionSchema.index(
    { user_id: 1, magazine_id: 1, is_active: 1 },
    { unique: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;

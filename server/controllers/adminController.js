import Admin from '../models/adminModel.js';

// @desc    Verify admin PIN
// @route   POST /api/admin/verify
// @access  Public
export const verifyPin = async (req, res) => {
    try {
        const { pin } = req.body;

        let admin = await Admin.findOne();

        // If no PIN has been set up yet in the database, create a default '123456'
        if (!admin) {
            admin = await Admin.create({ pin: '123456' });
        }

        if (admin.pin === pin) {
            res.json({ success: true, message: 'Authenticated' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid PIN' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update admin PIN
// @route   PUT /api/admin/update
// @access  Public (Should be protected in production)
export const updatePin = async (req, res) => {
    try {
        const { oldPin, newPin } = req.body;
        let admin = await Admin.findOne();

        if (admin && admin.pin === oldPin) {
            admin.pin = newPin;
            await admin.save();
            res.json({ success: true, message: 'PIN updated successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Old PIN' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

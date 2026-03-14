import Admin from '../models/adminModel.js';

// @desc    Verify admin PIN
// @route   POST /api/admin/verify
// @access  Public
export const verifyPin = async (req, res) => {
    try {
        console.log(req.body)
        const { pin } = req.body;

        let admin = await Admin.findOne();

        // If no PIN has been set up yet in the database, create a default '123456'
        if (admin.pin === pin) {
            return res.status(200).json({ success: true, message: 'Authenticated' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid PIN' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = app => {
    app.post('/api/update_profile', async (req, res) => {
        const profileInfo = await req.body;

        req.user.profileInfo =  profileInfo;
        const user = await req.user.save();

        res.send(user);
    });
};
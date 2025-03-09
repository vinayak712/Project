function Signup(req,res) {
    res.send("Signup page");
}
// export default Signup;
function Login(req,res) {
    res.send("Logon page");
}

function Logout(req, res) {
    
        res.send('Logout page')

}
export { Signup, Login, Logout };
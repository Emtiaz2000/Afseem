import jwt from 'jsonwebtoken'

export const verifyStore = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.render('pages/Store/store-login',{error:[{msg:"Please login to Perform this Action!"}]});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // now req.user contains { id, email, role }
        next();
    } catch (err) {
        return res.render('pages/Store/store-login',{error:[{msg:"Please login to Perform this Action!"}]});;
    }
};

export const verifyStoreRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.render('pages/Store/store-login',{error:[{msg:"Please login to Perform this Action!"}]});;
        }else{
            next();
        }
        
    };
};

//prevent customer to go login or registration page while loggedin
export const preventStorePagesForLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
                //console.log(decoded.role==='User')
                if(decoded.role==="Seller"){
                    //console.log('role seller')
                    // ✅ User is logged in, redirect to dashboard/home
                    return res.redirect('/store-dashboard'); 
                }else{
                    next()
                }
            });
        } catch (err) {
            console.log(err)
            // invalid token → clear cookie
            res.clearCookie('token');
        }
    }else{

        next(); // continue to login/register page
    }
};



/* ==== customer jwt set up========= */


export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
     res.cookie("checkouturl",req.originalUrl,{ httpOnly: false,})
     return res.render('pages/Customer/customer-login',{error:[{msg:"Please login to Perform this Action!"}]});
    }
        

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // now req.user contains { id, email, role }
        next();
    } catch (err) {
        return res.render('pages/Customer/customer-login',{error:[{msg:"Please login to Perform this Action!"}]});;
    }
};

export const verifyUserRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            console.log(window.location)
            return
            return res.render('pages/Customer/customer-login',{error:[{msg:"Please login to Perform this Action!"}]});;
        }
        next();
    };
};

//prevent customer to go login or registration page while loggedin
export const preventAuthPagesForLoggedIn = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
                //console.log(err)
                //console.log(decoded.role==='User')
                if(decoded.role==="User"){
                    //console.log('role user')
                    // ✅ User is logged in, redirect to dashboard/home
                    return res.redirect('/'); 
                }else{
                    next()
                }
            }); 
        } catch (err) {
            console.log(err)
            // invalid token → clear cookie
            res.clearCookie('token');
        }
    }else{
        next(); // continue to login/register page
    }
};
//==========admin verification=============
export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.admintoken;
    if (!token) {
        return res.render("pages/Admin/admin-login", {layout:'layouts/admin-layouts'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        //console.log(req.user)
        if (req.user.role !== "ADMIN") {
            return res.render("pages/Admin/admin-login", {layout:'layouts/admin-layouts'});;
        }
        res.locals.user = req.user;
        next();
    } catch (err) {
        req.flash("error_msg",err.message)
        res.redirect('/auth/afseem/admin-login');
    }
};
export const preventAdminAccess = (req, res, next) => {
  const token = req.cookies.admintoken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If already logged in as ADMIN → block this route
      if (decoded.role === "ADMIN") {
        return res.redirect("/admin-dashboard"); // or any page you want
      }

      // If logged in as USER → let them access
      req.user = decoded;
      return next();
    } catch (err) {
      // invalid token, treat as not logged in
      return next();
    }
  }

  // No token → allow access
  next();
};

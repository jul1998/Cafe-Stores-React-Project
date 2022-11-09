import React from "react"

function Signup (){


    return(

        <div className="signup-container">
            <form  action="" method="post">
                <div className="mb-3">
                    <label  for="email" className="form-label">Email address</label>
                    <input name="email" type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input name="password" type="text" class="form-control" id="password"/>
                </div>

                <div className="button">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
            
        </div>

    )
}

export {Signup}
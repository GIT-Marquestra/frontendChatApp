return (
    <div>

      <div id="mySection" className="w-full max-w-md mx-auto px-4 sm:px-0">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg rounded-xl px-6 sm:px-8 pt-6 pb-8 mb-4 w-full">
          <div className="mb-6">
            {inup ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                  Sign In
                </h2>
                <div>
                  <input 
                    className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSignInChange} 
                    type="email" 
                    placeholder="Enter Your Email" 
                    name="email"
                    required
                  /> 
                </div>
                <div>
                  <input 
                    className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSignInChange} 
                    type="password" 
                    placeholder="Enter Your Password" 
                    name="password"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
                  Sign Up
                </h2>
                <div>
                  <input 
                    className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSignUpChange} 
                    type="text" 
                    placeholder="Enter Your Name" 
                    name="username"
                    required
                  />
                </div>
                <div>
                  <input 
                    className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSignUpChange} 
                    type="email" 
                    placeholder="Enter Your Email" 
                    name="email"
                    required
                  /> 
                </div>
                <div>
                  <input 
                    className="w-full px-3 py-2 text-sm sm:text-base bg-white/90 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSignUpChange} 
                    type="password" 
                    placeholder="Enter Your Password" 
                    name="password"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-sm sm:text-base"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
          <div className="text-center">
            <button 
              onClick={toggleInup} 
              className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm"
            >
              {inup ? "Back to Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
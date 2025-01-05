import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Firebase providers for Google
const googleProvider = new GoogleAuthProvider();

const auth = getAuth();

const SocialsLogin = () => {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // This gives you a Google Access Token.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log('Google login success:', user);
        } catch (error) {
            console.error('Error during Google login:', error.message);
        }
    };

    return (
        <div>
            <div className="w-full space-y-2">
                <button className="btn btn-outline btn-info" onClick={handleGoogleLogin}>
                    <FaGoogle /> Login With Google
                </button>
                {/* <button className="btn btn-outline btn-secondary" onClick={handleGitHubLogin}>
                    <FaGithub /> Login With GitHub
                </button> */}
            </div>
        </div>
    );
};

export default SocialsLogin;
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    
    <button type='button' className='px-4 py-1 mb-2 font-medium text-white bg-red-600 border border-red-800 rounded rounded-lg bottom-2 hover:bg-red-800' onClick={handleGoogleClick}>
    <div className="flex items-center justify-center"> {/* Wrap both elements in a flex container */}
        <AiFillGoogleCircle className='w-6 h-9' />
        <p className='ml-2 '>Continue with Google</p> {/* Add margin to create space between the icon and text */}
    </div>
</button>
  )
}
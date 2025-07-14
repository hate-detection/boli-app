'use client'
import { useState } from "react";
import * as React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Image from "next/image";
import logo from "../assets/logo.png"
import Popup from "reactjs-popup";
import { RiCloseLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";
import Link from "next/link";
import { PiSmileySadThin } from "react-icons/pi";
import CircularProgress from '@mui/material/CircularProgress';
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";


export default function Hero() {
    // set states for inference submission button
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(false);

    // set states for feedback submission button
    const [userText, setuserText] = useState('')
    const [pred, setPred] = useState('')
    const [feed, setFeed] = useState('')
    const [feedText, setfeedText] = useState('')
    const [feedRes, setfeedRes] = useState(null)

    // set popup states
    const [popup, setPopup] = useState('')
    const [popupLoad, setPopupLoad] = useState(false);
    const [popupContent, setPopupContent] = useState('initial')

    const [isChecked, setIsChecked] = useState(false)


    // submitData function takes the user's text sends it to
    // the API for inference with POST request
    const submitData = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/predict", {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: {
                'Content-Type': 'application/json',
            },
            });

            const data = await response.json();
            if (data.label === 'NON-HATE') {
                setResponseData('NON-HATE');
                setPred(1);
            } else if (data.label === 'HATE') {
                setResponseData('HATE');
                setPred(0);
            } else {
                setError(true);
                setResponseData(null);
                setPred(null);
            }

            if (!response.ok) {
                throw new Error('Failed to get prediction');
            }
        } catch (err) {
            setLoading(false);
            setError(true);
            setResponseData(null);
            setPred(null);
        } finally {
            setLoading(false);
        }
    };




    // submitFeedback submits user feedback to the API
    // through POST request and updates Popup content
    const submitFeedback = async () => {
        try {
            setPopupLoad(true);
            const response = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify({
                text: userText,
                predicted: pred,
                feedback: feed,
                feedtext: feedText,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            });

            const data = await response.json();
            if (data.message === 'Feedback submitted successfully') {
                return "ok"
            } else {
                return "error"
            }

            if (!response.ok) {
            throw new Error('Failed to submit feedback');
            }
        } catch (err) {
            setPopupLoad(false);
            setPopupContent('error');
        } finally {
            setPopupLoad(false);
        }
        };



    // set text, userText and isSubmit
    function handleChange(e) {
        const newText = e.target.value
        setText(newText);
        setuserText(newText);
        setIsSubmit(newText.trim() !== '');
    }

    // handlePopup and feedback
    function handlePopup(e) {
        if (e === "YES") {
            setFeed(1)
        } else {
            setFeed(0)
        }
        setPopup(e)
    }

    // submitFeedback() if the text is not empty else catch error
    async function handleFeedbackSumit() {
        if (text.trim() !== '') {
            setPopupContent('loading')
            const result = await submitFeedback()
            if (result === "ok") {
                setPopupContent('submitted')
            } else {
                setPopupContent('error')
            }
        } else {
            setPopupContent('error')
        }
    }

    // reset all values when the popup is closed
    function handleReset() {
        setIsSubmit(false)
        setText("")
        setPred("")
        setFeed("")
        setfeedText("")
        setResponseData(null)
        setuserText("")
        setfeedRes(null)
        setPopup("")
        setPopupContent('initial')
        setIsChecked(false)
    }


    const renderContent = () => {
        switch(popupContent) {
            // initial popupContent with the textarea and submit button
            case 'initial':
                return (
                    <>
                        <button
                            className="absolute top-6 right-12 px-2 rounded-full py-2 bg-amber-50 text-black
                            hover:bg-amber-300 hover:text-black hover:cursor-pointer hover:transition hover:duration-300
                            focus:bg-black focus:text-amber-50"
                            onClick={() => setPopup("")}    // close popup on click
                            aria-label="Close Popup"
                        >
                            <RiCloseLine size={20} aria-label="Close Button"/>
                        </button>
                        <h2 className="font-bold text-sm pt-5 pb-3">Do you agree with the label?</h2>
                        <p className="text-sm">You selected: <button className="font-bold text-xs md:text-sm text-amber-300 px-5 py-2.5 ml-2 bg-black border border-black rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)">{feed === 1 ? "YES" : "NO" }</button></p>
                        <h2 className="font-bold text-sm pt-5 pb-3">Please tell us more:</h2>
                        <textarea
                            title="Enter Feedback"
                            rows="4"
                            className="block bg-amber-50 border border-2 border-amber-300 py-8 pr-30 pl-10 w-full text-sm rounded-2xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                            focus:border focus:border-2 focus:border-[#BF0404] focus:shadow-[0px_4px_25px_0px_rgba(191,4,4,0.20)]"
                            type="text"
                            value={feedText}
                            onChange={e => setfeedText(e.target.value)}  // change feedText to user value
                            placeholder="enter feedback"
                        />
                        <button onClick={handleFeedbackSumit} className="font-bold text-sm w-1/3 items-center mt-4 px-6 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)
                        hover:bg-amber-300 hover:text-black hover:border hover:border-2 hover:border-amber-300 hover:cursor-pointer hover:transition hover:duration-300
                        focus:bg-black focus:text-amber-50 focus:border focus:border-2 focus:border-black">
                            SUBMIT
                        </button>
                    </>
                );
                

        // submitted popupContent this renders after a successful submission includes thankyou messages
        case 'submitted':
            return (
                <>
                <div className="flex flex-col items-center justify-center px-5 py-0 md:py-2">
                    <h2 className="font-bold text-md p-2 md:p-5">Thank you for your feedback!</h2>
                    <MdCheck size={120} aria-label="Check Mark Icon" className="bg-[#FFFCED] border border-amber-300 rounded-full p-5 mt-3 mb-2 text-[#BF0404]"/>
                    <p className="text-[0.7rem] mt-8">To know more about how your feedback</p>
                    <p className="text-[0.7rem]">will be used, check out our <Link href="#" className="underline">Privacy Policy</Link>.</p>
                    <button
                        className="font-bold text-sm w-1/3 items-center mt-5 px-5 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                        hover:bg-amber-300 hover:text-black hover:border hover:border-2 hover:border-amber-300 hover:cursor-pointer hover:transition hover:duration-300
                        focus:bg-black focus:text-amber-50 focus:border focus:border-2 focus:border-black"
                        onClick={handleReset} // reset all values while closing
                    >
                        CLOSE
                    </button>
                </div>
                </>
            );


        // error popupContent state, this renders when there's an error, includes error message and reset button
        case 'error':
            return (
                <>
                    <div className="flex flex-col items-center justify-center px-8 py-0 md:py-2">
                        <h2 className="font-bold text-md p-2 md:p-5">Oops an error occured.</h2>
                        <PiSmileySadThin size={120} aria-label="Sad Smiley Face" className="bg-[#FFFCED] border border-amber-300 rounded-full p-5 mt-3 mb-2 text-[#BF0404]"/>
                        <p className="text-[0.7rem] mt-8">There's probably a problem in the backend,</p>
                        <p className="text-[0.7rem]">how about you get a coffee while we fix it.</p>
                        <button
                            className="font-bold text-sm w-1/3 items-center mt-5 px-5 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                            hover:bg-amber-300 hover:text-black hover:border hover:border-2 hover:border-amber-300 hover:cursor-pointer hover:transition hover:duration-300
                            focus:bg-black focus:text-amber-50 focus:border focus:border-2 focus:border-black"
                            onClick={handleReset}
                            tabIndex={0}
                        >
                            CLOSE
                        </button>
                    </div>
                </>
            )

        case 'loading':
            return (
                <>
                    <div className="flex flex-col items-center justify-center px-24 md:px-32 py-20 md:py-20 text-[#BF0404]">
                        <h2 className="text-md font-bold py-10">Submitting</h2>
                        <CircularProgress size={80} color="amber-300" className="my-2"/>
                    </div>
                </>
            )

        default:
            return null
        }
    }

    
    return (
        <div id="hero" className="flex flex-col w-full items-center h-screen justify-start pt-5">
            <Image
            src={logo}
            height={120}
            width={120}
            alt="Logo Image"
            />
            <p className="text-xs text-[#BF0404] p-4">bad and offensive language identification</p>
            <div className="relative w-full px-20">
                <textarea
                    aria-label="Enter Text"
                    rows="4"
                    className="block bg-amber-50 border border-2 border-amber-300 py-8 pr-30 pl-10 mb-2 w-full text-sm rounded-4xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                                focus:border focus:border-2 focus:border-[#BF0404] focus:shadow-[0px_4px_25px_0px_rgba(191,4,4,0.20)]"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="enter text"
                />
                <button
                    aria-label="Submit Text"
                    className="absolute top-6 right-30 px-2 rounded-full py-2 bg-[#F7F2D9] text-zinc-700
                    disabled:bg-[#D7D3BA] disabled:text-zinc-500 disabled:cursor-not-allowed
                    hover:bg-amber-300 hover:text-black hover:cursor-pointer hover:transition hover:duration-300
                    focus:bg-black focus:text-amber-50"
                    onClick={() => {
                        if (text.trim() !== '') {
                            submitData(); // Call submitData only if text is not empty
                        }
                    }}
                    disabled={loading || !isSubmit || !isChecked}
                >
                <IoMdArrowForward size={20} aria-label="Submit Button"/>
                </button>
                <input type="checkbox" name="privacy" 
                checked={isChecked} 
                onChange={() => setIsChecked(prev => !prev)}  
                id="privacyCheckbox"></input>
                <label htmlFor="privacyCheckbox" className="text-[0.6rem] md:text-xs pt-0 md:pt-0.5">I have read the understood the <Link href="#" className="link-underline border border-2 border-transparent focus:border-amber-300">Privacy Policy</Link>.</label>
            </div>

            
            {loading && <div className="flex mt-8 text-[#BF0404]"><p className="text-md md:text-lg px-4">thinking</p><CircularProgress size={30} color="#BF0404" /></div>}
            

            {!loading && error && (
                <div className="flex flex-col px-10 rounded-2xl items-center justify-center bg-amber-50 border border-2 border-red-400 mt-5 text-red-500 p-4">
                    <h2 className="text-md">Something went wrong :(</h2>
                    <p className="text-xs pt-3">there's probably a problem on our end. <br></br>we are working hard to fix it, please try again later.</p>
                </div>
            )}

            <div className="flex mt-4 w-3/4 justify-center">
                {!loading && !error && responseData && (
                    <div className="flex flex-col m-4 justify-center">
                        <div className="flex justify-center">
                            <h2 className="text-md py-2 px-2">Prediction: </h2>
                            <p className={`font-bold py-2 px-4 
                            ${responseData === "NON-HATE" ? 'bg-[#BBDB9A] border border-[#16D546]' : 'bg-[#E6999A] border border-[#EB0E12]'}
                            rounded-lg`}>{responseData}</p>
                        </div>
                        <div className="flex mt-8 justify-center">
                            <h2 className="text-xs md:text-sm py-2 md:py-3 px-2">Do you agree with the label? </h2>
                            <button className="font-bold text-xs md:text-sm px-5 ml-2 bg-amber-50 border border-amber-300 rounded-lg shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                            hover:bg-amber-300 hover:text-black hover:transition hover:duration-300 hover:border hover:border-amber-300 hover:cursor-pointer
                            focus:bg-black focus:text-amber-50 focus:border focus:border-black" 
                            onClick={() => handlePopup("YES")}>YES</button>
                            <button className="font-bold text-xs md:text-sm px-6 ml-2 bg-amber-50 border border-amber-300 rounded-lg shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                            hover:bg-amber-300 hover:text-black hover:transition hover:duration-300 hover:border hover:border-amber-300 hover:cursor-pointer
                            focus:bg-black focus:text-amber-50 focus:border focus:border-black" 
                            onClick={() => handlePopup("NO")}>NO</button>
                            <Popup
                                open={popup !== ""}  // Open popup if value is not empty
                                closeOnDocumentClick={false}
                                onClose={() => setPopup("")}
                                position="right center" modal nested
                            >
                                <motion.div 
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{duration: 0.2}}
                                className="flex flex-col mx-4 justify-start p-15 bg-[#F2EDD0] border border-2 border-amber-300 rounded-4xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]">
                                    {renderContent()}
                                </motion.div>
                            </Popup>
                        </div>
                    </div>
                )}

            <footer className="flex flex-col absolute bottom-20 md:bottom-4 items-center justify-center w-5/6 md:w-2/4 text-black">
                <hr className="h-0.2 w-3/4 bg-[#FCDD81] border border-[#FCDD81] mb-4"></hr>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[0.6rem] md:text-[0.7rem] pb-2">This project is designed and developed for the Masters Thesis Submission 
                    as part of the requirement for the award of MSc Cyber Security at Royal Holloway, University of London.</p>
                    <Link href="#" className="flex items-center font-bold border border-2 border-transparent justify-center link-underline focus:border focus:border-2 focus:border-amber-300"><p className="text-[0.6rem] md:text-[0.7rem] pr-1">Read the thesis</p><MdArrowOutward size={10}/></Link>
                </div>
            </footer>
            </div>
        </div>
    )
}
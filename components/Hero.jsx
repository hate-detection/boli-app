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

    const [ageChecked, setAgeChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [consentChecked, setConsentChecked] = useState(false);
    // set states for feedback submission button
    const [userText, setuserText] = useState('')
    const [pred, setPred] = useState('')
    const [feed, setFeed] = useState('')
    const [feedText, setfeedText] = useState('')
    const [feedRes, setfeedRes] = useState(null)

    // set popup states
    const [popup, setPopup] = useState('')
    const [popupLoad, setPopupLoad] = useState(false);
    const [popupContent, setPopupContent] = useState('privacy')

    const [isChecked, setIsChecked] = useState(false)

    const [secretToken, setSecretToken] = useState(null)
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

            const secretHeader = response.headers.get('x-secret-token');
            if (secretHeader) {
                setSecretToken(secretHeader);
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
                'x-secret-token': secretToken || '',
            },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            if (data.message === 'Feedback submitted successfully') {
                return "ok"
            } else {
                return "error"
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
        setAgeChecked(false)
        setPrivacyChecked(false)
        setConsentChecked(false)
    }


    const renderContent = () => {
        switch(popupContent) {
            case 'privacy':
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
                        <div className="overflow-y-scroll w-[15rem] md:w-[22rem] h-[18rem]">
                            <h2 className="font-bold text-lg pt-5 pb-3">Privacy Policy: TL;DR</h2>
                            <p className="text-sm">We have created a policy that's actually readable and not filled with legal jargon. We urge you to read it in full, it's super simple, we promise. However, if you are short on time, read this even simpler version.
                            <br></br><br></br>
                            <Link href="/privacy-policy" className="link-underline font-bold" target="_blank">Read the detailed Privacy Policy</Link>.
                            <br></br><br></br>
                            This privacy statement ("Privacy Policy") covers all websites (such as www.bolii.xyz) owned and operated by BOLI ("We", "Us", "Our") and all associated services.
                            <br></br><br></br>
                            We use information you share with us for our internal business purposes. We do not sell your information. This notice tells you what information we collect, how we use it and the steps we take to protect and secure it.</p>

                            <h3 className="font-bold text-md py-3">What data do we collect? How do we collect it?</h3>
                            <h4 className="text-sm text-gray-600 pb-3">Information we automatically collect.</h4>
                            <ul className="text-sm list-disc pl-5" role="list">
                                <li className="list-disc">Information such as browser type, language preferences, referring site are automatically sent by your browser. We do not store this.</li>
                                <li className="list-disc">IP Addresses for rate limiting. Automatically removed as soon as the rate-limiting time frame expires.</li>
                            </ul>
                            <br></br>
                            <p className="italic font-bold text-xs bg-yellow-300">The following subsection is identical in both Privacy Policy: TL;DR and Privacy Policy: Full since we would like you to have complete information and make an informed choice.</p>
                            <h4 className="text-sm text-gray-600 py-3">Information you provide by using our service.</h4>
                            <p className="text-sm"><span className="font-bold">Prediction Text Box.</span><br></br><br></br>
The primary (and only) goal of our website is to let you access the Machine Learning model in the backend for Sentiment Analysis and Hate Speech detection. The data you enter in the <span className="font-bold">Prediction Text Box</span> is passed to the model. This model has been pre-trained on publicly available data to recognise hate speech patterns. The model analyses the text you provide and predicts a label.<br></br><br></br>
<span className="italic font-bold">A note on the model's predictions:</span> Machine Learning is, at its core, just a measure of probability and likelihood. When the model analyses a piece of text, it determines the <span className="italic font-bold">likelihood</span> of this text being hate or non-hate based on previously learned identifiers. Thus, the predicted labels are <span className="font-bold">not</span> the sole absolute truth. Consequently, the model's predictions <span className="font-bold">cannot</span> be used against a person or an entity.</p>
                            <br></br>
                            <p className="text-sm"><span className="font-bold">Feedback Text Box.</span><br></br><br></br>
                            If you do not agree with the predicted label, you may provide us with your feedback. We value the feedback you provide and may use it to improve our model's performance. Providing feedback is <span className="font-bold">strictly optional</span>. The text you enter in the <span className="font-bold">Prediction Text Box</span> will be stored <span className="font-bold">only</span> if you choose to provide us with any feedback. This feedback is collected in two stages.</p>
                            <br></br>
                            <ol className="list-decimal pl-10 text-sm" role="list">
                                <li>You may click the "Yes" or "No" button. This is stored as an anonymized numeric value (1 or 0) to evaluate model accuracy. </li>
                                <li>You may enter your feedback in the <span className="font-bold">Feedback Text Box</span>. We store this feedback for <span className="font-bold">90 days</span> to analyse and enhance model performance. Please <span className="font-bold">do not include</span> any personal information in this text box. If you believe you have entered sensitive data by mistake, contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>. We will delete the data within 30 days of receiving your request. Otherwise, all feedback data is automatically deleted after 90 days and is accessible only to authorized administrators.</li>
                            </ol>

                            <h3 className="font-bold text-md py-3">How will we use your data?</h3>
                            <ul className="text-sm list-disc pl-5" role="list">
                                <li>To understand the model's shortcomings in label prediction.</li>
                                <li>To annotate the data.</li>
                                <li>To clean and tokenize the data for further model training.</li>
                            </ul>

                            <h3 className="font-bold text-md py-3">How do we store your data?</h3>
                            <p className="text-sm">We store the data in a PostgreSQL database at Supabase. Read the <Link href="https://supabase.com/privacy" target="_blank" className="font-bold link-underline">Supabase Privacy Policy</Link>. 
                            Data from <span className="font-bold">Prediction Text Box</span> is deleted after 180 days while data from the <span className="font-bold">Feedback Text Box</span> is deleted after 90 days. If you wish to request deletion of your data, contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link> and we will delete your data within 30 days from 
                                the date of request.</p>
                            <br></br>
                            <p className="text-sm">Before storage we will:</p><br></br>
                            <ul className="text-sm list-disc pl-5" role="list">
                                <li>Apply anonymisation and pseudonymisation techniques.</li>
                                <li>Tokenize the data for the BERT-based Machine Learning model.</li>
                            </ul>

                            <h3 className="font-bold text-md py-3">Cookies.</h3>
                            <p className="text-sm">Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information.</p>

                            <h3 className="font-bold text-md py-3">How do we use cookies?</h3>
                            <p className="text-sm">We use cookies for:</p><br></br>
                            <ol className="list-decimal pl-10 text-sm" role="list">
                                <li>Implementing security mechanisms.</li>
                                <li>Improving your website browsing experience.</li>
                            </ol>

                            <h3 className="font-bold text-md py-3">What types of cookies do we use?</h3>
                            <p className="text-sm">We use a Secret Token based purely on mathematical calculations. This token <span className="font-bold">does not</span> store any user-specific or personally identifiable information.</p>

                            <h3 className="font-bold text-md py-3">Age Limits and Children's data.</h3>
                            <p className="text-sm">Our services are <span className="font-bold">not</span> intended to be used by individuals <span className="font-bold">below 18 years of age</span>. If you believe your child may have used this service, contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link> and we will delete all data 
                            pertaining to your child within 30 days from the date of request.</p>

                            <h3 className="font-bold text-md py-3">Confidentiality and Security.</h3>
                            <p className="text-sm">If we learn of a system security breach, we will notify all users via a public announcement. Depending on where you live, you may have a legal right to receive notice of a security breach in writing. 
                                To receive free written notice, you can contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>.</p>

                            <h3 className="font-bold text-md py-3">Changes to our privacy policy.</h3>
                            <p className="text-sm">BOLI keeps its privacy policy under regular review and places any updates on this web page. 
                                This privacy policy was last updated on 21 July 2025.</p>

                            <h3 className="font-bold text-md py-3">Consent.</h3>
                            <input type="checkbox" name="age" 
                                checked={ageChecked} 
                                onChange={() => setAgeChecked(prev => !prev)}  
                                id="ageCheckbox"></input>
                            <label htmlFor="ageCheckbox" className="text-xs pt-0 md:pt-0.5"><span className="font-bold">I confirm</span> that I am above 18 years of age.</label>
                            <input type="checkbox" name="age" 
                                checked={privacyChecked} 
                                onChange={() => setPrivacyChecked(prev => !prev)}  
                                id="privCheckbox"></input>
                            <label htmlFor="privCheckbox" className="text-xs pt-0 md:pt-0.5"><span className="font-bold">I confirm</span> that I have read and understood the Privacy Policy.</label>
                            <input type="checkbox" name="age" 
                                checked={consentChecked} 
                                onChange={() => setConsentChecked(prev => !prev)}  
                                id="consentCheckbox"></input>
                            <label htmlFor="consentCheckbox" className="text-xs pt-0 md:pt-0.5"><span className="font-bold">I consent</span> to the storage and processing of the data provided in the <span className="font-bold">Prediction Text Box</span> and the <span className="font-bold">Feedback Text Box</span>.</label>
                        </div>
                        <button onClick={() => setPopupContent('initial')} className="font-bold text-sm w-1/3 items-center mt-4 px-4 md:px-6 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)
                        hover:bg-amber-300 hover:text-black hover:border hover:border-2 hover:border-amber-300 hover:cursor-pointer hover:transition hover:duration-300
                        focus:bg-black focus:text-amber-50 focus:border focus:border-2 focus:border-black
                        disabled:bg-[#D7D3BA] disabled:border-2 disabled:border-[#D7D3BA] disabled:text-zinc-500 disabled:cursor-not-allowed"
                        disabled={!ageChecked || !privacyChecked || !consentChecked}>
                            I AGREE
                        </button>
                    </>
                )
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
                        <button onClick={handleFeedbackSumit} className="font-bold text-sm w-1/3 items-center mt-4 px-4 md:px-6 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)
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
                            className="font-bold text-sm w-1/3 items-center mt-5 px-4 md:px-5 py-3 bg-amber-50 border border-2 border-amber-300 rounded-xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
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
        <div id="hero" className="flex flex-col w-full items-center h-screen justify-start pt-6 md:pt-10">
            <Image
            src={logo}
            height={120}
            width={120}
            alt="Logo Image"
            />
            <p className="text-xs text-[#BF0404] p-4">bad and offensive language identification</p>
            <div className="relative w-full px-5 md:px-20">
                <textarea
                    aria-label="Enter Text"
                    rows="3.5"
                    className="block bg-amber-50 border border-2 border-amber-300 py-8 pr-20 md:pr-30 pl-10 md:pl-10 mb-2 w-full text-sm rounded-4xl shadow-[0px_4px_25px_0px_rgba(242,205,92,0.20)]
                                focus:border focus:border-2 focus:border-[#BF0404] focus:shadow-[0px_4px_25px_0px_rgba(191,4,4,0.20)]"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="enter text"
                />
                <button
                    aria-label="Submit Text"
                    className="absolute top-6 right-10 md:top-6 md:right-30 px-2 rounded-full py-2 bg-[#F7F2D9] text-zinc-700
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
                <label htmlFor="privacyCheckbox" className="text-[0.6rem] md:text-xs pt-0 md:pt-0.5">I have read the understood the <Link href="/privacy-policy" className="link-underline border border-2 border-transparent focus:border-amber-300 font-bold">Privacy Policy</Link>.</label>
            </div>

            
            {loading && <div className="flex mt-8 text-[#BF0404]"><p className="text-md md:text-lg px-4">thinking</p><CircularProgress size={30} color="#BF0404" /></div>}
            

            {!loading && error && (
                <div className="flex flex-col px-10 rounded-2xl items-center justify-center bg-amber-50 border border-2 border-red-400 mt-5 text-red-500 p-4">
                    <h2 className="text-md">Something went wrong :(</h2>
                    <p className="text-xs pt-3">there's probably a problem on our end. <br></br>we are working hard to fix it, please try again later.</p>
                </div>
            )}

            <div className="flex mt-5 md:mt-4 w-full md: w-3/4 justify-center">
                {!loading && !error && responseData && (
                    <div className="flex flex-col m-0 md:m-4 justify-center">
                        <div className="flex justify-center">
                            <h2 className="text-sm md:text-md py-2 px-2">Prediction: </h2>
                            <p className={`font-bold text-xs md:text-[1rem] py-2 px-4 
                            ${responseData === "NON-HATE" ? 'bg-[#BBDB9A] border border-[#16D546]' : 'bg-[#E6999A] border border-[#EB0E12]'}
                            rounded-lg`}>{responseData}</p>
                        </div>
                        <div className="flex mt-5 md:mt-8 justify-center">
                            <h2 className="text-xs md:text-sm py-1 md:py-3 px-2">Do you agree with the label? </h2>
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

            <footer className="flex flex-col absolute bottom-6 md:bottom-4 items-center justify-center w-5/6 md:w-2/4 text-black">
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
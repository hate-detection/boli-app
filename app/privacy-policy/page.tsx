import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <main className="flex flex-col h-full w-full items-start justify-center pl-20 md:pl-58 z-10">        
        <div className="flex flex-col w-4/5 md:w-2/3 items-start justify-center pt-40">
            <h1 className="text-4xl font-bold pb-10" id="privacy-full">Privacy Policy</h1>
            <p className="text-md">
                We have created a policy that's actually readable and not filled with legal jargon. 
                We urge you to read it in full, it's super simple, we promise. 
                However, if you are short on time, read the even simpler version.
                <br></br><br></br>
                <Link href="#privacy-small" className="link-underline font-bold">Read the Privacy Policy: TL;DR</Link>.
                <br></br><br></br>
                This privacy statement ("Privacy Policy") covers all websites (such as www.bolii.xyz) owned and operated 
                by BOLI ("We", "Us", "Our") and all associated services.
                <br></br><br></br>
                We use information you share with us for our internal business purposes. We do not sell your information. 
                This notice tells you what information we collect, how we use it and the steps we take to protect and secure it.
            </p>

            <h4 className="text-xl font-bold py-5">Contents:</h4>
            <ul className="list-disc pl-10 text-md">
                <li><Link href="#what-data" className="link-underline">What data do we collect? How do we collect it?</Link></li>
                <li><Link href="#data-usage" className="link-underline">How will we use your data?</Link></li>
                <li><Link href="#data-storage" className="link-underline">How do we store your data?</Link></li>
                <li><Link href="#cookies" className="link-underline">Cookies.</Link></li>
                <li><Link href="#cookie-usage" className="link-underline">How do we use cookies?</Link></li>
                <li><Link href="#types-of-cookies" className="link-underline">What types of cookies do we use?</Link></li>
                <li><Link href="#age-limits" className="link-underline">Age Limits and Children's Data.</Link></li>
                <li><Link href="#confidentiality" className="link-underline">Confidentiality and Security.</Link></li>
                <li><Link href="#policy-changes" className="link-underline">Changes to our privacy policy.</Link></li>
            </ul>

            <h2 className="text-xl font-bold pt-8 pb-5" id="what-data">What data do we collect? How do we collect it?</h2>
            <h3 className="text-lg text-gray-600 pb-5">Information we automatically collect.</h3>
            <p className="text-sm pb-5"><span className="font-bold">Non-personally-identifying.</span><br></br><br></br>
                Some essential information such as browser type, language preferences and referring site is automatically sent by your browser 
                when you visit our website. We <span className="font-bold">do not</span> store or process this data.
            </p>
            <p className="text-sm"><span className="font-bold">Personally identifying.</span><br></br><br></br>
                To protect our site from abuse such as Denial of Service (DoS) attacks, we implement rate limiting mechanisms. 
                These mechanisms temporarily collect personally identifying information i.e. <span className="font-bold">your IP Address</span>, 
                to prevent you from making too many requests in a given time-frame. Your IP Address is automatically deleted the moment 
                this time-frame expires.<br></br><br></br>
                We <span className="font-bold">do not</span> use IP Addresses to track users beyond this scope.
            </p>

            <h3 className="text-lg text-gray-600 py-5">Information you provide by using our service.</h3>
            <p className="text-sm pb-5"><span className="font-bold">Prediction Text Box.</span><br></br><br></br>
                The primary (and only) goal of our website is to let you access the Machine Learning model in the backend for Sentiment Analysis 
                and Hate Speech detection. The data you enter in the <span className="font-bold">Prediction Text Box</span> is passed to the model. 
                This model has been pre-trained on publicly available data to recognise hate speech patterns. The model analyses the text you 
                provide and predicts a label. 
                <br></br><br></br>
                <span className="font-bold italic">A note on the model's predictions:</span> Machine Learning is, at its core, just a measure of 
                probability and likelihood. When the model analyses a piece of text, it determines the 
                <span className="font-bold italic"> likelihood</span> of this text being hate or non-hate based on previously learned identifiers. 
                Thus, the predicted labels are <span className="font-bold">not</span> the sole absolute truth. Consequently, the model's 
                predictions <span className="font-bold">cannot</span> be used against a person or an entity.
            </p>
            <br></br><br></br>
            <p className="text-sm pb-5"><span className="font-bold">Feedback Text Box.</span><br></br><br></br>
                If you do not agree with the predicted label, you may provide us with your feedback. We value the feedback you provide and may 
                use it to improve our model's performance. Providing feedback is <span className="font-bold">strictly optional</span>.
                The text you enter in the <span className="font-bold">Prediction Text Box</span> will be stored only if you choose to provide us 
                with any feedback. This feedback is collected in two stages.
            </p>
            <ol className="list-decimal pl-10 text-sm" role="list">
                <li>You may click the "Yes" or "No" button. This is stored as an anonymized numeric value (1 or 0) to evaluate model 
                    accuracy.</li>
                <li>You may enter your feedback in the <span className="font-bold">Feedback Text Box</span>. We store this feedback 
                    for <span className="font-bold">90 days</span> to analyse and enhance model's performance. Please <span
                    className="font-bold">do not include</span> any personal information in this text box. If you believe you have 
                    entered sensitive data by mistake, contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold"
                    target="_blank">boli-app@proton.me</Link>. We will delete the data within 30 days of receiving your 
                    request. Otherwise, all feedback data is automatically deleted after 90 days and is accessible only to authorized 
                    administrators.</li>
            </ol>

            <h2 className="text-xl font-bold pt-8 py-5" id="data-usage">How will we use your data?</h2>
            <p className="text-sm">We use your data for the sole reason of improving the model's performance. The data you provide in 
                the <span className="font-bold">Prediction Text Box</span> and the <span className="font-bold">Feedback Text Box
                </span> will be used to:
                <br></br><br></br>
            </p>
            <ul className="text-sm list-disc pl-10">
                <li>Understand the model's shortcomings in label prediction.</li>
                <li>Annotate the data.</li>
                <li>Clean and tokenize the data for further model training.</li>
            </ul>

            <h2 className="text-xl font-bold pt-8 py-5" id="data-storage">How do we store your data?</h2>
            <p className="text-sm">BOLI stores your data in a PostgreSQL database hosted at Supabase. Please refer to <Link 
                href="https://supabase.com/privacy" className="link-underline font-bold" target="_blank">Supabase Privacy Policy</Link> for 
                Supabase specific information.
                <br></br><br></br>
                Before storage, we apply <span className="font-bold">data sanitization and pseudonymization techniques</span> to remove 
                identifiable information such as: emails, usernames, URLs, and other identifiers. We also tokenize the data for further 
                anonymisation. 
                <br></br><br></br>
                Tokenization is the process of turning raw data into integers (e.g. 12 for "the"). Tokenization for BERT-based models ensures 
                anonymity since the same word is tokenized as different integers based on the context. The raw data collected from the  
                <span className="font-bold"> Prediction Text Box</span> is deleted after <span className="font-bold">180 days</span> from the date of collection.
                <br></br><br></br>
                We <span className="font-bold">do not</span> associate the text or the feedback with your IP Address and/or session. 
            </p>

            <h2 className="text-xl font-bold pt-8 py-5" id="cookies">Cookies.</h2>
            <p className="text-sm">Cookies are text files placed on your computer to collect standard Internet log information and visitor 
                behavior information. When you visit our website, we may collect information from you automatically through cookies or 
                similar technology.
                <br></br><br></br>
                For further information, visit <Link href="https://allaboutcookies.org/" className="link-underline font-bold" target="_blank">
                allaboutcookies.org</Link>.
            </p>

            <h2 className="text-xl font-bold pt-8 py-5" id="cookie-usage">How do we use cookies?</h2>
            <p className="text-sm">We use cookies for:<br></br><br></br></p>
            <ul className="list-disc pl-10 text-sm">
                <li>Implementing security mechanisms.</li>
                <li>Improving your website browsing experience.<br></br><br></br></li>
            </ul>
            <p className="text-sm">We <span className="font-bold">do not</span> use cookies for:<br></br><br></br></p>
            <ul className="text-sm list-disc pl-10">
                <li>Advertising or analytics purposes.</li>
                <li>Store personally identifying information.</li>
            </ul>

            <h2 className="text-xl font-bold pt-8 py-5" id="types-of-cookies">What types of cookies do we use?</h2>
            <p className="text-sm">We use a Secret Token to ensure any malicious entity cannot tamper with the feedback submission mechanism. 
                This Secret Token is based purely on mathematical calculations and <span className="font-bold">does not</span> store 
                any user-specific or personally identifiable information.
            </p>

            <h2 className="text-xl font-bold pt-8 py-5" id="age-limits">Age Limits and Children's Data.</h2>
            <p className="text-sm">Our services are <span className="font-bold">not</span> intended to be used by <span className="font-bold">
                individuals below 18 years of age.</span> If you are a parent and believe your child may have used our services, contact us 
                at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>. 
                After confirming your identity, we will delete all information pertaining to your child within 30 days of 
                receiving the request.
            </p>

            <h2 className="text-xl font-bold pt-8 py-5" id="confidentiality">Confidentiality and Security.</h2>
            <p className="text-sm">No data transmission over the Internet can ever be guaranteed to be 100% secure. You use this service at 
            your own risk. However, we do take steps to ensure security on our systems.
            <br></br><br></br>
                If we learn of a system security breach, we will notify all users via a public announcement. Depending on where you live, 
                you may have a legal right to receive notice of a security breach in writing. To receive free written notice, you should 
                contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>.
            </p>

            <h2 className="text-xl font-bold pt-8 py-5" id="policy-changes">Changes to our privacy policy.</h2>
            <p className="text-sm">BOLI keeps its privacy policy under regular review and places any updates on this web page. 
                This privacy policy was last updated on 21 July 2025.</p>
        </div>

        {/*TL;DR*/}
        <div className="flex flex-col w-4/5 md:w-2/3 items-start justify-center py-20">
            <h1 className="text-4xl font-bold pb-10" id="privacy-small">Privacy Policy: TL;DR</h1>
            <p className="text-md">We have created a policy that's actually readable and not filled with legal jargon. We urge you to read 
                it in full, it's super simple, we promise. However, if you are short on time, read this even simpler version.
                <br></br><br></br>
                <Link href="#privacy-full" className="link-underline font-bold">Read the detailed Privacy Policy</Link>.
                <br></br><br></br>
                This privacy statement ("Privacy Policy") covers all websites (such as www.bolii.xyz) owned and operated by BOLI ("We", "Us", 
                "Our") and all associated services.
                <br></br><br></br>
                We use information you share with us for our internal business purposes. We do not sell your information. This notice tells 
                you what information we collect, how we use it and the steps we take to protect and secure it.</p>
            
            <h2 className="font-bold text-xl py-5">What data do we collect? How do we collect it?</h2>
            <h3 className="text-lg text-gray-600 pb-3">Information we automatically collect.</h3>
            <ul className="text-sm list-disc pl-10" role="list">
                <li className="list-disc">Information such as browser type, language preferences, referring site are automatically sent by your 
                browser. We <span className="font-bold">do not</span> store this.</li>
                <li className="list-disc">IP Addresses for rate limiting. Automatically removed as soon as the rate-limiting time frame 
                expires.</li>
            </ul>
            <br></br>

            <p className="italic font-bold text-sm bg-yellow-300 mt-5">The following subsection is identical in both Privacy Policy: TL;DR and 
                Privacy Policy: Full since we would like you to have complete information and make an informed choice.</p>

            <h3 className="text-lg text-gray-600 py-5">Information you provide by using our service.</h3>
            <p className="text-sm pb-5"><span className="font-bold">Prediction Text Box.</span><br></br><br></br>
                The primary (and only) goal of our website is to let you access the Machine Learning model in the backend for Sentiment Analysis 
                and Hate Speech detection. The data you enter in the <span className="font-bold">Prediction Text Box</span> is passed to the model. 
                This model has been pre-trained on publicly available data to recognise hate speech patterns. The model analyses the text you 
                provide and predicts a label. 
                <br></br><br></br>
                <span className="font-bold italic">A note on the model's predictions:</span> Machine Learning is, at its core, just a measure of 
                probability and likelihood. When the model analyses a piece of text, it determines the <span
                className="font-bold italic">likelihood</span> of this text being hate or non-hate based on previously learned identifiers. 
                Thus, the predicted labels are <span className="font-bold">not</span> the sole absolute truth. Consequently, the model's 
                predictions <span className="font-bold">cannot</span> be used against a person or an entity.
            </p>
            <br></br><br></br>
            <p className="text-sm pb-5"><span className="font-bold">Feedback Text Box.</span><br></br><br></br>
                If you do not agree with the predicted label, you may provide us with your feedback. We value the feedback you provide and may 
                use it to improve our model's performance. Providing feedback is <span className="font-bold">strictly optional</span>. 
                The text you enter in the <span className="font-bold">Prediction Text Box</span> will be stored only if you choose to provide us 
                with any feedback. This feedback is collected in two stages.
            </p>
            <ol className="list-decimal pl-10 text-sm" role="list">
                <li>You may click the "Yes" or "No" button. This is stored as an anonymized numeric value (1 or 0) to evaluate model 
                    accuracy.</li>
                <li>You may enter your feedback in the <span className="font-bold">Feedback Text Box</span>. We store this feedback 
                    for <span className="font-bold">90 days</span> to analyse and enhance model's performance. Please <span className="font-bold">
                    do not include</span> any personal information in this text box. If you believe you have entered sensitive data by mistake, 
                    contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>. 
                    We will delete the data within 30 days of receiving your request. 
                    Otherwise, all feedback data is automatically deleted after 90 days and is accessible only to authorized 
                    administrators.</li>
            </ol>

            <h2 className="font-bold text-xl py-5">How do we store your data?</h2>
            <p className="text-sm">We store the data in a PostgreSQL database at Supabase. Read the <Link href="https://supabase.com/privacy" 
                target="_blank" className="font-bold link-underline">Supabase Privacy Policy</Link>. 
                Data from <span className="font-bold">Prediction Text Box</span> is deleted after <span className="font-bold">180 days</span> while data from the <span 
                className="font-bold">Feedback Text Box</span> is deleted after <span className="font-bold">90 days</span>. If you wish to request deletion of your data, contact us 
                at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link> and 
                we will delete your data within 30 days from the date of request.
                <br></br><br></br>
            </p>
            <p className="text-sm">Before storage we will:<br></br><br></br></p>
            <ul className="text-sm list-disc pl-10" role="list">
                <li>Apply anonymisation and pseudonymisation techniques.</li>
                <li>Tokenize the data for the BERT-based Machine Learning model.</li>
            </ul>

            <h2 className="font-bold text-xl py-5">Cookies.</h2>
            <p className="text-sm">Cookies are text files placed on your computer to collect standard Internet log information and visitor 
                behavior information.
            </p>

            <h2 className="font-bold text-xl py-5">How do we use cookies?</h2>
            <p className="text-sm">We use cookies for:<br></br><br></br></p>
            <ol className="list-decimal pl-10 text-sm" role="list">
                <li>Implementing security mechanisms.</li>
                <li>Improving your website browsing experience.</li>
            </ol>

            <h2 className="font-bold text-xl py-5">What types of cookies do we use?</h2>
            <p className="text-sm">We use a Secret Token based purely on mathematical calculations. This token <span className="font-bold">
                does not</span> store any user-specific or personally identifiable information.</p>

            <h2 className="font-bold text-xl py-5">Age Limits and Children's data.</h2>
            <p className="text-sm">Our services are <span className="font-bold">not</span> intended to be used by individuals <span className="font-bold">below 18 years of age</span>. If you believe your child may have used this service, contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link> and we will delete all data 
            pertaining to your child within 30 days from the date of request.</p>

            <h2 className="font-bold text-xl py-5">Confidentiality and Security.</h2>
            <p className="text-sm">If we learn of a system security breach, we will notify all users via a public announcement. Depending on 
                where you live, you may have a legal right to receive notice of a security breach in writing. 
                To receive free written notice, you can contact us at <Link href="mailto:boli-app@proton.me" className="link-underline font-bold" target="_blank">boli-app@proton.me</Link>.</p>

            <h2 className="font-bold text-xl py-5">Changes to our privacy policy.</h2>
            <p className="text-sm">BOLI keeps its privacy policy under regular review and places any updates on this web page. 
                This privacy policy was last updated on 21 July 2025.</p>
        </div>
      </main>
    </>
  );
}

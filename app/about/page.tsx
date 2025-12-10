import Image from "next/image";
import React from "react";
import illus  from "../../assets/venom-illus.png";
import Link from "next/link";

export default function About() {
  return (
    <>
      <main className="flex flex-col h-full w-full items-start justify-center pl-20 md:pl-58 z-10">
        <div className="flex flex-col w-4/5 md:w-2/3 items-start justify-center pt-40">
          <h1 className="text-4xl font-bold">About</h1>
          <p className="text-md pt-5">
            It wouldn't be a stretch to say that social media has revolutionised communication. At the same time, however,
            these platforms have given rise to another, sinister phenomenon, namely: hate speech and online abuse.
          </p>
          <figure className="flex flex-col items-center justify-center pb-5">
            <Image 
            src={illus}
            alt="Illustration of a venomous demon pouring out of a smartphone"
            width={800}
            height={800}
            priority={true}
            placeholder="empty"
            quality={100}
            className="mt-10 rounded-xl pb-2"
            />
            <figcaption className="text-xs italic">A venomous demon pours out of a smartphone.</figcaption>
          </figure>
          <p className="text-md py-5">Online hate speech and digital abuse snatches away a person's right to dignity and scars them
            for the rest of their lives. As multiple documented instances prove, hate speech often culminates into real-life violence.
          </p>

          <h4 className="text-xl font-bold py-5">Detecting hateful <span className="italic">Boli</span></h4>
          <p className="text-md pb-5">Given the unprecedented rise of social media usage in India, there is an urgent need to develop solutions 
          for identifying and curbing hate speech. <span className="italic">Boli</span> (<span className="font-bold">बोली</span>, trans:speech)
          is an attempt towards the same. <span className="italic">Boli</span> utilises Machine Learning to perform Sentiment Analysis on Hinglish 
          text. Sentiment Analysis (as the name suggests) detects the <span className="italic">sentiment</span> of a given text, in our case:
          whether the text is hateful.
          <br></br>
          <br></br>
          If you are interested in the more technical aspects of <span className="italic">Boli</span>, check out the <Link className="font-bold 
          link-underline" href="https://github.com/hate-detection/" target="_blank">source code</Link> or <Link className="font-bold link-underline"
          href="https://doi.org/10.13140/RG.2.2.11381.44004" target="_blank">Read the Thesis</Link>.
          <br></br>
          <br></br>
          <span className="italic">Boli</span> is also accessible via an API. <Link className="font-bold link-underline" href="https://boli.gitbook.io/api" target="_blank">Read the docs
          </Link> to know more about how to get predictions via the API.
          </p> 

          <h4 className="text-xl font-bold py-5">Limitations</h4>
          <p className="text-md pb-5">As with many things in life, <span className="italic">Boli</span> too, is not perfect. Machine Learning builds
          upon complex statistical notions. However, at the end of the day, the labels <span className="italic">Boli</span> predicts, are simply a 
          measure of <span className="italic font-bold">likelihood</span> and <span className="italic font-bold">probability</span>. Therefore, <span
          className="italic">Boli</span> cannot be treated as the gospel truth.
          <br></br>
          <br></br>
          Moreover, <span className="italic">Boli</span> is only trained on textual data. Visual hate speech such as: hateful memes, abusive songs and
          videos or even highly contextual hate speech is not detectable by <span className="italic">Boli</span>. 
          <br></br>
          <br></br>
          India is a diverse nation and there are hundreds of languages in existence. <span className="italic">Boli</span> can only deal with Hindi,
          English and Urdu (to some extent). Hate speech and digital abuse in other Indian languages are not detectable by <span className="italic">
          Boli</span>.
          </p>

          <h4 className="text-xl font-bold py-5">Conclusion and Future Plans</h4>
          <p className="text-md pb-30">The primary purpose behind <span className="italic">Boli</span> is to provide end-users with an accessible
          and fast interface for identifying Hate-Speech. We hope <span className="italic">Boli</span> helps in making internet a safer place to be.
          If you use <span className="italic">Boli</span> and have any feedback/suggestions/complaints to share, write to us at <Link href="mailto:boli
          -app@proton.me" className="font-bold link-underline">boli-app@proton.me</Link>. We hope to hear from you soon.
          <br></br>
          <br></br>
          We aim to expand <span className="italic">Boli's</span> capabilities and enhance its accuracy in detecting hate-speech. Any major future 
          improvements will be mentioned in this page. Keep an eye out! 
          </p>
        </div>
      </main>
    </>
  );
}

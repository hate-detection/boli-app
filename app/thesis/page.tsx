import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function Thesis() {
    return (
        <>
            <main className="flex flex-col h-full w-full items-start justify-center pl-20 md:pl-58 z-10">
                <div className="flex flex-col w-4/5 md:w-2/3 items-start justify-center py-40">
                    <h1 className="text-4xl font-bold pb-10">Thesis not yet available 😔</h1>
                    <p className="text-md">
                        You are seeing this page because you have clicked on the <span className="font-bold">
                        Read the Thesis</span> button. However, this thesis is currently submitted at Royal Holloway, 
                        University of London as part of the requirement for the award of MSc Cyber Security.
                        <br></br>
                        <br></br>
                        Once the dissertation is graded (and I have graduated), I will publish the thesis publicly at <Link
                        href="https://arxiv.org/" target="_blank" className="link-underline font-bold">arxiv.org</Link>. Until
                        then, take a look at the <Link href="https://github.com/hate-detection/" target="_blank" className="link-underline
                        font-bold">source code</Link>.
                    </p>
                    <Link href="/" className="flex pt-15 mb-20 items-center font-bold border border-2 border-transparent justify-center link-underline focus:border focus:border-2 focus:border-amber-300"><MdOutlineArrowBack size={30}/><p className="text-2xl pl-3">Back to Home</p></Link>
                </div>
            </main>
        </>
    )
}
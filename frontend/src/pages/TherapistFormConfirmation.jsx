const TherapistFormConfirmation = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#FAF7F5] p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
            <h1 className="text-3xl font-gloock text-[#202020] mb-6">
                Thank you for<br />submitting your<br />information!
            </h1>
            <p className="text-gray-600 font-inter text-[16px] mb-8">
                We are currently reviewing your details and<br />will get back to you as soon as your profile<br />has been processed.
            </p>
            <button
                onClick={() => window.location.href = "https://www.glow.com.de/join-the-team"}
                className="bg-[#EB970C] text-white font-bold font-inter text-[16px] px-8 py-4 rounded-xl hover:bg-[#d47d00] transition"
            >
                Back home
            </button>
        </div>
    );
};

export default TherapistFormConfirmation;
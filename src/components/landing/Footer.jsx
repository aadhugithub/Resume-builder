export default function Footer() {
    return (
        <footer className="py-12 border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-black" />
                        <span className="font-semibold text-sm">ResumeOne</span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-xs">
                        Private & Secure. Your data is stored locally on your device and never sent to any server.
                    </p>
                </div>

                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} ResumeOne. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm text-gray-500">
                    <span className="cursor-not-allowed opacity-50">Privacy Policy</span>
                    <span className="cursor-not-allowed opacity-50">Terms & Conditions</span>
                </div>
            </div>
        </footer>
    );
}

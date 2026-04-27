export default function Footer() {
    return (
        <footer className="py-20 border-t border-gray-100 bg-white">
            <div className="container mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div className="flex flex-col gap-6 max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xs">
                                R
                            </div>
                            <span className="font-bold text-xl tracking-tight">ResumeOne</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            The ultimate privacy-focused resume builder. Empowering job seekers with professional tools that value their data.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Product</h4>
                            <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
                            <a href="/builder" className="text-gray-600 hover:text-black transition-colors">Builder</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-black transition-colors">How it works</a>
                        </div>
                        <div className="flex-col gap-4 hidden sm:flex">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Resources</h4>
                            <span className="text-gray-500 cursor-not-allowed">Blog</span>
                            <span className="text-gray-500 cursor-not-allowed">Templates</span>
                            <span className="text-gray-500 cursor-not-allowed">Career Guide</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Legal</h4>
                            <span className="text-gray-500 cursor-not-allowed">Privacy</span>
                            <span className="text-gray-500 cursor-not-allowed">Terms</span>
                            <span className="text-gray-500 cursor-not-allowed">Cookies</span>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-500 font-medium">
                        © {new Date().getFullYear()} ResumeOne. Built for the future of work.
                    </p>
                    <div className="flex gap-8">
                        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all cursor-pointer">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

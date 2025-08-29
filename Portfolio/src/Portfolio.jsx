import React, { useState, useEffect } from 'react';

const texts = [
    "This is my portfolio",
    "using CSS/HTML/JS",
    "Check out about me"
];

export default function Portfolio() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        let timer;
        const fullText = texts[currentTextIndex];

        if (isWaiting) {
            // If currently waiting, set a timeout to stop waiting and start deleting
            timer = setTimeout(() => {
                setIsWaiting(false);
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting) {
            // If currently deleting
            if (currentText.length > 0) {
                // Delete one character
                timer = setTimeout(() => {
                    setCurrentText(fullText.substring(0, currentText.length - 1));
                }, 50);
            } else {
                // Done deleting, move to the next text in the array
                timer = setTimeout(() => {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }, 500); // Wait a bit before starting to type the new text
            }
        } else { // If currently typing
            if (currentText.length < fullText.length) {
                // Type one character
                timer = setTimeout(() => {
                    setCurrentText(fullText.substring(0, currentText.length + 1));
                }, 100);
            } else {
                // Done typing, start waiting
                timer = setTimeout(() => {
                    setIsWaiting(true);
                }, 0); // Immediately transition to waiting state
            }
        }

        // Cleanup function to clear the timer when the component unmounts or dependencies change
        return () => clearTimeout(timer);
    }, [currentText, currentTextIndex, isDeleting, isWaiting]); // Dependencies are the state variables that drive the effect

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="portfolio-container">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            SK
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <button onClick={() => scrollToSection('home')} className="text-white hover:text-purple-400 transition-colors">Home</button>
                            <button onClick={() => scrollToSection('about')} className="text-white hover:text-purple-400 transition-colors">About</button>
                            <button onClick={() => scrollToSection('skills')} className="text-white hover:text-purple-400 transition-colors">Skills</button>
                            <button onClick={() => scrollToSection('projects')} className="text-white hover:text-purple-400 transition-colors">Projects</button>
                            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-purple-400 transition-colors">Contact</button>
                        </div>
                        <div className="md:hidden">
                            <button className="text-white">☰</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Home Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Image - Replace URL with your image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
                    }}
                ></div>
                <div className="text-center z-10 px-4">
                    <div className="text-2xl mb-4 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
                        Hi, I'm
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-up"
                        style={{ animationDelay: '1s', opacity: 0 }}>
                        SHRINESH K
                    </h1>
                    <div className="text-xl md:text-2xl h-8 animate-fade-in-up" style={{ animationDelay: '1.5s', opacity: 0 }}>
                        <span className="text-white/80">{currentText}</span>
                        <span className="animate-blink">|</span>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <button onClick={() => scrollToSection('about')} className="text-white/60 text-2xl">
                            ↓
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="grid md:grid-cols-1 gap-8">
                        {/* Personal Info */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Personal Details</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span className="text-white/70">Name:</span>
                                    <span className="text-white font-medium">SHRINESH</span>
                                </div>
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span className="text-white/70">Age:</span>
                                    <span className="text-white font-medium">21</span>
                                </div>
                                <div className="flex justify-between border-b border-white/20 pb-2 md:col-span-1">
                                    <span className="text-white/70">Native:</span>
                                    <span className="text-white font-medium text-right">Born and living in Coimbatore, native Nilgiris</span>
                                </div>
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Education</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="text-purple-400 font-bold min-w-[60px]">UG</div>
                                    <div>
                                        <div className="text-white font-medium">Sri Krishna College of Engineering and Technology</div>
                                        <div className="text-white/70">2025 | Coimbatore</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="text-purple-400 font-bold min-w-[60px]">Diploma</div>
                                    <div>
                                        <div className="text-white font-medium">Sri Ramakrishna Mission Vidyalaya Polytechnic College</div>
                                        <div className="text-white/70">2022 | Coimbatore</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 bg-white/5 rounded-xl">
                                    <div className="text-purple-400 font-bold min-w-[60px]">SSLC</div>
                                    <div>
                                        <div className="text-white font-medium">Laurel Matriculation Higher Secondary School</div>
                                        <div className="text-white/70">2019 | Coimbatore</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Certifications</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/80">
                                    <span className="text-purple-400">🏆</span>
                                    <span>ServiceNow Certified System Administrator (CSA)</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <span className="text-purple-400">🏆</span>
                                    <span>ServiceNow Certified Application Developer (CAD)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Technical Skills
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-6 text-purple-400 flex items-center gap-2">
                                💻 Programming Languages
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {['Java', 'Python', 'MySQL', 'Flutter'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-purple-400 hover:text-white transition-colors cursor-pointer">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-6 text-purple-400 flex items-center gap-2">
                                🛠️ Software Tools
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {['ServiceNow', 'CANVA', 'ChatGPT'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-purple-400 hover:text-white transition-colors cursor-pointer">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold mb-6 text-purple-400 flex items-center gap-2">
                                ⚙️ Other Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white hover:bg-purple-400 hover:text-white transition-colors cursor-pointer">
                                    MATLAB
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                        <p className="text-xl font-medium text-purple-400">Still improving skills 🧠</p>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Projects
                    </h2>
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 relative">
                            <div className="absolute -top-4 left-8 bg-purple-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                01
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">
                                Optimal Path Routing for Warning Message Dissemination in Highway Using VANET
                            </h3>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                This project proposes an optimal path routing protocol for Vehicular Ad-Hoc Networks (VANETs) to quickly and reliably disseminate warning messages on highways. The goal is to overcome the challenges of high vehicle speeds and frequent network disconnections, which can cause message delays and network congestion. By using an intelligent routing mechanism, the system ensures critical hazard warnings reach all relevant vehicles with minimal latency, significantly improving road safety.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['VANET', 'Network Routing', 'Safety Systems'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 border border-purple-400 rounded-full text-xs font-medium text-purple-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 relative">
                            <div className="absolute -top-4 left-8 bg-purple-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                02
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">
                                Bank Application
                            </h3>
                            <p className="text-white/80 mb-4 leading-relaxed">
                                Designed a web application to create accounts, deposit, withdraw, and check balances, with stunning User Interface (UI).
                            </p>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                Developed a cool user interface with the help of JavaFX. This Bank application can create a bank account for user with password and it will store the data of the user. With this user can deposit, credit, check balance in the account. Used JavaFX and CSS for better user experience. JavaFX stores the data of the user login to the application.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Java', 'JavaFX', 'CSS'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 border border-purple-400 rounded-full text-xs font-medium text-purple-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 relative">
                            <div className="absolute -top-4 left-8 bg-purple-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                03
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">
                                Restaurant Reservation System
                            </h3>
                            <p className="text-white/80 mb-4 leading-relaxed">
                                Created a system for users to book tables in advance and pre-order food, reducing waiting times.
                            </p>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                Developed a full-stack reservation system mimicking real-world booking workflows using Spring Boot and React.js. Built 15+ secure CRUD endpoints with input validation and database integration via MySQL and JPA. Delivered responsive frontend with 85% browser/device compatibility, enhancing user experience.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['React.js', 'SpringBoot', 'Java', 'MySQL', 'HTML', 'CSS', 'REST API'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 border border-purple-400 rounded-full text-xs font-medium text-purple-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen flex items-center py-20">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Contact
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-4">
                                <div className="text-2xl text-purple-400">📱</div>
                                <div>
                                    <div className="text-white/70 text-sm">Phone</div>
                                    <div className="text-white font-medium">9791673134</div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-4">
                                <div className="text-2xl text-purple-400">✉️</div>
                                <div>
                                    <div className="text-white/70 text-sm">Email</div>
                                    <div className="text-white font-medium">shrineshshrinesh4@gmail.com</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold mb-6 text-purple-400 text-center">Connect with me</h3>
                            <div className="space-y-4">
                                <a
                                    href="https://www.instagram.com/_____.shrinesh._____?igsh=ZXIzc2U5eGpuYzdw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 group"
                                >
                                    <div className="text-2xl">📷</div>
                                    <span className="text-white font-medium group-hover:text-white">Instagram</span>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/shrinesh-k-33669b258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-blue-600 transition-all duration-300 group"
                                >
                                    <div className="text-2xl">💼</div>
                                    <span className="text-white font-medium group-hover:text-white">LinkedIn</span>
                                </a>

                                <a
                                    href="https://github.com/shrikann"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-gray-800 transition-all duration-300 group"
                                >
                                    <div className="text-2xl">💻</div>
                                    <span className="text-white font-medium group-hover:text-white">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center py-8 bg-black/20 text-white/70">
                <p>&copy; 2024 Shrinesh K. All rights reserved.</p>
            </footer>

            <style jsx>{`
                .portfolio-container {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    color: white;
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease forwards;
                }

                .animate-blink {
                    animation: blink 1s infinite;
                }

                @media (max-width: 768px) {
                    .text-6xl { font-size: 3rem; }
                    .text-8xl { font-size: 4rem; }
                    .grid.md\\:grid-cols-3 { grid-template-columns: 1fr; }
                    .grid.md\\:grid-cols-2 { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}

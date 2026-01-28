import {useState} from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import Spinner from "./Spinner.jsx";
// FEATURE #1 imports: Wand2 for prompt enhancement button | FEATURE #2 imports: Heart for emotion analysis
import {Download, FileText, PlusCircle, Wand2, Heart} from "lucide-react";
import GhibliStyleDropdown from "./GhibliStyleDropdown.jsx";

const TextToImageSection = ({ onApplySuggestions }) => {
    const [generatedImage, setGeneratedImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('general');
    const [isLoading, setIsLoading] = useState(false);
    // ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) - TO REMOVE: Delete lines 13-14 =====
    const [isEnhancing, setIsEnhancing] = useState(false); // Tracks LLM prompt enhancement API call state
    // ===== END PROMPT ENHANCEMENT FEATURE =====
    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - TO REMOVE: Delete lines 16-18 =====
    const [emotionalAnalysis, setEmotionalAnalysis] = useState(null); // Stores emotion analysis response from backend
    const [isAnalyzing, setIsAnalyzing] = useState(false); // Tracks emotion analysis API call state
    // ===== END EMOTIONAL ANALYZER FEATURE =====
    const [error, setError] = useState(null);

    const isCreateDisabled = isLoading || !prompt.trim();

    // ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) =====
    const handleEnhancePrompt = async () => {
        if (!prompt.trim()) {
            setError("Please enter a description first.");
            return;
        }

        setIsEnhancing(true);
        setError(null);

        try {
            const API_URL = 'http://localhost:8082/api/v1/enhance-prompt';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({prompt, style}),
            });

            if (!response.ok) {
                throw new Error(`Failed to enhance prompt. Status: ${response.status}`);
            }

            const data = await response.json();
            setPrompt(data.enhanced_prompt);

        } catch (error) {
            console.error('Error enhancing prompt:', error);
            setError("Failed to enhance prompt. Try generating with your original prompt.");
        } finally {
            setIsEnhancing(false);
        }
    }
    // ===== END PROMPT ENHANCEMENT FEATURE =====

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a description for your art work.");
            return;
        }

        setIsLoading(true);
        setError(null);
        // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
        setEmotionalAnalysis(null);
        // ===== END EMOTIONAL ANALYZER FEATURE =====

        const payload = {prompt, style};

        try {
            const API_URL = 'http://localhost:8082/api/v1/generate-from-text';
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
            }

            const resultBlob = await response.blob();
            const imageUrl = URL.createObjectURL(resultBlob);
            setGeneratedImage(imageUrl);

            // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
            // Analyze emotion of generated image
            await analyzeImageEmotion(resultBlob);
            // ===== END EMOTIONAL ANALYZER FEATURE =====

        }catch (error) {
            console.error('Error generating image from text:', error);
            setError("failed to generate image. Please ensure the backend is running and check the console");
        }finally {
            setIsLoading(false);
        }
    }

    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
    const analyzeImageEmotion = async (imageBlob) => {
        setIsAnalyzing(true);
        try {
            const formData = new FormData();
            formData.append('image', imageBlob);

            const API_URL = 'http://localhost:8082/api/v1/analyze-emotion';
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setEmotionalAnalysis(data);
                console.log('Emotional analysis completed:', data);
            }
        } catch (error) {
            console.error('Error analyzing emotion:', error);
            // Silently fail - don't break the UX
        } finally {
            setIsAnalyzing(false);
        }
    }
    // ===== END EMOTIONAL ANALYZER FEATURE =====

    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - Apply Suggestions to Prompt =====
    const handleApplySuggestions = async () => {
        if (emotionalAnalysis && emotionalAnalysis.suggestions.length > 0 && generatedImage) {
            try {
                console.log('Apply Suggestions clicked - converting image to blob');
                // Convert image URL to blob
                const response = await fetch(generatedImage);
                const imageBlob = await response.blob();
                console.log('Image blob created:', imageBlob);
                
                // Call parent callback to navigate and pass data
                if (onApplySuggestions) {
                    console.log('Calling onApplySuggestions callback with:', {
                        blobSize: imageBlob.size,
                        suggestionsCount: emotionalAnalysis.suggestions.length,
                        dominantEmotion: emotionalAnalysis.dominant_emotion
                    });
                    onApplySuggestions(imageBlob, emotionalAnalysis.suggestions, emotionalAnalysis.dominant_emotion);
                } else {
                    console.warn('onApplySuggestions callback not available!');
                }
            } catch (error) {
                console.error('Error preparing suggestion data:', error);
            }
        } else {
            console.warn('Cannot apply suggestions:', {
                hasEmotionalAnalysis: !!emotionalAnalysis,
                hasSuggestions: emotionalAnalysis?.suggestions?.length > 0,
                hasGeneratedImage: !!generatedImage
            });
        }
    }
    // ===== END EMOTIONAL ANALYZER FEATURE =====

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `ghibli-art-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleCreateAnother = () => {
        setGeneratedImage(null);
        setPrompt('');
        setStyle('general');
        setError(null);
        // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
        setEmotionalAnalysis(null);
        // ===== END EMOTIONAL ANALYZER FEATURE =====
    }

    return (
        <div className="relative">
            {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Text to Ghibli Art</h2>
                <div className="w-full h-80 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50 mb-6">
                    {isLoading ? (<Spinner />) : generatedImage ? (<img src={generatedImage} alt="Generated Ghibli art" className="h-full w-full rounded-lg object-contain p-2"/>) : (
                        <div className="text-center text-gray-500">
                            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                            <p>Generate Ghibli art from your text description</p>
                        </div>
                    )}
                </div>

                {!generatedImage && (
                    <>
                        <div className="space-y-4">
                            <GhibliStyleDropdown value={style} onChange={(e) => setStyle(e.target.value)} />
                            <div>
                                <label htmlFor="prompt-text" className="text-md font-semibold mb-2 block">Your Description</label>
                                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} id="prompt-text" className="w-full p-3 border border-gray-300 rounded-lg" rows="3" placeholder="Describe the Ghibli scene you want to create in detail..."></textarea>
                                {/* ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) ===== */}
                                <button onClick={handleEnhancePrompt} disabled={isEnhancing || !prompt.trim()} className="mt-2 text-sm bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                                    <Wand2 size={16} /> {isEnhancing ? 'Enhancing...' : 'Enhance Prompt'}
                                </button>
                                {/* ===== END PROMPT ENHANCEMENT FEATURE ===== */}
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isCreateDisabled} className="mt-6 bg-orange-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed w-full">
                            {isLoading ? 'Generating...' : 'Generate Ghibli Art'}
                        </button>
                    </>
                )}
                {generatedImage && (
                    <div className="mt-6 flex flex-col gap-4">
                        {/* ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) ===== */}
                        {isAnalyzing && (
                            <div className="flex items-center justify-center gap-2 text-purple-600">
                                <Spinner size={20} />
                                <span className="text-sm">Analyzing emotions...</span>
                            </div>
                        )}
                        
                        {emotionalAnalysis && (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Heart size={20} className="text-purple-600" />
                                    <h3 className="font-semibold text-purple-900">Emotional Impact Analysis</h3>
                                </div>
                                
                                <div className="space-y-2 mb-3">
                                    {emotionalAnalysis.emotions.map((emotion, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="text-sm font-medium w-24">{emotion.emotion}</span>
                                            <div className="flex-1 bg-white rounded h-6 relative overflow-hidden border border-purple-200">
                                                <div 
                                                    className="bg-purple-500 h-full rounded transition-all"
                                                    style={{width: `${emotion.score * 10}%`}}
                                                ></div>
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-purple-900">
                                                    {emotion.score}/10
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="bg-white p-3 rounded mb-3 text-sm">
                                    <p className="font-semibold text-purple-900 mb-2">🎯 Dominant Emotion: {emotionalAnalysis.dominant_emotion}</p>
                                    <p className="text-gray-600 mb-2">🔍 Key Elements:</p>
                                    <ul className="space-y-1">
                                        {emotionalAnalysis.key_elements.map((element, idx) => (
                                            <li key={idx} className="text-gray-700">{element}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="bg-white p-3 rounded text-sm">
                                    <p className="font-semibold text-purple-900 mb-2">💡 Suggestions:</p>
                                    <ul className="space-y-1">
                                        {emotionalAnalysis.suggestions.map((suggestion, idx) => (
                                            <li key={idx} className="text-gray-700">{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - Apply Suggestions Button ===== */}
                                <button 
                                    onClick={handleApplySuggestions}
                                    className="w-full mt-3 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    ✨ Apply Suggestions & Regenerate
                                </button>
                                {/* ===== END EMOTIONAL ANALYZER FEATURE ===== */}
                            </div>
                        )}
                        {/* ===== END EMOTIONAL ANALYZER FEATURE ===== */}
                        
                        <div className="flex gap-4">
                            <button onClick={handleDownload} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                                <Download size={20} /> Download
                            </button>
                            <button onClick={handleCreateAnother} className="flex-1 bg-orange-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors flex items-center justify-center gap-2">
                                <PlusCircle size={20} /> Create Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToImageSection;
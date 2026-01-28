import Spinner from "./Spinner.jsx";
import UploadIcon from "./UploadIcon.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import {useCallback, useRef, useState, useEffect} from "react";
// FEATURE #1 imports: Wand2 for prompt enhancement button | FEATURE #2 imports: Heart for emotion analysis
import {Download, PlusCircle, Wand2, Heart} from "lucide-react";

const PhotoToImageSection = ({ suggestedImageBlob, suggestedPrompt, setSuggestedImageBlob, setSuggestedPrompt, onApplySuggestions }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) - TO REMOVE: Delete lines 13-14 =====
    const [isEnhancing, setIsEnhancing] = useState(false); // Tracks LLM prompt enhancement API call state
    // ===== END PROMPT ENHANCEMENT FEATURE =====
    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - TO REMOVE: Delete lines 16-18 =====
    const [emotionalAnalysis, setEmotionalAnalysis] = useState(null); // Stores emotion analysis response from backend
    const [isAnalyzing, setIsAnalyzing] = useState(false); // Tracks emotion analysis API call state
    // ===== END EMOTIONAL ANALYZER FEATURE =====
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // ===== APPLY SUGGESTIONS AUTO-POPULATION - TO REMOVE: Delete lines 23-35 and the entire useEffect hook =====
    // This useEffect monitors for suggested data from TextToImageSection (passed via CreatePage parent)
    // When suggestions are applied: automatically populates uploadedFile, uploadedImage, and prompt fields
    // Then clears the suggestion state to prevent duplicate processing
    useEffect(() => {
        if (suggestedImageBlob && suggestedPrompt) {
            setUploadedFile(suggestedImageBlob);
            setUploadedImage(URL.createObjectURL(suggestedImageBlob));
            setPrompt(suggestedPrompt);
            setGeneratedImage(null); // Clear previous generated image to show upload form
            setEmotionalAnalysis(null); // Clear previous analysis
            // Clear suggestion state for next use - prevents re-triggering on every render
            setSuggestedImageBlob(null);
            setSuggestedPrompt(null);
        }
    }, [suggestedImageBlob, suggestedPrompt, setSuggestedImageBlob, setSuggestedPrompt]);
    // ===== END APPLY SUGGESTIONS AUTO-POPULATION =====

    const isCreateDisabled = isLoading || !uploadedFile;

    const onBrowseClick = () => fileInputRef.current.click();

    const handleFileChange = (file) => {
        if (file && file.type.startsWith("image/")) {
            setUploadedFile(file);
            setUploadedImage(URL.createObjectURL(file));
            setGeneratedImage(null);
            setError(null);
        } else {
            setError("Please upload a valid image file.");
            setUploadedImage(null);
            setUploadedFile(null);
        }
    }

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
                body: JSON.stringify({prompt, style: "general"}),
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

        if (!uploadedFile) {
            setError('Please upload an image first!');
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", uploadedFile);
        formData.append("prompt", prompt);

        try {
            const API_URL = 'http://localhost:8082/api/v1/generate';
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
            }

            const resultBlob = await response.blob();
            setGeneratedImage(URL.createObjectURL(resultBlob));

            // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) =====
            // Analyze emotion of generated image
            await analyzeImageEmotion(resultBlob);
            // ===== END EMOTIONAL ANALYZER FEATURE =====

        }catch (error) {
            console.error('Error generating image:', error);
            setError("Failed to generate image. Please ensure the backend is running and check the console.");
        } finally {
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

    // ===== EMOTIONAL ANALYZER FEATURE (AI Feature #2) - Apply Suggestions with Regeneration =====
    const handleApplySuggestions = async () => {
        if (emotionalAnalysis && emotionalAnalysis.suggestions.length > 0 && generatedImage) {
            try {
                console.log('Photo: Apply Suggestions clicked - converting image to blob');
                // Convert generated image URL to blob
                const response = await fetch(generatedImage);
                const imageBlob = await response.blob();
                console.log('Photo: Image blob created:', imageBlob);
                
                // Call parent callback to store image + suggestions for next regeneration
                if (onApplySuggestions) {
                    console.log('Photo: Calling onApplySuggestions callback');
                    onApplySuggestions(imageBlob, emotionalAnalysis.suggestions, emotionalAnalysis.dominant_emotion);
                    // Form will be auto-populated by parent's state update
                } else {
                    console.warn('onApplySuggestions callback not available!');
                }
            } catch (error) {
                console.error('Error preparing suggestion data:', error);
            }
        } else {
            console.warn('Cannot apply suggestions - missing data');
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
        setUploadedFile(null);
        setUploadedImage(null);
        setGeneratedImage(null);
        setPrompt('');
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Photo to Ghibli Art</h2>
                <div className="flex-grow border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center text-center p-6 transition-colors">
                    {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded preview" className="max-h-80 w-auto rounded-lg object-contain"/>
                    ) : (
                        <div>
                            <UploadIcon />
                            <p className="text-gray-600">Drag and drop your image here</p>
                            <p className="text-gray-500 text-sm my-2">or</p>
                            <button onClick={onBrowseClick} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Browse files</button>
                            <input ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files[0])}  type="file" className="hidden" accept="image/*" />
                        </div>
                    )}
                </div>
                {!generatedImage && (
                    <>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="prompt-photo" className="text-md font-semibold mb-2 block">Additional Details</label>
                                <textarea id="prompt-photo" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows="2" placeholder="Add any specific details or enhancements..."></textarea>
                                {/* ===== PROMPT ENHANCEMENT FEATURE (AI Feature #1) ===== */}
                                <button onClick={handleEnhancePrompt} disabled={isEnhancing || !prompt.trim()} className="mt-2 text-sm bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                                    <Wand2 size={16} /> {isEnhancing ? 'Enhancing...' : 'Enhance Prompt'}
                                </button>
                                {/* ===== END PROMPT ENHANCEMENT FEATURE ===== */}
                            </div>
                        </div>
                        <button onClick={handleGenerate} disabled={isCreateDisabled} className="mt-6 bg-orange-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed w-full">
                            {isLoading ? 'Transforming...' : 'Transform to Ghibli Art'}
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
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center">
                <div className="w-full h-full flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50 min-h-[400px]">
                    {isLoading ? (<Spinner />) : generatedImage ? (<img src={generatedImage} alt="Final Ghibli art" className="max-h-[32rem] w-auto rounded-lg object-contain"/>) : (
                        <p className="text-center text-gray-500 max-w-sm">Your generated Ghibli art will appear here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoToImageSection;
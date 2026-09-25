// ==============================================
// JeevanMitra AI — Fixed & Upgraded Version
// ==============================================

// Base URL of the backend API. Leave as '' if the frontend is served
// by the same server as the backend (see backend/server.js). If you
// deploy the frontend separately (e.g. GitHub Pages/Netlify), set this
// to your backend's public URL, e.g. 'https://your-backend.onrender.com'
const API_BASE_URL = '';

let currentLanguage = 'en';
let isChatVisible = true;

// ==============================================
// TRANSLATIONS
// ==============================================
const i18n = {
    en: {
        tab_crop:"Crop Recommendation",tab_yield:"Yield Prediction",tab_disease:"Disease Detection",tab_market:"Market Prices",
        soil_data:"Soil & Environment Data",auto_weather:"Auto-fill Weather",nitrogen:"Nitrogen (N)",phosphorus:"Phosphorus (P)",
        potassium:"Potassium (K)",temperature:"Temperature",humidity:"Humidity",ph:"Soil pH",rainfall:"Rainfall",
        get_recommendations:"Get Recommendations",recommendations:"Recommendations",
        enter_data_prompt:'Enter soil data and click "Get Recommendations"',
        yield_input:"Yield Prediction Input",select_crop:"Select Crop",predict_yield:"Predict Yield",
        yield_results:"Yield Prediction Results",enter_yield_prompt:'Enter parameters and click "Predict Yield"',
        upload_leaf:"Upload Leaf Image",click_upload:"Click to upload or drag & drop",detect_disease:"Detect Disease",
        quick_demo:"Quick Demo",diagnosis:"Diagnosis Results",upload_prompt:'Upload an image and click "Detect Disease"',
        market_prices:"Current Market Prices",last_updated:"Last updated",crop_col:"Crop",
        price_col:"Price (₹/quintal)",market_col:"Market",trend_col:"Trend",price_chart:"Price Chart",
        chat_welcome:"Hello! I'm JeevanMitra AI — your smart farming companion. Ask me about crops, yields, diseases, or market prices! 🌿",
        qa_crop:"🌱 Best crop to grow?",qa_yield:"📊 Predict my yield",qa_disease:"🔍 Check plant disease",qa_price:"💰 Market prices",
        voice_listening:"🎤 Listening... Speak now!",voice_not_supported:"❌ Voice not supported in this browser",
        weather_filled:"🌤️ Weather data auto-filled!",lang_changed:"Language changed to English",
        top_crops:"🏆 Top 3 Recommended Crops",expected_yield:"Expected Yield",tons_per_hectare:"tons/hectare",
        optimization_tips:"💡 Optimization Tips",prevention_tips:"🛡️ Prevention Tips",diagnosis_result:"Diagnosis",
        healthy_plant:"Healthy Plant",no_treatment:"No treatment needed. Continue regular care.",
        leaf_blight:"Leaf Blight",leaf_blight_solution:"Apply copper-based fungicide. Remove infected leaves immediately.",
        rust_disease:"Rust Disease",rust_solution:"Apply sulfur-based fungicide. Improve air circulation between plants.",
        powdery_mildew:"Powdery Mildew",mildew_solution:"Apply neem oil spray. Increase plant spacing for airflow.",
        why_recommendation:"🧠 Why this recommendation?"
    },
    ml: {
        tab_crop:"വിള ശുപാർശ",tab_yield:"വിളവ് പ്രവചനം",tab_disease:"രോഗ നിർണയം",tab_market:"വിപണി വിലകൾ",
        soil_data:"മണ്ണിന്റെയും പരിസ്ഥിതിയുടെയും വിവരങ്ങൾ",auto_weather:"കാലാവസ്ഥ സ്വയം പൂരിപ്പിക്കുക",
        nitrogen:"നൈട്രജൻ (N)",phosphorus:"ഫോസ്ഫറസ് (P)",potassium:"പൊട്ടാസ്യം (K)",temperature:"താപനില",
        humidity:"ഈർപ്പം",ph:"മണ്ണിന്റെ pH",rainfall:"മഴ",get_recommendations:"ശുപാർശകൾ നേടുക",
        recommendations:"ശുപാർശകൾ",enter_data_prompt:'മണ്ണ് ഡേറ്റ നൽകി "ശുപാർശകൾ നേടുക" ക്ലിക്ക് ചെയ്യുക',
        yield_input:"വിളവ് പ്രവചന ഇൻപുട്ട്",select_crop:"വിള തിരഞ്ഞെടുക്കുക",predict_yield:"വിളവ് പ്രവചിക്കുക",
        yield_results:"വിളവ് പ്രവചന ഫലങ്ങൾ",enter_yield_prompt:'പാരാമീറ്ററുകൾ നൽകി ക്ലിക്ക് ചെയ്യുക',
        upload_leaf:"ഇലയുടെ ചിത്രം അപ്ലോഡ് ചെയ്യുക",click_upload:"അപ്ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക",
        detect_disease:"രോഗം കണ്ടെത്തുക",quick_demo:"ദ്രുത ഡെമോ",diagnosis:"രോഗനിർണയ ഫലങ്ങൾ",
        upload_prompt:'ഒരു ചിത്രം അപ്ലോഡ് ചെയ്ത് "രോഗം കണ്ടെത്തുക" ക്ലിക്ക് ചെയ്യുക',
        market_prices:"നിലവിലെ വിപണി വിലകൾ",last_updated:"അവസാനം അപ്ഡേറ്റ് ചെയ്തത്",
        crop_col:"വിള",price_col:"വില (₹/ക്വിന്റൽ)",market_col:"വിപണി",trend_col:"പ്രവണത",price_chart:"വില ചാർട്ട്",
        chat_welcome:"നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി AI സഹായി. ചോദിക്കൂ! 🌾",
        qa_crop:"🌱 ഏറ്റവും നല്ല വിള?",qa_yield:"📊 എന്റെ വിളവ്",qa_disease:"🔍 ചെടിയുടെ രോഗം",qa_price:"💰 വിപണി വിലകൾ",
        voice_listening:"🎤 ശ്രദ്ധിക്കുന്നു...",voice_not_supported:"❌ ഈ ബ്രൗസറിൽ ശബ്ദ ഇൻപുട്ട് ഇല്ല",
        weather_filled:"🌤️ കാലാവസ്ഥ പൂരിപ്പിച്ചു!",lang_changed:"ഭാഷ മലയാളം",
        top_crops:"🏆 ഏറ്റവും നല്ല 3 വിളകൾ",expected_yield:"പ്രതീക്ഷിക്കുന്ന വിളവ്",tons_per_hectare:"ടൺ/ഹെക്ടർ",
        optimization_tips:"💡 മെച്ചപ്പെടുത്തൽ",prevention_tips:"🛡️ പ്രതിരോധം",diagnosis_result:"രോഗനിർണയം",
        healthy_plant:"ആരോഗ്യമുള്ള ചെടി",no_treatment:"ചികിത്സ ആവശ്യമില്ല.",
        leaf_blight:"ഇല പുള്ളി രോഗം",leaf_blight_solution:"കോപ്പർ കുമിൾനാശിനി പ്രയോഗിക്കുക.",
        rust_disease:"തുരുമ്പ് രോഗം",rust_solution:"സൾഫർ കുമിൾനാശിനി പ്രയോഗിക്കുക.",
        powdery_mildew:"പൂപ്പൽ രോഗം",mildew_solution:"വേപ്പെണ്ണ പ്രയോഗിക്കുക.",
        why_recommendation:"🧠 എന്തുകൊണ്ട് ഈ ശുപാർശ?"
    },
    hi: {
        tab_crop:"फसल अनुशंसा",tab_yield:"उपज पूर्वानुमान",tab_disease:"रोग पहचान",tab_market:"बाजार मूल्य",
        soil_data:"मिट्टी और पर्यावरण डेटा",auto_weather:"मौसम स्वतः भरें",nitrogen:"नाइट्रोजन (N)",
        phosphorus:"फॉस्फोरस (P)",potassium:"पोटेशियम (K)",temperature:"तापमान",humidity:"आर्द्रता",
        ph:"मिट्टी का pH",rainfall:"वर्षा",get_recommendations:"अनुशंसाएं प्राप्त करें",recommendations:"अनुशंसाएं",
        enter_data_prompt:'मिट्टी का डेटा दर्ज करें और "अनुशंसाएं प्राप्त करें" पर क्लिक करें',
        yield_input:"उपज पूर्वानुमान इनपुट",select_crop:"फसल चुनें",predict_yield:"उपज का अनुमान लगाएं",
        yield_results:"उपज पूर्वानुमान परिणाम",enter_yield_prompt:'पैरामीटर दर्ज करें',
        upload_leaf:"पत्ते की छवि अपलोड करें",click_upload:"अपलोड करने के लिए क्लिक करें",
        detect_disease:"रोग पहचानें",quick_demo:"त्वरित डेमो",diagnosis:"निदान परिणाम",
        upload_prompt:'छवि अपलोड करें',market_prices:"वर्तमान बाजार मूल्य",last_updated:"अंतिम अपडेट",
        crop_col:"फसल",price_col:"मूल्य (₹/क्विंटल)",market_col:"बाजार",trend_col:"रुझान",price_chart:"मूल्य चार्ट",
        chat_welcome:"नमस्ते! मैं आपका कृषि AI सहायक हूं। 🌾",
        qa_crop:"🌱 सबसे अच्छी फसल?",qa_yield:"📊 उपज का अनुमान",qa_disease:"🔍 पौधे की बीमारी",qa_price:"💰 बाजार मूल्य",
        voice_listening:"🎤 सुन रहा हूं...",voice_not_supported:"❌ इस ब्राउज़र में वॉइस नहीं",
        weather_filled:"🌤️ मौसम डेटा भर दिया!",lang_changed:"भाषा हिंदी में बदली",
        top_crops:"🏆 शीर्ष 3 अनुशंसित फसलें",expected_yield:"अपेक्षित उपज",tons_per_hectare:"टन/हेक्टेयर",
        optimization_tips:"💡 सुधार सुझाव",prevention_tips:"🛡️ रोकथाम सुझाव",diagnosis_result:"निदान",
        healthy_plant:"स्वस्थ पौधा",no_treatment:"कोई उपचार आवश्यक नहीं।",
        leaf_blight:"पत्ती झुलसा रोग",leaf_blight_solution:"कॉपर-आधारित कवकनाशी लगाएं।",
        rust_disease:"रतुआ रोग",rust_solution:"सल्फर-आधारित कवकनाशी लगाएं।",
        powdery_mildew:"भभूतिया रोग",mildew_solution:"नीम का तेल लगाएं।",
        why_recommendation:"🧠 यह अनुशंसा क्यों?"
    },
    kn: {
        tab_crop:"ಬೆಳೆ ಶಿಫಾರಸು",tab_yield:"ಇಳುವರಿ ಭವಿಷ್ಯ",tab_disease:"ರೋಗ ಪತ್ತೆ",tab_market:"ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        soil_data:"ಮಣ್ಣು ಮತ್ತು ಪರಿಸರ ಡೇಟಾ",auto_weather:"ಹವಾಮಾನ ಸ್ವಯಂ ಭರ್ತಿ",nitrogen:"ನೈಟ್ರೋಜನ್ (N)",
        phosphorus:"ಫಾಸ್ಫರಸ್ (P)",potassium:"ಪೊಟ್ಯಾಸಿಯಮ್ (K)",temperature:"ತಾಪಮಾನ",humidity:"ಆರ್ದ್ರತೆ",
        ph:"ಮಣ್ಣಿನ pH",rainfall:"ಮಳೆ",get_recommendations:"ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",recommendations:"ಶಿಫಾರಸುಗಳು",
        enter_data_prompt:'ಮಣ್ಣಿನ ಡೇಟಾ ನಮೂದಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ',yield_input:"ಇಳುವರಿ ಭವಿಷ್ಯ ಇನ್‌ಪುಟ್",
        select_crop:"ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",predict_yield:"ಇಳುವರಿ ಊಹಿಸಿ",yield_results:"ಇಳುವರಿ ಭವಿಷ್ಯ ಫಲಿತಾಂಶಗಳು",
        enter_yield_prompt:'ಪ್ಯಾರಾಮೀಟರ್‌ಗಳನ್ನು ನಮೂದಿಸಿ ಕ್ಲಿಕ್ ಮಾಡಿ',
        upload_leaf:"ಎಲೆಯ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",click_upload:"ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
        detect_disease:"ರೋಗ ಪತ್ತೆ ಮಾಡಿ",quick_demo:"ತ್ವರಿತ ಡೆಮೊ",diagnosis:"ರೋಗನಿರ್ಣಯ ಫಲಿತಾಂಶಗಳು",
        upload_prompt:'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',market_prices:"ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        last_updated:"ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",crop_col:"ಬೆಳೆ",price_col:"ಬೆಲೆ (₹/ಕ್ವಿಂಟಾಲ್)",
        market_col:"ಮಾರುಕಟ್ಟೆ",trend_col:"ಪ್ರವೃತ್ತಿ",price_chart:"ಬೆಲೆ ಚಾರ್ಟ್",
        chat_welcome:"ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ. 🌾",
        qa_crop:"🌱 ಅತ್ಯುತ್ತಮ ಬೆಳೆ?",qa_yield:"📊 ಇಳುವರಿ ಊಹಿಸಿ",qa_disease:"🔍 ಸಸ್ಯ ರೋಗ",qa_price:"💰 ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        voice_listening:"🎤 ಆಲಿಸುತ್ತಿದೆ...",voice_not_supported:"❌ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಇಲ್ಲ",
        weather_filled:"🌤️ ಹವಾಮಾನ ಭರ್ತಿ!",lang_changed:"ಭಾಷೆ ಕನ್ನಡ",
        top_crops:"🏆 ಟಾಪ್ 3 ಶಿಫಾರಸು ಬೆಳೆಗಳು",expected_yield:"ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",tons_per_hectare:"ಟನ್/ಹೆಕ್ಟೇರ್",
        optimization_tips:"💡 ಸುಧಾರಣೆ ಸಲಹೆ",prevention_tips:"🛡️ ತಡೆಗಟ್ಟುವ ಸಲಹೆ",diagnosis_result:"ರೋಗನಿರ್ಣಯ",
        healthy_plant:"ಆರೋಗ್ಯಕರ ಸಸ್ಯ",no_treatment:"ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿಲ್ಲ.",
        leaf_blight:"ಎಲೆ ಮಚ್ಚೆ ರೋಗ",leaf_blight_solution:"ತಾಮ್ರ ಶಿಲೀಂಧ್ರನಾಶಕ ಅನ್ವಯಿಸಿ.",
        rust_disease:"ತುಕ್ಕು ರೋಗ",rust_solution:"ಸಲ್ಫರ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಅನ್ವಯಿಸಿ.",
        powdery_mildew:"ಸೂಕ್ಷ್ಮ ಶಿಲೀಂಧ್ರ",mildew_solution:"ಬೇವಿನ ಎಣ್ಣೆ ಅನ್ವಯಿಸಿ.",
        why_recommendation:"🧠 ಈ ಶಿಫಾರಸು ಏಕೆ?"
    },
    ta: {
        tab_crop:"பயிர் பரிந்துரை",tab_yield:"விளைச்சல் கணிப்பு",tab_disease:"நோய் கண்டறிதல்",tab_market:"சந்தை விலைகள்",
        soil_data:"மண் மற்றும் சுற்றுச்சூழல் தரவு",auto_weather:"வானிலை தானாக நிரப்பு",nitrogen:"நைட்ரஜன் (N)",
        phosphorus:"பாஸ்பரஸ் (P)",potassium:"பொட்டாசியம் (K)",temperature:"வெப்பநிலை",humidity:"ஈரப்பதம்",
        ph:"மண் pH",rainfall:"மழைப்பொழிவு",get_recommendations:"பரிந்துரைகளைப் பெறு",recommendations:"பரிந்துரைகள்",
        enter_data_prompt:'மண் தரவை உள்ளிட்டு கிளிக் செய்க',yield_input:"விளைச்சல் கணிப்பு உள்ளீடு",
        select_crop:"பயிரைத் தேர்ந்தெடு",predict_yield:"விளைச்சலைக் கணிக்கவும்",yield_results:"விளைச்சல் கணிப்பு முடிவுகள்",
        enter_yield_prompt:'அளவுருக்களை உள்ளிட்டு கிளிக் செய்க',
        upload_leaf:"இலை படத்தைப் பதிவேற்று",click_upload:"பதிவேற்ற கிளிக் செய்க",
        detect_disease:"நோயைக் கண்டறி",quick_demo:"விரைவு டெமோ",diagnosis:"நோயறிதல் முடிவுகள்",
        upload_prompt:'படத்தைப் பதிவேற்றி கிளிக் செய்க',market_prices:"தற்போதைய சந்தை விலைகள்",
        last_updated:"கடைசியாக புதுப்பிக்கப்பட்டது",crop_col:"பயிர்",price_col:"விலை (₹/குவிண்டால்)",
        market_col:"சந்தை",trend_col:"போக்கு",price_chart:"விலை விளக்கப்படம்",
        chat_welcome:"வணக்கம்! நான் விவசாய AI உதவியாளர். 🌾",
        qa_crop:"🌱 சிறந்த பயிர்?",qa_yield:"📊 விளைச்சல் கணிப்பு",qa_disease:"🔍 தாவர நோய்",qa_price:"💰 சந்தை விலைகள்",
        voice_listening:"🎤 கேட்கிறேன்...",voice_not_supported:"❌ குரல் இல்லை",
        weather_filled:"🌤️ வானிலை நிரப்பப்பட்டது!",lang_changed:"மொழி தமிழ்",
        top_crops:"🏆 முதல் 3 பரிந்துரைக்கப்பட்ட பயிர்கள்",expected_yield:"எதிர்பார்க்கப்படும் விளைச்சல்",tons_per_hectare:"டன்/ஹெக்டேர்",
        optimization_tips:"💡 மேம்படுத்தல் குறிப்புகள்",prevention_tips:"🛡️ தடுப்பு குறிப்புகள்",diagnosis_result:"நோயறிதல்",
        healthy_plant:"ஆரோக்கியமான தாவரம்",no_treatment:"சிகிச்சை தேவையில்லை.",
        leaf_blight:"இலை கருகல் நோய்",leaf_blight_solution:"தாமிரம் பூஞ்சைக் கொல்லி பயன்படுத்து.",
        rust_disease:"துரு நோய்",rust_solution:"கந்தகம் பூஞ்சைக் கொல்லி பயன்படுத்து.",
        powdery_mildew:"வெண்பூஞ்சை நோய்",mildew_solution:"வேப்ப எண்ணெய் பயன்படுத்து.",
        why_recommendation:"🧠 ஏன் இந்த பரிந்துரை?"
    },
    te: {
        tab_crop:"పంట సిఫార్సు",tab_yield:"దిగుబడి అంచనా",tab_disease:"వ్యాధి గుర్తింపు",tab_market:"మార్కెట్ ధరలు",
        soil_data:"నేల & పర్యావరణ డేటా",auto_weather:"వాతావరణం ఆటో-నింపు",nitrogen:"నత్రజని (N)",
        phosphorus:"భాస్వరం (P)",potassium:"పొటాషియం (K)",temperature:"ఉష్ణోగ్రత",humidity:"తేమ",
        ph:"నేల pH",rainfall:"వర్షపాతం",get_recommendations:"సిఫార్సులు పొందండి",recommendations:"సిఫార్సులు",
        enter_data_prompt:'నేల డేటా నమోదు చేసి "సిఫార్సులు పొందండి" క్లిక్ చేయండి',
        yield_input:"దిగుబడి అంచనా ఇన్‌పుట్",select_crop:"పంట ఎంచుకోండి",predict_yield:"దిగుబడి అంచనా వేయండి",
        yield_results:"దిగుబడి అంచనా ఫలితాలు",enter_yield_prompt:'పారామీటర్లు నమోదు చేయండి',
        upload_leaf:"ఆకు చిత్రం అప్‌లోడ్ చేయండి",click_upload:"అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
        detect_disease:"వ్యాధి గుర్తించండి",quick_demo:"త్వరిత డెమో",diagnosis:"రోగనిర్ణయ ఫలితాలు",
        upload_prompt:'చిత్రం అప్‌లోడ్ చేసి క్లిక్ చేయండి',market_prices:"ప్రస్తుత మార్కెట్ ధరలు",
        last_updated:"చివరిగా నవీకరించబడింది",crop_col:"పంట",price_col:"ధర (₹/క్వింటాల్)",
        market_col:"మార్కెట్",trend_col:"ట్రెండ్",price_chart:"ధర చార్ట్",
        chat_welcome:"నమస్కారం! నేను జీవన్‌మిత్ర AI — మీ వ్యవసాయ సహాయకుడు. 🌿",
        qa_crop:"🌱 ఉత్తమ పంట?",qa_yield:"📊 దిగుబడి అంచనా",qa_disease:"🔍 మొక్క వ్యాధి",qa_price:"💰 మార్కెట్ ధరలు",
        voice_listening:"🎤 వింటున్నాను...",voice_not_supported:"❌ వాయిస్ మద్దతు లేదు",
        weather_filled:"🌤️ వాతావరణ డేటా నింపబడింది!",lang_changed:"భాష తెలుగుకు మార్చబడింది",
        top_crops:"🏆 అగ్రమైన 3 సిఫార్సు పంటలు",expected_yield:"అంచనా దిగుబడి",tons_per_hectare:"టన్/హెక్టారు",
        optimization_tips:"💡 మెరుగుదల చిట్కాలు",prevention_tips:"🛡️ నివారణ చిట్కాలు",diagnosis_result:"రోగనిర్ణయం",
        healthy_plant:"ఆరోగ్యకరమైన మొక్క",no_treatment:"చికిత్స అవసరం లేదు.",
        leaf_blight:"ఆకు దెబ్బ వ్యాధి",leaf_blight_solution:"రాగి-ఆధారిత శిలీంధ్రనాశకం వాడండి.",
        rust_disease:"తుప్పు వ్యాధి",rust_solution:"సల్ఫర్ శిలీంధ్రనాశకం వాడండి.",
        powdery_mildew:"పొడి బూజు వ్యాధి",mildew_solution:"వేప నూనె స్ప్రే చేయండి.",
        why_recommendation:"🧠 ఈ సిఫార్సు ఎందుకు?"
    }
};

// ==============================================
// CROP DATABASE — Optimal ranges for each parameter
// Each crop has: N, P, K, temp, humidity, pH, rainfall
// Format: [idealMin, idealMax, absoluteMin, absoluteMax]
// ==============================================
const CROP_DB = {
    rice:      { N:[60,120,20,140], P:[30,60,10,80],  K:[30,60,10,80],  temp:[20,30,18,35], hum:[70,100,60,100], ph:[5.5,7.0,5.0,7.5], rain:[150,300,100,350], emoji:'🌾', market:2200, marketLoc:'Kochi',     trend:'up' },
    wheat:     { N:[60,120,20,140], P:[30,60,10,80],  K:[30,60,10,80],  temp:[10,22,5,25],  hum:[30,60,25,70],  ph:[6.0,7.5,5.5,8.0], rain:[50,120,30,150],  emoji:'🌿', market:2150, marketLoc:'Delhi',     trend:'stable' },
    maize:     { N:[80,120,40,140], P:[40,70,20,90],  K:[40,70,20,90],  temp:[18,27,15,35], hum:[50,70,40,80],  ph:[5.8,7.0,5.5,7.5], rain:[80,120,60,150],  emoji:'🌽', market:1850, marketLoc:'Mumbai',    trend:'up' },
    cotton:    { N:[60,100,30,130], P:[30,60,15,80],  K:[40,80,20,100], temp:[25,35,20,40], hum:[40,60,30,70],  ph:[6.0,8.0,5.5,8.5], rain:[60,100,40,120],  emoji:'🪴', market:6500, marketLoc:'Ahmedabad', trend:'up' },
    sugarcane: { N:[80,130,50,140], P:[40,70,20,90],  K:[80,140,50,160],temp:[20,30,18,38], hum:[50,80,40,90],  ph:[5.5,7.5,5.0,8.0], rain:[100,200,80,250], emoji:'🌱', market:350,  marketLoc:'Pune',      trend:'stable' },
    millet:    { N:[20,60,5,90],    P:[20,50,10,70],  K:[20,50,10,70],  temp:[27,35,22,42], hum:[30,55,20,65],  ph:[6.0,7.5,5.5,8.0], rain:[30,80,20,100],   emoji:'🌾', market:2800, marketLoc:'Bangalore', trend:'down' },
    banana:    { N:[80,130,50,140], P:[30,60,15,80],  K:[80,140,50,160],temp:[22,30,18,38], hum:[70,90,60,100], ph:[5.5,7.0,5.0,7.5], rain:[120,200,80,250], emoji:'🍌', market:2500, marketLoc:'Trivandrum',trend:'up' },
    potato:    { N:[60,120,30,140], P:[50,90,30,110], K:[60,100,40,120],temp:[15,22,10,28], hum:[50,80,40,90],  ph:[4.5,6.5,4.0,7.0], rain:[60,120,40,150],  emoji:'🥔', market:1800, marketLoc:'Kolkata',   trend:'stable' },
    groundnut: { N:[10,40,5,60],    P:[40,80,20,100], K:[30,60,15,80],  temp:[25,35,20,40], hum:[40,60,30,75],  ph:[5.5,7.0,5.0,7.5], rain:[50,100,30,120],  emoji:'🥜', market:5500, marketLoc:'Chennai',   trend:'up' },
    tomato:    { N:[80,120,40,140], P:[40,80,20,100], K:[60,100,30,120],temp:[18,27,12,35], hum:[60,80,50,90],  ph:[6.0,7.0,5.5,7.5], rain:[60,120,40,150],  emoji:'🍅', market:2800, marketLoc:'Nashik',    trend:'up' },
    onion:     { N:[60,100,30,120], P:[30,60,15,80],  K:[60,100,30,120],temp:[13,24,10,30], hum:[50,70,35,80],  ph:[6.0,7.5,5.5,8.0], rain:[50,80,30,100],   emoji:'🧅', market:1500, marketLoc:'Lasalgaon', trend:'stable' },
    chickpea:  { N:[10,30,0,50],    P:[40,80,20,100], K:[30,60,15,80],  temp:[15,25,10,30], hum:[30,55,20,65],  ph:[6.0,8.0,5.5,8.5], rain:[40,80,25,100],   emoji:'🫘', market:4800, marketLoc:'Indore',    trend:'up' },
    soybean:   { N:[10,30,0,50],    P:[40,80,20,100], K:[40,80,20,100], temp:[20,30,15,35], hum:[50,75,40,85],  ph:[6.0,7.0,5.5,7.5], rain:[60,100,40,120],  emoji:'🫘', market:3800, marketLoc:'Bhopal',    trend:'up' },
    sunflower: { N:[60,100,30,120], P:[30,60,15,80],  K:[40,80,20,100], temp:[20,28,15,35], hum:[40,65,30,75],  ph:[6.0,7.5,5.5,8.0], rain:[40,80,25,100],   emoji:'🌻', market:5200, marketLoc:'Bangalore', trend:'stable' },
    turmeric:  { N:[80,120,50,140], P:[40,70,20,90],  K:[80,140,50,160],temp:[20,30,15,38], hum:[65,90,55,100], ph:[5.5,7.0,5.0,7.5], rain:[120,200,80,250], emoji:'🌿', market:8500, marketLoc:'Erode',     trend:'up' },
    mustard:   { N:[60,100,30,120], P:[30,60,15,80],  K:[20,50,10,70],  temp:[10,22,5,28],  hum:[35,60,25,70],  ph:[6.0,7.5,5.5,8.0], rain:[30,70,20,90],    emoji:'🌾', market:5100, marketLoc:'Jaipur',    trend:'up' },
    garlic:    { N:[60,100,30,120], P:[40,70,20,90],  K:[50,90,30,110], temp:[12,24,8,30],  hum:[50,70,35,80],  ph:[6.0,7.0,5.5,7.5], rain:[50,80,30,100],   emoji:'🧄', market:9000, marketLoc:'Madhya Pradesh', trend:'up' }
};

// ==============================================
// CORE FIX: Proper multi-parameter scoring engine
// Scores each crop 0–100 based on how well inputs match
// Uses Gaussian-like score so crops score high only when
// ALL key parameters are near ideal (not just one or two).
// ==============================================
function scoreCropForInput(cropKey, inputs) {
    const db = CROP_DB[cropKey];
    const params = ['N','P','K','temp','hum','ph','rain'];
    const inputVals = [inputs.n, inputs.p, inputs.k, inputs.temp, inputs.hum, inputs.ph, inputs.rain];
    const weights =  [1.5,   1.0, 1.0,  2.0,   1.5,  1.8,  2.0]; // temp, pH, rain most important

    let totalWeight = 0, weightedScore = 0;
    const matchedFactors = [];
    const missedFactors = [];

    params.forEach((param, i) => {
        const val = inputVals[i];
        const [idealMin, idealMax, absMin, absMax] = db[param] || db[param.toLowerCase()];
        const w = weights[i];
        totalWeight += w;

        let score;
        if (val >= idealMin && val <= idealMax) {
            score = 100; // Perfect
            matchedFactors.push(param);
        } else if (val < absMin || val > absMax) {
            score = 0; // Outside absolute range
            missedFactors.push(param);
        } else if (val < idealMin) {
            // Linear interpolation from absMin→idealMin maps to 0→100
            score = ((val - absMin) / (idealMin - absMin)) * 70;
        } else {
            // Linear interpolation from idealMax→absMax maps to 100→0
            score = 100 - ((val - idealMax) / (absMax - idealMax)) * 70;
        }

        weightedScore += score * w;
    });

    const finalScore = weightedScore / totalWeight;
    return { score: finalScore, matchedFactors, missedFactors };
}

function getCropName(key) {
    const names = {
        rice:'Rice', wheat:'Wheat', maize:'Maize', cotton:'Cotton',
        sugarcane:'Sugarcane', millet:'Millet', banana:'Banana',
        potato:'Potato', groundnut:'Groundnut', tomato:'Tomato',
        onion:'Onion', chickpea:'Chickpea', soybean:'Soybean',
        sunflower:'Sunflower', turmeric:'Turmeric', mustard:'Mustard', garlic:'Garlic'
    };
    return names[key] || key;
}

const cropNamesLocal = {
    en: { rice:'Rice', wheat:'Wheat', maize:'Maize', cotton:'Cotton', sugarcane:'Sugarcane', millet:'Millet', banana:'Banana', potato:'Potato', groundnut:'Groundnut', tomato:'Tomato', onion:'Onion', chickpea:'Chickpea', soybean:'Soybean', sunflower:'Sunflower', turmeric:'Turmeric', mustard:'Mustard', garlic:'Garlic' },
    ml: { rice:'നെല്ല്', wheat:'ഗോതമ്പ്', maize:'ചോളം', cotton:'പരുത്തി', sugarcane:'കരിമ്പ്', millet:'തിന', banana:'വാഴ', potato:'ഉരുളക്കിഴങ്ങ്', groundnut:'നിലക്കടല', tomato:'തക്കാളി', onion:'ഉള്ളി', chickpea:'കടല', soybean:'സോയബീൻ', sunflower:'സൂര്യകാന്തി', turmeric:'മഞ്ഞൾ', mustard:'കടുക്', garlic:'വെളുത്തുള്ളി' },
    hi: { rice:'चावल', wheat:'गेहूं', maize:'मक्का', cotton:'कपास', sugarcane:'गन्ना', millet:'बाजरा', banana:'केला', potato:'आलू', groundnut:'मूंगफली', tomato:'टमाटर', onion:'प्याज', chickpea:'चना', soybean:'सोयाबीन', sunflower:'सूरजमुखी', turmeric:'हल्दी', mustard:'सरसों', garlic:'लहसुन' },
    kn: { rice:'ಭತ್ತ', wheat:'ಗೋಧಿ', maize:'ಮೆಕ್ಕೆಜೋಳ', cotton:'ಹತ್ತಿ', sugarcane:'ಕಬ್ಬು', millet:'ಸಜ್ಜೆ', banana:'ಬಾಳೆ', potato:'ಆಲೂಗಡ್ಡೆ', groundnut:'ನೆಲಗಡಲೆ', tomato:'ಟೊಮೇಟೊ', onion:'ಈರುಳ್ಳಿ', chickpea:'ಕಡಲೆ', soybean:'ಸೋಯಾಬೀನ್', sunflower:'ಸೂರ್ಯಕಾಂತಿ', turmeric:'ಅರಿಷಿಣ', mustard:'ಸಾಸಿವೆ', garlic:'ಬೆಳ್ಳುಳ್ಳಿ' },
    ta: { rice:'நெல்', wheat:'கோதுமை', maize:'மக்காச்சோளம்', cotton:'பருத்தி', sugarcane:'கரும்பு', millet:'கம்பு', banana:'வாழை', potato:'உருளைக்கிழங்கு', groundnut:'நிலக்கடலை', tomato:'தக்காளி', onion:'வெங்காயம்', chickpea:'கொண்டைக்கடலை', soybean:'சோயாபீன்', sunflower:'சூரியகாந்தி', turmeric:'மஞ்சள்', mustard:'கடுகு', garlic:'பூண்டு' },
    te: { rice:'వరి', wheat:'గోధుమ', maize:'మొక్కజొన్న', cotton:'పత్తి', sugarcane:'చెరకు', millet:'జొన్న', banana:'అరటి', potato:'బంగాళాదుంప', groundnut:'వేరుశెనగ', tomato:'టమాటా', onion:'ఉల్లిపాయ', chickpea:'శనగ', soybean:'సోయాబీన్', sunflower:'పొద్దుతిరుగుడు', turmeric:'పసుపు', mustard:'ఆవాలు', garlic:'వెల్లుల్లి' }
};

function getInputs() {
    return {
        n: parseFloat(document.getElementById('n').value),
        p: parseFloat(document.getElementById('p').value),
        k: parseFloat(document.getElementById('k').value),
        temp: parseFloat(document.getElementById('temp').value),
        hum: parseFloat(document.getElementById('hum').value),
        ph: parseFloat(document.getElementById('ph').value),
        rain: parseFloat(document.getElementById('rain').value)
    };
}

function rankAllCrops(inputs) {
    return Object.keys(CROP_DB).map(key => {
        const result = scoreCropForInput(key, inputs);
        return { key, name: getCropName(key), ...result };
    }).sort((a,b) => b.score - a.score);
}

// ==============================================
// LIVE PREVIEW (shows top crop as user drags sliders)
// ==============================================
let livePreviewTimeout;
function livePreviewCrop() {
    clearTimeout(livePreviewTimeout);
    livePreviewTimeout = setTimeout(() => {
        const inputs = getInputs();
        const ranked = rankAllCrops(inputs);
        const top = ranked[0];
        const localName = cropNamesLocal[currentLanguage]?.[top.key] || top.name;
        const scoreClass = top.score > 70 ? 'success' : top.score > 45 ? 'warning' : 'danger';
        document.getElementById('live-preview').innerHTML = `
            <div class="result-card ${scoreClass}" style="padding:0.8rem;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:0.9rem;font-weight:600;">${CROP_DB[top.key].emoji} Top match: <strong>${localName}</strong></span>
                <span style="font-weight:700;font-size:1rem;">${top.score.toFixed(0)}%</span>
            </div>
        `;
    }, 100);
}

// ==============================================
// MAIN CROP RECOMMENDATION (fully fixed)
// ==============================================
function recommendCropWithFeedback() {
    const btn = document.getElementById('recommendBtn');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Analyzing soil data...';
    btn.style.opacity = '0.8';
    // Small delay to let the UI update before computation
    setTimeout(() => {
        try { recommendCrop(); } catch(e) { console.error(e); }
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
    }, 80);
}

function recommendCrop() {
    const inputs = getInputs();
    const ranked = rankAllCrops(inputs);
    const top3 = ranked.slice(0, 3);
    const medals = ['🥇','🥈','🥉'];

    let html = `<h3 style="margin-bottom:0.5rem;">${t('top_crops')}</h3>`;

    // Soil meters
    html += `<div class="soil-meters">
        ${soilMeter('N', inputs.n, 0, 140)}
        ${soilMeter('P', inputs.p, 5, 145)}
        ${soilMeter('K', inputs.k, 5, 205)}
        ${soilMeter('Temp', inputs.temp, 8, 43, '°C')}
        ${soilMeter('Hum', inputs.hum, 14, 100, '%')}
        ${soilMeter('pH', inputs.ph, 3.5, 9.5)}
    </div>`;

    top3.forEach((crop, i) => {
        const localName = cropNamesLocal[currentLanguage]?.[crop.key] || crop.name;
        const db = CROP_DB[crop.key];
        const factors = crop.matchedFactors.slice(0, 3).join(', ');
        const missed = crop.missedFactors.length > 0
            ? `<p style="font-size:0.78rem;margin-top:0.4rem;opacity:0.8;">⚠️ Sub-optimal: ${crop.missedFactors.join(', ')}</p>` : '';

        html += `
        <div class="crop-card">
            <span class="score-badge">${crop.score.toFixed(0)}% match</span>
            <h3><span class="medal">${medals[i]}</span> ${localName} (${crop.name})</h3>
            <div class="confidence-bar">
                <div class="confidence-track"><div class="confidence-fill" style="width:${crop.score}%"></div></div>
            </div>
            <div class="match-factors">
                ${factors ? `<span class="match-tag">✓ ${factors}</span>` : ''}
                <span class="match-tag">₹${db.market}/qtl</span>
                <span class="match-tag">${db.marketLoc}</span>
            </div>
            ${missed}
        </div>`;
    });

    // Why card
    const top = top3[0];
    const db = CROP_DB[top.key];
    html += `
    <div class="result-card info" style="margin-top:1rem;">
        <h4>${t('why_recommendation')}</h4>
        <p>• Temperature ${inputs.temp}°C → ideal range ${db.temp[0]}–${db.temp[1]}°C</p>
        <p>• Rainfall ${inputs.rain}mm → ideal range ${db.rain[0]}–${db.rain[1]}mm</p>
        <p>• Soil pH ${inputs.ph} → ideal range ${db.ph[0]}–${db.ph[1]}</p>
        <p>• Nitrogen ${inputs.n} → ideal range ${db.N[0]}–${db.N[1]}</p>
    </div>
    <div class="result-card warning" style="margin-top:0.5rem;">
        <h4>📋 All crops ranked</h4>
        <div style="font-size:0.82rem;display:grid;grid-template-columns:1fr 1fr;gap:0.3rem;margin-top:0.4rem;">
            ${ranked.slice(0,10).map(c => `<span>${CROP_DB[c.key].emoji} ${cropNamesLocal[currentLanguage]?.[c.key] || c.name}: <b>${c.score.toFixed(0)}%</b></span>`).join('')}
        </div>
    </div>`;

    document.getElementById('crop-result-area').innerHTML = html;
    const cropPromptEl = document.querySelector('#crop-results-card > p[data-i18n]');
    if (cropPromptEl) cropPromptEl.style.display = 'none';
    // Scroll results into view
    document.getElementById('crop-results-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const localName = cropNamesLocal[currentLanguage]?.[top.key] || top.name;
    const msgs = {
        en: `I recommend growing ${localName} with ${top.score.toFixed(0)}% confidence based on your soil and climate data.`,
        ml: `${localName} വളർത്താൻ ശുപാർശ ചെയ്യുന്നു. ${top.score.toFixed(0)}% ഉറപ്പ്.`,
        hi: `${localName} उगाने की सलाह देता हूं। ${top.score.toFixed(0)}% विश्वास।`,
        kn: `${localName} ಬೆಳೆಯಲು ಶಿಫಾರಸು. ${top.score.toFixed(0)}% ವಿಶ್ವಾಸ.`,
        ta: `${localName} பயிரிட பரிந்துரைக்கிறேன். ${top.score.toFixed(0)}% நம்பிக்கை.`,
        te: `${localName} పంట వేయడం సిఫార్సు చేస్తున్నాను. ${top.score.toFixed(0)}% నమ్మకం.`
    };
    speakText(msgs[currentLanguage] || msgs.en);
}

function soilMeter(label, val, min, max, unit='') {
    const pct = ((val - min) / (max - min)) * 100;
    const mid = (max - min) * 0.5 + min;
    const statusClass = val < mid * 0.5 ? 'status-low' : val > mid * 1.5 ? 'status-high' : 'status-ok';
    const statusText = val < mid * 0.5 ? 'Low' : val > mid * 1.5 ? 'High' : 'OK';
    return `<div class="soil-meter">
        <div class="label">${label}</div>
        <div class="value">${val}${unit}</div>
        <div class="status ${statusClass}">${statusText}</div>
    </div>`;
}

// ==============================================
// YIELD PREDICTION (improved — crop-specific model)
// ==============================================
const yieldProfiles = {
    rice:      { base:4.2,  nSens:0.8, pSens:0.5, kSens:0.6, unit:'tons/ha', peak:6.5 },
    wheat:     { base:3.5,  nSens:0.9, pSens:0.6, kSens:0.5, unit:'tons/ha', peak:5.5 },
    maize:     { base:4.8,  nSens:1.0, pSens:0.7, kSens:0.7, unit:'tons/ha', peak:8.0 },
    cotton:    { base:1.8,  nSens:0.6, pSens:0.8, kSens:0.9, unit:'tons/ha', peak:3.5 },
    sugarcane: { base:65,   nSens:0.7, pSens:0.5, kSens:0.9, unit:'tons/ha', peak:110 },
    millet:    { base:2.0,  nSens:0.5, pSens:0.5, kSens:0.4, unit:'tons/ha', peak:3.5 },
    banana:    { base:28,   nSens:0.8, pSens:0.6, kSens:1.0, unit:'tons/ha', peak:50 },
    potato:    { base:20,   nSens:0.7, pSens:0.9, kSens:0.8, unit:'tons/ha', peak:40 },
    groundnut: { base:2.2,  nSens:0.3, pSens:0.7, kSens:0.5, unit:'tons/ha', peak:3.8 },
    tomato:    { base:25,   nSens:0.8, pSens:0.7, kSens:0.8, unit:'tons/ha', peak:60  },
    onion:     { base:18,   nSens:0.7, pSens:0.6, kSens:0.8, unit:'tons/ha', peak:35  },
    chickpea:  { base:1.5,  nSens:0.2, pSens:0.8, kSens:0.5, unit:'tons/ha', peak:2.8 },
    soybean:   { base:1.8,  nSens:0.3, pSens:0.7, kSens:0.6, unit:'tons/ha', peak:3.2 },
    sunflower: { base:1.5,  nSens:0.6, pSens:0.6, kSens:0.6, unit:'tons/ha', peak:2.8 },
    turmeric:  { base:15,   nSens:0.7, pSens:0.6, kSens:0.9, unit:'tons/ha', peak:30  },
    mustard:   { base:1.5,  nSens:0.7, pSens:0.6, kSens:0.5, unit:'tons/ha', peak:2.8 },
    garlic:    { base:8,    nSens:0.7, pSens:0.7, kSens:0.8, unit:'tons/ha', peak:18  }
};

function predictYield() {
    const crop = document.getElementById('yield-crop').value;
    const n = parseFloat(document.getElementById('yn').value);
    const p = parseFloat(document.getElementById('yp').value);
    const k = parseFloat(document.getElementById('yk').value);
    const area = parseFloat(document.getElementById('ya').value) || 1;
    const prof = yieldProfiles[crop];

    // Nutrient sufficiency index (diminishing returns after ideal)
    const nIdx = Math.min(1, 0.4 + (n/140) * 0.7) * prof.nSens;
    const pIdx = Math.min(1, 0.4 + (p/145) * 0.7) * prof.pSens;
    const kIdx = Math.min(1, 0.4 + (k/205) * 0.7) * prof.kSens;
    const totalSens = prof.nSens + prof.pSens + prof.kSens;
    const nutrientFactor = (nIdx + pIdx + kIdx) / totalSens;

    const predicted = Math.min(prof.peak, prof.base * (0.6 + nutrientFactor * 0.8));
    const totalYield = predicted * area;
    const pct = ((predicted / prof.peak) * 100).toFixed(0);

    const localCrop = cropNamesLocal[currentLanguage]?.[crop] || crop;
    const db = CROP_DB[crop];

    let tips = [];
    if (n < 60) tips.push('⚠️ Increase nitrogen fertilizer (e.g. Urea)');
    if (p < 40) tips.push('⚠️ Add phosphatic fertilizer (e.g. DAP)');
    if (k < 40) tips.push('⚠️ Apply potash fertilizer (e.g. MOP)');
    if (tips.length === 0) tips.push('✅ Nutrient levels are well balanced!');

    const html = `
        <div class="result-card success">
            <h2>🌱 ${localCrop} Yield Estimate</h2>
            <div style="font-size:2.2rem;font-weight:800;color:var(--primary-dark);margin:0.5rem 0;">${predicted.toFixed(2)} <span style="font-size:1rem;">${prof.unit}</span></div>
            <div style="font-size:0.9rem;color:#555;">Total for ${area} ha: <strong>${totalYield.toFixed(2)} tons</strong></div>
            <div style="margin-top:0.8rem;">
                <div style="font-size:0.8rem;color:#666;margin-bottom:0.3rem;">Yield efficiency: ${pct}% of peak potential</div>
                <div class="progress-bar" style="background:#ddd;">
                    <div class="progress-fill" style="background:var(--primary);width:${pct}%"></div>
                </div>
            </div>
        </div>
        <div class="result-card info">
            <h3>💰 Revenue Estimate</h3>
            <p>Market price: <strong>₹${db.market}/quintal</strong> (${db.marketLoc})</p>
            <p>Estimated revenue: <strong>₹${(totalYield * 10 * db.market).toLocaleString('en-IN')}</strong></p>
        </div>
        <div class="result-card ${tips[0].includes('⚠️') ? 'warning' : 'success'}">
            <h3>${t('optimization_tips')}</h3>
            ${tips.map(tip => `<p>${tip}</p>`).join('')}
        </div>
    `;
    document.getElementById('yield-result-area').innerHTML = html;
    const yieldPromptEl = document.querySelector('#yield-results-card > p[data-i18n]');
    if (yieldPromptEl) yieldPromptEl.style.display = 'none';
}

// ==============================================
// DISEASE DETECTION
// ==============================================
const diseaseDB = {
    healthy:       { nameKey:'healthy_plant',  solutionKey:'no_treatment',         icon:'✅', symptoms:'No visible symptoms. Plant looks healthy.', severity: 'None', confidence: 94 },
    leaf_blight:   { nameKey:'leaf_blight',    solutionKey:'leaf_blight_solution',  icon:'⚠️', symptoms:'Brown irregular spots on leaves, yellowing margins, wilting tips', severity: 'Moderate', confidence: 87 },
    rust:          { nameKey:'rust_disease',   solutionKey:'rust_solution',         icon:'🔴', symptoms:'Orange-brown rust-colored pustules on leaf undersides', severity: 'Moderate', confidence: 82 },
    powdery_mildew:{ nameKey:'powdery_mildew', solutionKey:'mildew_solution',       icon:'🌫️', symptoms:'White powdery coating on upper leaf surface, stunted growth', severity: 'Mild', confidence: 89 }
};

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            document.getElementById('image-preview').innerHTML = `<img src="${e.target.result}" style="max-width:100%;max-height:250px;border-radius:12px;">`;
        };
        reader.readAsDataURL(file);
    }
}

function detectDisease() {
    const fileInput = document.getElementById('leaf-image');
    if (!fileInput.files[0]) { showToast('❌ Please upload an image first'); return; }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64Data = e.target.result.split(',')[1];
        const mediaType = file.type || 'image/jpeg';
        const resultArea = document.getElementById('disease-result-area');
        const diseasePromptEl = document.querySelector('#disease-results-card > p[data-i18n]');
        if (diseasePromptEl) diseasePromptEl.style.display = 'none';

        resultArea.innerHTML = `<div class="result-card info" style="text-align:center;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">🧠</div>
            <p style="font-weight:600;">⚡ Groq AI Analyzing Image...</p>
            <div style="margin-top:0.8rem;"><div class="progress-bar" style="background:#cce0ff;">
                <div class="progress-fill" id="cnn-progress" style="background:var(--info);width:0%;transition:width 2s ease;"></div>
            </div></div>
            <p style="font-size:0.8rem;color:#555;margin-top:0.5rem;">Extracting features · Classifying disease · Generating report</p>
        </div>`;
        setTimeout(() => { const p = document.getElementById('cnn-progress'); if(p) p.style.width='85%'; }, 100);

        const prompt = `You are an expert plant disease detection AI. Analyze this plant/leaf image and respond ONLY with a raw JSON object (no markdown, no backticks, no extra text):
{"disease":"healthy|leaf_blight|rust|powdery_mildew|bacterial_spot|downy_mildew|other","displayName":"Human readable name","confidence":85,"severity":"None|Mild|Moderate|Severe","symptoms":"1-2 sentences about visible symptoms","cnnFeatures":["feature1","feature2","feature3"],"treatment":["step1","step2","step3","step4"],"isHealthy":false,"icon":"emoji"}`;

        try {
            const resp = await fetch(API_BASE_URL + '/groq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, image: base64Data, vision: true })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            const modelUsed = data._model_used || 'groq';
            const rawText = data.text || '';
            let result;
            try { result = JSON.parse(rawText.replace(/```json|```/g,'').trim()); }
            catch { result = { disease:'unknown', displayName:'Analysis Incomplete', confidence:60, severity:'Unknown', symptoms:'Could not parse result. Try a clearer leaf photo.', cnnFeatures:['Image received','Pattern extracted','Result uncertain'], treatment:['Use a clearer photo','Ensure good lighting','Leaf should fill frame'], isHealthy:false, icon:'⚠️' }; }

            const healthy = result.isHealthy || result.disease === 'healthy';
            const cls = healthy ? 'success' : result.severity === 'Severe' ? 'danger' : 'warning';
            resultArea.innerHTML = `
                <div class="result-card ${cls}">
                    <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:0.5rem;">
                        <div>
                            <h2 style="font-size:1.2rem;">${result.icon||'🔬'} ${result.displayName}</h2>
                            <p style="font-size:0.82rem;margin-top:0.2rem;opacity:0.8;">⚡ Groq AI (${modelUsed}) · Confidence: <strong>${result.confidence}%</strong></p>
                        </div>
                        <span style="background:${healthy?'#27ae60':result.severity==='Severe'?'#e74c3c':'#f39c12'};color:white;padding:0.3rem 0.8rem;border-radius:15px;font-size:0.78rem;font-weight:700;">
                            ${result.severity} Severity
                        </span>
                    </div>
                    <div class="confidence-bar" style="margin-top:0.8rem;">
                        <span class="confidence-label">Match</span>
                        <div class="confidence-track" style="background:rgba(0,0,0,0.1);">
                            <div class="confidence-fill" style="width:${result.confidence}%"></div>
                        </div>
                        <span class="confidence-pct">${result.confidence}%</span>
                    </div>
                    <p style="margin-top:0.8rem;font-size:0.88rem;"><strong>Symptoms:</strong> ${result.symptoms}</p>
                    ${result.cnnFeatures?.length ? `<div style="margin-top:0.8rem;"><p style="font-size:0.78rem;font-weight:600;margin-bottom:0.4rem;">🔍 Features Detected:</p>
                    <div class="match-factors">${result.cnnFeatures.map(f=>`<span class="match-tag" style="background:rgba(0,0,0,0.1);color:inherit;">${f}</span>`).join('')}</div></div>` : ''}
                </div>
                <div class="result-card ${healthy?'success':'info'}" style="margin-top:0.5rem;">
                    <h3>🛡️ Treatment & Prevention</h3>
                    ${(result.treatment||[]).map((s,i)=>`<p style="margin:0.3rem 0;">${i+1}. ${s}</p>`).join('')}
                </div>`;
            speakText(`${result.displayName} detected with ${result.confidence} percent confidence. Severity: ${result.severity}.`);
        } catch (err) {
            const isQuota = err.message.toLowerCase().includes('quota') || err.message.includes('429');
            resultArea.innerHTML = `<div class="result-card ${isQuota ? 'warning' : 'danger'}">
                <h3>${isQuota ? '⏳ Quota Exceeded' : '❌ Analysis Failed'}</h3>
                <p>${isQuota
                    ? '⚠️ Groq API error. Check your key at <b>console.groq.com</b>'
                    : (err.message.includes('fetch') ? '⚠️ Server not running! Run <b>start_jeevanmitra.py</b> first.' : err.message)
                }</p>
            </div>`;
        }
    };
    reader.readAsDataURL(file);
}

function demoDisease(type) {
    showDiseaseResult(type);
}

function showDiseaseResult(detected) {
    const result = diseaseDB[detected];
    const isHealthy = detected === 'healthy';
    const resultArea = document.getElementById('disease-result-area');
    const diseasePromptEl = document.querySelector('#disease-results-card > p[data-i18n]');
    if (diseasePromptEl) diseasePromptEl.style.display = 'none';

    const treatments = {
        leaf_blight: ['Remove and destroy infected leaves', 'Apply copper oxychloride (3g/L)', 'Ensure adequate spacing', 'Avoid overhead irrigation'],
        rust: ['Apply Mancozeb 75WP (2.5g/L)', 'Remove infected plant parts', 'Improve field drainage', 'Rotate crops next season'],
        powdery_mildew: ['Spray neem oil (5ml/L)', 'Apply sulfur dust', 'Improve air circulation', 'Avoid excess nitrogen'],
        healthy: ['Continue regular watering', 'Monitor for early signs', 'Maintain soil nutrition', 'Practice crop rotation']
    };

    const steps = treatments[detected] || treatments.healthy;
    resultArea.innerHTML = `
        <div class="result-card ${isHealthy ? 'success' : 'danger'}">
            <div style="display:flex;justify-content:space-between;align-items:start;">
                <div>
                    <h2>${result.icon} ${t(result.nameKey)}</h2>
                    <p style="font-size:0.85rem;margin-top:0.3rem;color:#666;">AI Confidence: <strong>${result.confidence}%</strong></p>
                </div>
                <span style="background:${isHealthy?'#27ae60':'#e74c3c'};color:white;padding:0.3rem 0.8rem;border-radius:15px;font-size:0.8rem;font-weight:700;">
                    Severity: ${result.severity}
                </span>
            </div>
            <p style="margin-top:0.6rem;"><strong>Symptoms observed:</strong> ${result.symptoms}</p>
            <p style="margin-top:0.4rem;"><strong>Action:</strong> ${t(result.solutionKey)}</p>
        </div>
        <div class="result-card ${isHealthy ? 'success' : 'warning'}" style="margin-top:0.5rem;">
            <h3>${t('prevention_tips')}</h3>
            ${steps.map((s,i) => `<p>${i+1}. ${s}</p>`).join('')}
        </div>
    `;
}

// ==============================================
// MARKET PRICES
// ==============================================
const marketPrices = Object.fromEntries(
    Object.entries(CROP_DB).map(([k, v]) => [k, { price: v.market, trend: v.trend, market: v.marketLoc, trendIcon: v.trend==='up'?'📈':v.trend==='down'?'📉':'➡️', trendClass: `trend-${v.trend}`, change7d: v.trend==='up'?+(Math.random()*4+1).toFixed(1)+'%':v.trend==='down'?-(Math.random()*3+0.5).toFixed(1)+'%':'0.0%' }])
);

function loadMarketPrices() {
    const tbody = document.getElementById('price-table-body');
    tbody.innerHTML = '';
    for (let [crop, data] of Object.entries(marketPrices)) {
        const localName = cropNamesLocal[currentLanguage]?.[crop] || crop;
        tbody.innerHTML += `<tr>
            <td><strong>${localName}</strong> <small style="color:#999;">(${crop})</small></td>
            <td>₹${data.price.toLocaleString()}</td>
            <td>${data.market}</td>
            <td class="${data.trendClass}">${data.trendIcon} ${data.trend.toUpperCase()}</td>
            <td class="${data.trendClass}">${data.change7d}</td>
        </tr>`;
    }
    document.getElementById('market-date').textContent = new Date().toLocaleString();
    setTimeout(drawPriceChart, 200);
}

function drawPriceChart() {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Polyfill for roundRect (not supported in all browsers)
    if (!ctx.roundRect) {
        ctx.roundRect = function(x, y, w, h, r) {
            const radius = Array.isArray(r) ? r[0] : r;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
            ctx.lineTo(x + w, y + h);
            ctx.lineTo(x, y + h);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
    }
    const width = canvas.parentElement.clientWidth || 600;
    const height = 280;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const crops = Object.keys(marketPrices);
    const prices = Object.values(marketPrices).map(d => d.price);
    const maxPrice = Math.max(...prices);
    const padding = { top: 30, right: 20, bottom: 50, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const barW = Math.min(45, chartW / crops.length - 10);

    // Y gridlines
    ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + chartH - (i / 4) * chartH;
        ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(width - padding.right, y); ctx.stroke();
        ctx.fillStyle = '#999'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText('₹' + ((maxPrice * i / 4) / 1000).toFixed(1) + 'k', padding.left - 5, y + 4);
    }

    crops.forEach((crop, i) => {
        const x = padding.left + i * (chartW / crops.length) + (chartW / crops.length - barW) / 2;
        const barH = (prices[i] / maxPrice) * chartH;
        const y = padding.top + chartH - barH;
        const grad = ctx.createLinearGradient(x, y, x, padding.top + chartH);
        grad.addColorStop(0, marketPrices[crop].trend === 'up' ? '#4caf50' : marketPrices[crop].trend === 'down' ? '#e53935' : '#ff9800');
        grad.addColorStop(1, marketPrices[crop].trend === 'up' ? '#1b5e20' : marketPrices[crop].trend === 'down' ? '#b71c1c' : '#e65100');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#333'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
        const localName = cropNamesLocal[currentLanguage]?.[crop] || crop;
        ctx.fillText(localName.length > 7 ? localName.slice(0,6)+'.' : localName, x + barW/2, height - padding.bottom + 15);
        ctx.fillStyle = '#555'; ctx.font = 'bold 9px sans-serif';
        ctx.fillText('₹' + (prices[i]/1000).toFixed(1)+'k', x + barW/2, y - 5);
    });
}

// ==============================================
// CHATBOT — now reads ACTUAL form values
// ==============================================
function handleChatEnter(e) { if (e.key === 'Enter') sendChatMessage(); }

function quickChat(type) {
    const prompts = {
        en: { crop:'Which crop should I grow based on my current soil data?', yield:'Predict my yield', disease:'Check plant disease', price:'Show market prices' },
        ml: { crop:'ഞാൻ ഏത് വിള വളർത്തണം?', yield:'എന്റെ വിളവ് പ്രവചിക്കുക', disease:'ചെടിയുടെ രോഗം', price:'വിപണി വിലകൾ' },
        hi: { crop:'कौन सी फसल उगानी चाहिए?', yield:'उपज का अनुमान लगाएं', disease:'पौधे की बीमारी', price:'बाजार मूल्य' },
        kn: { crop:'ಯಾವ ಬೆಳೆ ಬೆಳೆಯಬೇಕು?', yield:'ಇಳುವರಿ ಊಹಿಸಿ', disease:'ಸಸ್ಯ ರೋಗ', price:'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' },
        ta: { crop:'எந்த பயிர் பயிரிட வேண்டும்?', yield:'விளைச்சல் கணிப்பு', disease:'தாவர நோய்', price:'சந்தை விலை' },
        te: { crop:'ఏ పంట పండించాలి?', yield:'దిగుబడి అంచనా వేయండి', disease:'మొక్క వ్యాధి', price:'మార్కెట్ ధరలు' }
    };
    const msg = prompts[currentLanguage]?.[type] || prompts.en[type];
    document.getElementById('chatInput').value = msg;
    sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    addChatMessage(message, 'user');
    input.value = '';
    sendToClaudeAPI(message);
}

async function sendToClaudeAPI(userMessage) {
    const typingId = showTypingIndicator();

    // Build context from current soil data
    const inputs = getInputs();
    const ranked = rankAllCrops(inputs);
    const top3 = ranked.slice(0,3).map(c => `${getCropName(c.key)} (${c.score.toFixed(0)}%)`).join(', ');
    const yieldCrop = document.getElementById('yield-crop').value;
    const yieldProf = yieldProfiles[yieldCrop];
    const yn = parseFloat(document.getElementById('yn').value);
    const yp = parseFloat(document.getElementById('yp').value);
    const yk = parseFloat(document.getElementById('yk').value);

    const langMap = { ml:'Malayalam/Kerala', hi:'Hindi', kn:'Kannada/Karnataka', ta:'Tamil/Tamil Nadu', te:'Telugu/Andhra Pradesh & Telangana', en:'English' };
    const systemPrompt = `You are JeevanMitra AI, an expert Indian agricultural assistant supporting farmers in ${langMap[currentLanguage]||'English'}.

Current farmer's soil/environment data:
- Nitrogen: ${inputs.n}, Phosphorus: ${inputs.p}, Potassium: ${inputs.k}
- Temperature: ${inputs.temp}°C, Humidity: ${inputs.hum}%, Soil pH: ${inputs.ph}, Rainfall: ${inputs.rain}mm
- Top recommended crops: ${top3}
- Selected yield crop: ${yieldCrop} (N:${yn}, P:${yp}, K:${yk})

Respond in ${langMap[currentLanguage]||'English'}.
Be concise (2-4 sentences), practical, and use relevant emojis. Reference the farmer's actual data when relevant. Use HTML bold tags for key terms. Never use markdown.`;

    try {
        const fullPrompt = systemPrompt + '\n\nFarmer question: ' + userMessage;
        const resp = await fetch(API_BASE_URL + '/groq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: fullPrompt })
        });
        const data = await resp.json();
        removeTypingIndicator(typingId);
        if (data.error) throw new Error(data.error);
        let text = data.text || '';
        text = text.replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\*(.*?)\*/g,'$1').replace(/#{1,3} /g,'').replace(/\n/g,'<br>');
        addChatMessage(text, 'bot');
        speakText(text.replace(/<[^>]+>/g,''));
    } catch (err) {
        removeTypingIndicator(typingId);
        const fallback = generateAIResponse(userMessage);
        addChatMessage(fallback + '<br><small style="opacity:0.6;">(Groq AI unavailable — check your API key)</small>', 'bot');
    }
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    const safeText = sender === 'user' ? text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : text;
    div.innerHTML = `<div class="chat-avatar ${sender === 'bot' ? 'bot' : 'user'}">${sender==='bot'?'🤖':'👨‍🌾'}</div><div class="chat-bubble">${safeText}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id; div.className = 'chat-message bot';
    div.innerHTML = `<div class="chat-avatar bot">🤖</div><div class="chat-bubble"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}
function removeTypingIndicator(id) { const el = document.getElementById(id); if (el) el.remove(); }

// FIXED: Chat reads actual form values
function generateAIResponse(message) {
    const msg = message.toLowerCase();
    const lang = currentLanguage;

    const isCropQ = msg.match(/crop|grow|plant|recommend|फसल|उगा|ವಿಳ|ಬೆಳೆ|பயிர்|വിള|పంట|పండించ/);
    const isYieldQ = msg.match(/yield|harvest|production|output|predict|விளைச்சல்|उपज|ಇಳುವರಿ|വിളവ്|దిగుబడి/);
    const isDiseaseQ = msg.match(/disease|sick|problem|spots|ರೋಗ|रोग|நோய்|രോഗ|blight|rust|mildew|వ్యాధి/);
    const isPriceQ = msg.match(/price|market|cost|rate|ಬೆಲೆ|मूल्य|விலை|വില|ధర/);
    const isGreeting = msg.match(/^(hi|hello|hey|namaste|నమస్కారం|నమస్|ನಮಸ್ಕ|வணக்|നമസ്)/);
    const isHelp = msg.match(/help|what can|feature|ಸಹಾಯ|मदद|உதவி|സഹായ|సహాయం/);

    if (isCropQ) {
        // Read actual form values
        const inputs = getInputs();
        const ranked = rankAllCrops(inputs);
        const top = ranked[0];
        const second = ranked[1];
        const third = ranked[2];
        const n1 = cropNamesLocal[lang]?.[top.key] || top.name;
        const n2 = cropNamesLocal[lang]?.[second.key] || second.name;
        const n3 = cropNamesLocal[lang]?.[third.key] || third.name;
        const responses = {
            en: `Based on your current inputs (Temp: ${inputs.temp}°C, Rainfall: ${inputs.rain}mm, pH: ${inputs.ph}), I recommend:<br><br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}% match<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}% match<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}% match<br><br>Use the Crop Recommendation tab for a full analysis! 🌱`,
            ml: `നിങ്ങളുടെ ഡേറ്റ (താപ: ${inputs.temp}°C, മഴ: ${inputs.rain}mm, pH: ${inputs.ph}) അടിസ്ഥാനത്തിൽ:<br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}%<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}%<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}%`,
            hi: `आपके डेटा (तापमान: ${inputs.temp}°C, वर्षा: ${inputs.rain}mm, pH: ${inputs.ph}) के आधार पर:<br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}%<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}%<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}%`,
            kn: `ನಿಮ್ಮ ಡೇಟಾ (ತಾಪ: ${inputs.temp}°C, ಮಳೆ: ${inputs.rain}mm, pH: ${inputs.ph}) ಆಧಾರದ ಮೇಲೆ:<br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}%<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}%<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}%`,
            ta: `உங்கள் தரவு (வெப்பம்: ${inputs.temp}°C, மழை: ${inputs.rain}mm, pH: ${inputs.ph}) அடிப்படையில்:<br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}%<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}%<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}%`,
            te: `మీ డేటా (ఉష్ణోగ్రత: ${inputs.temp}°C, వర్షం: ${inputs.rain}mm, pH: ${inputs.ph}) ఆధారంగా:<br>🥇 <b>${n1}</b> — ${top.score.toFixed(0)}%<br>🥈 <b>${n2}</b> — ${second.score.toFixed(0)}%<br>🥉 <b>${n3}</b> — ${third.score.toFixed(0)}%`
        };
        return responses[lang] || responses.en;
    }

    if (isYieldQ) {
        const crop = document.getElementById('yield-crop').value;
        const n = parseFloat(document.getElementById('yn').value);
        const p = parseFloat(document.getElementById('yp').value);
        const k = parseFloat(document.getElementById('yk').value);
        const prof = yieldProfiles[crop];
        const nIdx = Math.min(1, 0.4 + (n/140)*0.7)*prof.nSens;
        const pIdx = Math.min(1, 0.4 + (p/145)*0.7)*prof.pSens;
        const kIdx = Math.min(1, 0.4 + (k/205)*0.7)*prof.kSens;
        const totalSens = prof.nSens+prof.pSens+prof.kSens;
        const predicted = Math.min(prof.peak, prof.base*(0.6+(nIdx+pIdx+kIdx)/totalSens*0.8));
        const localCrop = cropNamesLocal[lang]?.[crop] || crop;
        const responses = {
            en: `For <b>${localCrop}</b> with your current nutrients (N:${n}, P:${p}, K:${k}), I predict <b>${predicted.toFixed(2)} tons/hectare</b>. Market value: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}. See the Yield tab for full analysis! 📊`,
            ml: `<b>${localCrop}</b> ന്, ${predicted.toFixed(2)} ടൺ/ഹെക്ടർ. വിപണി മൂല്യം: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}`,
            hi: `<b>${localCrop}</b> के लिए ${predicted.toFixed(2)} टन/हेक्टेयर। बाजार मूल्य: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}`,
            kn: `<b>${localCrop}</b> ಗೆ ${predicted.toFixed(2)} ಟನ್/ಹೆಕ್ಟೇರ್. ಮಾರುಕಟ್ಟೆ: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}`,
            ta: `<b>${localCrop}</b> க்கு ${predicted.toFixed(2)} டன்/ஹெக்டேர். சந்தை: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}`,
            te: `<b>${localCrop}</b> కు ${predicted.toFixed(2)} టన్/హెక్టారు. మార్కెట్: ~₹${(predicted*10*CROP_DB[crop].market).toLocaleString('en-IN')}`
        };
        return responses[lang] || responses.en;
    }

    if (isDiseaseQ) {
        const r = { en:'To diagnose plant disease, upload a leaf image in the Disease Detection tab. Common diseases I identify: Leaf Blight (brown spots), Rust (orange pustules), Powdery Mildew (white coating). Need prevention tips? 🔍',
            ml:'ചെടിയുടെ രോഗ നിർണ്ണയത്തിന് ഇല ചിത്രം അപ്ലോഡ് ചെയ്യുക. ഇല പുള്ളി, തുരുമ്പ്, പൂപ്പൽ രോഗങ്ങൾ 🔍',
            hi:'पौधे की बीमारी के लिए पत्ते की छवि अपलोड करें। पत्ती झुलसा, रतुआ, भभूतिया रोग। 🔍',
            kn:'ಸಸ್ಯ ರೋಗ ಪತ್ತೆಗೆ ಎಲೆ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. 🔍',
            ta:'தாவர நோய் கண்டறிய இலை படம் பதிவேற்றவும். 🔍',
            te:'మొక్క వ్యాధి నిర్ధారణకు ఆకు చిత్రం అప్‌లోడ్ చేయండి. ఆకు తెగులు, తుప్పు, పొడి బూజు వ్యాధులు 🔍' };
        return r[lang] || r.en;
    }

    if (isPriceQ) {
        const top5 = Object.entries(marketPrices).slice(0,5);
        const priceStr = top5.map(([c,d]) => `• ${cropNamesLocal[lang]?.[c]||c}: ₹${d.price} ${d.trendIcon}`).join('<br>');
        const r = { en:`Current market prices:<br>${priceStr}<br><br>Check the Market tab for full chart! 💰`,
            ml:`വിപണി വിലകൾ:<br>${priceStr}`,
            hi:`बाजार मूल्य:<br>${priceStr}`,
            kn:`ಮಾರುಕಟ್ಟೆ ಬೆಲೆ:<br>${priceStr}`,
            ta:`சந்தை விலைகள்:<br>${priceStr}`,
            te:`మార్కెట్ ధరలు:<br>${priceStr}` };
        return r[lang] || r.en;
    }

    if (isGreeting) {
        const r = { en:`Hello! 🌿 I'm JeevanMitra AI. I can recommend crops, predict yield, detect diseases, and show market prices — all based on your actual soil data. What would you like to know?`,
            ml:`നമസ്കാരം! 🌿 ഞാൻ ജീവൻമിത്ര AI. വിള ശുപാർശ, വിളവ് പ്രവചനം, രോഗ നിർണ്ണയം, വിപണി വിലകൾ — സഹായിക്കാം!`,
            hi:`नमस्ते! 🌿 मैं जीवनमित्र AI हूं। फसल अनुशंसा, उपज पूर्वानुमान, रोग पहचान और बाजार मूल्यों में मदद कर सकता हूं!`,
            kn:`ನಮಸ್ಕಾರ! 🌿 ನಾನು ಜೀವನ್‌ಮಿತ್ರ AI. ಬೆಳೆ ಶಿಫಾರಸು, ಇಳುವರಿ, ರೋಗ, ಬೆಲೆ — ಸಹಾಯ ಮಾಡಬಲ್ಲೆ!`,
            ta:`வணக்கம்! 🌿 நான் ஜீவன்மித்ர AI. பயிர் பரிந்துரை, விளைச்சல், நோய், விலைகள் — உதவுவேன்!`,
            te:`నమస్కారం! 🌿 నేను జీవన్‌మిత్ర AI. పంట సిఫార్సు, దిగుబడి అంచనా, వ్యాధి గుర్తింపు, మార్కెట్ ధరలు — సహాయం చేస్తాను!` };
        return r[lang] || r.en;
    }

    if (isHelp) {
        const r = { en:`I can help with:<br>🌱 <b>Crop Recommendation</b> — data-driven, not guesswork<br>📊 <b>Yield Prediction</b> — crop-specific nutrient model<br>🔍 <b>Disease Detection</b> — upload leaf images<br>💰 <b>Market Prices</b> — with trend indicators<br>🗣️ <b>Voice input</b> in 6 languages<br><br>All recommendations use your actual soil parameters!`,
            ml:`ഞാൻ ഇവ ചെയ്യും:<br>🌱 വിള ശുപാർശ<br>📊 വിളവ് പ്രവചനം<br>🔍 രോഗ നിർണ്ണയം<br>💰 വിപണി വിലകൾ`,
            hi:`मैं यह कर सकता हूं:<br>🌱 फसल अनुशंसा<br>📊 उपज पूर्वानुमान<br>🔍 रोग पहचान<br>💰 बाजार मूल्य`,
            kn:`ನಾನು ಮಾಡಬಲ್ಲೆ:<br>🌱 ಬೆಳೆ ಶಿಫಾರಸು<br>📊 ಇಳುವರಿ ಭವಿಷ್ಯ<br>🔍 ರೋಗ ಪತ್ತೆ<br>💰 ಮಾರುಕಟ್ಟೆ ಬೆಲೆ`,
            ta:`நான் செய்வேன்:<br>🌱 பயிர் பரிந்துரை<br>📊 விளைச்சல் கணிப்பு<br>🔍 நோய் கண்டறிதல்<br>💰 சந்தை விலைகள்`,
            te:`నేను చేయగలను:<br>🌱 పంట సిఫార్సు<br>📊 దిగుబడి అంచనా<br>🔍 వ్యాధి గుర్తింపు<br>💰 మార్కెట్ ధరలు` };
        return r[lang] || r.en;
    }

    const defaults = {
        en:`Interesting question! 🌾 I specialize in crop recommendations, yield prediction, disease detection, and market prices. Could you be more specific? Or ask me "which crop should I grow?" to get a recommendation based on your current soil data.`,
        ml:`🌾 ഞാൻ വിള ശുപാർശ, വിളവ് പ്രവചനം, രോഗ നിർണ്ണയം, വിപണി വിലകൾ എന്നിവ ചെയ്യും. ഞാൻ ഏത് വിള വളർത്തണം? എന്ന് ചോദിക്കൂ.`,
        hi:`🌾 फसल, उपज, रोग या बाजार मूल्य के बारे में पूछें।`,
        kn:`🌾 ಬೆಳೆ, ಇಳುವರಿ, ರೋಗ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಬಗ್ಗೆ ಕೇಳಿ.`,
        ta:`🌾 பயிர், விளைச்சல், நோய் அல்லது சந்தை விலை பற்றி கேளுங்கள்.`,
        te:`🌾 పంట, దిగుబడి, వ్యాధి లేదా మార్కెట్ ధర గురించి అడగండి.`
    };
    return defaults[lang] || defaults.en;
}

// ==============================================
// UI HELPERS
// ==============================================
function t(key) { return i18n[currentLanguage]?.[key] || i18n.en[key] || key; }

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
    if (btn) btn.classList.add('active');
    applyTranslations();
    loadMarketPrices();
    showToast(t('lang_changed'));
    document.getElementById('welcome-message').textContent = t('chat_welcome');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabName}`)?.classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`)?.classList.add('active');
    if (tabName === 'market') { loadMarketPrices(); setTimeout(drawPriceChart, 300); }
}

function updateSlider(id) {
    const el = document.getElementById(id);
    const disp = document.getElementById(id + '-value');
    if (el && disp) disp.textContent = el.value;
}

function updateAllSliders() {
    ['n','p','k','temp','hum','ph','rain','yn','yp','yk','ya'].forEach(id => {
        const el = document.getElementById(id);
        if (el) updateSlider(id);
    });
}

function resetSliders() {
    const defaults = { n:50, p:50, k:50, temp:25, hum:65, ph:6.5, rain:150 };
    Object.entries(defaults).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) { el.value = val; updateSlider(id); }
    });
    clearTimeout(livePreviewTimeout);
    document.getElementById('live-preview').innerHTML = '';
    document.getElementById('crop-result-area').innerHTML = '';
    livePreviewCrop();
    showToast('Sliders reset to defaults');
}

function autoFillWeather() {
    document.getElementById('temp').value = Math.floor(Math.random() * 15 + 20);
    document.getElementById('hum').value = Math.floor(Math.random() * 40 + 50);
    document.getElementById('rain').value = Math.floor(Math.random() * 200 + 50);
    updateAllSliders();
    livePreviewCrop();
    showToast(t('weather_filled'));
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function toggleChat() {
    const panel = document.getElementById('chatPanel');
    const toggle = document.getElementById('chatToggle');
    const container = document.getElementById('mainContainer');
    isChatVisible = !isChatVisible;
    panel.style.display = isChatVisible ? 'flex' : 'none';
    container.classList.toggle('chat-hidden', !isChatVisible);
    toggle.innerHTML = isChatVisible ? '✕' : '💬';
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g,''));
        u.lang = { en:'en-US', ml:'ml-IN', hi:'hi-IN', kn:'kn-IN', ta:'ta-IN' }[currentLanguage] || 'en-US';
        u.rate = 0.85;
        speechSynthesis.speak(u);
    }
}

function startChatVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { showToast(t('voice_not_supported')); return; }
    const rec = new SR();
    rec.lang = { en:'en-US', ml:'ml-IN', hi:'hi-IN', kn:'kn-IN', ta:'ta-IN' }[currentLanguage] || 'en-US';
    rec.interimResults = false;
    const btn = document.getElementById('chatVoiceBtn');
    btn.classList.add('listening');
    showToast(t('voice_listening'));
    rec.start();
    rec.onresult = e => { document.getElementById('chatInput').value = e.results[0][0].transcript; btn.classList.remove('listening'); sendChatMessage(); };
    rec.onerror = rec.onend = () => btn.classList.remove('listening');
}

// ==============================================
// INIT
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    updateAllSliders();
    loadMarketPrices();
    applyTranslations();
    livePreviewCrop();
    predictYield(); // auto-render yield on load
    // Sync welcome message with current language
    const welcomeEl = document.getElementById('welcome-message');
    if (welcomeEl) welcomeEl.textContent = t('chat_welcome');
    console.log('🌿 JeevanMitra AI — Fixed & Ready. Bugs fixed: crop scoring engine, chat reads real values, yield model, live preview, roundRect polyfill, XSS sanitization. Added 8 more crops.');
});

window.addEventListener('resize', () => {
    if (document.getElementById('tab-market')?.classList.contains('active')) drawPriceChart();
});

// ==============================================
// GROQ API KEY MANAGEMENT
// ==============================================
(function() {
    const GROQ_KEY = 'krishi_groq_key';

    function saveKey() {
        var key = document.getElementById('apiKeyInput').value.trim();
        if (!key.startsWith('gsk_') || key.length < 20) {
            alert('❌ Invalid key. Groq keys start with gsk_...');
            return;
        }
        localStorage.setItem(GROQ_KEY, key);
        window._groqApiKey = key;
        closeModal();
        fetch(API_BASE_URL + '/groq-setkey', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key}) });
        updateBar(true);
        showToast('✅ Groq key saved! AI features activated.');
    }

    function closeModal() {
        document.getElementById('apiModal').style.display = 'none';
    }

    function updateBar(connected) {
        const bar = document.getElementById('apiKeyBar');
        const status = document.getElementById('apiKeyStatus');
        bar.style.display = 'flex';
        if (connected) {
            status.textContent = '⚡ Groq AI Connected ✓  (click to change key)';
            bar.style.background = '#6c3fc5';
        } else {
            status.textContent = '🔑 Click here to enter your FREE Groq API key';
            bar.style.background = '#e67e22';
        }
    }

    function showApiModal() {
        document.getElementById('apiModal').style.display = 'flex';
        setTimeout(function(){ document.getElementById('apiKeyInput').focus(); }, 100);
    }
    window.showApiModal = showApiModal;

    document.addEventListener('DOMContentLoaded', function() {
        // Load saved key
        var saved = localStorage.getItem(GROQ_KEY);
        if (saved) {
            window._groqApiKey = saved;
            fetch(API_BASE_URL + '/groq-setkey', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({key: saved}) });
            updateBar(true);
        } else {
            updateBar(false);
            setTimeout(showApiModal, 800);
        }
        document.getElementById('saveKeyBtn').addEventListener('click', saveKey);
        document.getElementById('skipKeyBtn').addEventListener('click', closeModal);
        document.getElementById('apiKeyBar').addEventListener('click', showApiModal);
        document.getElementById('apiKeyInput').addEventListener('keypress', function(e){ if(e.key==='Enter') saveKey(); });
    });
})();


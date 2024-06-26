
    const universities = [
        { "name": "University of the Punjab", "location": "Lahore, Punjab" },
        { "name": "National University of Sciences and Technology (NUST)", "location": "Islamabad, Federal" },
        { "name": "Lahore University of Management Sciences (LUMS)", "location": "Lahore, Punjab" },
        { "name": "COMSATS Institute of Information Technology", "location": "Islamabad, Federal" },
        { "name": "University of Karachi", "location": "Karachi, Sindh" },
        { "name": "Aga Khan University", "location": "Karachi, Sindh" },
        { "name": "University of Engineering and Technology (UET) Lahore", "location": "Lahore, Punjab" },
        { "name": "Quaid-i-Azam University", "location": "Islamabad, Federal" },
        { "name": "Institute of Business Administration (IBA) Karachi", "location": "Karachi, Sindh" },
        { "name": "University of Agriculture Faisalabad", "location": "Faisalabad, Punjab" },
        { "name": "Government College University (GCU) Lahore", "location": "Lahore, Punjab" },
        { "name": "National University of Computer and Emerging Sciences (FAST-NUCES)", "location": "Islamabad, Federal" },
        { "name": "NED University of Engineering and Technology", "location": "Karachi, Sindh" },
        { "name": "Allama Iqbal Open University", "location": "Islamabad, Federal" },
        { "name": "University of Peshawar", "location": "Peshawar, Khyber Pakhtunkhwa" },
        { "name": "Bahauddin Zakariya University", "location": "Multan, Punjab" },
        { "name": "Institute of Space Technology", "location": "Islamabad, Federal" },
        { "name": "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology (GIKI)", "location": "Topi, Khyber Pakhtunkhwa" },
        { "name": "University of Management and Technology (UMT)", "location": "Lahore, Punjab" },
        { "name": "Pakistan Institute of Engineering and Applied Sciences (PIEAS)", "location": "Islamabad, Federal" },
        { "name": "University of Veterinary and Animal Sciences", "location": "Lahore, Punjab" },
        { "name": "Forman Christian College", "location": "Lahore, Punjab" },
        { "name": "Abdul Wali Khan University", "location": "Mardan, Khyber Pakhtunkhwa" },
        { "name": "Iqra University", "location": "Karachi, Sindh" },
        { "name": "Air University", "location": "Islamabad, Federal" },
        { "name": "Bahria University", "location": "Islamabad, Federal" },
        { "name": "Mehran University of Engineering and Technology", "location": "Jamshoro, Sindh" },
        { "name": "University of Sargodha", "location": "Sargodha, Punjab" },
        { "name": "Fatima Jinnah Women University", "location": "Rawalpindi, Punjab" },
        { "name": "Khyber Medical University", "location": "Peshawar, Khyber Pakhtunkhwa" },
        { "name": "Shaheed Zulfiqar Ali Bhutto Institute of Science and Technology (SZABIST)", "location": "Karachi, Sindh" },
        { "name": "Pakistan Institute of Development Economics (PIDE)", "location": "Islamabad, Federal" },
        { "name": "Institute of Business Management (IoBM)", "location": "Karachi, Sindh" },
        { "name": "University of Sindh", "location": "Jamshoro, Sindh" },
        { "name": "University of Gujrat", "location": "Gujrat, Punjab" },
        { "name": "Islamia University of Bahawalpur", "location": "Bahawalpur, Punjab" },
        { "name": "University of Balochistan", "location": "Quetta, Balochistan" },
        { "name": "University of Malakand", "location": "Chakdara, Khyber Pakhtunkhwa" },
        { "name": "University of Swat", "location": "Swat, Khyber Pakhtunkhwa" },
        { "name": "Arid Agriculture University", "location": "Rawalpindi, Punjab" },
        { "name": "University of Azad Jammu and Kashmir", "location": "Muzaffarabad, Azad Jammu and Kashmir" },
        { "name": "Gomal University", "location": "Dera Ismail Khan, Khyber Pakhtunkhwa" },
        { "name": "International Islamic University Islamabad (IIUI)", "location": "Islamabad, Federal" },
        { "name": "University of Health Sciences", "location": "Lahore, Punjab" },
        { "name": "University of Central Punjab (UCP)", "location": "Lahore, Punjab" },
        { "name": "Hamdard University", "location": "Karachi, Sindh" },
        { "name": "King Edward Medical University", "location": "Lahore, Punjab" },
        { "name": "Jinnah Sindh Medical University", "location": "Karachi, Sindh" },
        { "name": "University of Haripur", "location": "Haripur, Khyber Pakhtunkhwa" },
        { "name": "University of Wah", "location": "Wah, Punjab" },
        { "name": "Shaheed Benazir Bhutto University", "location": "Sheringal, Khyber Pakhtunkhwa" },
        { "name": "Shaheed Benazir Bhutto Women University", "location": "Peshawar, Khyber Pakhtunkhwa" },
        { "name": "Virtual University of Pakistan", "location": "Lahore, Punjab" },
        { "name": "University of Lahore", "location": "Lahore, Punjab" },
        { "name": "Karachi School of Business and Leadership (KSBL)", "location": "Karachi, Sindh" },
        { "name": "Institute of Management Sciences", "location": "Lahore, Punjab" },
        { "name": "University of Education", "location": "Lahore, Punjab" },
        { "name": "Lahore School of Economics", "location": "Lahore, Punjab" },
        { "name": "Muhammad Ali Jinnah University", "location": "Karachi, Sindh" },
        { "name": "Riphah International University", "location": "Islamabad, Federal" },
        { "name": "Greenwich University", "location": "Karachi, Sindh" },
        { "name": "Sir Syed University of Engineering and Technology", "location": "Karachi, Sindh" },
        { "name": "Superior University", "location": "Lahore, Punjab" },
        { "name": "University of South Asia", "location": "Lahore, Punjab" },
        { "name": "Iqra National University", "location": "Peshawar, Khyber Pakhtunkhwa" },
        { "name": "Sarhad University of Science and Information Technology", "location": "Peshawar, Khyber Pakhtunkhwa" },
        { "name": "Foundation University Islamabad", "location": "Islamabad, Federal" },
        { "name": "Preston University", "location": "Islamabad, Federal" },
        { "name": "Beaconhouse National University", "location": "Lahore, Punjab" },
        { "name": "Kinnaird College for Women", "location": "Lahore, Punjab" },
        { "name": "Liaquat University of Medical and Health Sciences", "location": "Jamshoro, Sindh" },
        { "name": "Peoples University of Medical and Health Sciences for Women", "location": "Nawabshah, Sindh" },
        { "name": "Karachi institute of economics and technology (KIET)", "location": "Karachi, Sindh" }
    ]

    export default universities;
